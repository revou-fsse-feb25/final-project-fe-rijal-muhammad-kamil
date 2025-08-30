// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import {
//   ArrowLeft,
//   Search,
//   Filter,
//   Download,
//   Eye,
//   Calendar,
//   MapPin,
//   Users,
//   DollarSign,
//   TrendingUp,
//   Clock,
// } from "lucide-react";
// import Link from "next/link";
// import { Transaction, Event, EventWithDetails, TransactionWithDetails } from "@/types/api";
// import transactionApi from "@/service/transaction.api";
// import { fetchEvent } from "@/service/event-api";

// // Mock data untuk development
// const mockEvent: EventWithDetails = {
//   event_id: 1,
//   category_id: 1,
//   organizer_id: 1,
//   title: "Tech Conference 2024",
//   description: "Annual technology conference featuring the latest innovations",
//   terms: "Terms and conditions apply",
//   location: "Jakarta Convention Center",
//   image_url: "/api/placeholder/800/400",
//   status: "ACTIVE",
//   created_at: "2024-01-15T00:00:00Z",
//   updated_at: "2024-01-15T00:00:00Z",
//   category: {
//     category_id: 1,
//     name: "Technology",
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-01T00:00:00Z",
//   },
//   organizer: {
//     organizer_id: 1,
//     user_id: 1,
//     name: "Tech Events Indonesia",
//     address: "Jakarta, Indonesia",
//     description: "Leading technology event organizer",
//     logo_url: "/api/placeholder/100/100",
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-01T00:00:00Z",
//   },
// };

// const mockTransactions: TransactionWithDetails[] = [
//   {
//     transaction_id: 1,
//     user_id: 101,
//     total_price: 500000,
//     payment_method: "CREDIT_CARD",
//     status: "SUCCESS",
//     created_at: "2024-03-15T10:30:00Z",
//     updated_at: "2024-03-15T10:35:00Z",
//     user: {
//       user_id: 101,
//       email: "john.doe@email.com",
//       phone_number: "+6281234567890",
//       first_name: "John",
//       last_name: "Doe",
//       date_of_birth: "1990-01-01",
//       gender: "MALE",
//       password: "",
//       role: "ATTENDEE",
//       status: "ACTIVE",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-01T00:00:00Z",
//     },
//     tickets: [
//       {
//         ticket_id: 1,
//         type_id: 1,
//         transaction_id: 1,
//         ticket_code: "TCK-001-2024",
//         created_at: "2024-03-15T10:35:00Z",
//         updated_at: "2024-03-15T10:35:00Z",
//       },
//     ],
//   },
//   {
//     transaction_id: 2,
//     user_id: 102,
//     total_price: 750000,
//     payment_method: "BANK_TRANSFER",
//     status: "PENDING",
//     created_at: "2024-03-16T14:20:00Z",
//     updated_at: "2024-03-16T14:20:00Z",
//     user: {
//       user_id: 102,
//       email: "jane.smith@email.com",
//       phone_number: "+6281234567891",
//       first_name: "Jane",
//       last_name: "Smith",
//       date_of_birth: "1992-05-15",
//       gender: "FEMALE",
//       password: "",
//       role: "ATTENDEE",
//       status: "ACTIVE",
//       created_at: "2024-01-01T00:00:00Z",
//       updated_at: "2024-01-01T00:00:00Z",
//     },
//     tickets: [
//       {
//         ticket_id: 2,
//         type_id: 2,
//         transaction_id: 2,
//         ticket_code: "TCK-002-2024",
//         created_at: "2024-03-16T14:20:00Z",
//         updated_at: "2024-03-16T14:20:00Z",
//       },
//     ],
//   },
// ];

// export default function EventTransactionsPage() {
//   const params = useParams();
//   const eventId = params.id as string;
  
//   const [event, setEvent] = useState<EventWithDetails | null>(null);
//   const [transactions, setTransactions] = useState<TransactionWithDetails[]>([]);
//   const [filteredTransactions, setFilteredTransactions] = useState<TransactionWithDetails[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
//   const [sortBy, setSortBy] = useState("created_at");
//   const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

//   useEffect(() => {
//     fetchEventData();
//     fetchTransactionData();
//   }, [eventId]);

//   useEffect(() => {
//     filterAndSortTransactions();
//   }, [transactions, searchTerm, statusFilter, paymentMethodFilter, sortBy, sortOrder]);

