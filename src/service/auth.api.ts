// service/auth-user-api.ts
import axios, { AxiosError } from "axios";
import { HttpError } from "./event-api";

interface AuthPayload {
  username: string;
  password: string;
  email?: string; // untuk register
  firstName?: string; // untuk register
  lastName?: string; // untuk register
  expiresInMins?: number;
}

interface AuthResponse {
  id: number | string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  image?: string;
  accessToken: string;
}

export async function authUser(payload: AuthPayload, mode: "login" | "register"): Promise<AuthResponse> {
  try {
    const url = mode === "login" ? "/auth/login" : "/auth/register"; // sesuaikan endpoint-mu
    const res = await axios.post<AuthResponse>(url, payload, {
      baseURL: "http://localhost:3000", // ganti sesuai API
      headers: { "Content-Type": "application/json" },
      timeout: 30000,
      withCredentials: true,
    });

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<any>;
      const status = e.response?.status;
      const serverMsg = e.response?.data?.message as string | undefined;

      if (e.code === "ECONNABORTED") {
        throw new HttpError("TIMEOUT_ERROR", "The request took too long to respond. Please try again.", status, { cause: err });
      }
      if (!e.response) {
        throw new HttpError("NETWORK_ERROR", "Unable to connect to the server. Please check your internet connection.", undefined, { cause: err });
      }
      if (status && status >= 400 && status < 500) {
        throw new HttpError("CLIENT_ERROR", serverMsg ?? (mode === "login" ? "Incorrect username or password." : "Failed to register."), status, { cause: err });
      }
      if (status && status >= 500 && status < 600) {
        throw new HttpError("SERVER_ERROR", serverMsg ?? "Server error. Please try again later.", status, { cause: err });
      }
      throw new HttpError("UNKNOWN_AXIOS_ERROR", serverMsg ?? "An unknown Axios error occurred.", status, { cause: err });
    }

    throw new HttpError("UNKNOWN_ERROR", "An unknown error occurred.", undefined, { cause: err });
  }
}
