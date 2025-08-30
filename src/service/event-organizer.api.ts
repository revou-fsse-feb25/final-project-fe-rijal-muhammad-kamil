// import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";
// import { 
//   EventOrganizer, 
//   CreateEventOrganizerRequest, 
//   UpdateEventOrganizerRequest,
//   ErrorResponse 
// } from "@/types/api";

// const api: AxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_API_URL || "https://final-project-be-rijal-muhammad-kamil-production.up.railway.app",
//   withCredentials: true,
// });

// export class EventOrganizerError extends Error {
//   constructor(
//     public type: "TIMEOUT_ERROR" | "NETWORK_ERROR" | "CLIENT_ERROR" | "SERVER_ERROR" | "CANCELED_ERROR" | "UNKNOWN_AXIOS_ERROR" | "UNKNOWN_ERROR",
//     public message: string,
//     public status?: number,
//     options?: { cause?: unknown },
//   ) {
//     super(message);
//     this.name = "EventOrganizerError";
//     if (options?.cause) (this as any).cause = options.cause;
//   }
// }

// interface EventOrganizerRequestOptions {
//   endpoint?: string;
//   method?: "GET" | "POST" | "PUT" | "DELETE";
//   data?: any;
//   params?: Record<string, any>;
//   token?: string;
//   timeout?: number;
//   cacheControl?: string;
//   signal?: AbortSignal;
// }

// export async function fetchEventOrganizer<T = unknown>({
//   endpoint = "",
//   method = "GET",
//   data,
//   params,
//   token,
//   timeout = 30000,
//   cacheControl = "no-store",
//   signal,
// }: EventOrganizerRequestOptions): Promise<T> {
//   const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

//   const headers: Record<string, string> = {
//     "Cache-Control": cacheControl,
//     "Content-Type": "application/json",
//   };
//   if (token) headers["Authorization"] = `Bearer ${token}`;

//   try {
//     const res: AxiosResponse<T> = await api.request<T>({
//       url: safeEndpoint,
//       method,
//       data,
//       params,
//       timeout,
//       headers,
//       signal,
//     });
//     return res.data;
//   } catch (err: unknown) {
//     if (axios.isAxiosError(err)) {
//       const e = err as AxiosError<ErrorResponse>;
//       const status = e.response?.status;
//       const serverMsg = e.response?.data?.message ?? e.response?.data?.error ?? 
//         (typeof e.response?.data === "string" ? e.response?.data : undefined);

//       if (e.code === "ERR_CANCELED") {
//         throw new EventOrganizerError("CANCELED_ERROR", serverMsg ?? "Request was canceled.", status, { cause: err });
//       }
//       if (e.code === "ECONNABORTED") {
//         throw new EventOrganizerError("TIMEOUT_ERROR", "The request took too long to respond. Please try again.", status, { cause: err });
//       }
//       if (!e.response) {
//         throw new EventOrganizerError("NETWORK_ERROR", serverMsg ?? "Cannot reach the server.", undefined, { cause: err });
//       }
//       if (status && status >= 400 && status < 500) {
//         throw new EventOrganizerError("CLIENT_ERROR", serverMsg ?? `Client error (${status})`, status, { cause: err });
//       }
//       if (status && status >= 500) {
//         throw new EventOrganizerError("SERVER_ERROR", serverMsg ?? `Server error (${status})`, status, { cause: err });
//       }
//       throw new EventOrganizerError("UNKNOWN_AXIOS_ERROR", serverMsg ?? "An unknown axios error occurred.", status, { cause: err });
//     }
//     throw new EventOrganizerError("UNKNOWN_ERROR", "An unknown error occurred.", undefined, { cause: err });
//   }
// }

// // Event Organizer API Functions
// export const eventOrganizerApi = {
//   // Get all event organizers
//   getAll: async (token?: string): Promise<EventOrganizer[]> => {
//     return fetchEventOrganizer<EventOrganizer[]>({
//       endpoint: "/event-organizer",
//       method: "GET",
//       token,
//     });
//   },

//   // Get event organizer by ID
//   getById: async (id: number, token?: string): Promise<EventOrganizer> => {
//     return fetchEventOrganizer<EventOrganizer>({
//       endpoint: `/event-organizer/${id}`,
//       method: "GET",
//       token,
//     });
//   },

//   // Get current user's event organizer profile
//   getProfile: async (token?: string): Promise<EventOrganizer> => {
//     return fetchEventOrganizer<EventOrganizer>({
//       endpoint: "/event-organizer/profile",
//       method: "GET",
//       token,
//     });
//   },

//   // Create event organizer profile
//   create: async (data: CreateEventOrganizerRequest, token?: string): Promise<EventOrganizer> => {
//     return fetchEventOrganizer<EventOrganizer>({
//       endpoint: "/event-organizer",
//       method: "POST",
//       data,
//       token,
//     });
//   },

//   // Update event organizer profile
//   update: async (id: number, data: UpdateEventOrganizerRequest, token?: string): Promise<EventOrganizer> => {
//     return fetchEventOrganizer<EventOrganizer>({
//       endpoint: `/event-organizer/${id}`,
//       method: "PUT",
//       data,
//       token,
//     });
//   },

//   // Delete event organizer
//   delete: async (id: number, token?: string): Promise<void> => {
//     return fetchEventOrganizer<void>({
//       endpoint: `/event-organizer/${id}`,
//       method: "DELETE",
//       token,
//     });
//   },
// };

// export default eventOrganizerApi;