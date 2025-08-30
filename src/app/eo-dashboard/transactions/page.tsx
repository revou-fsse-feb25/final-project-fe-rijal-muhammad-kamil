// "use client";

// import { useEffect, useState } from "react";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { 
//   Search, 
//   Filter, 
//   Download, 
//   Eye, 
//   DollarSign, 
//   Calendar, 
//   User, 
//   CreditCard,
//   CheckCircle,
//   XCircle,
//   Clock,
//   AlertCircle
// } from "lucide-react";
// import { Transaction, TransactionWithDetails } from "@/types/api";
// import transactionApi from "@/service/transaction.api";

// // Mock data - will be replaced with API data
// const mockTransactions: TransactionWithDetails[] = [
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
//     user: {
//       id: 101,
//       name: "John Doe",
//       email: "john.doe@example.com",
//       phone: "+62812345678",
//       role: "customer",
//       createdAt: "2024-01-01T00:00:00Z",
//       updatedAt: "2024-01-01T00:00:00Z",
//     },
//     event: {
//       id: 1,
//       name: "Tech Conference 2024",
//       description: "Annual technology conference",
//       location: "Jakarta Convention Center",
//       startDate: "2024-03-15",
//       endDate: "2024-03-17",
//       status: "active",
//       categoryId: 1,
//       eventOrganizerId: 1,
//       createdAt: "2024-01-15T00:00:00Z",
//       updatedAt: "2024-01-15T00:00:00Z",
//     },
//     ticketType: {
//       id: 1,
//       eventPeriodId: 1,
//       categoryId: 1,
//       name: "Early Bird",
//       description: "Early bird special price",
//       price: 150000,
//       quantity: 100,
//       soldQuantity: 45,
//       startDate: "2024-01-01",
//       endDate: "2024-02-29",
//       createdAt: "2024-01-15T00:00:00Z",
//       updatedAt: "2024-01-15T00:00:00Z",
//     },
//   },
//   {
//     id: 2,
//     userId: 102,
//     eventId: 2,
//     ticketTypeId: 2,
//     quantity: 1,
//     totalAmount: 250000,
//     status: "pending",
//     paymentMethod: "bank_transfer",
//     paymentReference: "TXN-2024-002",
//     createdAt: "2024-01-16T14:20:00Z",
//     updatedAt: "2024-01-16T14:20:00Z",
//     user: {
//       id: 102,
//       name: "Jane Smith",
//       email: "jane.smith@example.com",
//       phone: "+62823456789",
//       role: "customer",
//       createdAt: "2024-01-02T00:00:00Z",
//       updatedAt: "2024-01-02T00:00:00Z",
//     },
//     event: {
//       id: 2,
//       name: "Music Festival",
//       description: "Summer music festival",
//       location: "Gelora Bung Karno",
//       startDate: "2024-04-20",
//       endDate: "2024-04-22",
//       status: "active",
//       categoryId: 2,
//       eventOrganizerId: 1,
//       createdAt: "2024-01-20T00:00:00Z",
//       updatedAt: "2024-01-20T00:00:00Z",
//     },
//     ticketType: {
//       id: 2,
//       eventPeriodId: 2,
//       categoryId: 2,
//       name: "Regular",
//       description: "Regular price ticket",
//       price: 250000,
//       quantity: 200,
//       soldQuantity: 78,
//       startDate: "2024-02-01",
//       endDate: "2024-04-15",
//       createdAt: "2024-01-20T00:00:00Z",
//       updatedAt: "2024-01-20T00:00:00Z",
//     },
//   },
//   {
//     id: 3,
//     userId: 103,
//     eventId: 1,
//     ticketTypeId: 1,
//     quantity: 3,
//     totalAmount: 450000,
//     status: "failed",
//     paymentMethod: "e_wallet",
//     paymentReference: "TXN-2024-003",
//     createdAt: "2024-01-17T09:15:00Z",
//     updatedAt: "2024-01-17T09:20:00Z",
//     user: {
//       id: 103,
//       name: "Bob Johnson",
//       email: "bob.johnson@example.com",
//       phone: "+62834567890",
//       role: "customer",
//       createdAt: "2024-01-03T00:00:00Z",
//       updatedAt: "2024-01-03T00:00:00Z",
//     },
//     event: {
//       id: 1,
//       name: "Tech Conference 2024",
//       description: "Annual technology conference",
//       location: "Jakarta Convention Center",
//       startDate: "2024-03-15",
//       endDate: "2024-03-17",
//       status: "active",
//       categoryId: 1,
//       eventOrganizerId: 1,
//       createdAt: "2024-01-15T00:00:00Z",
//       updatedAt: "2024-01-15T00:00:00Z",
//     },
//     ticketType: {
//       id: 1,
//       eventPeriodId: 1,
//       categoryId: 1,
//       name: "Early Bird",
//       description: "Early bird special price",
//       price: 150000,
//       quantity: 100,
//       soldQuantity: 45,
//       startDate: "2024-01-01",
//       endDate: "2024-02-29",
//       createdAt: "2024-01-15T00:00:00Z",
//       updatedAt: "2024-01-15T00:00:00Z",
//     },
//   },
// ];

