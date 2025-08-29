# Event Management Platform - Frontend

[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/nHz2UZ-S)

## 📋 Deskripsi Proyek

Event Management Platform adalah aplikasi web frontend yang dibangun dengan Next.js 15 untuk mengelola event dan penjualan tiket. Platform ini menyediakan dashboard untuk event organizer dan user interface yang intuitif untuk attendee.

## 🚀 Fitur Utama

### 👥 User Management
- **Registrasi & Login**: Sistem autentikasi dengan JWT
- **Role-based Access**: ATTENDEE, EVENT_ORGANIZER, ADMIN
- **Profile Management**: Edit profil user dengan avatar
- **User Dashboard**: Dashboard khusus untuk attendee

### 🎪 Event Management
- **Event CRUD**: Create, Read, Update, Delete events
- **Event Categories**: Kategorisasi event
- **Event Periods**: Manajemen periode event
- **Event Search**: Pencarian dan filter event
- **Event Details**: Halaman detail event dengan informasi lengkap

### 🎫 Ticket Management
- **Ticket Types**: Berbagai jenis tiket dengan harga berbeda
- **Ticket Categories**: Kategorisasi tiket (VIP, Regular, dll)
- **Quota Management**: Manajemen kuota tiket
- **Ticket Sales**: Monitoring penjualan tiket

### 💳 Transaction Management
- **Payment Methods**: Credit Card, Bank Transfer, OVO, DANA, GoPay
- **Transaction Status**: PENDING, SUCCESS, FAILED, CANCELED
- **Transaction History**: Riwayat transaksi user
- **Transaction per Event**: Detail transaksi untuk setiap event

### 📊 Dashboard & Analytics
- **EO Dashboard**: Dashboard untuk event organizer
  - Statistik event dan revenue
  - Manajemen event dan transaksi
  - Analytics dan reporting
- **User Dashboard**: Dashboard untuk attendee
  - Event yang diikuti
  - Riwayat transaksi
  - Upcoming events

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15.4.3**: React framework dengan App Router
- **React 19.1.0**: Library UI
- **TypeScript**: Type safety

### UI/UX
- **Tailwind CSS**: Utility-first CSS framework
- **Shadcn/UI**: Component library
- **Radix UI**: Headless UI components
- **Lucide React**: Icon library
- **Framer Motion**: Animation library

### State Management & Data Fetching
- **TanStack React Query**: Server state management
- **React Hook Form**: Form management
- **Zod**: Schema validation

### HTTP Client & Authentication
- **Axios**: HTTP client
- **NextAuth.js**: Authentication
- **JWT**: Token-based authentication

### Development Tools
- **ESLint**: Code linting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📁 Struktur Proyek

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   ├── create-event/             # Halaman buat event
│   ├── eo-dashboard/             # Dashboard Event Organizer
│   │   ├── analytics/            # Analytics dashboard
│   │   ├── events/               # Manajemen events
│   │   ├── profile/              # Profile EO
│   │   └── transactions/         # Transaksi EO
│   ├── event/                    # Halaman event
│   ├── login/                    # Halaman login
│   ├── register/                 # Halaman registrasi
│   ├── transaction/              # Transaksi per event
│   │   └── [id]/                 # Detail transaksi event
│   ├── user-dashboard/           # Dashboard User
│   │   ├── events/               # Event user
│   │   ├── profile/              # Profile user
│   │   ├── settings/             # Settings user
│   │   └── transactions/         # Transaksi user
│   └── user-profile/             # Profile user public
├── components/                   # Reusable components
│   └── ui/                       # Shadcn UI components
├── container/                    # Container components
│   ├── banner.tsx
│   ├── event-carousel-1/
│   ├── event-carousel-2/
│   ├── event-search/
│   ├── navbar.tsx
│   └── top-event.tsx
├── context/                      # React contexts
│   └── query-provider.tsx
├── hooks/                        # Custom hooks
│   ├── use-event-search.ts
│   └── use-mobile.ts
├── lib/                          # Utility libraries
│   ├── query-config.ts
│   └── utils.ts
├── presentation/                 # Presentation components
│   ├── banner/
│   ├── card/
│   ├── logo/
│   ├── navbar/
│   └── pop-up/
├── service/                      # API services
│   ├── auth.api.ts
│   ├── dashboard.api.ts
│   ├── event-api.ts
│   ├── event-organizer.api.ts
│   ├── transaction.api.ts
│   └── user.api.ts
├── types/                        # TypeScript types
│   ├── api.ts
│   └── session.d.ts
└── utility/                      # Utility functions
    └── truncate-string.ts
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm atau yarn
- Git

