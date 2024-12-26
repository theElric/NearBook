import React, { useState } from 'react';
import { Book } from './types';
import { BookCard } from './components/BookCard';
import { SearchBar } from './components/SearchBar';
import { BookOpen } from 'lucide-react';
import { ContactModal } from './components/ContactModal';
import { SellBookForm } from './components/SellBookForm';
import { OrderModal } from './components/OrderModal';

function App() {
  const [books] = useState<Book[]>([
    {
      id: '1',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      price: 15.99,
      condition: 'Good',
      description: 'Classic novel in good condition',
      imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=800',
      location: { latitude: 0, longitude: 0 },
      seller: { id: '1', name: 'John Doe', rating: 4.5, phone: '+1234567890' },
      createdAt: new Date(),
      deliveryAvailable: true,
      deliveryPrice: 5.99
    },
    {
      id: '2',
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      price: 12.99,
      condition: 'Like New',
      description: 'Barely used copy',
      imageUrl: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800',
      location: { latitude: 0, longitude: 0 },
      seller: { id: '2', name: 'Jane Smith', rating: 4.8, phone: '+1987654321' },
      createdAt: new Date(),
      deliveryAvailable: false,
      deliveryPrice: 0
    }
  ]);

  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [showSellForm, setShowSellForm] = useState(false);
  const [orderBook, setOrderBook] = useState<Book | null>(null);

  const handleContact = (book: Book) => {
    setSelectedBook(book);
  };

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
  };

  const handleFilter = () => {
    console.log('Opening filters');
  };

  const handleSellBook = (bookData: any) => {
    console.log('New book listing:', bookData);
    setShowSellForm(false);
  };

  const handleOrder = (book: Book) => {
    setOrderBook(book);
  };

  const handlePlaceOrder = (orderData: any) => {
    console.log('Placing order:', orderData);
    setOrderBook(null);
    // Here you would typically send the order to your backend
    alert('Order placed successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen size={32} className="text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">NearBook</h1>
            </div>
            <button
              onClick={() => setShowSellForm(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Sell a Book
            </button>
          </div>
          <div className="mt-4">
            <SearchBar onSearch={handleSearch} onFilter={handleFilter} />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onContact={handleContact}
              onOrder={handleOrder}
            />
          ))}
        </div>
      </main>

      {selectedBook && (
        <ContactModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
        />
      )}

      {showSellForm && (
        <SellBookForm
          onClose={() => setShowSellForm(false)}
          onSubmit={handleSellBook}
        />
      )}

      {orderBook && (
        <OrderModal
          book={orderBook}
          onClose={() => setOrderBook(null)}
          onSubmit={handlePlaceOrder}
        />
      )}
    </div>
  );
}

export default App;