import 'dotenv/config';
import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import multer from 'multer';
import { serverClient } from '../client/src/lib/sanityApi'; // Adjust path if needed
import { transporter } from '../services/emailService';

const upload = multer({ storage: multer.memoryStorage() });

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

  // User Routes
  app.post('/api/auth/register', async (req: Request, res: Response) => {
    try {
      // TODO: Add validation for req.body if needed
      const userData = req.body;
      const existingUser = await storage.getUserByUsername(userData.username);
      
      if (existingUser) {
        return res.status(400).json({ error: 'Username already exists' });
      }
      
      const newUser = await storage.createUser(userData);
      const { password, ...userWithoutPassword } = newUser;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
      }
      
      const user = await storage.getUserByUsername(username);
      
      if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }
      
      // Don't return the password in the response
      const { password: _, ...userWithoutPassword } = user;
      
      // In a real app, you would set up sessions or JWT here
      return res.status(200).json(userWithoutPassword);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Property Routes
  app.get('/api/properties', async (req: Request, res: Response) => {
    try {
      const filters = {
        type: req.query.type as string | undefined,
        minPrice: req.query.minPrice ? Number(req.query.minPrice) : undefined,
        maxPrice: req.query.maxPrice ? Number(req.query.maxPrice) : undefined,
        bedrooms: req.query.bedrooms ? Number(req.query.bedrooms) : undefined,
        bathrooms: req.query.bathrooms ? Number(req.query.bathrooms) : undefined,
        city: req.query.city as string | undefined,
        state: req.query.state as string | undefined,
        isAvailable: req.query.isAvailable !== undefined 
          ? req.query.isAvailable === 'true' 
          : undefined
      };
      
      const properties = await storage.getAllProperties(filters);
      return res.status(200).json(properties);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/api/properties/:id', async (req: Request, res: Response) => {
    try {
      const propertyId = Number(req.params.id);
      const property = await storage.getProperty(propertyId);
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      return res.status(200).json(property);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/properties', async (req: Request, res: Response) => {
    try {
      // TODO: Add validation for req.body if needed
      const propertyData = req.body;
      const newProperty = await storage.createProperty(propertyData);
      return res.status(201).json(newProperty);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.patch('/api/properties/:id', async (req: Request, res: Response) => {
    try {
      const propertyId = Number(req.params.id);
      const propertyData = req.body;
      
      const property = await storage.getProperty(propertyId);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      const updatedProperty = await storage.updateProperty(propertyId, propertyData);
      return res.status(200).json(updatedProperty);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/api/properties/:id', async (req: Request, res: Response) => {
    try {
      const propertyId = Number(req.params.id);
      const property = await storage.getProperty(propertyId);
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      const deleted = await storage.deleteProperty(propertyId);
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(500).json({ error: 'Failed to delete property' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
    
  // Property Images Routes
  app.get('/api/properties/:id/images', async (req: Request, res: Response) => {
    try {
      const propertyId = Number(req.params.id);
      const property = await storage.getProperty(propertyId);
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      const images = await storage.getPropertyImages(propertyId);
      return res.status(200).json(images);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/properties/:id/images', async (req: Request, res: Response) => {
    try {
      const propertyId = Number(req.params.id);
      const property = await storage.getProperty(propertyId);
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      // TODO: Add validation for req.body if needed
      const imageData = {
        ...req.body,
        propertyId
      };
      
      const newImage = await storage.addPropertyImage(imageData);
      return res.status(201).json(newImage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.delete('/api/property-images/:id', async (req: Request, res: Response) => {
    try {
      const imageId = Number(req.params.id);
      const deleted = await storage.deletePropertyImage(imageId);
      
      if (deleted) {
        return res.status(204).send();
      } else {
        return res.status(404).json({ error: 'Image not found' });
      }
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Favorites Routes
  app.get('/api/users/:id/favorites', async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const favorites = await storage.getUserFavorites(userId);
      return res.status(200).json(favorites);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/favorites/toggle', async (req: Request, res: Response) => {
    try {
      // TODO: Add validation for req.body if needed
      const favoriteData = req.body;
      const result = await storage.toggleFavorite(favoriteData);
      
      // If result is undefined, it means the favorite was removed
      return res.status(200).json({ 
        isFavorite: !!result,
        favorite: result 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/api/favorites/check', async (req: Request, res: Response) => {
    try {
      const userId = Number(req.query.userId);
      const propertyId = Number(req.query.propertyId);
      
      if (!userId || !propertyId) {
        return res.status(400).json({ error: 'User ID and Property ID are required' });
      }
      
      const isFavorite = await storage.isFavorite(userId, propertyId);
      return res.status(200).json({ isFavorite });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Inquiry Routes
  app.get('/api/properties/:id/inquiries', async (req: Request, res: Response) => {
    try {
      const propertyId = Number(req.params.id);
      const property = await storage.getProperty(propertyId);
      
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      const inquiries = await storage.getInquiriesByProperty(propertyId);
      return res.status(200).json(inquiries);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.get('/api/users/:id/inquiries', async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const inquiries = await storage.getInquiriesByUser(userId);
      return res.status(200).json(inquiries);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    try {
      // TODO: Add validation for req.body if needed
      const inquiryData = req.body;
      
      // Check if property exists
      const property = await storage.getProperty(inquiryData.propertyId);
      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }
      
      // Check if user exists
      const user = await storage.getUser(inquiryData.userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      
      const newInquiry = await storage.createInquiry(inquiryData);
      return res.status(201).json(newInquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      return res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  app.patch('/api/inquiries/:id/status', async (req: Request, res: Response) => {
    try {
      const inquiryId = Number(req.params.id);
      const { status } = req.body;
      
      if (!status) {
        return res.status(400).json({ error: 'Status is required' });
      }
      
      if (!['pending', 'replied', 'closed'].includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
      }
      
      const updatedInquiry = await storage.updateInquiryStatus(inquiryId, status);
      
      if (!updatedInquiry) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }
      
      return res.status(200).json(updatedInquiry);
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

  // Property approval route
  app.patch('/api/properties/:id/approve', async (req: Request, res: Response) => {
    try {
      const propertyId = req.params.id;
      const property = await serverClient.fetch(`*[_type == "property" && _id == $id][0]{
        _id,
        title,
        "ownerEmail": owner->email,
        "ownerName": owner->name
      }`, { id: propertyId });

      if (!property) {
        return res.status(404).json({ error: 'Property not found' });
      }

      // Update property status
      await serverClient.patch(propertyId).set({ approved: true }).commit();

      // Send approval email
      if (property.ownerEmail) {
        await sendEmail(property.ownerEmail, {
          subject: "Your Property Has Been Approved",
          text: `Dear ${property.ownerName || 'Property Owner'},\n\nYour property "${property.title}" has been approved.\n\nThank you,\nHousing Lord Team`,
          html: `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 8px;">
              <h2 style="color: #333; margin-bottom: 20px;">Property Approved</h2>
              <div style="background-color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
                <p style="color: #666; line-height: 1.6;">Dear ${property.ownerName || 'Property Owner'},</p>
                <p style="color: #666; line-height: 1.6;">Your property "${property.title}" has been approved.</p>
              </div>
              <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
              <p style="color: #999; font-size: 12px; text-align: center;">
                This is an automated message from Housing Lord. Please do not reply to this email.
              </p>
            </div>
          `
        });
      }

      return res.status(200).json({ message: 'Property approved successfully' });
    } catch (error) {
      console.error('Property approval error:', error);
      return res.status(500).json({ error: 'Failed to approve property' });
    }
  });

  // Email notification route
  app.post('/api/notify-owner', async (req: Request, res: Response) => {
    const { email, subject, message } = req.body;
    if (!email || !subject || !message) {
      return res.status(400).json({ error: 'Missing email, subject, or message' });
    }

    try {
      const info = await transporter.sendMail({
        from: '"Housing Lord" <housinglords@gmail.com>',
        to: email,
        subject: subject,
        text: message,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto; background-color: #f9f9f9; border-radius: 8px;">
            <h2 style="color: #333; margin-bottom: 20px;">${subject}</h2>
            <div style="background-color: white; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
              <p style="color: #666; line-height: 1.6;">${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              This is an automated message from Housing Lord. Please do not reply to this email.
            </p>
          </div>
        `
      });

      console.log('Email sent successfully:', info.messageId);
      return res.status(200).json({ success: true, messageId: info.messageId });
    } catch (error) {
      console.error('Failed to send email:', error);
      return res.status(500).json({ 
        error: 'Failed to send email', 
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  });

  app.post('/api/upload-image', upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }
      console.log('File received:', req.file.originalname, req.file.mimetype, req.file.size);
      const buffer = req.file.buffer;
      const fileName = req.file.originalname;
      console.log('Buffer length:', buffer.length);
      try {
        const asset = await serverClient.assets.upload('image', buffer, { filename: fileName });
        console.log('Sanity asset upload success:', asset);
        return res.status(200).json({
          _type: 'image',
          asset: { _type: 'reference', _ref: asset._id }
        });
      } catch (sanityErr: any) {
        console.error('Sanity upload error:', sanityErr?.message || sanityErr);
        return res.status(500).json({ error: 'Sanity upload error', details: sanityErr?.message || sanityErr });
      }
    } catch (err: any) {
      console.error('Upload route error:', err);
      return res.status(500).json({ error: 'Failed to upload image to Sanity', details: err?.message || err });
    }
  });

  return createServer(app);
}

// Helper function for sending emails
async function sendEmail(to: string, options: { subject: string, text: string, html: string }) {
  return transporter.sendMail({
    from: '"Housing Lord" <housinglords@gmail.com>',
    to,
    subject: options.subject,
    text: options.text,
    html: options.html
  });
}
