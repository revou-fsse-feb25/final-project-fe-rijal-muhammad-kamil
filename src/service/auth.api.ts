import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const authApi: AxiosInstance = axios.create({
  baseURL: "https://final-project-be-rijal-muhammad-kamil-production.up.railway.app",
  withCredentials: true,
});

export class AuthError extends Error {
  constructor(
    public type: "TIMEOUT_ERROR" | "NETWORK_ERROR" | "UNAUTHORIZED" | "FORBIDDEN" | "INVALID_CREDENTIALS" | "SERVER_ERROR" | "CANCELED_ERROR" | "UNKNOWN_AUTH_ERROR",
    public message: string,
    public status?: number,
    options?: { cause?: unknown },
  ) {
    super(message);
    this.name = "AuthError";
    if (options?.cause) (this as any).cause = options.cause;
  }
}

interface AuthRequestOptions {
  endpoint?: string;
  timeout?: number;
  cacheControl?: string;
  signal?: AbortSignal;
  email?: string;
  password?: string;
}

export async function authUser({ endpoint = "/auth/login", timeout = 30000, email, password, cacheControl = "no-store", signal }: AuthRequestOptions) {
  if (!email || !password) {
    throw new AuthError("INVALID_CREDENTIALS", "email and password must be filled in");
  }

  try {
    const res: AxiosResponse<any> = await authApi.post(endpoint, { email, password }, { timeout, headers: { "Cache-Control": cacheControl }, signal });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<any>;
      const status = e.response?.status;
      const serverMsg = e.response?.data?.message ?? e.response?.data?.error ?? (typeof e.response?.data === "string" ? e.response?.data : undefined);

      if (e.code === "ERR_CANCELED") throw new AuthError("CANCELED_ERROR", serverMsg ?? "Request was canceled.", status, { cause: err });
      if (e.code === "ECONNABORTED") throw new AuthError("TIMEOUT_ERROR", "The request took too long to respond. Please try again.", status, { cause: err });
      if (!e.response) throw new AuthError("NETWORK_ERROR", serverMsg ?? "Cannot reach authentication server.", undefined, { cause: err });
      if (status === 401) throw new AuthError("UNAUTHORIZED", serverMsg ?? "Unauthorized", status, { cause: err });
      if (status === 403) throw new AuthError("FORBIDDEN", serverMsg ?? "Forbidden", status, { cause: err });
      if (status && status >= 400 && status < 500) throw new AuthError("INVALID_CREDENTIALS", serverMsg ?? `Invalid credentials (${status})`, status, { cause: err });
      if (status && status >= 500) throw new AuthError("SERVER_ERROR", serverMsg ?? `Server error (${status})`, status, { cause: err });

      throw new AuthError("UNKNOWN_AUTH_ERROR", serverMsg ?? "Unknown authentication error", status, { cause: err });
    }

    throw new AuthError("UNKNOWN_AUTH_ERROR", "Unknown authentication error", undefined, { cause: err });
  }
}
