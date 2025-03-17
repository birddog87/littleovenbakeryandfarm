// src/utils/orderUtils.ts

export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  discountThreshold?: number;  // e.g. 2 means "2 for some discount price"
  discountPrice?: number;      // e.g. $8 for 2 loaves
}

// Example new prices + descriptions. Adjust as needed.
export const initialItems: OrderItem[] = [
  {
    id: 1,
    name: 'Farm Fresh Eggs',
    price: 7,
    quantity: 0,
    description: 'Dozen free-range eggs. (Deal: 3 dozen for $18, or 30 eggs for $15 flat.)',
    // optional discount logic if you want e.g. 3 for $18
    // discountThreshold: 3,
    // discountPrice: 18,
  },
  {
    id: 2,
    name: 'Crunchy Round Loaf',
    price: 10,
    quantity: 0,
    description: 'Rustic artisanal loaf. Crisp crust, soft inside.',
    discountThreshold: 2,     // e.g. "2 for $18"
    discountPrice: 18,
  },
  {
    id: 3,
    name: 'Sandwich Bread',
    price: 5,
    quantity: 0,
    description: 'Soft loaf perfect for sandwiches. 2 for $8 discount applies at quantity >= 2.',
    discountThreshold: 2,
    discountPrice: 8,
  },
  {
    id: 4,
    name: 'French Bread',
    price: 5,
    quantity: 0,
    description: 'Classic baguette style. 2 for $8 discount applies at quantity >= 2.',
    discountThreshold: 2,
    discountPrice: 8,
  },
];

/**
 * Calculates the subtotal, applying discounts when quantity >= discountThreshold.
 * If discountThreshold is met, we'll apply discountPrice per threshold group,
 * and regular price for any remainder. 
 * E.g. if discountThreshold=2, discountPrice=8, and user orders 3, 
 * that's "2 for $8" + 1 leftover at normal price 5 => total 13 for that item.
 */
export function calculateSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => {
    // If item qualifies for discount
    if (item.discountThreshold && item.quantity >= item.discountThreshold && item.discountPrice) {
      const groups = Math.floor(item.quantity / item.discountThreshold);
      const remainder = item.quantity % item.discountThreshold;

      const discountedTotal = groups * item.discountPrice;
      const remainderTotal = remainder * item.price;

      return sum + discountedTotal + remainderTotal;
    }

    // No discount
    return sum + item.price * item.quantity;
  }, 0);
}
