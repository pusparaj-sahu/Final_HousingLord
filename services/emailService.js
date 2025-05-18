import nodemailer from 'nodemailer';

// Create a transporter using environment variables
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

/**
 * Send property approval notification email to property owner
 * @param {string} recipientEmail - Owner's email address
 * @param {Object} data - Data for email template
 */
const sendApprovalEmail = async (recipientEmail, data) => {
  const { propertyTitle, ownerName, approvalDate, dashboardLink } = data;
  
  const mailOptions = {
    from: `"Housing Lord" <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    subject: `Your Property "${propertyTitle}" Has Been Approved!`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #ffc107;">Housing Lord</h1>
        </div>
        
        <p>Hello ${ownerName},</p>
        
        <p>Great news! Your property <strong>"${propertyTitle}"</strong> has been reviewed and approved by our team on ${approvalDate}.</p>
        
        <p>Your property is now visible to potential tenants and will be included in our search results.</p>
        
        <div style="margin: 30px 0; text-align: center;">
          <a href="${dashboardLink}" style="background-color: #ffc107; color: #000; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">View in Dashboard</a>
        </div>
        
        <p>If you have any questions or need to make changes to your listing, please log in to your dashboard or contact our support team.</p>
        
        <p>Thank you for choosing Housing Lord for your property listing needs!</p>
        
        <p>Best regards,<br>The Housing Lord Team</p>
      </div>
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

export default sendApprovalEmail;
