"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Search, 
  Calendar, 
  MapPin, 
  Clock,
  Ticket,
  Eye,
  ExternalLink,
  Users,
  Star
} from "lucide-react";

// Mock data - replace with actual API calls
const mockEvents = [
  {
    id: 1,
    name: "Tech Conference 2024",
    description: "Annual technology conference featuring the latest innovations",
    location: "Jakarta Convention Center",
    startDate: "2024-03-15",
    endDate: "2024-03-17",
    startTime: "09:00",
    endTime: "17:00",
    status: "upcoming",
    category: "Technology",
    imageUrl: "/api/placeholder/400/200",
    organizer: "Tech Events Indonesia",
    ticketsPurchased: 2,
    totalAmount: 300000,
    ticketType: "Early Bird",
    attendees: 1250,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Music Festival",
    description: "Summer music festival with international and local artists",
    location: "Gelora Bung Karno",
    startDate: "2024-04-20",
    endDate: "2024-04-22",
    startTime: "16:00",
    endTime: "23:00",
    status: "upcoming",
    category: "Music",
    imageUrl: "/api/placeholder/400/200",
    organizer: "Music Fest Organizer",
    ticketsPurchased: 1,
    totalAmount: 250000,
    ticketType: "Regular",
    attendees: 5000,
    rating: 4.9,
  },
  {
    id: 3,
    name: "Food & Culinary Expo",
    description: "Annual food and culinary exhibition",
    location: "ICE BSD",
    startDate: "2024-01-10",
    endDate: "2024-01-12",
    startTime: "10:00",
    endTime: "20:00",
    status: "completed",
    category: "Food & Beverage",
    imageUrl: "/api/placeholder/400/200",
    organizer: "Culinary Events",
    ticketsPurchased: 3,
    totalAmount: 450000,
    ticketType: "VIP",
    attendees: 2500,
    rating: 4.6,
  },
];

export default function UserEventsPage() {
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<any>(null);

  useEffect(() => {
    // TODO: Replace with actual API call
    // fetchUserEvents();
  }, []);

  useEffect(() => {
    let filtered = events;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((event) => event.status === statusFilter);
    }

    // Filter by category
    if (categoryFilter !== "all") {
      filtered = filtered.filter((event) => event.category === categoryFilter);
    }

    setFilteredEvents(filtered);
  }, [events, searchTerm, statusFilter, categoryFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      upcoming: { variant: "default" as const, color: "text-blue-600" },
      ongoing: { variant: "secondary" as const, color: "text-green-600" },
      completed: { variant: "outline" as const, color: "text-gray-600" },
      cancelled: { variant: "destructive" as const, color: "text-red-600" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.upcoming;

    return (
      <Badge variant={config.variant}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getEventStatus = (startDate: string, endDate: string) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "ongoing";
    return "completed";
  };

  const upcomingEvents = events.filter(e => getEventStatus(e.startDate, e.endDate) === "upcoming");
  const completedEvents = events.filter(e => getEventStatus(e.startDate, e.endDate) === "completed");
  const totalTickets = events.reduce((sum, e) => sum + e.ticketsPurchased, 0);
  const totalSpent = events.reduce((sum, e) => sum + e.totalAmount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Events</h1>
        <p className="text-muted-foreground">
          View and manage your event registrations and tickets.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{events.length}</div>
            <p className="text-xs text-muted-foreground">
              Events registered
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingEvents.length}</div>
            <p className="text-xs text-muted-foreground">
              Events to attend
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTickets}</div>
            <p className="text-xs text-muted-foreground">
              Tickets purchased
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            <p className="text-xs text-muted-foreground">
              On event tickets
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Event History</CardTitle>
          <CardDescription>
            Search and filter your registered events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search by event name, location, or organizer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status-filter">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="ongoing">Ongoing</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="category-filter">Category</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Food & Beverage">Food & Beverage</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.length === 0 ? (
              <div className="col-span-full text-center py-8">
                <p className="text-muted-foreground">No events found.</p>
              </div>
            ) : (
              filteredEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="aspect-video bg-muted relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="font-semibold text-lg">{event.name}</h3>
                      <p className="text-sm opacity-90">{event.organizer}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(getEventStatus(event.startDate, event.endDate))}
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {formatDate(event.startDate)}
                        {event.startDate !== event.endDate && ` - ${formatDate(event.endDate)}`}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {event.location}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {event.startTime} - {event.endTime}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Ticket className="h-4 w-4 mr-2" />
                        {event.ticketsPurchased} tickets • {event.ticketType}
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Users className="h-4 w-4 mr-2" />
                        {event.attendees.toLocaleString()} attendees
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-4 w-4 mr-2 fill-yellow-400 text-yellow-400" />
                        {event.rating} rating
                      </div>
                      <div className="pt-2 border-t">
                        <p className="font-semibold text-lg">{formatCurrency(event.totalAmount)}</p>
                        <p className="text-sm text-muted-foreground">Total paid</p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setSelectedEvent(event)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{event.name}</DialogTitle>
                            <DialogDescription>
                              Event details and ticket information
                            </DialogDescription>
                          </DialogHeader>
                          {selectedEvent && (
                            <div className="space-y-6">
                              <div className="aspect-video bg-muted rounded-lg" />
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Event Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Organizer:</span> {selectedEvent.organizer}</p>
                                    <p><span className="font-medium">Category:</span> {selectedEvent.category}</p>
                                    <p><span className="font-medium">Location:</span> {selectedEvent.location}</p>
                                    <p><span className="font-medium">Date:</span> {formatDate(selectedEvent.startDate)} - {formatDate(selectedEvent.endDate)}</p>
                                    <p><span className="font-medium">Time:</span> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold mb-2">Ticket Information</h4>
                                  <div className="space-y-1 text-sm">
                                    <p><span className="font-medium">Type:</span> {selectedEvent.ticketType}</p>
                                    <p><span className="font-medium">Quantity:</span> {selectedEvent.ticketsPurchased}</p>
                                    <p><span className="font-medium">Total Paid:</span> {formatCurrency(selectedEvent.totalAmount)}</p>
                                    <p><span className="font-medium">Status:</span> {getStatusBadge(getEventStatus(selectedEvent.startDate, selectedEvent.endDate))}</p>
                                  </div>
                                </div>
                              </div>
                              <div>
                                <h4 className="font-semibold mb-2">Description</h4>
                                <p className="text-sm text-muted-foreground">{selectedEvent.description}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Button size="sm" className="flex-1">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Event
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}