import React from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  onFilter: () => void;
}

export function SearchBar({ onSearch, onFilter }: SearchBarProps) {
  return (
    <div className="flex gap-2 w-full max-w-2xl mx-auto">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Search for books..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <button
        onClick={onFilter}
        className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <SlidersHorizontal size={20} className="text-gray-600" />
      </button>
    </div>
  );
}