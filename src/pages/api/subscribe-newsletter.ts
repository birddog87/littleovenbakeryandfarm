// src/pages/api/subscribe-newsletter.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import { toZonedTime, format } from 'date-fns-tz';

// Google Sheets setup
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
if (!SPREADSHEET_ID) {
  throw new Error('GOOGLE_SHEET_ID environment variable is not set');
}
const SUBSCRIBERS_SHEET = 'SubscribedEmailUsers';

// Auth for Google Sheets - service account
if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
  throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY environment variable is not set');
}
const googleAuth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

type Data = {
  success: boolean;
  message: string;
};

// Helper function to get a formatted local timestamp in America/Toronto
const getLocalTimestamp = (): string => {
  const now = new Date();
  const timeZone = 'America/Toronto';
  const zonedDate = toZonedTime(now, timeZone);
  // Format example: "3/25/2025, 10:56 PM"
  return format(zonedDate, 'M/d/yyyy, h:mm a', { timeZone });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { email } = req.body;

    // Basic validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address',
      });
    }

    // Get auth client
    const authClient = await googleAuth.getClient();
    
    // Write email to Google Sheets with local timestamp
    const sheets = google.sheets('v4');
    const subscriptionDate = getLocalTimestamp();
    const rowData = [email, subscriptionDate];
    
    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SUBSCRIBERS_SHEET}!A:B`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      },
      auth: authClient as any
    });

    return res.status(200).json({
      success: true,
      message: 'Thank you for subscribing to our newsletter!'
    });
  } catch (error) {
    console.error('Error processing subscription:', error);
    return res.status(500).json({
      success: false,
      message: 'Error processing your subscription. Please try again.'
    });
  }
}
