import React, { useState } from 'react';
import { MessageCircle, Phone, X } from 'lucide-react';
import { Book } from '../types';

interface ContactModalProps {
  book: Book;
  onClose: () => void;
}

export function ContactModal({ book, onClose }: ContactModalProps) {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    // Implement chat functionality
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleCall = () => {
    if (book.seller.phone) {
      window.location.href = `tel:${book.seller.phone}`;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Contact Seller</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        
        <div className="mb-4">
          <p className="font-medium">Seller: {book.seller.name}</p>
          <p className="text-gray-600">Rating: {book.seller.rating} ⭐</p>
        </div>

        <div className="space-y-4">
          <div className="flex gap-2">
            <button
              onClick={handleCall}
              className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
            >
              <Phone size={20} />
              Call
            </button>
            <button
              onClick={() => handleSendMessage()}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              <MessageCircle size={20} />
              Chat
            </button>
          </div>

          <div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows={4}
            />
            <button
              onClick={handleSendMessage}
              className="w-full mt-2 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}