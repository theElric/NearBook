import React from 'react';
import { Book } from '../types';
import { MapPin, Star, Truck, MessageCircle, Phone, ShoppingCart } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface BookCardProps {
  book: Book;
  onContact: (book: Book) => void;
  onOrder: (book: Book) => void;
}

export function BookCard({ book, onContact, onOrder }: BookCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={book.imageUrl}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{book.title}</h3>
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin size={16} />
          <span>2.5 km away</span>
        </div>
        <div className="flex items-center gap-1 mb-2">
          <Star size={16} className="text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">{book.seller.rating}</span>
        </div>
        {book.deliveryAvailable && (
          <div className="flex items-center gap-2 text-sm text-green-600 mb-3">
            <Truck size={16} />
            <span>Delivery available (+${book.deliveryPrice})</span>
          </div>
        )}
        <div className="text-xs text-gray-500 mb-3">
          Listed {formatDistanceToNow(book.createdAt)} ago
        </div>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">${book.price}</span>
          <div className="flex gap-2">
            <button
              onClick={() => onContact(book)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Contact Seller"
            >
              <MessageCircle size={20} />
            </button>
            <button
              onClick={() => onOrder(book)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <ShoppingCart size={16} />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}