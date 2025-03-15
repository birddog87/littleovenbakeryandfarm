import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const { name, email, phone, items, comments, deliveryOption, address } = req.body;
    
    // Here you would typically send an email with the order details
    // For now, we'll just log the data and return a success message
    console.log('Order received:', {
      name,
      email,
      phone,
      items,
      comments,
      deliveryOption,
      address
    });
    
    // In a real implementation, you would use a service like nodemailer, SendGrid, etc.
    // to send an email to the bakery owner
    
    return res.status(200).json({ success: true, message: 'Order received! We will contact you soon.' });
  } catch (error) {
    console.error('Error processing order:', error);
    return res.status(500).json({ success: false, message: 'Error processing your order. Please try again.' });
  }
}
