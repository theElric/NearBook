import React, { useState } from 'react';
import { X, Truck, MapPin } from 'lucide-react';
import { Book } from '../types';

interface OrderModalProps {
  book: Book;
  onClose: () => void;
  onSubmit: (orderData: any) => void;
}

export function OrderModal({ book, onClose, onSubmit }: OrderModalProps) {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  const totalAmount = deliveryMethod === 'delivery' 
    ? book.price + (book.deliveryPrice || 0)
    : book.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      bookId: book.id,
      deliveryMethod,
      deliveryAddress: deliveryMethod === 'delivery' ? address : undefined,
      totalAmount
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Place Order</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6">
          <h4 className="font-medium mb-2">{book.title}</h4>
          <p className="text-gray-600">by {book.author}</p>
          <p className="text-lg font-bold mt-2">${book.price}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Delivery Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="pickup"
                  checked={deliveryMethod === 'pickup'}
                  onChange={(e) => setDeliveryMethod(e.target.value as 'pickup')}
                  className="text-blue-600"
                />
                <MapPin size={20} className="text-gray-500" />
                <span>Pickup (Meet with seller)</span>
              </label>

              {book.deliveryAvailable && (
                <label className="flex items-center gap-2 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    name="deliveryMethod"
                    value="delivery"
                    checked={deliveryMethod === 'delivery'}
                    onChange={(e) => setDeliveryMethod(e.target.value as 'delivery')}
                    className="text-blue-600"
                  />
                  <Truck size={20} className="text-gray-500" />
                  <span>Delivery (+${book.deliveryPrice})</span>
                </label>
              )}
            </div>
          </div>

          {deliveryMethod === 'delivery' && (
            <div className="space-y-3">
              <h4 className="font-medium">Delivery Address</h4>
              <input
                type="text"
                placeholder="Street Address"
                value={address.street}
                onChange={(e) => setAddress({ ...address, street: e.target.value })}
                className="w-full p-2 border rounded-md"
                required
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="City"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="State"
                  value={address.state}
                  onChange={(e) => setAddress({ ...address, state: e.target.value })}
                  className="p-2 border rounded-md"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="ZIP Code"
                  value={address.zipCode}
                  onChange={(e) => setAddress({ ...address, zipCode: e.target.value })}
                  className="p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={address.country}
                  onChange={(e) => setAddress({ ...address, country: e.target.value })}
                  className="p-2 border rounded-md"
                  required
                />
              </div>
            </div>
          )}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>Book Price:</span>
              <span>${book.price}</span>
            </div>
            {deliveryMethod === 'delivery' && (
              <div className="flex justify-between mb-2">
                <span>Delivery Fee:</span>
                <span>${book.deliveryPrice}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${totalAmount}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Place Order
          </button>
        </form>
      </div>
    </div>
  );
}