### Installation

1. **Clone repository**
   ```bash
   git clone <repository-url>
   cd final-project-fe-rijal-muhammad-kamil
   ```

2. **Install dependencies**
   ```bash
   npm install
   # atau
   yarn install
   ```

3. **Setup environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` dan tambahkan:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key
   NEXTAUTH_URL=http://localhost:3002
   ```

4. **Run development server**
   ```bash
   npm run dev
   # atau
   yarn dev
   ```

   Aplikasi akan berjalan di `http://localhost:3002`

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server di port 3002

# Production
npm run build        # Build aplikasi untuk production
npm run start        # Start production server

# Development Tools
npm run lint         # Run ESLint dengan auto-fix
npm run mock-api     # Start JSON server untuk mock API
```

## 🔌 API Integration

### Base URL
- **Development**: `http://localhost:3000`
- **Production**: `https://final-project-be-rijal-muhammad-kamil-production.up.railway.app`

### Authentication
Semua API calls yang memerlukan autentikasi menggunakan Bearer Token:
```typescript
headers: {
  'Authorization': `Bearer ${token}`
}
```

### API Services

#### 1. Authentication API (`auth.api.ts`)
- Login user
- Error handling untuk autentikasi

#### 2. Event API (`event-api.ts`)
- Generic fetch function untuk semua endpoint
- Error handling dan timeout management

#### 3. Event Organizer API (`event-organizer.api.ts`)
- CRUD operations untuk event organizer
- Profile management

#### 4. Transaction API (`transaction.api.ts`)
- Create, read, update transactions
- Cancel transactions
- Get user transactions

#### 5. Dashboard API (`dashboard.api.ts`)
- Dashboard statistics
- Analytics data
- Recent events dan transactions

#### 6. User API (`user.api.ts`)
- User profile management
- User CRUD operations

## 🎨 UI Components

### Shadcn/UI Components
Proyek ini menggunakan Shadcn/UI sebagai base component library:

- **Form Components**: Button, Input, Select, Textarea, Form
- **Data Display**: Table, Card, Badge, Avatar
- **Feedback**: Alert Dialog, Tooltip, Skeleton
- **Layout**: Separator, Tabs, Sheet, Sidebar
- **Overlay**: Dialog, Switch

### Custom Components

#### Container Components
- `Banner`: Hero banner untuk homepage
- `Navbar`: Navigation bar dengan authentication
- `EventCarousel`: Carousel untuk menampilkan events
- `EventSearch`: Komponen pencarian event
- `TopEvent`: Menampilkan top events

#### Presentation Components
- `Card`: Custom card components
- `Logo`: Brand logo component
- `PopUp`: Error dan success notifications

## 📊 State Management

### TanStack React Query
Digunakan untuk:
- Server state management
- Caching API responses
- Background refetching
- Optimistic updates

### React Hook Form
Digunakan untuk:
- Form state management
- Form validation dengan Zod
- Error handling

### Local Storage
Digunakan untuk:
- JWT token storage
- User preferences
- Theme settings

## 🔐 Authentication & Authorization

### Authentication Flow
1. User login dengan email/password
2. Server mengembalikan JWT token
3. Token disimpan di localStorage
4. Token dikirim di header untuk setiap API call
5. Token divalidasi di setiap protected route

### Role-based Access Control
- **ATTENDEE**: Akses ke user dashboard, beli tiket
- **EVENT_ORGANIZER**: Akses ke EO dashboard, buat event
- **ADMIN**: Full access ke semua fitur

### Protected Routes
- `/user-dashboard/*`: Hanya untuk authenticated users
- `/eo-dashboard/*`: Hanya untuk EVENT_ORGANIZER dan ADMIN
- `/create-event`: Hanya untuk EVENT_ORGANIZER dan ADMIN

## 🎯 Key Features Implementation

