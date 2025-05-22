import 'dotenv/config';
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { z } from "zod";
import multer from 'multer';
import { serverClient } from '../client/src/lib/sanityApi'; // Adjust path if needed
import express from 'express';
import nodemailer from 'nodemailer';
import fetch from 'node-fetch';

const upload = multer({ storage: multer.memoryStorage() });

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'housinglords@gmail.com',
    pass: 'bzgtfwsdxucemgvx'
  }
});

// Verify transporter configuration on startup
transporter.verify(function(error, success) {
  if (error) {
    console.error('Email transporter verification failed:', error);
  } else {
    console.log('Email transporter is ready to send messages');
  }
});

// Helper function to send email with retry
async function sendEmailWithRetry(mailOptions: any, maxRetries = 3) {
  let lastError;
  for (let i = 0; i < maxRetries; i++) {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
      return info;
    } catch (error) {
      lastError = error;
      console.error(`Attempt ${i + 1} failed:`, error);
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
  }
  throw lastError;
}

// Temporary mock authentication middleware for development
function mockAuth(req: any, res: Response, next: Function) {
  // In production, replace this with real authentication logic
  req.user = {
    id: 1, // mock user id
    username: 'testuser',
    name: 'Test User',
    email: 'testuser@example.com',
    role: 'admin' // or 'tenant', 'landlord'
  };
  next();
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Attach mock auth middleware for all routes (for now)
  app.use(mockAuth);

  // Only keep endpoints that are functional with Sanity/Clerk

  // Property approval route (uses Sanity)
  app.patch('/api/properties/:id/approve', async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.id;
      console.log('Processing property approval for ID:', propertyId);

      const property = await serverClient.fetch(`*[_type == "property" && _id == $id][0]{
        _id,
        title,
        "ownerEmail": owner->email,
        "ownerName": owner->name
      }`, { id: propertyId });

      if (!property) {
        console.error('Property not found:', propertyId);
        return res.status(404).json({ error: 'Property not found' });
      }

      console.log('Found property:', {
        id: property._id,
        title: property.title,
        ownerEmail: property.ownerEmail,
        ownerName: property.ownerName
      });

      // First update the property status
      await serverClient.patch(propertyId).set({ approved: true }).commit();
      console.log('Property status updated to approved');

      // Then send the email notification
      if (property.ownerEmail) {
        try {
          console.log('Preparing to send approval email to:', property.ownerEmail);
          
          const mailOptions = {
            from: '"Housing Lord" <housinglords@gmail.com>',
            to: property.ownerEmail,
            subject: "Your Property Has Been Approved",
            text: `Dear ${property.ownerName || 'Property Owner'},\n\nYour property \"${property.title}\" has been approved.\n\nThank you,\nHousing Lord Team`,
            html: `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 8px;">
              <h2 style="color: #333; margin-bottom: 20px;">Property Approved</h2>
              <div style="background-color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
                <p style="color: #666; line-height: 1.6;">Dear ${property.ownerName || 'Property Owner'},</p>
                <p style="color: #666; line-height: 1.6;">Your property \"${property.title}\" has been approved.</p>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">This is an automated message from Housing Lord. Please do not reply to this email.</p>
            </div>`
          };

          const info = await sendEmailWithRetry(mailOptions);
          console.log('Property approval email sent successfully:', info.messageId);
        } catch (emailError) {
          console.error('Failed to send property approval email:', emailError);
          if (emailError instanceof Error) {
            console.error('Email error details:', {
              message: emailError.message,
              stack: emailError.stack,
              name: emailError.name
            });
          }
        }
      } else {
        console.warn('No owner email found for property:', propertyId);
      }

      return res.status(200).json({ message: 'Property approved successfully' });
    } catch (error) {
      console.error('Property approval error:', error);
      return res.status(500).json({ error: 'Failed to approve property' });
    }
  });

  // Email notification route (for admin/owner notification)
  app.post('/api/notify-interest', async (req: Request, res: Response) => {
    const { propertyId, userId } = req.body;
    try {
      // Fetch user data from Clerk
      const userRes = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
        headers: { Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}` },
      });
      const userRaw = await userRes.json();
      const user = typeof userRaw === 'object' && userRaw !== null ? userRaw : {};
      const userFirstName = 'first_name' in user ? user.first_name : '';
      const userLastName = 'last_name' in user ? user.last_name : '';
      const userEmail = 'email_address' in user ? user.email_address : '';
      let userPhone = 'N/A';
      if ('phone_numbers' in user && Array.isArray((user as any).phone_numbers) && (user as any).phone_numbers[0] && typeof (user as any).phone_numbers[0].phone_number === 'string') {
        userPhone = (user as any).phone_numbers[0].phone_number;
      }

      // Fetch property data from Sanity
      const query = `*[_type=='property' && _id==$id][0]{title,owner->{email,name}}`;
      const sanityRes = await fetch(
        `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${process.env.SANITY_DATASET}?query=${encodeURIComponent(query)}&$id=${propertyId}`,
        {
          headers: { Authorization: `Bearer ${process.env.SANITY_TOKEN}` },
        }
      );
      const sanityDataRaw = await sanityRes.json();
      const sanityData = typeof sanityDataRaw === 'object' && sanityDataRaw !== null ? sanityDataRaw : {};
      const property = 'result' in sanityData && typeof sanityData.result === 'object' && sanityData.result !== null ? sanityData.result : {};
      const propertyTitle = 'title' in property ? property.title : '';
      const owner = 'owner' in property && typeof property.owner === 'object' && property.owner !== null ? property.owner : {};
      const ownerName = 'name' in owner ? owner.name : '';
      const ownerEmail = 'email' in owner ? owner.email : '';

      // Compose email
      const message = `
        <h2>New Interest in Property: ${propertyTitle}</h2>
        <p><strong>User:</strong> ${userFirstName} ${userLastName} (${userEmail})</p>
        <p><strong>Phone:</strong> ${userPhone}</p>
        <p><strong>Property:</strong> ${propertyTitle}</p>
        <p><strong>Owner:</strong> ${ownerName} (${ownerEmail})</p>
      `;

      // Send email to owner and admin
      const recipientsArr = [ownerEmail, process.env.ADMIN_EMAIL].filter((v): v is string => typeof v === 'string' && v.length > 0);
      const recipients = recipientsArr.length === 1 ? recipientsArr[0] : recipientsArr;
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: recipients,
        subject: 'New Interest in Your Property',
        html: message,
      });

      res.status(200).json({ success: true });
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: errorMsg });
    }
  });

  // Image upload route (Sanity)
  app.post('/api/upload-image', upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const buffer = req.file.buffer;
      const fileName = req.file.originalname;
      try {
        const asset = await serverClient.assets.upload('image', buffer, { filename: fileName });
        return res.status(200).json({
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id }
        });
      } catch (sanityErr: any) {
        return res.status(500).json({ error: 'Sanity upload error', details: sanityErr?.message || sanityErr });
      }
    } catch (err: any) {
      return res.status(500).json({ error: 'Failed to upload image to Sanity', details: err?.message || err });
    }
  });

  // POST /api/interested: create interest in Sanity, prevent duplicates, store Clerk user info, send email
  app.post('/api/interested', async (req: Request, res: Response) => {
    try {
      const { userId, email, name, phone, propertyId } = req.body;
      if (!userId || !propertyId) {
        return res.status(400).json({ error: 'Missing userId or propertyId' });
      }

      // 1. Check if user exists in Sanity, create if not (use 'clerkId')
      const userQuery = `*[_type == "user" && clerkId == $userId][0]`;
      let sanityUser = await serverClient.fetch(userQuery, { userId });
      if (!sanityUser) {
        sanityUser = await serverClient.create({
          _type: 'user',
          clerkId: userId,
          name,
          email,
          phone,
        });
      }

      // 2. Prevent duplicate interest
      const interestQuery = `*[_type == "interest" && user._ref == $userId && property._ref == $propertyId][0]`;
      const alreadyInterested = await serverClient.fetch(interestQuery, { userId: sanityUser._id, propertyId });
      if (alreadyInterested) {
        return res.status(200).json({ success: false, message: 'Already interested' });
      }

      // 3. Create interest document in Sanity
      const interestDoc = await serverClient.create({
        _type: 'interest',
        user: { _type: 'reference', _ref: sanityUser._id },
        property: { _type: 'reference', _ref: propertyId },
        interestedAt: new Date().toISOString(),
        name,
        email,
        phone,
      });

      // 4. Send email notification
      try {
        const propertyQuery = `*[_type=='property' && _id==$id][0]{title,owner->{email,name}}`;
        const property = await serverClient.fetch(propertyQuery, { id: propertyId });
        
        if (!property) {
          console.error('Property not found for email notification:', propertyId);
          return res.status(200).json({ success: true, message: 'Interest recorded but property not found for notification' });
        }

        const ownerEmail = property?.owner?.email;
        const ownerName = property?.owner?.name || 'Property Owner';
        const propertyTitle = property?.title || 'Your Property';
        const adminEmail = 'housinglords@gmail.com';

        if (!ownerEmail && !adminEmail) {
          console.error('No recipient emails found for notification');
          return res.status(200).json({ success: true, message: 'Interest recorded but no email recipients found' });
        }

        const message = `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">New Interest in Property: ${propertyTitle}</h2>
            <div style="background-color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
              <p style="color: #666; line-height: 1.6;"><strong>User:</strong> ${name} (${email})</p>
              <p style="color: #666; line-height: 1.6;"><strong>Phone:</strong> ${phone}</p>
              <p style="color: #666; line-height: 1.6;"><strong>Property:</strong> ${propertyTitle}</p>
              <p style="color: #666; line-height: 1.6;"><strong>Owner:</strong> ${ownerName}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">This is an automated message from Housing Lord. Please do not reply to this email.</p>
          </div>
        `;

        const recipientsArr = [ownerEmail, adminEmail].filter((v): v is string => typeof v === 'string' && v.length > 0);
        const recipients = recipientsArr.length === 1 ? recipientsArr[0] : recipientsArr;

        const mailOptions = {
          from: '"Housing Lord" <housinglords@gmail.com>',
          to: recipients,
          subject: 'New Interest in Your Property',
          html: message,
        };

        console.log('Attempting to send email to:', recipients);
        try {
          await sendEmailWithRetry(mailOptions);
        } catch (emailError) {
          console.error('All attempts to send email failed:', emailError);
          // Log detailed error information
          if (emailError instanceof Error) {
            console.error('Email error details:', {
              message: emailError.message,
              stack: emailError.stack,
              name: emailError.name
            });
          }
        }

      } catch (emailError) {
        console.error('Failed to send email notification:', emailError);
        // Log detailed error information
        if (emailError instanceof Error) {
          console.error('Email error details:', {
            message: emailError.message,
            stack: emailError.stack,
            name: emailError.name
          });
        }
        // Don't fail the whole request if email fails
      }

      return res.status(200).json({ success: true });
    } catch (err) {
      console.error('Error in /api/interested:', err);
      const errorMsg = err instanceof Error ? err.message : String(err);
      res.status(500).json({ error: errorMsg });
    }
  });

  // Add new endpoint for property owner notification
  app.post('/api/notify-owner', async (req: Request, res: Response) => {
    try {
      const { email, subject, message } = req.body;
      
      if (!email) {
        return res.status(400).json({ error: 'Email is required' });
      }

      console.log('Preparing to send notification to owner:', email);
      
      const mailOptions = {
        from: '"Housing Lord" <housinglords@gmail.com>',
        to: email,
        subject: subject || 'Property Update',
        text: message,
        html: `<div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 8px;">
          <div style="background-color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
            <p style="color: #666; line-height: 1.6;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
          <p style="color: #999; font-size: 12px; text-align: center;">This is an automated message from Housing Lord. Please do not reply to this email.</p>
        </div>`
      };

      const info = await sendEmailWithRetry(mailOptions);
      console.log('Owner notification email sent successfully:', info.messageId);
      
      return res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error('Failed to send owner notification:', error);
      return res.status(500).json({ error: 'Failed to send notification' });
    }
  });

  return createServer(app);
}

const router = express.Router();

// Add your Clerk and Sanity credentials here
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY||"pk_test_YWNjdXJhdGUtY29icmEtNTkuY2xlcmsuYWNjb3VudHMuZGV2JA";
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID ||"ogyoe0hr";
const SANITY_DATASET = process.env.SANITY_DATASET ||"production";
const SANITY_TOKEN = process.env.SANITY_TOKEN ||"skUUE01jpqseamiAtoni326efjYmv89AooBbHOHluCgqjd4sfC5fmpnDkOhdt3wlykRMLVvC0vnn6eEuSGDbDOhPNzTxKrrfwH3LZPdUIHL1vILkYiRcv8fugzWNjaoD38LDM6mLnO88pbHEhl1AqtrgyZEV5rvHBK0vZoJ5EhLODean9KE6" ;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ||"housinglords@gmail.com";

router.post('/api/notify-interest', async (req, res) => {
  const { propertyId, userId } = req.body;
  try {
    // Fetch user data from Clerk
    const userRes = await fetch(`https://api.clerk.dev/v1/users/${userId}`, {
      headers: { Authorization: `Bearer ${CLERK_SECRET_KEY}` },
    });
    const userRaw = await userRes.json();
    const user = typeof userRaw === 'object' && userRaw !== null ? userRaw : {};
    const userFirstName = 'first_name' in user ? user.first_name : '';
    const userLastName = 'last_name' in user ? user.last_name : '';
    const userEmail = 'email_address' in user ? user.email_address : '';
    let userPhone = 'N/A';
    if ('phone_numbers' in user && Array.isArray((user as any).phone_numbers) && (user as any).phone_numbers[0] && typeof (user as any).phone_numbers[0].phone_number === 'string') {
      userPhone = (user as any).phone_numbers[0].phone_number;
    }

    // Fetch property data from Sanity
    const query = `*[_type=='property' && _id==$id][0]{title,owner->{email,name}}`;
    const sanityRes = await fetch(
      `https://${SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${SANITY_DATASET}?query=${encodeURIComponent(query)}&$id=${propertyId}`,
      {
        headers: { Authorization: `Bearer ${SANITY_TOKEN}` },
        method: 'POST',
        body: JSON.stringify({ params: { id: propertyId } }),
      }
    );
    const sanityDataRaw = await sanityRes.json();
    const sanityData = typeof sanityDataRaw === 'object' && sanityDataRaw !== null ? sanityDataRaw : {};
    const property = 'result' in sanityData && typeof sanityData.result === 'object' && sanityData.result !== null ? sanityData.result : {};
    const propertyTitle = 'title' in property ? property.title : '';
    const owner = 'owner' in property && typeof property.owner === 'object' && property.owner !== null ? property.owner : {};
    const ownerName = 'name' in owner ? owner.name : '';
    const ownerEmail = 'email' in owner ? owner.email : '';

    // Compose email
    const message = `
      <h2>New Interest in Property: ${propertyTitle}</h2>
      <p><strong>User:</strong> ${userFirstName} ${userLastName} (${userEmail})</p>
      <p><strong>Phone:</strong> ${userPhone}</p>
      <p><strong>Property:</strong> ${propertyTitle}</p>
      <p><strong>Owner:</strong> ${ownerName} (${ownerEmail})</p>
    `;

    // Send email to owner and admin
    const recipientsArr = [ownerEmail, ADMIN_EMAIL].filter((v): v is string => typeof v === 'string' && v.length > 0);
    const recipients = recipientsArr.length === 1 ? recipientsArr[0] : recipientsArr;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: recipients,
      subject: 'New Interest in Your Property',
      html: message,
    });

    res.status(200).json({ success: true });
  } catch (err) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    res.status(500).json({ error: errorMsg });
  }
});

export default router;
