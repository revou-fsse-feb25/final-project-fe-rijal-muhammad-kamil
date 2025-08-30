// import { fetchEvent } from "./event-api";
// import { Transaction, CreateTransactionRequest, DashboardStats } from "@/types/api";

// // Transaction API Functions
// export const transactionApi = {
//   // Create a new transaction
//   createTransaction: async (data: CreateTransactionRequest, token?: string): Promise<Transaction> => {
//     return fetchEvent<Transaction>({
//       endpoint: "/transactions",
//       method: "POST",
//       data,
//       token,
//     });
//   },

//   // Get current user's transactions
//   getMyTransactions: async (token?: string): Promise<Transaction[]> => {
//     return fetchEvent<Transaction[]>({
//       endpoint: "/transactions/my-transactions",
//       method: "GET",
//       token,
//     });
//   },

//   // Get transactions by user ID (admin or own)
//   getTransactionsByUserId: async (userId: number, token?: string): Promise<Transaction[]> => {
//     return fetchEvent<Transaction[]>({
//       endpoint: `/transactions/user/${userId}`,
//       method: "GET",
//       token,
//     });
//   },

//   // Get transaction by ID
//   getTransactionById: async (id: number, token?: string): Promise<Transaction> => {
//     return fetchEvent<Transaction>({
//       endpoint: `/transactions/${id}`,
//       method: "GET",
//       token,
//     });
//   },

//   // Update transaction status
//   updateTransaction: async (
//     id: number,
//     data: { status?: string; payment_method?: string },
//     token?: string
//   ): Promise<Transaction> => {
//     return fetchEvent<Transaction>({
//       endpoint: `/transactions/${id}`,
//       method: "PUT",
//       data,
//       token,
//     });
//   },

//   // Cancel transaction (update status to CANCELED)
//   cancelTransaction: async (id: number, token?: string): Promise<Transaction> => {
//     return fetchEvent<Transaction>({
//       endpoint: `/transactions/${id}`,
//       method: "PUT",
//       data: { status: "CANCELED" },
//       token,
//     });
//   },
// };

// export default transactionApi;