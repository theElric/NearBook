export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  condition: 'New' | 'Like New' | 'Good' | 'Fair' | 'Poor';
  description: string;
  imageUrl: string;
  location: {
    latitude: number;
    longitude: number;
  };
  seller: {
    id: string;
    name: string;
    rating: number;
    phone?: string;
  };
  createdAt: Date;
  deliveryAvailable: boolean;
  deliveryPrice: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export interface Chat {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
}

export interface Order {
  id: string;
  bookId: string;
  buyerId: string;
  sellerId: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  deliveryAddress?: string;
  deliveryMethod: 'pickup' | 'delivery';
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}