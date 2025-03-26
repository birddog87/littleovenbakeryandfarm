import type { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';
import { google } from 'googleapis';

// Set SendGrid API key
if (!process.env.SENDGRID_API_KEY) {
  throw new Error('SENDGRID_API_KEY environment variable is not set');
}
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Google Sheets setup
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
if (!SPREADSHEET_ID) {
  throw new Error('GOOGLE_SHEET_ID environment variable is not set');
}
const ORDERS_SHEET = 'Orders'; // main orders sheet
const STATUS_RANGE = 'OrderingStatus!A1'; // cell where ordering status is stored

// Auth for Google Sheets - service account
if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
}
const googleAuth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

// Define types for your items and request body
interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface RequestBody {
  name: string;
  email: string;
  phone: string;
  items: OrderItem[];
  comments?: string;
  deliveryOption: 'pickup' | 'delivery';
  address?: string;
}

type Data = {
  success: boolean;
  message: string;
};

/**
 * Checks the ordering status from the Google Sheet.
 * Your sister can update the cell OrderingStatus!A1 in the sheet to "Enabled" or "Disabled".
 */
async function isOrderingEnabled(authClient: any): Promise<boolean> {
  const sheets = google.sheets({ version: 'v4', auth: authClient });
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: STATUS_RANGE,
    });
    const status = res.data.values?.[0]?.[0];
    return status && status.toLowerCase() === 'enabled';
  } catch (error) {
    console.error('Error reading ordering status:', error);
    // If an error occurs, default to disabled to be safe.
    return false;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, items, comments, deliveryOption, address } = req.body as RequestBody;

    // Get auth client and check if ordering is enabled
    const authClient = await googleAuth.getClient();
    const orderingEnabled = await isOrderingEnabled(authClient);
    if (!orderingEnabled) {
      return res.status(503).json({
        success: false,
        message: 'Ordering is temporarily paused. Please try again later.',
      });
    }

    // Format order items for email
    const itemDetails = items
      .filter((item) => item.quantity > 0)
      .map(
        (item) =>
          `${item.quantity} x ${item.name} - $${(item.price * item.quantity).toFixed(2)}`
      )
      .join('<br>');

    const subtotal = items
      .filter((item) => item.quantity > 0)
      .reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Beautiful HTML email template
    const msg = {
      to: 'brookehammond717@gmail.com', // Bakery email
      bcc: 'blender7@gmail.com',
      from: 'sales@littleovenfarm.com',  // Verified sender email
      subject: `New Order from ${name}`,
      html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>New Order Notification</title>
    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 20px;
      }
      .container {
        background-color: #ffffff;
        margin: auto;
        padding: 20px;
        max-width: 600px;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #e4e4e4;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        color: #333333;
      }
      .order-details {
        margin-top: 20px;
      }
      .order-details h2 {
        font-size: 20px;
        color: #333333;
      }
      .order-details p {
        font-size: 16px;
        color: #555555;
        line-height: 1.5;
      }
      .footer {
        text-align: center;
        font-size: 14px;
        color: #999999;
        margin-top: 30px;
      }
      .btn {
        display: inline-block;
        padding: 10px 20px;
        background-color: #4CAF50;
        color: #ffffff !important;
        text-decoration: none;
        border-radius: 4px;
        margin-top: 20px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>The Little Oven Bakery and Farm</h1>
      </div>
      <div class="order-details">
        <h2>New Order Received</h2>
        <p><strong>Customer:</strong> ${name}</p>
        <p><strong>Contact:</strong> ${email ? email : ''} ${phone ? phone : ''}</p>
        <p><strong>${deliveryOption === 'pickup' ? 'Pickup' : 'Delivery'}:</strong> ${deliveryOption === 'delivery' ? address : 'Store Pickup'}</p>
        <p><strong>Order Items:</strong><br>${itemDetails}</p>
        <p><strong>Total:</strong> $${subtotal.toFixed(2)}</p>
        ${comments ? `<p><strong>Special Instructions:</strong> ${comments}</p>` : ''}
      </div>
      <div class="footer">
        <p>Order placed on ${new Date().toLocaleString('en-US', { 
          timeZone: 'America/Toronto',
          year: 'numeric', 
          month: 'numeric', 
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })}.</p>
        <p>Thank you for choosing The Little Oven Bakery and Farm!</p>
      </div>
    </div>
  </body>
</html>
`
    };

    // Send email
    await sgMail.send(msg);

    // Only send confirmation email if customer provided an email
if (email) {
  const confirmationEmail = {
    to: email, // Customer email
    from: 'sales@littleovenfarm.com', // Your verified sender
    subject: 'Your Order Confirmation - The Little Oven Bakery and Farm',
    html: `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Order Confirmation</title>
    <style>
      body {
        font-family: Helvetica, Arial, sans-serif;
        line-height: 1.6;
        background-color: #f9f5eb;
        margin: 0;
        padding: 20px;
      }
      .container {
        background-color: #ffffff;
        margin: auto;
        padding: 30px;
        max-width: 600px;
        border-radius: 8px;
        box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
      }
      .header {
        text-align: center;
        padding-bottom: 20px;
        border-bottom: 2px solid #f3e9d2;
        margin-bottom: 30px;
      }
      .header h1 {
        margin: 0;
        font-size: 28px;
        color: #a88131;
      }
      .header p {
        color: #666;
        margin-top: 8px;
      }
      .thank-you {
        background-color: #f7f3eb;
        padding: 15px;
        border-radius: 6px;
        margin-bottom: 25px;
        border-left: 4px solid #a88131;
      }
      .thank-you h2 {
        margin-top: 0;
        color: #874900;
      }
      .order-details {
        margin-top: 25px;
      }
      .order-details h3 {
        font-size: 18px;
        color: #874900;
        border-bottom: 1px solid #f3e9d2;
        padding-bottom: 8px;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin-bottom: 20px;
      }
      th {
        background-color: #f7f3eb;
        text-align: left;
        padding: 10px;
        color: #874900;
      }
      td {
        padding: 10px;
        border-bottom: 1px solid #f3e9d2;
      }
      .item-total {
        text-align: right;
      }
      .order-total {
        background-color: #f7f3eb;
        font-weight: bold;
      }
      .info-section {
        margin-top: 30px;
        background-color: #f7f3eb;
        padding: 15px;
        border-radius: 6px;
      }
      .info-section h3 {
        margin-top: 0;
        color: #874900;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        color: #666;
        font-size: 14px;
        border-top: 1px solid #f3e9d2;
        padding-top: 20px;
      }
      .social-icons {
        margin-top: 15px;
      }
      .social-icons a {
        display: inline-block;
        margin: 0 8px;
        color: #a88131;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>The Little Oven Bakery and Farm</h1>
        <p>Artisanal bread and farm-fresh eggs from our family to yours</p>
      </div>
      
      <div class="thank-you">
        <h2>Thank You for Your Order, ${name}!</h2>
        <p>We've received your order and are preparing it with care. We'll contact you soon to confirm details.</p>
      </div>
      
      <div class="order-details">
        <h3>Order Summary</h3>
        <table>
          <tr>
            <th>Item</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
          ${items
            .filter((item) => item.quantity > 0)
            .map(
              (item) => `
            <tr>
              <td>${item.name}</td>
              <td>${item.quantity}</td>
              <td class="item-total">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `
            )
            .join('')}
          <tr class="order-total">
            <td colspan="2">Total</td>
            <td class="item-total">$${subtotal.toFixed(2)}</td>
          </tr>
        </table>
      </div>
      
      <div class="info-section">
        <h3>${deliveryOption === 'pickup' ? 'Pickup Information' : 'Delivery Information'}</h3>
        ${
          deliveryOption === 'pickup'
            ? `
          <p><strong>Address:</strong> 107 Concession 17 Walpole, Wilsonville, Ontario N0E 1H0</p>
          <p><strong>Pickup hours:</strong> Saturday & Sunday, 9AM - 5PM</p>
          <p>We'll contact you to arrange a specific pickup time.</p>
        `
            : `
          <p><strong>Delivery address:</strong> ${address}</p>
          <p>We'll contact you to confirm delivery details.</p>
        `
        }
        ${
          comments
            ? `
          <h3>Special Instructions</h3>
          <p>${comments}</p>
        `
            : ''
        }
      </div>
      
      <div class="footer">
        <p>If you have any questions, please contact us at:</p>
        <p>Phone: (905) 745-5730 | Email: sales@littleovenfarm.com</p>
        <p>107 Concession 17 Walpole, Wilsonville, Ontario N0E 1H0</p>
        <div class="social-icons">
          <a href="https://www.instagram.com/thelittleovenfarm">Follow us on Instagram</a>
        </div>
        <p>&copy; ${new Date().getFullYear()} The Little Oven Bakery and Farm. All rights reserved.</p>
      </div>
    </div>
  </body>
</html>
    `
  };

  // Send confirmation email to customer
  await sgMail.send(confirmationEmail);
}

    // Write order to Google Sheets
    const sheets = google.sheets('v4');
    const orderDate = new Date().toLocaleString('en-US', { 
      timeZone: 'America/Toronto',
      year: 'numeric', 
      month: 'numeric', 
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });
    const rowData = [
      orderDate,
      name,
      email || 'Not provided',
      phone || 'Not provided',
      deliveryOption === 'pickup' ? 'Pickup' : 'Delivery',
      deliveryOption === 'delivery' ? address : 'N/A',
      items
        .filter((item) => item.quantity > 0)
        .map((item) => `${item.quantity}x ${item.name}`)
        .join(', '),
      `$${subtotal.toFixed(2)}`,
      comments || 'None'
    ];
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${ORDERS_SHEET}!A:I`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      },
      auth: authClient as any
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