// const mockSummary = {
//   totalTransactions: 156,
//   totalRevenue: 45750000,
//   completedTransactions: 134,
//   pendingTransactions: 15,
//   failedTransactions: 7,
//   averageOrderValue: 293589,
// };

// export default function TransactionsPage() {
//   const [transactions, setTransactions] = useState<TransactionWithDetails[]>(mockTransactions);
//   const [filteredTransactions, setFilteredTransactions] = useState<TransactionWithDetails[]>(mockTransactions);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState("all");
//   const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");
//   const [selectedTransaction, setSelectedTransaction] = useState<TransactionWithDetails | null>(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchTransactions();
//   }, []);

//   const fetchTransactions = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const data = await transactionApi.getMyTransactions(token || undefined);
//       setTransactions(data);
//     } catch (error) {
//       console.error('Failed to fetch transactions:', error);
//       // Fallback to mock data on error
//       setTransactions(mockTransactions);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     let filtered = transactions;

//     // Filter by search term
//     if (searchTerm) {
//       filtered = filtered.filter(
//         (transaction) =>
//           transaction.paymentReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           transaction.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           transaction.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           transaction.event.name.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Filter by status
//     if (statusFilter !== "all") {
//       filtered = filtered.filter((transaction) => transaction.status === statusFilter);
//     }

//     // Filter by payment method
//     if (paymentMethodFilter !== "all") {
//       filtered = filtered.filter((transaction) => transaction.paymentMethod === paymentMethodFilter);
//     }

//     setFilteredTransactions(filtered);
//   }, [transactions, searchTerm, statusFilter, paymentMethodFilter]);

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

//   const getStatusBadge = (status: string) => {
//     const statusConfig = {
//       completed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
//       pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
//       failed: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
//       cancelled: { variant: "outline" as const, icon: AlertCircle, color: "text-gray-600" },
//     };

//     const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
//     const Icon = config.icon;

//     return (
//       <Badge variant={config.variant} className="flex items-center gap-1">
//         <Icon className="h-3 w-3" />
//         {status.charAt(0).toUpperCase() + status.slice(1)}
//       </Badge>
//     );
//   };

//   const getPaymentMethodLabel = (method: string) => {
//     const methods = {
//       credit_card: "Credit Card",
//       bank_transfer: "Bank Transfer",
//       e_wallet: "E-Wallet",
//       cash: "Cash",
//     };
//     return methods[method as keyof typeof methods] || method;
//   };

//   const exportTransactions = () => {
//     // TODO: Implement export functionality
//     console.log("Exporting transactions...");
//   };

//   const handleUpdateStatus = async (transactionId: number, newStatus: string) => {
//     try {
//       const token = localStorage.getItem('token');
//       await transactionApi.updateTransaction(
//         transactionId,
//         { status: newStatus },
//         token || undefined
//       );
      
//       // Update local state
//       setTransactions(prev =>
//         prev.map(t =>
//           t.id === transactionId
//             ? { ...t, status: newStatus }
//             : t
//         )
//       );
      
//       alert("Transaction status updated successfully!");
//     } catch (error) {
//       console.error("Failed to update transaction status:", error);
//       alert("Failed to update transaction status. Please try again.");
//     }
//   };

//   return (
//     <div className="space-y-8">
//       {/* Header */}
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
//           <p className="text-muted-foreground">
//             Monitor and manage all ticket sales and transactions.
//           </p>
//         </div>
//         <Button onClick={exportTransactions} className="flex items-center gap-2">
//           <Download className="h-4 w-4" />
//           Export
//         </Button>
//       </div>

//       {/* Summary Cards */}
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{formatCurrency(mockSummary.totalRevenue)}</div>
//             <p className="text-xs text-muted-foreground">
//               From {mockSummary.totalTransactions} transactions
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Completed</CardTitle>
//             <CheckCircle className="h-4 w-4 text-green-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{mockSummary.completedTransactions}</div>
//             <p className="text-xs text-muted-foreground">
//               {((mockSummary.completedTransactions / mockSummary.totalTransactions) * 100).toFixed(1)}% success rate
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending</CardTitle>
//             <Clock className="h-4 w-4 text-yellow-600" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{mockSummary.pendingTransactions}</div>
//             <p className="text-xs text-muted-foreground">
//               Awaiting payment confirmation
//             </p>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Average Order</CardTitle>
//             <CreditCard className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{formatCurrency(mockSummary.averageOrderValue)}</div>
//             <p className="text-xs text-muted-foreground">
//               Per transaction
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters and Search */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Transaction Management</CardTitle>
//           <CardDescription>
//             Search, filter, and manage all transactions
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex flex-col md:flex-row gap-4 mb-6">
//             <div className="flex-1">
//               <Label htmlFor="search">Search</Label>
//               <div className="relative">
//                 <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   id="search"
//                   placeholder="Search by reference, customer, or event..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   className="pl-8"
//                 />
//               </div>
//             </div>
//             <div>
//               <Label htmlFor="status-filter">Status</Label>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-[150px]">
//                   <SelectValue placeholder="All Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="completed">Completed</SelectItem>
//                   <SelectItem value="pending">Pending</SelectItem>
//                   <SelectItem value="failed">Failed</SelectItem>
//                   <SelectItem value="cancelled">Cancelled</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="payment-filter">Payment Method</Label>
//               <Select value={paymentMethodFilter} onValueChange={setPaymentMethodFilter}>
//                 <SelectTrigger className="w-[150px]">
//                   <SelectValue placeholder="All Methods" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Methods</SelectItem>
//                   <SelectItem value="credit_card">Credit Card</SelectItem>
//                   <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
//                   <SelectItem value="e_wallet">E-Wallet</SelectItem>
//                   <SelectItem value="cash">Cash</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>