### 1. Event Management
```typescript
// Event creation dengan validation
const createEvent = async (eventData: CreateEventRequest) => {
  const token = localStorage.getItem('token');
  return await fetchEvent({
    endpoint: '/events',
    method: 'POST',
    data: eventData,
    token
  });
};
```

### 2. Transaction Processing
```typescript
// Transaction dengan multiple payment methods
const createTransaction = async (transactionData: CreateTransactionRequest) => {
  return await fetchEvent({
    endpoint: '/transactions',
    method: 'POST',
    data: transactionData,
    token: localStorage.getItem('token')
  });
};
```

### 3. Real-time Dashboard
```typescript
// Dashboard dengan auto-refresh
const { data: dashboardStats } = useQuery({
  queryKey: ['dashboard-stats'],
  queryFn: () => dashboardApi.getEODashboardStats(),
  refetchInterval: 30000 // Refresh setiap 30 detik
});
```

### 4. Advanced Filtering & Search
```typescript
// Event search dengan multiple filters
const useEventSearch = () => {
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    dateRange: '',
    priceRange: ''
  });
  
  // Implementation dengan debouncing
};
```

## 🚀 Deployment

### Build untuk Production
```bash
npm run build
npm run start
```

### Environment Variables untuk Production
```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
NEXTAUTH_SECRET=your-production-secret
NEXTAUTH_URL=https://your-frontend-domain.com
```

### Deployment Platforms
- **Vercel**: Recommended untuk Next.js
- **Netlify**: Alternative deployment
- **Railway**: Full-stack deployment

## 🧪 Testing

### Manual Testing Checklist
- [ ] User registration dan login
- [ ] Event creation dan management
- [ ] Ticket purchase flow
- [ ] Dashboard functionality
- [ ] Responsive design
- [ ] Error handling

### API Testing
- Gunakan Postman atau Thunder Client
- Test semua endpoints dengan berbagai scenarios
- Validate error responses

## 🐛 Troubleshooting

### Common Issues

1. **API Connection Error**
   ```bash
   # Check environment variables
   echo $NEXT_PUBLIC_API_URL
   
   # Verify backend server is running
   curl $NEXT_PUBLIC_API_URL/health
   ```

2. **Authentication Issues**
   ```typescript
   // Clear localStorage
   localStorage.removeItem('token');
   localStorage.removeItem('user');
   ```

3. **Build Errors**
   ```bash
   # Clear cache
   rm -rf .next
   npm run build
   ```

4. **Styling Issues**
   ```bash
   # Rebuild Tailwind
   npx tailwindcss build
   ```

## 📈 Performance Optimization

### Implemented Optimizations
- **Code Splitting**: Automatic dengan Next.js App Router
- **Image Optimization**: Next.js Image component
- **Caching**: React Query untuk API responses
- **Lazy Loading**: Dynamic imports untuk heavy components
- **Bundle Analysis**: Webpack bundle analyzer

### Performance Monitoring
```typescript
// Performance metrics
const performanceObserver = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry.name, entry.duration);
  });
});
```

## 🔮 Future Enhancements

### Planned Features
- [ ] Real-time notifications dengan WebSocket
- [ ] Progressive Web App (PWA)
- [ ] Multi-language support (i18n)
- [ ] Dark mode theme
- [ ] Advanced analytics dashboard
- [ ] Email notifications
- [ ] Social media integration
- [ ] QR code untuk tiket
- [ ] Mobile app dengan React Native

### Technical Improvements
- [ ] Unit testing dengan Jest
- [ ] E2E testing dengan Playwright
- [ ] Storybook untuk component documentation
- [ ] CI/CD pipeline
- [ ] Performance monitoring
- [ ] Error tracking dengan Sentry

## 👥 Contributing

### Development Workflow
1. Fork repository
2. Create feature branch
3. Make changes
4. Run tests
5. Submit pull request

### Code Standards
- Follow ESLint rules
- Use TypeScript untuk type safety
- Write meaningful commit messages
- Document complex functions

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

Untuk pertanyaan atau bantuan:
- Email: rijal.muhammad.kamil@example.com
- GitHub Issues: [Create an issue](https://github.com/your-repo/issues)

---

**Dibuat dengan ❤️ menggunakan Next.js dan TypeScript**