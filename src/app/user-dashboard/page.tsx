// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Calendar,
//   CreditCard,
//   Ticket,
//   TrendingUp,
//   Clock,
//   CheckCircle,
//   ArrowRight,
//   MapPin
// } from "lucide-react";
// import Link from "next/link";
// import { Event, UserDashboardTransaction } from "@/types/api";
// import dashboardApi from "@/service/dashboard.api";

// // Mock data - will be replaced with API data
// const mockStats = {
//   totalEvents: 8,
//   upcomingEvents: 3,
//   totalSpent: 2450000,
//   totalTickets: 12,
// };

// const mockUpcomingEvents: Event[] = [
//   {
//     id: 1,
//     name: "Tech Conference 2024",
//     description: "Annual technology conference",
//     location: "Jakarta Convention Center",
//     startDate: "2024-03-15",
//     endDate: "2024-03-17",
//     status: "active",
//     categoryId: 1,
//     eventOrganizerId: 1,
//     createdAt: "2024-01-15T00:00:00Z",
//     updatedAt: "2024-01-15T00:00:00Z",
//   },
//   {
//     id: 2,
//     name: "Music Festival",
//     description: "Summer music festival",
//     location: "Gelora Bung Karno",
//     startDate: "2024-04-20",
//     endDate: "2024-04-22",
//     status: "active",
//     categoryId: 2,
//     eventOrganizerId: 1,
//     createdAt: "2024-01-20T00:00:00Z",
//     updatedAt: "2024-01-20T00:00:00Z",
//   },
// ];

// const mockRecentTransactions: UserDashboardTransaction[] = [
//   {
//     id: 1,
//     userId: 101,
//     eventId: 1,
//     ticketTypeId: 1,
//     quantity: 2,
//     totalAmount: 300000,
//     status: "completed",
//     paymentMethod: "credit_card",
//     paymentReference: "TXN-2024-001",
//     createdAt: "2024-01-15T10:30:00Z",
//     updatedAt: "2024-01-15T10:35:00Z",
//   },
//   {
//     id: 2,
//     userId: 101,
//     eventId: 2,
//     ticketTypeId: 2,
//     quantity: 1,
//     totalAmount: 250000,
//     status: "pending",
//     paymentMethod: "bank_transfer",
//     paymentReference: "TXN-2024-002",
//     createdAt: "2024-01-16T14:20:00Z",
//     updatedAt: "2024-01-16T14:20:00Z",
//   },
// ];

// export default function UserDashboardPage() {
//   const [stats, setStats] = useState(mockStats);
//   const [upcomingEvents, setUpcomingEvents] = useState<Event[]>(mockUpcomingEvents);
//   const [recentTransactions, setRecentTransactions] = useState<UserDashboardTransaction[]>(mockRecentTransactions);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       const [statsData, upcomingEventsData, recentTransactionsData] = await Promise.all([
//         dashboardApi.getUserDashboardStats(token || undefined),
//         dashboardApi.getUserUpcomingEvents(5, token || undefined),
//         dashboardApi.getUserRecentTransactions(5, token || undefined)
//       ]);
      
//       setStats(statsData);
//       setUpcomingEvents(upcomingEventsData);
      
//       // Transform transactions to match UserDashboardTransaction interface
//       const transformedTransactions: UserDashboardTransaction[] = recentTransactionsData.map(transaction => ({
//         id: transaction.transaction_id,
//         userId: transaction.user_id,
//         eventId: transaction.event_id || 0,
//         ticketTypeId: transaction.ticket_type_id || 0,
//         quantity: transaction.quantity,
//         totalAmount: transaction.total_amount,
//         status: transaction.status.toLowerCase() as "pending" | "completed" | "failed" | "cancelled",
//         paymentMethod: transaction.payment_method.toLowerCase().replace('_', '_') as "credit_card" | "bank_transfer" | "ovo" | "dana" | "gopay",
//         paymentReference: transaction.payment_reference || `TXN-${transaction.transaction_id}`,
//         createdAt: transaction.created_at,
//         updatedAt: transaction.updated_at,
//         event: {
//           id: transaction.event_id || 0,
//           name: "Event Name",
//           location: "Event Location",
//           startDate: "2024-03-15",
//           endDate: "2024-03-17",
//         },
//         ticketType: {
//           id: transaction.ticket_type_id || 0,
//           name: "Ticket Type",
//           price: transaction.total_amount / transaction.quantity,
//         },
//       }));
      
//       setRecentTransactions(transformedTransactions);
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//       // Fallback to mock data on error
//       setStats(mockStats);
//       setUpcomingEvents(mockUpcomingEvents);
//       setRecentTransactions(mockRecentTransactions);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString('id-ID', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     });
//   };