//           {/* Transactions Table */}
//           <div className="rounded-md border">
//             <Table>
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Reference</TableHead>
//                   <TableHead>Customer</TableHead>
//                   <TableHead>Event</TableHead>
//                   <TableHead>Ticket Type</TableHead>
//                   <TableHead>Quantity</TableHead>
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Payment Method</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Date</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {filteredTransactions.length === 0 ? (
//                   <TableRow>
//                     <TableCell colSpan={10} className="text-center py-8">
//                       No transactions found.
//                     </TableCell>
//                   </TableRow>
//                 ) : (
//                   filteredTransactions.map((transaction) => (
//                     <TableRow key={transaction.id}>
//                       <TableCell className="font-medium">
//                         {transaction.paymentReference}
//                       </TableCell>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{transaction.user.name}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {transaction.user.email}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{transaction.event.name}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {transaction.event.location}
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>
//                         <div>
//                           <div className="font-medium">{transaction.ticketType.name}</div>
//                           <div className="text-sm text-muted-foreground">
//                             {formatCurrency(transaction.ticketType.price)} each
//                           </div>
//                         </div>
//                       </TableCell>
//                       <TableCell>{transaction.quantity}</TableCell>
//                       <TableCell className="font-medium">
//                         {formatCurrency(transaction.totalAmount)}
//                       </TableCell>
//                       <TableCell>
//                         {getPaymentMethodLabel(transaction.paymentMethod)}
//                       </TableCell>
//                       <TableCell>
//                         {getStatusBadge(transaction.status)}
//                       </TableCell>
//                       <TableCell>
//                         {formatDate(transaction.createdAt)}
//                       </TableCell>
//                       <TableCell>
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => setSelectedTransaction(transaction)}
//                             >
//                               <Eye className="h-4 w-4" />
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="max-w-2xl">
//                             <DialogHeader>
//                               <DialogTitle>Transaction Details</DialogTitle>
//                               <DialogDescription>
//                                 Reference: {transaction.paymentReference}
//                               </DialogDescription>
//                             </DialogHeader>
//                             {selectedTransaction && (
//                               <div className="space-y-6">
//                                 <div className="grid grid-cols-2 gap-4">
//                                   <div>
//                                     <h4 className="font-semibold mb-2">Customer Information</h4>
//                                     <div className="space-y-1 text-sm">
//                                       <p><span className="font-medium">Name:</span> {selectedTransaction.user.name}</p>
//                                       <p><span className="font-medium">Email:</span> {selectedTransaction.user.email}</p>
//                                       <p><span className="font-medium">Phone:</span> {selectedTransaction.user.phone}</p>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h4 className="font-semibold mb-2">Event Information</h4>
//                                     <div className="space-y-1 text-sm">
//                                       <p><span className="font-medium">Event:</span> {selectedTransaction.event.name}</p>
//                                       <p><span className="font-medium">Location:</span> {selectedTransaction.event.location}</p>
//                                       <p><span className="font-medium">Date:</span> {selectedTransaction.event.startDate} - {selectedTransaction.event.endDate}</p>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div>
//                                   <h4 className="font-semibold mb-2">Transaction Details</h4>
//                                   <div className="grid grid-cols-2 gap-4 text-sm">
//                                     <p><span className="font-medium">Ticket Type:</span> {selectedTransaction.ticketType.name}</p>
//                                     <p><span className="font-medium">Quantity:</span> {selectedTransaction.quantity}</p>
//                                     <p><span className="font-medium">Unit Price:</span> {formatCurrency(selectedTransaction.ticketType.price)}</p>
//                                     <p><span className="font-medium">Total Amount:</span> {formatCurrency(selectedTransaction.totalAmount)}</p>
//                                     <p><span className="font-medium">Payment Method:</span> {getPaymentMethodLabel(selectedTransaction.paymentMethod)}</p>
//                                     <p><span className="font-medium">Status:</span> {getStatusBadge(selectedTransaction.status)}</p>
//                                     <p><span className="font-medium">Created:</span> {formatDate(selectedTransaction.createdAt)}</p>
//                                     <p><span className="font-medium">Updated:</span> {formatDate(selectedTransaction.updatedAt)}</p>
//                                   </div>
//                                 </div>
//                               </div>
//                             )}
//                           </DialogContent>
//                         </Dialog>
//                       </TableCell>
//                     </TableRow>
//                   ))
//                 )}
//               </TableBody>
//             </Table>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }