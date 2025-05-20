import nodemailer, { Transporter } from 'nodemailer';
import 'dotenv/config';

interface ApprovalEmailData {
  propertyTitle: string;
  ownerName: string;
  approvalDate: string;
  dashboardLink: string;
}

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'housinglords@gmail.com',
    pass: 'bzgtfwsdxucemgvx'
  }
});

transporter.verify((error, success) => {
  if (error) {
    console.error('SMTP connection error:', error);
  } else {
    console.log('SMTP server is ready to take our messages');
  }
});

const sendApprovalEmail = async (recipientEmail: string, data: ApprovalEmailData): Promise<boolean> => {
  const { propertyTitle, ownerName, approvalDate, dashboardLink } = data;
  console.log('Sending email to:', recipientEmail);
  
  const mailOptions = {
    from: '"Housing Lord" <housinglords@gmail.com>',
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

export { transporter };
export default sendApprovalEmail; 