//   const getStatusBadge = (status: string) => {
//     const statusConfig = {
//       completed: { variant: "default" as const, color: "text-green-600" },
//       pending: { variant: "secondary" as const, color: "text-yellow-600" },
//       failed: { variant: "destructive" as const, color: "text-red-600" },
//       cancelled: { variant: "outline" as const, color: "text-gray-600" },
//     };

//     const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

//     return (
//       <Badge variant={config.variant}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold tracking-tight">Welcome Back!</h1>
//         <p className="text-muted-foreground">
//           Here's an overview of your events and transactions.
//         </p>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Events</CardTitle>
//             <Calendar className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalEvents}</div>
//             <p className="text-xs text-muted-foreground">
//               Events attended
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.upcomingEvents}</div>
//             <p className="text-xs text-muted-foreground">
//               Events to attend
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
//             <CreditCard className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{formatCurrency(stats.totalSpent)}</div>
//             <p className="text-xs text-muted-foreground">
//               On event tickets
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Tickets</CardTitle>
//             <Ticket className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalTickets}</div>
//             <p className="text-xs text-muted-foreground">
//               Tickets purchased
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2">
//         {/* Upcoming Events */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Upcoming Events</CardTitle>
//             <CardDescription>
//               Events you have tickets for
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {upcomingEvents.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-4">
//                   No upcoming events
//                 </p>
//               ) : (
//                 upcomingEvents.map((event) => (
//                   <div key={event.id} className="flex items-center space-x-4 rounded-lg border p-4">
//                     <div className="flex-1 space-y-1">
//                       <p className="text-sm font-medium leading-none">
//                         {event.name}
//                       </p>
//                       <div className="flex items-center text-xs text-muted-foreground">
//                         <MapPin className="mr-1 h-3 w-3" />
//                         {event.location}
//                       </div>
//                       <div className="flex items-center text-xs text-muted-foreground">
//                         <Calendar className="mr-1 h-3 w-3" />
//                         {formatDate(event.startDate)}
//                       </div>
//                     </div>
//                     <Button variant="ghost" size="sm" asChild>
//                       <Link href={`/event/${event.id}`}>
//                         <ArrowRight className="h-4 w-4" />
//                       </Link>
//                     </Button>
//                   </div>
//                 ))
//               )}
//               {upcomingEvents.length > 0 && (
//                 <div className="pt-2">
//                   <Button variant="outline" className="w-full" asChild>
//                     <Link href="/user-dashboard/events">
//                       View All Events
//                     </Link>
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recent Transactions */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Transactions</CardTitle>
//             <CardDescription>
//               Your latest ticket purchases
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentTransactions.length === 0 ? (
//                 <p className="text-center text-muted-foreground py-4">
//                   No recent transactions
//                 </p>
//               ) : (
//                 recentTransactions.map((transaction) => (
//                   <div key={transaction.id} className="flex items-center justify-between rounded-lg border p-4">
//                     <div className="space-y-1">
//                       <p className="text-sm font-medium leading-none">
//                         {transaction.paymentReference}
//                       </p>
//                       <div className="flex items-center space-x-2">
//                         <span className="text-xs text-muted-foreground">
//                           {formatDate(transaction.createdAt)}
//                         </span>
//                         {getStatusBadge(transaction.status)}
//                       </div>
//                     </div>
//                     <div className="text-right">
//                       <p className="text-sm font-medium">
//                         {formatCurrency(transaction.totalAmount)}
//                       </p>
//                       <p className="text-xs text-muted-foreground">
//                         {transaction.quantity} ticket{transaction.quantity > 1 ? 's' : ''}
//                       </p>
//                     </div>
//                   </div>
//                 ))
//               )}
//               {recentTransactions.length > 0 && (
//                 <div className="pt-2">
//                   <Button variant="outline" className="w-full" asChild>
//                     <Link href="/user-dashboard/transactions">
//                       View All Transactions
//                     </Link>
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//           <CardDescription>
//             Common tasks you might want to perform
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 md:grid-cols-3">
//             <Button variant="outline" className="h-20 flex-col" asChild>
//               <Link href="/">
//                 <Calendar className="h-6 w-6 mb-2" />
//                 Browse Events
//               </Link>
//             </Button>
//             <Button variant="outline" className="h-20 flex-col" asChild>
//               <Link href="/user-dashboard/transactions">
//                 <CreditCard className="h-6 w-6 mb-2" />
//                 View Transactions
//               </Link>
//             </Button>
//             <Button variant="outline" className="h-20 flex-col" asChild>
//               <Link href="/user-dashboard/profile">
//                 <CheckCircle className="h-6 w-6 mb-2" />
//                 Update Profile
//               </Link>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }