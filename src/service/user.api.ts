import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export class FetchUser extends Error {
  constructor(
    public type: "TIMEOUT_ERROR" | "NETWORK_ERROR" | "CLIENT_ERROR" | "SERVER_ERROR" | "CANCELED_ERROR" | "UNKNOWN_AXIOS_ERROR" | "UNKNOWN_ERROR",
    public message: string,
    public status?: number,
    options?: { cause?: unknown },
  ) {
    super(message);
    this.name = "FetchUser";
    if (options?.cause) (this as any).cause = options.cause;
  }
}

interface FetchUserOption {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: any;
  params?: Record<string, any>;
  token?: string;
  timeout?: number;
  cacheControl?: string;
  signal?: AbortSignal;
}

export async function fetchUser<T = unknown>({ endpoint = "", method = "GET", data, params, token, timeout = 30000, cacheControl = "no-store", signal }: FetchUserOption): Promise<T> {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  const headers: Record<string, string> = { "Cache-Control": cacheControl, "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const res: AxiosResponse<T> = await api.request<T>({
      url: safeEndpoint,
      method,
      data,
      params,
      timeout,
      headers,
      signal,
    });

    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<any>;
      const status = e.response?.status;
      const serverMsg = e.response?.data?.message ?? e.response?.data?.error ?? (typeof e.response?.data === "string" ? e.response?.data : undefined);

      if (e.code === "ERR_CANCELED") throw new FetchUser("CANCELED_ERROR", "Request was canceled.", status, { cause: err });
      if (e.code === "ECONNABORTED") throw new FetchUser("TIMEOUT_ERROR", "The request took too long to respond. Please try again.", status, { cause: err });
      if (!e.response) throw new FetchUser("NETWORK_ERROR", "Unable to connect to the server. Please check your internet connection.", undefined, { cause: err });
      if (status && status >= 400 && status < 500) throw new FetchUser("CLIENT_ERROR", serverMsg ?? `Client error (code ${status}).`, status, { cause: err });
      if (status && status >= 500 && status < 600) throw new FetchUser("SERVER_ERROR", serverMsg ?? `Server error (code ${status}). Please try again later.`, status, { cause: err });

      throw new FetchUser("UNKNOWN_AXIOS_ERROR", serverMsg ?? "An unknown Axios error occurred.", status, {
        cause: err,
      });
    }

    throw new FetchUser("UNKNOWN_ERROR", "An unknown error occurred.", undefined, { cause: err });
  }
}