//   const fetchEventData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const eventData = await fetchEvent<EventWithDetails>({
//         endpoint: `/events/${eventId}`,
//         method: "GET",
//         token: token || undefined,
//       });
//       setEvent(eventData);
//     } catch (error) {
//       console.error('Failed to fetch event data:', error);
//       // Fallback to mock data
//       setEvent(mockEvent);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchTransactionData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       // Note: This endpoint might need to be created in the backend
//       const transactionData = await fetchEvent<TransactionWithDetails[]>({
//         endpoint: `/events/${eventId}/transactions`,
//         method: "GET",
//         token: token || undefined,
//       });
//       setTransactions(transactionData);
//     } catch (error) {
//       console.error('Failed to fetch transaction data:', error);
//       // Fallback to mock data
//       setTransactions(mockTransactions);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterAndSortTransactions = () => {
//     let filtered = [...transactions];

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (transaction) =>
//           transaction.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           transaction.user?.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           transaction.user?.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           transaction.transaction_id.toString().includes(searchTerm)
//       );
//     }

//     // Status filter
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((transaction) => transaction.status === statusFilter);
//     }

//     // Payment method filter
//     if (paymentMethodFilter !== "all") {
//       filtered = filtered.filter((transaction) => transaction.payment_method === paymentMethodFilter);
//     }

//     // Sort
//     filtered.sort((a, b) => {
//       let aValue: any, bValue: any;
      
//       switch (sortBy) {
//         case "created_at":
//           aValue = new Date(a.created_at);
//           bValue = new Date(b.created_at);
//           break;
//         case "total_price":
//           aValue = a.total_price;
//           bValue = b.total_price;
//           break;
//         case "user_name":
//           aValue = `${a.user?.first_name} ${a.user?.last_name}`;
//           bValue = `${b.user?.first_name} ${b.user?.last_name}`;
//           break;
//         default:
//           aValue = a.transaction_id;
//           bValue = b.transaction_id;
//       }

//       if (sortOrder === "asc") {
//         return aValue > bValue ? 1 : -1;
//       } else {
//         return aValue < bValue ? 1 : -1;
//       }
//     });

//     setFilteredTransactions(filtered);
//   };

//   const getStatusBadge = (status: string) => {
//     const statusConfig = {
//       SUCCESS: { label: "Success", variant: "default" as const, className: "bg-green-100 text-green-800" },
//       PENDING: { label: "Pending", variant: "secondary" as const, className: "bg-yellow-100 text-yellow-800" },
//       FAILED: { label: "Failed", variant: "destructive" as const, className: "bg-red-100 text-red-800" },
//       CANCELED: { label: "Canceled", variant: "outline" as const, className: "bg-gray-100 text-gray-800" },
//     };
    
//     const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.PENDING;
//     return (
//       <Badge variant={config.variant} className={config.className}>
//         {config.label}
//       </Badge>
//     );
//   };

//   const getPaymentMethodLabel = (method: string) => {
//     const methodLabels = {
//       CREDIT_CARD: "Credit Card",
//       BANK_TRANSFER: "Bank Transfer",
//       OVO: "OVO",
//       DANA: "DANA",
//       GOPAY: "GoPay",
//     };
//     return methodLabels[method as keyof typeof methodLabels] || method;
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
//       hour: '2-digit',
//       minute: '2-digit',
//     });
//   };

//   const calculateStats = () => {
//     const totalTransactions = filteredTransactions.length;
//     const totalRevenue = filteredTransactions
//       .filter(t => t.status === 'SUCCESS')
//       .reduce((sum, t) => sum + t.total_price, 0);
//     const successfulTransactions = filteredTransactions.filter(t => t.status === 'SUCCESS').length;
//     const pendingTransactions = filteredTransactions.filter(t => t.status === 'PENDING').length;
    
//     return {
//       totalTransactions,
//       totalRevenue,
//       successfulTransactions,
//       pendingTransactions,
//     };
//   };

//   const stats = calculateStats();

//   if (loading && !event) {
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="text-center">
//           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
//           <p className="text-gray-600">Loading event data...</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-4">
//             <Link href="/eo-dashboard">
//               <Button variant="outline" size="sm">
//                 <ArrowLeft className="h-4 w-4 mr-2" />
//                 Back to Dashboard
//               </Button>
//             </Link>
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Event Transactions
//               </h1>
//               <p className="text-gray-600 mt-1">
//                 Manage and monitor transactions for this event
//               </p>
//             </div>
//           </div>
//           <Button>
//             <Download className="h-4 w-4 mr-2" />
//             Export Data
//           </Button>
//         </div>

