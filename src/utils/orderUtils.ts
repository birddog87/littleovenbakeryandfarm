export interface OrderItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  discountThreshold?: number;  // Quantity at which a discount applies
  discountPrice?: number;      // Total price for each group of discountThreshold items
  disabled?: boolean;          // If the item is not available for ordering (e.g., coming soon)
}

export const initialItems: OrderItem[] = [
  {
    id: 1,
    name: 'Farm Fresh Eggs (Carton)',
    price: 7,
    quantity: 0,
    description: 'Dozen free-range eggs. (Deal: 3 cartons for $18.)',
    discountThreshold: 3,
    discountPrice: 18,
  },
  {
    id: 2,
    name: 'Farm Fresh Eggs (Flat 30)',
    price: 15,
    quantity: 0,
    description: '30 eggs flat at a fixed price of $15.',
  },
  {
    id: 3,
    name: 'Crunchy Round Loaf',
    price: 6,
    quantity: 0,
    description: 'Rustic artisanal loaf. (Deal: 2 for $10.)',
    discountThreshold: 2,
    discountPrice: 10,
  },
  {
    id: 4,
    name: 'Sandwich Bread',
    price: 7,
    quantity: 0,
    description: 'Soft loaf perfect for sandwiches. (Deal: 2 for $12.)',
    discountThreshold: 2,
    discountPrice: 12,
  },
  {
    id: 5,
    name: 'French Bread',
    price: 7,
    quantity: 0,
    description: 'Classic baguette style. (Deal: 2 for $12.)',
    discountThreshold: 2,
    discountPrice: 12,
  },
  {
    id: 6,
    name: 'Sourdough Bread (Coming Soon)',
    price: 0,
    quantity: 0,
    description: 'Tangy, slow-fermented bread. Available soon!',
    disabled: true,
  },
  // New hamburger buns item:
  {
    id: 7,
    name: 'Hamburger Buns',
    price: 0.75, // $0.75 per bun so that 8 buns cost $6 (8 x 0.75 = $6)
    quantity: 0,
    description: 'Pillow soft hamburger buns with a lovely egg wash finish. Perfect for pairing with your favorite grilled burger.',
    discountThreshold: 16, // Deal applies when ordering 16 buns or more
    discountPrice: 10,     // 16 buns for $10 under the deal
  },
];

/**
 * Calculates the subtotal for the order, applying discounts when the quantity
 * meets or exceeds the discount threshold. For example, if discountThreshold=2 and 
 * discountPrice=8, then ordering 3 items would cost "2 for $8" plus 1 at full price.
 */
export function calculateSubtotal(items: OrderItem[]): number {
  return items.reduce((sum, item) => {
    if (
      item.discountThreshold &&
      item.quantity >= item.discountThreshold &&
      item.discountPrice !== undefined
    ) {
      const groups = Math.floor(item.quantity / item.discountThreshold);
      const remainder = item.quantity % item.discountThreshold;
      const discountedTotal = groups * item.discountPrice;
      const remainderTotal = remainder * item.price;
      return sum + discountedTotal + remainderTotal;
    }
    return sum + item.price * item.quantity;
  }, 0);
}
