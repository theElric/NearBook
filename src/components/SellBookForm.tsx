import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';

interface SellBookFormProps {
  onClose: () => void;
  onSubmit: (bookData: any) => void;
}

export function SellBookForm({ onClose, onSubmit }: SellBookFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    price: '',
    condition: 'Good',
    description: '',
    deliveryAvailable: false,
    deliveryPrice: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sell a Book</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Book Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md"
              required
              min="0"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Condition</label>
            <select
              value={formData.condition}
              onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md"
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 w-full p-2 border rounded-md"
              rows={4}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Book Photos</label>
            <div className="mt-1 border-2 border-dashed rounded-md p-4">
              <div className="flex flex-col items-center">
                <Upload className="text-gray-400 mb-2" size={24} />
                <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                <input type="file" className="hidden" accept="image/*" multiple />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="deliveryAvailable"
              checked={formData.deliveryAvailable}
              onChange={(e) => setFormData({ ...formData, deliveryAvailable: e.target.checked })}
              className="rounded"
            />
            <label htmlFor="deliveryAvailable" className="text-sm font-medium text-gray-700">
              Offer Delivery
            </label>
          </div>

          {formData.deliveryAvailable && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Delivery Price ($)</label>
              <input
                type="number"
                value={formData.deliveryPrice}
                onChange={(e) => setFormData({ ...formData, deliveryPrice: e.target.value })}
                className="mt-1 w-full p-2 border rounded-md"
                min="0"
                step="0.01"
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            List Book for Sale
          </button>
        </form>
      </div>
    </div>
  );
}