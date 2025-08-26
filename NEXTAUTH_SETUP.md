# NextAuth.js Setup Documentation

## Overview
Konfigurasi NextAuth.js telah disetup untuk aplikasi TicketEase dengan menggunakan Credentials Provider untuk autentikasi username/password.

## Files Created/Modified

### 1. `/src/app/api/auth/[...nextauth]/route.tsx`
File utama konfigurasi NextAuth dengan:
- Credentials Provider untuk login username/password
- JWT strategy untuk session management
- Custom callbacks untuk token dan session
- Error handling yang proper
- Redirect ke dashboard setelah login

### 2. `/src/types/next-auth.d.ts`
Type definitions untuk NextAuth agar TypeScript mengenali struktur custom user dan session.

### 3. `/src/context/auth-provider.tsx`
Provider component untuk membungkus aplikasi dengan SessionProvider.

### 4. `/src/hooks/use-auth.ts`
Custom hook untuk memudahkan penggunaan NextAuth di komponen:
- `login()` - untuk login dengan credentials
- `logout()` - untuk logout
- `session` - data session user
- `isAuthenticated` - status autentikasi
- `isLoading` - status loading

### 5. `/middleware.ts`
Middleware untuk melindungi route yang memerlukan autentikasi.

### 6. `/.env.example`
Contoh environment variables yang diperlukan.

## Environment Variables Required

Buat file `.env.local` dengan variabel berikut:

```env
NEXTAUTH_URL=http://localhost:3002
NEXTAUTH_SECRET=your-secret-key-here-change-this-in-production
NEXT_PUBLIC_API_URL=https://dummyjson.com
```

**Important:** 
- `NEXTAUTH_SECRET` harus berupa string random yang aman
- Generate dengan: `openssl rand -base64 32`
- Jangan commit file `.env.local` ke repository

## Usage Examples

### 1. Menggunakan di komponen

```tsx
"use client";
import { useAuth } from "@/hooks/use-auth";

export default function LoginForm() {
  const { login, isLoading, isAuthenticated } = useAuth();

  const handleSubmit = async (credentials: { username: string; password: string }) => {
    try {
      await login(credentials);
      // Redirect otomatis ke dashboard
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  if (isAuthenticated) {
    return <div>Already logged in!</div>;
  }

  return (
    // Form login component
  );
}
```

### 2. Menggunakan session data

```tsx
"use client";
import { useAuth } from "@/hooks/use-auth";

export default function UserProfile() {
  const { session, user, logout } = useAuth();

  return (
    <div>
      <h1>Welcome, {user?.firstName} {user?.lastName}</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Server-side session (dalam API routes)

```tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  return Response.json({ user: session.user });
}
```

## Protected Routes

Route berikut dilindungi oleh middleware:
- `/user-profile/*`
- `/event-profile/*`
- `/create-event/*`
- `/dashboard/*`

User akan diredirect ke `/login` jika belum terautentikasi.

## API Integration

Konfigurasi menggunakan service `authUser` dari `/src/service/auth.api.ts` yang:
- Mengirim request ke API endpoint `/auth/login`
- Menggunakan axios dengan base URL dari environment
- Menangani berbagai jenis error (network, timeout, unauthorized, dll)
- Mengembalikan user data jika berhasil

## Security Features

1. **JWT Strategy**: Session disimpan sebagai JWT token
2. **Secure Secret**: Menggunakan NEXTAUTH_SECRET untuk signing
3. **Error Handling**: Proper error handling untuk berbagai skenario
4. **Route Protection**: Middleware melindungi route sensitif
5. **Type Safety**: TypeScript definitions untuk type safety

## Troubleshooting

### Common Issues:

1. **"NEXTAUTH_SECRET is not set"**
   - Pastikan file `.env.local` ada dan berisi `NEXTAUTH_SECRET`

2. **"API endpoint not found"**
   - Periksa `NEXT_PUBLIC_API_URL` di environment variables

3. **"Login failed"**
   - Periksa credentials dan koneksi ke API
   - Lihat console untuk error details

4. **TypeScript errors**
   - Pastikan file `src/types/next-auth.d.ts` ada
   - Restart TypeScript server jika perlu

## Next Steps

1. Buat file `.env.local` dengan environment variables yang benar
2. Test login functionality dengan credentials yang valid
3. Customize redirect URLs sesuai kebutuhan
4. Tambahkan provider lain jika diperlukan (Google, Facebook, dll)
5. Implement refresh token jika API mendukung