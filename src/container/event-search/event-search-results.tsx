"use client";

import { useEventSearch } from "@/hooks/use-event-search";
import truncateString from "@/utility/truncate-string";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  image?: string;
  price?: number;
}

interface EventSearchResultsProps {
  events: Event[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

function EventSearchResults({ events, loading, error, searchQuery }: EventSearchResultsProps) {
  if (!searchQuery.trim()) {
    return null;
  }

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
          <span className="ml-3 text-gray-600">Mencari event...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center py-8">
          <div className="text-red-500 mb-2">❌ Terjadi Kesalahan</div>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (events.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center py-8">
          <div className="text-gray-500 mb-2">🔍 Tidak Ada Hasil</div>
          <p className="text-gray-600">Tidak ditemukan event untuk "{searchQuery}"</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Hasil Pencarian untuk "{searchQuery}" ({events.length} event)
      </h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div key={event.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
            {event.image && (
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-32 object-cover rounded-md mb-3"
              />
            )}
            <h4 className="font-semibold text-gray-800 mb-2">{event.title}</h4>
            <p className="text-gray-600 text-sm mb-2">
              {truncateString(event.description, 100)}
            </p>
            <div className="text-xs text-gray-500 space-y-1">
              <div>📅 {new Date(event.date).toLocaleDateString('id-ID')}</div>
              <div>📍 {event.location}</div>
              <div>🏷️ {event.category}</div>
              {event.price && (
                <div className="font-semibold text-orange-600">
                  💰 Rp {event.price.toLocaleString('id-ID')}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EventSearchResults;