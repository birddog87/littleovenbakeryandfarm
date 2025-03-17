import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { google } from 'googleapis';

// Set SendGrid API key
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Google Sheets setup
const sheets = google.sheets('v4');
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
if (!SPREADSHEET_ID) {
  throw new Error('GOOGLE_SHEET_ID environment variable is not set');
}
const SHEET_NAME = 'Orders';

// Auth for Google Sheets - service account
if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
}
const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
  try {
    const { name, email, phone, items, comments, deliveryOption, address } = req.body;
    
    // Format order items for email
    const itemDetails = items
      .filter(item => item.quantity > 0)
      .map(item => `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`)
      .join('<br>');
    
    const subtotal = items
      .filter(item => item.quantity > 0)
      .reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Send email
    const msg = {
      to: 'brookehammond717@gmail.com', // Your bakery email
      from: 'sales@littleovenfarm.com', // Verified sender email
      subject: `New Order from ${name}`,
      html: `
        <h2>New Order from The Little Oven Website</h2>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${email ? `Email: ${email}` : ''} ${phone ? `Phone: ${phone}` : ''}</p>
        <p><strong>${deliveryOption === 'pickup' ? 'Pickup' : 'Delivery to'}:</strong> ${deliveryOption === 'delivery' ? address : 'Store pickup'}</p>
        
        <h3>Order Items:</h3>
        ${itemDetails}
        <p><strong>Total:</strong> $${subtotal.toFixed(2)}</p>
        
        ${comments ? `<h3>Special Instructions:</h3><p>${comments}</p>` : ''}
      `,
    };
    
    await sgMail.send(msg);
    
    // Add to Google Sheet
    const authClient = await auth.getClient();
    
    // Format date
    const orderDate = new Date().toLocaleString();
    
    // Prepare row data
    const rowData = [
      orderDate,
      name,
      email || 'Not provided',
      phone || 'Not provided',
      deliveryOption === 'pickup' ? 'Pickup' : 'Delivery',
      deliveryOption === 'delivery' ? address : 'N/A',
      items.filter(item => item.quantity > 0).map(item => `${item.quantity}x ${item.name}`).join(', '),
      `$${subtotal.toFixed(2)}`,
      comments || 'None'
    ];
    
    // Append to sheet
    await sheets.spreadsheets.values.append({
      auth: authClient,
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A:I`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    });
    
    return res.status(200).json({ 
      success: true, 
      message: 'Order received! We will contact you soon.' 
    });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing your order. Please try again.' 
    });
  }
}