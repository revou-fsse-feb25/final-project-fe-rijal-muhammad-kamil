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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Search, 
  Eye, 
  X, 
  Download,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  Calendar,
  MapPin,
  CreditCard,
  Ticket
} from "lucide-react";
import { Transaction, UserDashboardTransaction } from "@/types/api";
import transactionApi from "@/service/transaction.api";

// Mock data - will be replaced with API data
const mockTransactions: UserDashboardTransaction[] = [
  {
    id: 1,
    userId: 101,
    eventId: 1,
    ticketTypeId: 1,
    quantity: 2,
    totalAmount: 300000,
    status: "completed",
    paymentMethod: "credit_card",
    paymentReference: "TXN-2024-001",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:35:00Z",
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+62812345678",
      role: "customer",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    event: {
      id: 1,
      name: "Tech Conference 2024",
      description: "Annual technology conference",
      location: "Jakarta Convention Center",
      startDate: "2024-03-15",
      endDate: "2024-03-17",
      status: "active",
      categoryId: 1,
      eventOrganizerId: 1,
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
    ticketType: {
      id: 1,
      eventPeriodId: 1,
      categoryId: 1,
      name: "Early Bird",
      description: "Early bird special price",
      price: 150000,
      quantity: 100,
      soldQuantity: 45,
      startDate: "2024-01-01",
      endDate: "2024-02-29",
      createdAt: "2024-01-15T00:00:00Z",
      updatedAt: "2024-01-15T00:00:00Z",
    },
  },
  {
    id: 2,
    userId: 101,
    eventId: 2,
    ticketTypeId: 2,
    quantity: 1,
    totalAmount: 250000,
    status: "pending",
    paymentMethod: "bank_transfer",
    paymentReference: "TXN-2024-002",
    createdAt: "2024-01-16T14:20:00Z",
    updatedAt: "2024-01-16T14:20:00Z",
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+62812345678",
      role: "customer",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    event: {
      id: 2,
      name: "Music Festival",
      description: "Summer music festival",
      location: "Gelora Bung Karno",
      startDate: "2024-04-20",
      endDate: "2024-04-22",
      status: "active",
      categoryId: 2,
      eventOrganizerId: 1,
      createdAt: "2024-01-20T00:00:00Z",
      updatedAt: "2024-01-20T00:00:00Z",
    },
    ticketType: {
      id: 2,
      eventPeriodId: 2,
      categoryId: 2,
      name: "Regular",
      description: "Regular price ticket",
      price: 250000,
      quantity: 200,
      soldQuantity: 78,
      startDate: "2024-02-01",
      endDate: "2024-04-15",
      createdAt: "2024-01-20T00:00:00Z",
      updatedAt: "2024-01-20T00:00:00Z",
    },
  },
  {
    id: 3,
    userId: 101,
    eventId: 3,
    ticketTypeId: 3,
    quantity: 3,
    totalAmount: 450000,
    status: "cancelled",
    paymentMethod: "e_wallet",
    paymentReference: "TXN-2024-003",
    createdAt: "2024-01-17T09:15:00Z",
    updatedAt: "2024-01-17T09:20:00Z",
    user: {
      id: 101,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+62812345678",
      role: "customer",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
    },
    event: {
      id: 3,
      name: "Food & Culinary Expo",
      description: "Annual food and culinary exhibition",
      location: "ICE BSD",
      startDate: "2024-05-10",
      endDate: "2024-05-12",
      status: "active",
      categoryId: 3,
      eventOrganizerId: 2,
      createdAt: "2024-01-25T00:00:00Z",
      updatedAt: "2024-01-25T00:00:00Z",
    },
    ticketType: {
      id: 3,
      eventPeriodId: 3,
      categoryId: 3,
      name: "VIP",
      description: "VIP access with special privileges",
      price: 150000,
      quantity: 50,
      soldQuantity: 25,
      startDate: "2024-02-01",
      endDate: "2024-05-05",
      createdAt: "2024-01-25T00:00:00Z",
      updatedAt: "2024-01-25T00:00:00Z",
    },
  },
];

export default function UserTransactionsPage() {
  const [transactions, setTransactions] = useState<UserDashboardTransaction[]>(mockTransactions);
  const [filteredTransactions, setFilteredTransactions] = useState<UserDashboardTransaction[]>(mockTransactions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransaction, setSelectedTransaction] = useState<UserDashboardTransaction | null>(null);
  const [loading, setLoading] = useState(false);
  const [cancellingId, setCancellingId] = useState<number | null>(null);

  useEffect(() => {
    fetchUserTransactions();
  }, []);

  const fetchUserTransactions = async () => {
    try {
      setLoading(true);
      // Get token from localStorage or your auth context
      const token = localStorage.getItem('token');
      const data = await transactionApi.getMyTransactions(token || undefined);
      
      // Transform API data to match UserDashboardTransaction interface
      const transformedData: UserDashboardTransaction[] = data.map(transaction => ({
        id: transaction.transaction_id,
        userId: transaction.user_id,
        eventId: transaction.event_id || 0,
        ticketTypeId: transaction.ticket_type_id || 0,
        quantity: transaction.quantity,
        totalAmount: transaction.total_amount,
        status: transaction.status.toLowerCase() as "pending" | "completed" | "failed" | "cancelled",
        paymentMethod: transaction.payment_method.toLowerCase().replace('_', '_') as "credit_card" | "bank_transfer" | "ovo" | "dana" | "gopay",
        paymentReference: transaction.payment_reference || `TXN-${transaction.transaction_id}`,
        createdAt: transaction.created_at,
        updatedAt: transaction.updated_at,
        // These would need to be fetched separately or included in the API response
        event: {
          id: transaction.event_id || 0,
          name: "Event Name", // This should come from API
          location: "Event Location", // This should come from API
          startDate: "2024-03-15", // This should come from API
          endDate: "2024-03-17", // This should come from API
        },
        ticketType: {
          id: transaction.ticket_type_id || 0,
          name: "Ticket Type", // This should come from API
          price: transaction.total_amount / transaction.quantity,
        },
      }));
      
      setTransactions(transformedData);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      // Fallback to mock data on error
      setTransactions(mockTransactions);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = transactions;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.paymentReference.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.event.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter((transaction) => transaction.status === statusFilter);
    }

    setFilteredTransactions(filtered);
  }, [transactions, searchTerm, statusFilter]);

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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: { variant: "default" as const, icon: CheckCircle, color: "text-green-600" },
      pending: { variant: "secondary" as const, icon: Clock, color: "text-yellow-600" },
      failed: { variant: "destructive" as const, icon: XCircle, color: "text-red-600" },
      cancelled: { variant: "outline" as const, icon: AlertCircle, color: "text-gray-600" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const getPaymentMethodLabel = (method: string) => {
    const methods = {
      credit_card: "Credit Card",
      bank_transfer: "Bank Transfer",
      e_wallet: "E-Wallet",
      cash: "Cash",
    };
    return methods[method as keyof typeof methods] || method;
  };

  const canCancelTransaction = (transaction: UserDashboardTransaction) => {
    // Can cancel if status is pending and event hasn't started yet
    const eventStartDate = new Date(transaction.event.startDate);
    const now = new Date();
    return transaction.status === "pending" && eventStartDate > now;
  };

  const handleCancelTransaction = async (transactionId: number) => {
    setCancellingId(transactionId);
    try {
      const token = localStorage.getItem('token');
      await transactionApi.cancelTransaction(transactionId, token || undefined);
      
      // Update local state
      setTransactions(prev => 
        prev.map(t => 
          t.id === transactionId 
            ? { ...t, status: "cancelled", updatedAt: new Date().toISOString() }
            : t
        )
      );
      
      // Show success message
      alert("Transaction cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel transaction:", error);
      alert("Failed to cancel transaction. Please try again.");
    } finally {
      setCancellingId(null);
    }
  };

  const downloadReceipt = (transaction: UserDashboardTransaction) => {
    // TODO: Implement receipt download
    console.log("Downloading receipt for transaction:", transaction.id);
    alert("Receipt download feature will be implemented soon!");
  };

  const totalSpent = transactions
    .filter(t => t.status === "completed")
    .reduce((sum, t) => sum + t.totalAmount, 0);

  const completedCount = transactions.filter(t => t.status === "completed").length;
  const pendingCount = transactions.filter(t => t.status === "pending").length;
  const cancelledCount = transactions.filter(t => t.status === "cancelled").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Transactions</h1>
        <p className="text-muted-foreground">
          View and manage your ticket purchases and transactions.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(totalSpent)}</div>
            <p className="text-xs text-muted-foreground">
              On completed transactions
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedCount}</div>
            <p className="text-xs text-muted-foreground">
              Successful purchases
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingCount}</div>
            <p className="text-xs text-muted-foreground">
              Awaiting payment
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cancelled</CardTitle>
            <XCircle className="h-4 w-4 text-gray-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{cancelledCount}</div>
            <p className="text-xs text-muted-foreground">
              Cancelled orders
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>
            Search and filter your transaction history
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
                  placeholder="Search by reference or event name..."
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
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Transactions Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Reference</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Ticket Type</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment Method</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-8">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.paymentReference}
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.event.name}</div>
                          <div className="text-sm text-muted-foreground flex items-center">
                            <MapPin className="h-3 w-3 mr-1" />
                            {transaction.event.location}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{transaction.ticketType.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {formatCurrency(transaction.ticketType.price)} each
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{transaction.quantity}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(transaction.totalAmount)}
                      </TableCell>
                      <TableCell>
                        {getPaymentMethodLabel(transaction.paymentMethod)}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(transaction.status)}
                      </TableCell>
                      <TableCell>
                        {formatDate(transaction.createdAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {/* View Details */}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedTransaction(transaction)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Transaction Details</DialogTitle>
                                <DialogDescription>
                                  Reference: {transaction.paymentReference}
                                </DialogDescription>
                              </DialogHeader>
                              {selectedTransaction && (
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <h4 className="font-semibold mb-2">Event Information</h4>
                                      <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Event:</span> {selectedTransaction.event.name}</p>
                                        <p><span className="font-medium">Location:</span> {selectedTransaction.event.location}</p>
                                        <p><span className="font-medium">Date:</span> {selectedTransaction.event.startDate} - {selectedTransaction.event.endDate}</p>
                                      </div>
                                    </div>
                                    <div>
                                      <h4 className="font-semibold mb-2">Ticket Information</h4>
                                      <div className="space-y-1 text-sm">
                                        <p><span className="font-medium">Type:</span> {selectedTransaction.ticketType.name}</p>
                                        <p><span className="font-medium">Quantity:</span> {selectedTransaction.quantity}</p>
                                        <p><span className="font-medium">Unit Price:</span> {formatCurrency(selectedTransaction.ticketType.price)}</p>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-semibold mb-2">Payment Details</h4>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                      <p><span className="font-medium">Total Amount:</span> {formatCurrency(selectedTransaction.totalAmount)}</p>
                                      <p><span className="font-medium">Payment Method:</span> {getPaymentMethodLabel(selectedTransaction.paymentMethod)}</p>
                                      <p><span className="font-medium">Status:</span> {getStatusBadge(selectedTransaction.status)}</p>
                                      <p><span className="font-medium">Created:</span> {formatDate(selectedTransaction.createdAt)}</p>
                                    </div>
                                  </div>
                                </div>
                              )}
                              <DialogFooter>
                                {selectedTransaction?.status === "completed" && (
                                  <Button onClick={() => downloadReceipt(selectedTransaction)}>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Receipt
                                  </Button>
                                )}
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                          {/* Cancel Transaction */}
                          {canCancelTransaction(transaction) && (
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:text-red-700"
                                  disabled={cancellingId === transaction.id}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Cancel Transaction</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to cancel this transaction? This action cannot be undone.
                                    <br /><br />
                                    <strong>Transaction:</strong> {transaction.paymentReference}<br />
                                    <strong>Event:</strong> {transaction.event.name}<br />
                                    <strong>Amount:</strong> {formatCurrency(transaction.totalAmount)}
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Keep Transaction</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleCancelTransaction(transaction.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                    disabled={cancellingId === transaction.id}
                                  >
                                    {cancellingId === transaction.id ? "Cancelling..." : "Cancel Transaction"}
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}