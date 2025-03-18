// src/components/OrderForm.tsx
import { useState, useEffect } from 'react';
import { initialItems, OrderItem, calculateSubtotal } from '../utils/orderUtils'; 

const validateEmail = (email: string): boolean => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email === '' || re.test(String(email).toLowerCase());
};

const validatePhone = (phone: string): boolean => {
  const re = /^(\+?1[-\s]?)?(\()?([0-9]{3})(\))?[-\s]?([0-9]{3})[-\s]?([0-9]{4})$/;
  return phone === '' || re.test(phone);
};

interface OrderFormProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function OrderForm({ open, setOpen }: OrderFormProps) {
  const [items, setItems] = useState<OrderItem[]>(initialItems);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [comments, setComments] = useState('');
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [address, setAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const [discountMessages, setDiscountMessages] = useState<{ [key: number]: boolean }>({});

  const subtotal = calculateSubtotal(items);
  const hasItems = items.some((item) => item.quantity > 0);

  // Discount calculation per product
  const calculateDiscountForItem = (item: OrderItem): number => {
    if (item.discountThreshold && item.discountPrice && item.quantity >= item.discountThreshold) {
      const groups = Math.floor(item.quantity / item.discountThreshold);
      const normalTotalForGroup = groups * item.discountThreshold * item.price;
      const discountedTotalForGroup = groups * item.discountPrice;
      return normalTotalForGroup - discountedTotalForGroup;
    }
    return 0;
  };

  const totalDiscountSaved = items.reduce(
    (acc, item) => acc + calculateDiscountForItem(item),
    0
  );

  // Close modal with Escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setOpen]);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);

  const updateItemQuantity = (id: number, quantity: number) => {
  setItems((prevItems) =>
    prevItems.map((item) => {
      if (item.id === id) {
        const updatedItem = { ...item, quantity };
        // Use the discountThreshold directly from the item
        if (
          updatedItem.discountThreshold &&
          quantity >= updatedItem.discountThreshold &&
          !discountMessages[id]
        ) {
          setDiscountMessages((prev) => ({ ...prev, [id]: true }));
          setTimeout(() => {
            setDiscountMessages((prev) => ({ ...prev, [id]: false }));
          }, 3000);
        }
        return updatedItem;
      }
      return item;
    })
  );
};


  const resetForm = () => {
    setItems(initialItems);
    setName('');
    setEmail('');
    setPhone('');
    setComments('');
    setDeliveryOption('pickup');
    setAddress('');
    setIsSubmitting(false);
    setOrderSuccess(false);
    setErrorMessage('');
    setCurrentStep(1);
  };

  const handleClose = () => {
    setOpen(false);
    if (orderSuccess) {
      setTimeout(resetForm, 300);
    }
  };

  const validateStep = () => {
    if (currentStep === 1 && !hasItems) {
      setErrorMessage('Please select at least one item to order');
      return false;
    }
    if (currentStep === 2) {
      if (!name.trim()) {
        setErrorMessage('Please enter your name');
        return false;
      }
      if (!email.trim() && !phone.trim()) {
        setErrorMessage('Please provide either an email or phone number');
        return false;
      }
      if (email.trim() && !validateEmail(email)) {
        setErrorMessage('Please enter a valid email address');
        return false;
      }
      if (phone.trim() && !validatePhone(phone)) {
        setErrorMessage('Please enter a valid phone number (e.g., 123-456-7890)');
        return false;
      }
      if (deliveryOption === 'delivery' && !address.trim()) {
        setErrorMessage('Please provide a delivery address');
        return false;
      }
      if (comments.length > 500) {
        setErrorMessage('Special instructions must be less than 500 characters');
        return false;
      }
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep()) {
      setErrorMessage('');
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    setErrorMessage('');
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!validateStep()) return;
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          items,
          comments,
          deliveryOption,
          address,
        }),
      });
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      console.log('Order response:', data);
      setOrderSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      setErrorMessage('Network error. Please try again later.');
      console.error('Error submitting order:', error);
      setIsSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-white rounded-lg max-w-xl w-full mx-4 shadow-2xl overflow-hidden transform transition-all duration-500 animate-fadeIn">
        {!orderSuccess && (
          <div className="w-full bg-gray-200 h-1">
            <div
              className="bg-primary-600 h-1 transition-all duration-500 ease-in-out"
              style={{
                width:
                  currentStep === 1
                    ? '33%'
                    : currentStep === 2
                    ? '66%'
                    : '100%',
              }}
            />
          </div>
        )}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">
            {orderSuccess
              ? 'Order Confirmation'
              : currentStep === 1
              ? 'Select Your Items'
              : currentStep === 2
              ? 'Your Details'
              : 'Review Order'}
          </h2>
          {orderSuccess ? (
            <div className="space-y-6 animate-fadeIn">
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800">
                      Thank you for your order! We’ll contact you soon to confirm the details.
                    </p>
                  </div>
                </div>
              </div>
              <div className="border-t border-b py-4">
                <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                {items.filter((item) => item.quantity > 0).map((item) => (
                  <div key={item.id} className="flex justify-between py-2">
                    <span>
                      {item.quantity} x {item.name}
                    </span>
                    <span>
                      ${(() => {
                        if (item.discountThreshold && item.discountPrice && item.quantity >= item.discountThreshold) {
                          const groups = Math.floor(item.quantity / item.discountThreshold);
                          const remainder = item.quantity % item.discountThreshold;
                          const totalWithDiscount = groups * item.discountPrice + remainder * item.price;
                          return totalWithDiscount.toFixed(2);
                        }
                        return (item.quantity * item.price).toFixed(2);
                      })()}
                    </span>
                  </div>
                ))}

                <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {totalDiscountSaved > 0 && (
                  <div className="flex justify-between text-sm text-green-600 mt-2">
                    <span>You saved:</span>
                    <span>${totalDiscountSaved.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                <p>{name}</p>
                {email && <p>{email}</p>}
                {phone && <p>{phone}</p>}
                <p className="mt-2">
                  {deliveryOption === 'pickup'
                    ? 'Pickup at store'
                    : 'Delivery to:'}
                </p>
                {deliveryOption === 'delivery' && <p className="italic">{address}</p>}
                {comments && (
                  <>
                    <p className="mt-2 font-medium">Special Instructions:</p>
                    <p className="italic">{comments}</p>
                  </>
                )}
              </div>
              <button
                onClick={handleClose}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-md transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {currentStep === 1 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
                    {items.map((item) => (
                      <div key={item.id} className="py-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.disabled ? 'Not available' : `$${item.price.toFixed(2)} each`}
                          </p>
                          {item.discountThreshold && item.discountPrice && !item.disabled && (
                            <p className="text-xs text-green-600">
                              Bulk discount: Buy {item.discountThreshold} for ${item.discountPrice.toFixed(2)}
                            </p>
                          )}
                          {discountMessages[item.id] && (
                            <p className="text-xs text-green-800 font-bold">
                              Bulk discount applied!
                            </p>
                          )}
                        </div>
                        <div className="flex items-center">
                          {item.disabled ? (
                            <span className="text-sm text-gray-400 font-semibold">
                              Coming Soon
                            </span>
                          ) : (
                            <>
                              <button
                                type="button"
                                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                                onClick={() =>
                                  updateItemQuantity(item.id, Math.max(0, item.quantity - 1))
                                }
                              >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="mx-3 w-6 text-center font-medium">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                className="p-1 rounded-full text-gray-400 hover:text-gray-600"
                                onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                              >
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-lg font-medium">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                </div>
              )}
              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="(123) 456-7890"
                      />
                    </div>
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-gray-700 mb-2">Delivery Options</span>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="delivery-option"
                          checked={deliveryOption === 'pickup'}
                          onChange={() => setDeliveryOption('pickup')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Pickup at bakery (107 Concession 17 Walpole)</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="delivery-option"
                          checked={deliveryOption === 'delivery'}
                          onChange={() => setDeliveryOption('delivery')}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300"
                        />
                        <span className="ml-2 text-gray-700">Local Delivery (within 2km of Hagersville)</span>
                      </label>
                    </div>
                  </div>
                  {deliveryOption === 'delivery' && (
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                        Delivery Address *
                      </label>
                      <textarea
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        rows={3}
                        className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Your complete delivery address"
                      />
                    </div>
                  )}
                  <div>
                    <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-1">
                      Special Instructions (optional)
                    </label>
                    <textarea
                      id="comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      rows={2}
                      className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      placeholder="Any special requests or instructions for your order"
                    />
                  </div>
                </div>
              )}
              {currentStep === 3 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="border-t border-b py-4">
                    <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
                    {items.filter((item) => item.quantity > 0).map((item) => (
                      <div key={item.id} className="flex justify-between py-2">
                        <span>
                          {item.quantity} x {item.name}
                        </span>
                        <span>
                          ${(() => {
                            if (item.discountThreshold && item.discountPrice && item.quantity >= item.discountThreshold) {
                              const groups = Math.floor(item.quantity / item.discountThreshold);
                              const remainder = item.quantity % item.discountThreshold;
                              const totalWithDiscount = groups * item.discountPrice + remainder * item.price;
                              return totalWithDiscount.toFixed(2);
                            }
                            return (item.quantity * item.price).toFixed(2);
                          })()}
                        </span>
                      </div>
                    ))}

                    <div className="flex justify-between font-bold mt-2 pt-2 border-t">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {totalDiscountSaved > 0 && (
                      <div className="flex justify-between text-sm text-green-600 mt-2">
                        <span>You saved:</span>
                        <span>${totalDiscountSaved.toFixed(2)}</span>
                      </div>
                    )}

                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Contact Information</h3>
                    <p>{name}</p>
                    {email && <p>{email}</p>}
                    {phone && <p>{phone}</p>}
                    <p className="mt-2">
                      {deliveryOption === 'pickup'
                        ? 'Pickup at store'
                        : 'Delivery to:'}
                    </p>
                    {deliveryOption === 'delivery' && <p className="italic">{address}</p>}
                    {comments && (
                      <>
                        <p className="mt-2 font-medium">Special Instructions:</p>
                        <p className="italic">{comments}</p>
                      </>
                    )}
                  </div>
                </div>
              )}
              {errorMessage && (
                <div className="mt-4 bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                    </div>
                  </div>
                </div>
              )}
              <div className="mt-8 flex justify-between">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={currentStep === 1 && !hasItems}
                    className={`px-6 py-2 bg-primary-600 rounded-md text-white font-medium hover:bg-primary-700 transition-colors ${
                      currentStep === 1 && !hasItems ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 bg-primary-600 rounded-md text-white font-medium hover:bg-primary-700 transition-colors ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Submitting...' : 'Place Order'}
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
