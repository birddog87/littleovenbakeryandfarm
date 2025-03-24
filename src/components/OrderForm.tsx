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

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [setOpen]);

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
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="max-h-[90vh] overflow-y-auto p-6 sm:p-8">
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
                  {deliveryOption === 'pickup' ? 'Pickup at store' : 'Delivery to:'}
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
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-3"
                    />
                    <input
                      type="email"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-3"
                    />
                    <input
                      type="text"
                      placeholder="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-3"
                    />
                    <div>
                      <label className="block text-gray-700 mb-2">Delivery Option</label>
                      <select
                        value={deliveryOption}
                        onChange={(e) => setDeliveryOption(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-3"
                      >
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                      </select>
                    </div>
                    {deliveryOption === 'delivery' && (
                      <input
                        type="text"
                        placeholder="Delivery Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border border-gray-300 rounded-md p-3"
                      />
                    )}
                    <textarea
                      placeholder="Special Instructions (optional)"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full border border-gray-300 rounded-md p-3"
                      rows={4}
                    />
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                  )}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                      Next
                    </button>
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
                      {deliveryOption === 'pickup' ? 'Pickup at store' : 'Delivery to:'}
                    </p>
                    {deliveryOption === 'delivery' && <p className="italic">{address}</p>}
                    {comments && (
                      <>
                        <p className="mt-2 font-medium">Special Instructions:</p>
                        <p className="italic">{comments}</p>
                      </>
                    )}
                  </div>
                  {errorMessage && (
                    <p className="text-red-500 text-sm font-medium">{errorMessage}</p>
                  )}
                  <div className="flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2 px-4 rounded-md transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Place Order'}
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
