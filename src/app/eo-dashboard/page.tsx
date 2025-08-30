// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { 
//   Calendar, 
//   CreditCard, 
//   DollarSign, 
//   TrendingUp, 
//   Users, 
//   Eye,
//   Plus
// } from "lucide-react";
// import Link from "next/link";
// import { Event, Transaction, DashboardStats } from "@/types/api";
// import dashboardApi from "@/service/dashboard.api";

// // Mock data - will be replaced with API data
// const mockStats: DashboardStats = {
//   totalEvents: 12,
//   totalRevenue: 125000,
//   totalTicketsSold: 850,
//   totalCustomers: 420,
//   monthlyRevenue: [
//     { month: "Jan", revenue: 15000 },
//     { month: "Feb", revenue: 18000 },
//     { month: "Mar", revenue: 22000 },
//     { month: "Apr", revenue: 19000 },
//     { month: "May", revenue: 25000 },
//     { month: "Jun", revenue: 26000 },
//   ],
// };

// const mockRecentEvents: Event[] = [
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
//     status: "draft",
//     categoryId: 2,
//     eventOrganizerId: 1,
//     createdAt: "2024-01-20T00:00:00Z",
//     updatedAt: "2024-01-20T00:00:00Z",
//   },
// ];

// const mockRecentTransactions: Transaction[] = [
//   {
//     id: 1,
//     userId: 1,
//     ticketId: 1,
//     quantity: 2,
//     totalAmount: 500000,
//     status: "completed",
//     paymentMethod: "credit_card",
//     createdAt: "2024-01-25T10:30:00Z",
//     updatedAt: "2024-01-25T10:30:00Z",
//   },
//   {
//     id: 2,
//     userId: 2,
//     ticketId: 2,
//     quantity: 1,
//     totalAmount: 150000,
//     status: "pending",
//     paymentMethod: "bank_transfer",
//     createdAt: "2024-01-25T14:20:00Z",
//     updatedAt: "2024-01-25T14:20:00Z",
//   },
// ];

// export default function EODashboardPage() {
//   const [stats, setStats] = useState<DashboardStats>(mockStats);
//   const [recentEvents, setRecentEvents] = useState<Event[]>(mockRecentEvents);
//   const [recentTransactions, setRecentTransactions] = useState<Transaction[]>(mockRecentTransactions);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchDashboardData();
//   }, []);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
      
//       const [statsData, recentEventsData, recentTransactionsData] = await Promise.all([
//         dashboardApi.getEODashboardStats(token || undefined),
//         dashboardApi.getRecentEvents(5, token || undefined),
//         dashboardApi.getRecentTransactions(5, token || undefined)
//       ]);
      
//       setStats(statsData);
//       setRecentEvents(recentEventsData);
//       setRecentTransactions(recentTransactionsData);
//     } catch (error) {
//       console.error('Failed to fetch dashboard data:', error);
//       // Fallback to mock data on error
//       setStats(mockStats);
//       setRecentEvents(mockRecentEvents);
//       setRecentTransactions(mockRecentTransactions);
//     } finally {
//       setLoading(false);
//     }
//   }; // fetchRecentEvents();
//     // fetchRecentTransactions();
//   }, []);

//   const formatCurrency = (amount: number) => {
//     return new Intl.NumberFormat('id-ID', {
//       style: 'currency',
//       currency: 'IDR',
//       minimumFractionDigits: 0,
//     }).format(amount);
//   };

//   const getStatusBadge = (status: string) => {
//     const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
//       active: "default",
//       draft: "secondary",
//       completed: "default",
//       pending: "outline",
//       cancelled: "destructive",
//     };
//     return (
//       <Badge variant={variants[status] || "outline"}>
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
//           <p className="text-muted-foreground">
//             Welcome back! Here's an overview of your events and performance.
//           </p>
//         </div>
//         <Button asChild>
//           <Link href="/eo-dashboard/events/create">
//             <Plus className="mr-2 h-4 w-4" />
//             Create Event
//           </Link>
//         </Button>
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
//               +2 from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
//             <p className="text-xs text-muted-foreground">
//               +12% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
//             <CreditCard className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalTicketsSold}</div>
//             <p className="text-xs text-muted-foreground">
//               +8% from last month
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
//             <Users className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{stats.totalCustomers}</div>
//             <p className="text-xs text-muted-foreground">
//               +15% from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Recent Events and Transactions */}
//       <div className="grid gap-4 md:grid-cols-2">
//         {/* Recent Events */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Events</CardTitle>
//             <CardDescription>
//               Your latest events and their status
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentEvents.map((event) => (
//                 <div key={event.id} className="flex items-center justify-between">
//                   <div className="space-y-1">
//                     <p className="text-sm font-medium leading-none">
//                       {event.name}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {event.location} • {new Date(event.startDate).toLocaleDateString()}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     {getStatusBadge(event.status)}
//                     <Button variant="ghost" size="sm" asChild>
//                       <Link href={`/eo-dashboard/events/${event.id}`}>
//                         <Eye className="h-4 w-4" />
//                       </Link>
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4">
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/eo-dashboard/events">
//                   View All Events
//                 </Link>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>

//         {/* Recent Transactions */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Recent Transactions</CardTitle>
//             <CardDescription>
//               Latest ticket sales and payments
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-4">
//               {recentTransactions.map((transaction) => (
//                 <div key={transaction.id} className="flex items-center justify-between">
//                   <div className="space-y-1">
//                     <p className="text-sm font-medium leading-none">
//                       Transaction #{transaction.id}
//                     </p>
//                     <p className="text-sm text-muted-foreground">
//                       {transaction.quantity} tickets • {transaction.paymentMethod.replace('_', ' ')}
//                     </p>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <div className="text-right">
//                       <p className="text-sm font-medium">
//                         {formatCurrency(transaction.totalAmount)}
//                       </p>
//                       {getStatusBadge(transaction.status)}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//             <div className="mt-4">
//               <Button variant="outline" className="w-full" asChild>
//                 <Link href="/eo-dashboard/transactions">
//                   View All Transactions
//                 </Link>
//               </Button>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Quick Actions */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Quick Actions</CardTitle>
//           <CardDescription>
//             Common tasks and shortcuts
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid gap-4 md:grid-cols-3">
//             <Button variant="outline" className="h-20 flex-col" asChild>
//               <Link href="/eo-dashboard/events/create">
//                 <Plus className="h-6 w-6 mb-2" />
//                 Create New Event
//               </Link>
//             </Button>
//             <Button variant="outline" className="h-20 flex-col" asChild>
//               <Link href="/eo-dashboard/analytics">
//                 <TrendingUp className="h-6 w-6 mb-2" />
//                 View Analytics
//               </Link>
//             </Button>
//             <Button variant="outline" className="h-20 flex-col" asChild>
//               <Link href="/eo-dashboard/profile">
//                 <Users className="h-6 w-6 mb-2" />
//                 Manage Profile
//               </Link>
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }