"use client";

import { useState, useEffect, useCallback } from "react";
import { fetchEvent } from "@/service/event-api";

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

interface UseEventSearchReturn {
  events: Event[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  searchEvents: () => void;
}

export function useEventSearch(): UseEventSearchReturn {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const searchEvents = useCallback(async () => {
    if (!searchQuery.trim()) {
      setEvents([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetchEvent<{ data: Event[] }>({
        endpoint: "/events",
        method: "GET",
        params: {
          search: searchQuery.trim(),
        },
      });

      setEvents(response.data || []);
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mencari event");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, [searchQuery]);

  // Debounce search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        searchEvents();
      } else {
        setEvents([]);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, searchEvents]);

  return {
    events,
    loading,
    error,
    searchQuery,
    setSearchQuery,
    searchEvents,
  };
}