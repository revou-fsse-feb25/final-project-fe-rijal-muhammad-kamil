"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  ArrowLeft, 
  Calendar, 
  Edit, 
  MapPin, 
  Users, 
  DollarSign,
  Ticket,
  Clock
} from "lucide-react";
import Link from "next/link";
import { Event, EventPeriod, TicketType, Transaction } from "@/types/api";

// Mock data - replace with actual API calls
const mockEvent: Event = {
  id: 1,
  name: "Tech Conference 2024",
  description: "Annual technology conference featuring the latest innovations in AI, blockchain, and web development. Join industry leaders, developers, and entrepreneurs for three days of learning, networking, and innovation.",
  location: "Jakarta Convention Center",
  startDate: "2024-03-15",
  endDate: "2024-03-17",
  status: "active",
  categoryId: 1,
  eventOrganizerId: 1,
  createdAt: "2024-01-15T00:00:00Z",
  updatedAt: "2024-01-15T00:00:00Z",
};

const mockEventPeriods: EventPeriod[] = [
  {
    id: 1,
    eventId: 1,
    name: "Day 1 - Opening & Keynotes",
    startTime: "2024-03-15T09:00:00Z",
    endTime: "2024-03-15T17:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    eventId: 1,
    name: "Day 2 - Workshops & Sessions",
    startTime: "2024-03-16T09:00:00Z",
    endTime: "2024-03-16T17:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 3,
    eventId: 1,
    name: "Day 3 - Networking & Closing",
    startTime: "2024-03-17T09:00:00Z",
    endTime: "2024-03-17T15:00:00Z",
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
];

const mockTicketTypes: TicketType[] = [
  {
    id: 1,
    eventPeriodId: 1,
    categoryId: 1,
    name: "Early Bird - Full Access",
    description: "Full 3-day access with all sessions and workshops",
    price: 500000,
    quantity: 100,
    soldQuantity: 75,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 2,
    eventPeriodId: 1,
    categoryId: 2,
    name: "Regular - Full Access",
    description: "Full 3-day access with all sessions and workshops",
    price: 750000,
    quantity: 200,
    soldQuantity: 120,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
  {
    id: 3,
    eventPeriodId: 2,
    categoryId: 1,
    name: "Student Discount",
    description: "Special price for students with valid ID",
    price: 250000,
    quantity: 50,
    soldQuantity: 30,
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
  },
];

const mockTransactions: Transaction[] = [
  {
    id: 1,
    userId: 1,
    ticketId: 1,
    quantity: 2,
    totalAmount: 1000000,
    status: "completed",
    paymentMethod: "credit_card",
    createdAt: "2024-01-25T10:30:00Z",
    updatedAt: "2024-01-25T10:30:00Z",
  },
  {
    id: 2,
    userId: 2,
    ticketId: 2,
    quantity: 1,
    totalAmount: 750000,
    status: "completed",
    paymentMethod: "bank_transfer",
    createdAt: "2024-01-25T14:20:00Z",
    updatedAt: "2024-01-25T14:20:00Z",
  },
  {
    id: 3,
    userId: 3,
    ticketId: 3,
    quantity: 1,
    totalAmount: 250000,
    status: "pending",
    paymentMethod: "bank_transfer",
    createdAt: "2024-01-26T09:15:00Z",
    updatedAt: "2024-01-26T09:15:00Z",
  },
];

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  
  const [event, setEvent] = useState<Event | null>(mockEvent);
  const [eventPeriods, setEventPeriods] = useState<EventPeriod[]>(mockEventPeriods);
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(mockTicketTypes);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // TODO: Replace with actual API calls
    // fetchEventDetails(eventId);
    // fetchEventPeriods(eventId);
    // fetchTicketTypes(eventId);
    // fetchTransactions(eventId);
  }, [eventId]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      active: "default",
      draft: "secondary",
      completed: "outline",
      cancelled: "destructive",
      pending: "outline",
    };
    const colors: Record<string, string> = {
      active: "bg-green-100 text-green-800",
      draft: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
      pending: "bg-orange-100 text-orange-800",
    };
    return (
      <Badge variant={variants[status] || "outline"} className={colors[status]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('id-ID', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const totalRevenue = transactions
    .filter(t => t.status === 'completed')
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const totalTicketsSold = ticketTypes.reduce((sum, tt) => sum + tt.soldQuantity, 0);
  const totalTicketsAvailable = ticketTypes.reduce((sum, tt) => sum + tt.quantity, 0);

  if (!event) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Event not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/eo-dashboard/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{event.name}</h1>
            <p className="text-muted-foreground">
              Event details and management
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusBadge(event.status)}
          <Button asChild>
            <Link href={`/eo-dashboard/events/${event.id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Event
            </Link>
          </Button>
        </div>
      </div>

      {/* Event Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalTicketsSold}</div>
            <p className="text-xs text-muted-foreground">
              of {totalTicketsAvailable} available
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Event Periods</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{eventPeriods.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Transactions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{transactions.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Event Details */}
      <Card>
        <CardHeader>
          <CardTitle>Event Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Location:</span>
              </div>
              <p className="text-muted-foreground ml-6">{event.location}</p>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Date:</span>
              </div>
              <p className="text-muted-foreground ml-6">
                {formatDate(event.startDate)} - {formatDate(event.endDate)}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            <span className="font-medium">Description:</span>
            <p className="text-muted-foreground">{event.description}</p>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for detailed information */}
      <Tabs defaultValue="periods" className="space-y-4">
        <TabsList>
          <TabsTrigger value="periods">Event Periods</TabsTrigger>
          <TabsTrigger value="tickets">Ticket Types</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="periods">
          <Card>
            <CardHeader>
              <CardTitle>Event Periods</CardTitle>
              <CardDescription>
                Time periods and sessions for this event
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Period Name</TableHead>
                    <TableHead>Start Time</TableHead>
                    <TableHead>End Time</TableHead>
                    <TableHead>Duration</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {eventPeriods.map((period) => {
                    const duration = Math.round(
                      (new Date(period.endTime).getTime() - new Date(period.startTime).getTime()) / (1000 * 60 * 60)
                    );
                    return (
                      <TableRow key={period.id}>
                        <TableCell className="font-medium">{period.name}</TableCell>
                        <TableCell>{formatDateTime(period.startTime)}</TableCell>
                        <TableCell>{formatDateTime(period.endTime)}</TableCell>
                        <TableCell>{duration} hours</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tickets">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Types</CardTitle>
              <CardDescription>
                Available ticket types and their sales performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ticket Type</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Available</TableHead>
                    <TableHead>Sold</TableHead>
                    <TableHead>Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ticketTypes.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{ticket.name}</p>
                          <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{formatCurrency(ticket.price)}</TableCell>
                      <TableCell>{ticket.quantity}</TableCell>
                      <TableCell>{ticket.soldQuantity}</TableCell>
                      <TableCell>{formatCurrency(ticket.price * ticket.soldQuantity)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions">
          <Card>
            <CardHeader>
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent ticket purchases and payments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment Method</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">#{transaction.id}</TableCell>
                      <TableCell>{formatDateTime(transaction.createdAt)}</TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell>{formatCurrency(transaction.totalAmount)}</TableCell>
                      <TableCell className="capitalize">
                        {transaction.paymentMethod.replace('_', ' ')}
                      </TableCell>
                      <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}