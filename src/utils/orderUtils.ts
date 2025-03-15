export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export const initialItems: OrderItem[] = [
  { id: 1, name: 'Farm Fresh Eggs (Carton)', quantity: 0, price: 5 },
  { id: 2, name: 'Crunchy Round Loaf', quantity: 0, price: 10 },
  { id: 3, name: 'Sandwich Bread', quantity: 0, price: 5 },
  { id: 4, name: 'French Bread', quantity: 0, price: 5 },
];

export function calculateSubtotal(items: OrderItem[]): number {
  let subtotal = 0;
  
  // Calculate individual item prices with bulk discounts
  items.forEach(item => {
    if (item.quantity === 0) return;
    
    if (item.id === 2 && item.quantity >= 2) { // Crunchy Round Loaf
      const pairsCount = Math.floor(item.quantity / 2);
      const singleCount = item.quantity % 2;
      subtotal += (pairsCount * 18) + (singleCount * 10);
    } else if ((item.id === 3 || item.id === 4) && item.quantity >= 2) { // Sandwich or French Bread
      const pairsCount = Math.floor(item.quantity / 2);
      const singleCount = item.quantity % 2;
      subtotal += (pairsCount * 8) + (singleCount * 5);
    } else {
      subtotal += item.quantity * item.price;
    }
  });
  
  return subtotal;
}
