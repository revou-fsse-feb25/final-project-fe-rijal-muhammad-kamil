"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Calendar, 
  Users, 
  Ticket,
  Eye,
  ShoppingCart
} from "lucide-react";
import { DashboardStats, RevenueData, Event } from "@/types/api";
import dashboardApi from "@/service/dashboard.api";

// Mock data - replace with actual API calls
const mockStats: DashboardStats = {
  totalEvents: 12,
  totalRevenue: 125000000,
  totalTicketsSold: 850,
  activeEvents: 8,
  upcomingEvents: 3,
  completedEvents: 1,
};

const mockMonthlyRevenue: RevenueData[] = [
  { month: "Jan", revenue: 15000000, ticketsSold: 120 },
  { month: "Feb", revenue: 18000000, ticketsSold: 145 },
  { month: "Mar", revenue: 22000000, ticketsSold: 180 },
  { month: "Apr", revenue: 19000000, ticketsSold: 155 },
  { month: "May", revenue: 25000000, ticketsSold: 200 },
  { month: "Jun", revenue: 26000000, ticketsSold: 210 },
];

const mockTopEvents: Event[] = [
  {
    event_id: 1,
    category_id: 1,
    organizer_id: 1,
    title: "Tech Conference 2024",
    description: "Annual technology conference",
    terms: "Terms and conditions apply",
    location: "Jakarta Convention Center",
    image_url: "https://example.com/image1.jpg",
    status: "ACTIVE",
    created_at: "2024-01-15T00:00:00Z",
    updated_at: "2024-01-15T00:00:00Z",
  },
  {
    event_id: 2,
    category_id: 2,
    organizer_id: 1,
    title: "Music Festival",
    description: "Summer music festival",
    terms: "Terms and conditions apply",
    location: "Gelora Bung Karno",
    image_url: "https://example.com/image2.jpg",
    status: "COMPLETED",
    created_at: "2024-01-20T00:00:00Z",
    updated_at: "2024-01-20T00:00:00Z",
  },
];

const mockEventPerformance = [
  {
    eventId: 1,
    eventName: "Tech Conference 2024",
    ticketsSold: 450,
    totalTickets: 500,
    revenue: 67500000,
    conversionRate: 12.5,
    views: 3600,
  },
  {
    eventId: 2,
    eventName: "Music Festival",
    ticketsSold: 280,
    totalTickets: 300,
    revenue: 42000000,
    conversionRate: 8.2,
    views: 3415,
  },
  {
    eventId: 3,
    eventName: "Food & Culinary Expo",
    ticketsSold: 120,
    totalTickets: 200,
    revenue: 15500000,
    conversionRate: 6.0,
    views: 2000,
  },
];

const mockSalesData = [
  { period: "Week 1", sales: 45, revenue: 6750000 },
  { period: "Week 2", sales: 78, revenue: 11700000 },
  { period: "Week 3", sales: 92, revenue: 13800000 },
  { period: "Week 4", sales: 156, revenue: 23400000 },
  { period: "Week 5", sales: 134, revenue: 20100000 },
  { period: "Week 6", sales: 189, revenue: 28350000 },
];

