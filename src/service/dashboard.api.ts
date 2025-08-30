// import { fetchEvent } from "./event-api";
// import { fetchEventOrganizer } from "./event-organizer.api";
// import { DashboardStats, Event, Transaction, RevenueData } from "@/types/api";

// // Dashboard API Functions
// export const dashboardApi = {
//   // Get dashboard statistics for event organizer
//   getEODashboardStats: async (token?: string): Promise<DashboardStats> => {
//     return fetchEventOrganizer<DashboardStats>({
//       endpoint: "/event-organizer/dashboard/stats",
//       method: "GET",
//       token,
//     });
//   },

//   // Get recent events for event organizer
//   getRecentEvents: async (limit: number = 5, token?: string): Promise<Event[]> => {
//     return fetchEvent<Event[]>({
//       endpoint: "/events",
//       method: "GET",
//       params: { limit, sort: "created_at", order: "desc" },
//       token,
//     });
//   },

//   // Get recent transactions for event organizer
//   getRecentTransactions: async (limit: number = 5, token?: string): Promise<Transaction[]> => {
//     return fetchEvent<Transaction[]>({
//       endpoint: "/transactions",
//       method: "GET",
//       params: { limit, sort: "created_at", order: "desc" },
//       token,
//     });
//   },

//   // Get analytics data for event organizer
//   getAnalyticsData: async (period: string = "6months", token?: string): Promise<{
//     stats: DashboardStats;
//     monthlyRevenue: RevenueData[];
//     topEvents: Event[];
//   }> => {
//     const [stats, monthlyRevenue, topEvents] = await Promise.all([
//       fetchEventOrganizer<DashboardStats>({
//         endpoint: "/event-organizer/analytics/stats",
//         method: "GET",
//         params: { period },
//         token,
//       }),
//       fetchEventOrganizer<RevenueData[]>({
//         endpoint: "/event-organizer/analytics/revenue",
//         method: "GET",
//         params: { period },
//         token,
//       }),
//       fetchEvent<Event[]>({
//         endpoint: "/events/top-performing",
//         method: "GET",
//         params: { period, limit: 10 },
//         token,
//       }),
//     ]);

//     return { stats, monthlyRevenue, topEvents };
//   },

//   // Get user dashboard statistics
//   getUserDashboardStats: async (token?: string): Promise<{
//     totalEvents: number;
//     upcomingEvents: number;
//     totalSpent: number;
//     totalTickets: number;
//   }> => {
//     return fetchEvent<{
//       totalEvents: number;
//       upcomingEvents: number;
//       totalSpent: number;
//       totalTickets: number;
//     }>({
//       endpoint: "/users/dashboard/stats",
//       method: "GET",
//       token,
//     });
//   },

//   // Get user's upcoming events
//   getUserUpcomingEvents: async (limit: number = 5, token?: string): Promise<Event[]> => {
//     return fetchEvent<Event[]>({
//       endpoint: "/users/events/upcoming",
//       method: "GET",
//       params: { limit },
//       token,
//     });
//   },

//   // Get user's recent transactions
//   getUserRecentTransactions: async (limit: number = 5, token?: string): Promise<Transaction[]> => {
//     return fetchEvent<Transaction[]>({
//       endpoint: "/transactions/my-transactions",
//       method: "GET",
//       params: { limit, sort: "created_at", order: "desc" },
//       token,
//     });
//   },
// };

// export default dashboardApi;