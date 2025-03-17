export interface OrderItem {
  id: number;
  name: string;
  quantity: number;
  price: number;
}

export const initialItems: OrderItem[] = [
  { id: 1, name: 'Farm Fresh Eggs (Dozen)', quantity: 0, price: 7 },
  { id: 2, name: 'Crunchy Round Loaf', quantity: 0, price: 10 },
  { id: 3, name: 'Sandwich Bread', quantity: 0, price: 5 },
  { id: 4, name: 'French Bread', quantity: 0, price: 5 },
];

// In orderUtils.ts, update the calculateSubtotal function:
export function calculateSubtotal(items: OrderItem[]): number {
  let subtotal = 0;
  
  // Calculate individual item prices with bulk discounts
  items.forEach(item => {
    if (item.quantity === 0) return;
    
    if (item.id === 1) { // Farm Fresh Eggs
      if (item.quantity >= 30) { // Full flat
        const flatsCount = Math.floor(item.quantity / 30);
        const remainingDozens = Math.floor((item.quantity % 30) / 12);
        const singleEggs = item.quantity % 12;
        
        subtotal += (flatsCount * 15); // $15 per flat
        
        if (remainingDozens >= 3) {
          const threePacks = Math.floor(remainingDozens / 3);
          const singleDozens = remainingDozens % 3;
          subtotal += (threePacks * 18) + (singleDozens * 7);
        } else {
          subtotal += (remainingDozens * 7);
        }
        
        subtotal += (singleEggs * (7/12)); // Single eggs at dozen rate
      }
      else if (item.quantity >= 36) { // 3 dozen or more
        const threePacks = Math.floor(item.quantity / 36);
        const remainingDozens = Math.floor((item.quantity % 36) / 12);
        const singleEggs = item.quantity % 12;
        
        subtotal += (threePacks * 18);
        subtotal += (remainingDozens * 7);
        subtotal += (singleEggs * (7/12)); // Single eggs at dozen rate
      }
      else if (item.quantity >= 12) { // Full dozen
        const dozensCount = Math.floor(item.quantity / 12);
        const singleEggs = item.quantity % 12;
        
        subtotal += (dozensCount * 7);
        subtotal += (singleEggs * (7/12)); // Single eggs at dozen rate
      }
      else {
        // Less than a dozen
        subtotal += item.quantity * (7/12);
      }
    }
    else if (item.id === 2 && item.quantity >= 2) { // Crunchy Round Loaf
      const pairsCount = Math.floor(item.quantity / 2);
      const singleCount = item.quantity % 2;
      subtotal += (pairsCount * 18) + (singleCount * 10);
    } 
    else if ((item.id === 3 || item.id === 4) && item.quantity >= 2) { // Sandwich or French Bread
      const pairsCount = Math.floor(item.quantity / 2);
      const singleCount = item.quantity % 2;
      subtotal += (pairsCount * 8) + (singleCount * 5);
    } 
    else {
      subtotal += item.quantity * item.price;
    }
  });
  
  return subtotal;
}