export default function AnalyticsPage() {
  const [stats, setStats] = useState<DashboardStats>(mockStats);
  const [topEvents, setTopEvents] = useState<Event[]>(mockTopEvents);
  const [monthlyRevenue, setMonthlyRevenue] = useState<RevenueData[]>(mockMonthlyRevenue);
  const [selectedPeriod, setSelectedPeriod] = useState("6months");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const data = await dashboardApi.getAnalyticsData(selectedPeriod, token || undefined);
      
      setStats(data.stats);
      setMonthlyRevenue(data.monthlyRevenue);
      setTopEvents(data.topEvents);
    } catch (error) {
      console.error('Failed to fetch analytics data:', error);
      // Fallback to mock data on error
      setStats(mockStats);
      setMonthlyRevenue(mockMonthlyRevenue);
      setTopEvents(mockTopEvents);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const calculateGrowth = (current: number, previous: number) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  };

  // Calculate growth rates (mock data)
  const revenueGrowth = calculateGrowth(26000000, 25000000);
  const ticketGrowth = calculateGrowth(189, 134);
  const customerGrowth = calculateGrowth(420, 380);
  const eventGrowth = calculateGrowth(12, 10);

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? (
      <TrendingUp className="h-4 w-4 text-green-600" />
    ) : (
      <TrendingDown className="h-4 w-4 text-red-600" />
    );
  };

  const getGrowthColor = (growth: number) => {
    return growth >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your event performance and business metrics.
          </p>
        </div>
        <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1month">Last Month</SelectItem>
            <SelectItem value="3months">Last 3 Months</SelectItem>
            <SelectItem value="6months">Last 6 Months</SelectItem>
            <SelectItem value="1year">Last Year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            <div className="flex items-center text-xs">
              {getGrowthIcon(revenueGrowth)}
              <span className={`ml-1 ${getGrowthColor(revenueGrowth)}`}>
                {formatPercentage(Math.abs(revenueGrowth))} from last period
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tickets Sold</CardTitle>
            <Ticket className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTicketsSold}</div>
            <div className="flex items-center text-xs">
              {getGrowthIcon(ticketGrowth)}
              <span className={`ml-1 ${getGrowthColor(ticketGrowth)}`}>
                {formatPercentage(Math.abs(ticketGrowth))} from last period
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeEvents}</div>
            <div className="flex items-center text-xs">
              {getGrowthIcon(customerGrowth)}
              <span className={`ml-1 ${getGrowthColor(customerGrowth)}`}>
                {formatPercentage(Math.abs(customerGrowth))} from last period
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEvents}</div>
            <div className="flex items-center text-xs">
              {getGrowthIcon(eventGrowth)}
              <span className={`ml-1 ${getGrowthColor(eventGrowth)}`}>
                {formatPercentage(Math.abs(eventGrowth))} from last period
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenue Trends</TabsTrigger>
          <TabsTrigger value="events">Event Performance</TabsTrigger>
          <TabsTrigger value="sales">Sales Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Revenue</CardTitle>
                <CardDescription>
                  Revenue trends over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((data: RevenueData, index: number) => {
                    const maxRevenue = Math.max(...monthlyRevenue.map((d: RevenueData) => d.revenue));
                    const percentage = (data.revenue / maxRevenue) * 100;
                    return (
                      <div key={data.month} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{data.month}</span>
                          <span className="text-muted-foreground">
                            {formatCurrency(data.revenue)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Breakdown</CardTitle>
                <CardDescription>
                  Revenue distribution by event category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-500 rounded-full mr-2" />
                      <span className="text-sm">Technology Events</span>
                    </div>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                      <span className="text-sm">Music & Entertainment</span>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2" />
                      <span className="text-sm">Food & Culinary</span>
                    </div>
                    <span className="text-sm font-medium">15%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-purple-500 rounded-full mr-2" />
                      <span className="text-sm">Others</span>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Event Performance</CardTitle>
              <CardDescription>
                Detailed performance metrics for your events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {mockEventPerformance.map((event) => {
                  const soldPercentage = (event.ticketsSold / event.totalTickets) * 100;
                  return (
                    <div key={event.eventId} className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{event.eventName}</h3>
                        <Badge variant="outline">
                          {formatPercentage(soldPercentage)} sold
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Ticket className="h-4 w-4 mr-1" />
                            Tickets Sold
                          </div>
                          <div className="font-medium">
                            {event.ticketsSold} / {event.totalTickets}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-muted-foreground mb-1">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Revenue
                          </div>
                          <div className="font-medium">
                            {formatCurrency(event.revenue)}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-muted-foreground mb-1">
                            <Eye className="h-4 w-4 mr-1" />
                            Views
                          </div>
                          <div className="font-medium">
                            {event.views.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center text-muted-foreground mb-1">
                            <ShoppingCart className="h-4 w-4 mr-1" />
                            Conversion
                          </div>
                          <div className="font-medium">
                            {formatPercentage(event.conversionRate)}
                          </div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${soldPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales">
          <div className="grid gap-4 md:grid-cols-2">
            {/* Sales Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Trends</CardTitle>
                <CardDescription>
                  Weekly sales performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSalesData.map((data, index) => {
                    const maxSales = Math.max(...mockSalesData.map(d => d.sales));
                    const percentage = (data.sales / maxSales) * 100;
                    return (
                      <div key={data.period} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{data.period}</span>
                          <div className="text-right">
                            <div className="font-medium">{data.sales} tickets</div>
                            <div className="text-xs text-muted-foreground">
                              {formatCurrency(data.revenue)}
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Performing Events */}
            <Card>
              <CardHeader>
                <CardTitle>Top Performing Events</CardTitle>
                <CardDescription>
                  Events with highest revenue this period
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEventPerformance
                    .sort((a, b) => b.revenue - a.revenue)
                    .slice(0, 3)
                    .map((event, index) => (
                      <div key={event.eventId} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-sm font-medium text-blue-600">
                              {index + 1}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-sm">{event.eventName}</p>
                            <p className="text-xs text-muted-foreground">
                              {event.ticketsSold} tickets sold
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-sm">
                            {formatCurrency(event.revenue)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {formatPercentage(event.conversionRate)} conversion
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}