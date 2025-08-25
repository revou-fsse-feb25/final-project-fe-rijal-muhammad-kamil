import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export class HttpError extends Error {
  constructor(
    public type: "TIMEOUT_ERROR" | "NETWORK_ERROR" | "CLIENT_ERROR" | "SERVER_ERROR" | "CANCELED_ERROR" | "UNKNOWN_AXIOS_ERROR" | "UNKNOWN_ERROR",
    public message: string,
    public status?: number,
    options?: { cause?: unknown },
  ) {
    super(message);
    this.name = "HttpError";
    if (options?.cause) (this as any).cause = options.cause;
  }
}

interface FetchEventOption {
  endpoint?: string;
  timeout?: number;
  cacheControl?: string;
  signal?: AbortSignal;
}

export async function fetchEvent<T = unknown>({ endpoint = "", timeout = 30000, cacheControl = "no-store", signal }: FetchEventOption): Promise<T> {
  const safeEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;

  try {
    const res: AxiosResponse<T> = await api.get<T>(safeEndpoint, {
      timeout,
      headers: { "Cache-Control": cacheControl },
      signal,
    });
    return res.data;
  } catch (err: unknown) {
    if (axios.isAxiosError(err)) {
      const e = err as AxiosError<any>;
      const status = e.response?.status;
      const serverMsg = e.response?.data?.message as string | undefined;

      if (e.code === "ERR_CANCELED") {
        throw new HttpError("CANCELED_ERROR", "Request was canceled.", status, { cause: err });
      }
      if (e.code === "ECONNABORTED") {
        throw new HttpError("TIMEOUT_ERROR", "The request took too long to respond. Please try again.", status, { cause: err });
      }
      if (!e.response) {
        throw new HttpError("NETWORK_ERROR", "Unable to connect to the server. Please check your internet connection.", undefined, { cause: err });
      }
      if (status && status >= 400 && status < 500) {
        throw new HttpError("CLIENT_ERROR", serverMsg ?? `Client error (code ${status}).`, status, { cause: err });
      }
      if (status && status >= 500 && status < 600) {
        throw new HttpError("SERVER_ERROR", serverMsg ?? `Server error (code ${status}). Please try again later.`, status, { cause: err });
      }
      throw new HttpError("UNKNOWN_AXIOS_ERROR", serverMsg ?? "An unknown Axios error occurred.", status, { cause: err });
    }

    throw new HttpError("UNKNOWN_ERROR", "An unknown error occurred.", undefined, { cause: err });
  }
}
