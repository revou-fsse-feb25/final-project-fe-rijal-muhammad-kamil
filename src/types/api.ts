// Types berdasarkan API Specification

// User Types
export interface User {
  user_id: number;
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE';
  password: string;
  role: 'ATTENDEE' | 'EVENT_ORGANIZER' | 'ADMIN';
  avatar_url?: string | null;
  status: 'ACTIVE' | 'SUSPENDED';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Event Organizer Types
export interface EventOrganizer {
  organizer_id: number;
  user_id: number;
  name: string;
  address: string;
  description?: string | null;
  logo_url?: string | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Event Category Types
export interface EventCategory {
  category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Event Types
export interface Event {
  event_id: number;
  category_id: number;
  organizer_id: number;
  title: string;
  description: string;
  terms: string;
  location: string;
  image_url: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Event Period Types
export interface EventPeriod {
  period_id: number;
  event_id: number;
  name: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  status: 'UPCOMING' | 'ONGOING' | 'COMPLETED';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Ticket Type Category Types
export interface TicketTypeCategory {
  category_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Ticket Type Types
export interface TicketType {
  type_id: number;
  period_id: number;
  category_id: number;
  price: number;
  discount?: number | null;
  quota: number;
  status: 'AVAILABLE' | 'SOLD_OUT';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Ticket Types
export interface Ticket {
  ticket_id: number;
  type_id: number;
  transaction_id?: number | null;
  ticket_code: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Transaction Types
export interface Transaction {
  transaction_id: number;
  user_id?: number | null;
  total_price: number;
  payment_method: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'OVO' | 'DANA' | 'GOPAY';
  status: 'PENDING' | 'SUCCESS' | 'FAILED' | 'CANCELED';
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
}

// Request/Response Types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  user: {
    user_id: number;
    email: string;
    role: 'ATTENDEE' | 'EVENT_ORGANIZER' | 'ADMIN';
    status: 'ACTIVE' | 'SUSPENDED';
  };
}

export interface CreateUserRequest {
  email: string;
  phone_number: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  gender: 'MALE' | 'FEMALE';
  password: string;
  role?: 'ATTENDEE' | 'EVENT_ORGANIZER' | 'ADMIN';
}

export interface CreateEventOrganizerRequest {
  name: string;
  address: string;
  description?: string;
  logo_url?: string;
}

export interface UpdateEventOrganizerRequest {
  name?: string;
  address?: string;
  description?: string;
  logo_url?: string;
}

export interface CreateEventRequest {
  category_id: number;
  title: string;
  description: string;
  terms: string;
  location: string;
  image_url: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
}

export interface UpdateEventRequest {
  category_id?: number;
  title?: string;
  description?: string;
  terms?: string;
  location?: string;
  image_url?: string;
  status?: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
}

export interface CreateTicketTypeRequest {
  category_id: number;
  price: number;
  discount?: number;
  quota: number;
  status: 'AVAILABLE' | 'SOLD_OUT';
}

export interface CreateTransactionRequest {
  payment_method: 'CREDIT_CARD' | 'BANK_TRANSFER' | 'OVO' | 'DANA' | 'GOPAY';
  ticket_ids: number[];
}

export interface UpdateUserRequest {
  email?: string;
  phone_number?: string;
  first_name?: string;
  last_name?: string;
  date_of_birth?: string;
  gender?: 'MALE' | 'FEMALE';
  avatar_url?: string | null;
  status?: 'ACTIVE' | 'SUSPENDED';
}

export interface ErrorResponse {
  statusCode: number;
  message: string;
  error: string;
}

// Dashboard Analytics Types
export interface DashboardStats {
  totalEvents: number;
  totalTicketsSold: number;
  totalRevenue: number;
  activeEvents: number;
  upcomingEvents: number;
  completedEvents: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  ticketsSold: number;
}

export interface EventWithDetails extends Event {
  category?: EventCategory;
  organizer?: EventOrganizer;
  periods?: EventPeriod[];
  ticketTypes?: TicketType[];
}

export interface TransactionWithDetails extends Transaction {
  user?: User;
  tickets?: Ticket[];
}

// Additional interfaces for user dashboard compatibility
export interface UserDashboardTransaction {
  id: number;
  userId: number;
  eventId: number;
  ticketTypeId: number;
  quantity: number;
  totalAmount: number;
  status: "completed" | "pending" | "cancelled" | "failed";
  paymentMethod: "credit_card" | "bank_transfer" | "e_wallet" | "cash";
  paymentReference: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
    updatedAt: string;
  };
  event: {
    id: number;
    name: string;
    description: string;
    location: string;
    startDate: string;
    endDate: string;
    status: string;
    categoryId: number;
    eventOrganizerId: number;
    createdAt: string;
    updatedAt: string;
  };
  ticketType: {
    id: number;
    eventPeriodId: number;
    categoryId: number;
    name: string;
    description: string;
    price: number;
    quantity: number;
    soldQuantity: number;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
  };
}

// Type alias for backward compatibility
export type TransactionWithDetails = UserDashboardTransaction;