//         {/* Event Info Card */}
//         {event && (
//           <Card>
//             <CardHeader>
//               <div className="flex items-start justify-between">
//                 <div className="flex items-start space-x-4">
//                   <img
//                     src={event.image_url}
//                     alt={event.title}
//                     className="w-20 h-20 rounded-lg object-cover"
//                   />
//                   <div>
//                     <CardTitle className="text-xl">{event.title}</CardTitle>
//                     <CardDescription className="mt-2 max-w-2xl">
//                       {event.description}
//                     </CardDescription>
//                     <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
//                       <div className="flex items-center">
//                         <MapPin className="h-4 w-4 mr-1" />
//                         {event.location}
//                       </div>
//                       <div className="flex items-center">
//                         <Calendar className="h-4 w-4 mr-1" />
//                         {formatDate(event.created_at)}
//                       </div>
//                       <Badge variant={event.status === 'ACTIVE' ? 'default' : 'secondary'}>
//                         {event.status}
//                       </Badge>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </CardHeader>
//           </Card>
//         )}

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Transactions</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.totalTransactions}</p>
//                 </div>
//                 <Users className="h-8 w-8 text-blue-600" />
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Total Revenue</p>
//                   <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalRevenue)}</p>
//                 </div>
//                 <DollarSign className="h-8 w-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Successful</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.successfulTransactions}</p>
//                 </div>
//                 <TrendingUp className="h-8 w-8 text-green-600" />
//               </div>
//             </CardContent>
//           </Card>
          
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-medium text-gray-600">Pending</p>
//                   <p className="text-2xl font-bold text-gray-900">{stats.pendingTransactions}</p>
//                 </div>
//                 <Clock className="h-8 w-8 text-yellow-600" />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Filters and Search */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Transaction Management</CardTitle>
//             <CardDescription>
//               Filter and search through all transactions for this event
//             </CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="flex flex-col md:flex-row gap-4 mb-6">
//               <div className="flex-1">
//                 <div className="relative">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//                   <Input
//                     placeholder="Search by customer name, email, or transaction ID..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     className="pl-10"
//                   />
//                 </div>
//               </div>
              
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <SelectValue placeholder="Filter by status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="SUCCESS">Success</SelectItem>
//                   <SelectItem value="PENDING">Pending</SelectItem>
//                   <SelectItem value="FAILED">Failed</SelectItem>
//                   <SelectItem value="CANCELED">Canceled</SelectItem>
//                 </SelectContent>
//               </Select>
              
//               <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <SelectValue placeholder="Payment method" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Methods</SelectItem>
//                   <SelectItem value="CREDIT_CARD">Credit Card</SelectItem>
//                   <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
//                   <SelectItem value="OVO">OVO</SelectItem>
//                   <SelectItem value="DANA">DANA</SelectItem>
//                   <SelectItem value="GOPAY">GoPay</SelectItem>
//                 </SelectContent>
//               </Select>
              
//               <Select value={`${sortBy}-${sortOrder}`} onValueChange={(value) => {
//                 const [field, order] = value.split('-');
//                 setSortBy(field);
//                 setSortOrder(order as 'asc' | 'desc');
//               }}>
//                 <SelectTrigger className="w-full md:w-48">
//                   <SelectValue placeholder="Sort by" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="created_at-desc">Newest First</SelectItem>
//                   <SelectItem value="created_at-asc">Oldest First</SelectItem>
//                   <SelectItem value="total_price-desc">Highest Amount</SelectItem>
//                   <SelectItem value="total_price-asc">Lowest Amount</SelectItem>
//                   <SelectItem value="user_name-asc">Customer A-Z</SelectItem>
//                   <SelectItem value="user_name-desc">Customer Z-A</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>

//             {/* Transactions Table */}
//             <div className="border rounded-lg">
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Transaction ID</TableHead>
//                     <TableHead>Customer</TableHead>
//                     <TableHead>Amount</TableHead>
//                     <TableHead>Payment Method</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Date</TableHead>
//                     <TableHead>Tickets</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {filteredTransactions.length === 0 ? (
//                     <TableRow>
//                       <TableCell colSpan={8} className="text-center py-8 text-gray-500">
//                         No transactions found
//                       </TableCell>
//                     </TableRow>
//                   ) : (
//                     filteredTransactions.map((transaction) => (
//                       <TableRow key={transaction.transaction_id}>
//                         <TableCell className="font-medium">
//                           #{transaction.transaction_id}
//                         </TableCell>
//                         <TableCell>
//                           <div>
//                             <p className="font-medium">
//                               {transaction.user?.first_name} {transaction.user?.last_name}
//                             </p>
//                             <p className="text-sm text-gray-600">
//                               {transaction.user?.email}
//                             </p>
//                           </div>
//                         </TableCell>
//                         <TableCell className="font-medium">
//                           {formatCurrency(transaction.total_price)}
//                         </TableCell>
//                         <TableCell>
//                           {getPaymentMethodLabel(transaction.payment_method)}
//                         </TableCell>
//                         <TableCell>
//                           {getStatusBadge(transaction.status)}
//                         </TableCell>
//                         <TableCell>
//                           {formatDate(transaction.created_at)}
//                         </TableCell>
//                         <TableCell>
//                           <Badge variant="outline">
//                             {transaction.tickets?.length || 0} ticket(s)
//                           </Badge>
//                         </TableCell>
//                         <TableCell>
//                           <Button variant="outline" size="sm">
//                             <Eye className="h-4 w-4 mr-1" />
//                             View
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))
//                   )}
//                 </TableBody>
//               </Table>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }