const DEFAULT_TIMEOUT_MS = 12000;

export class HttpError extends Error {
  status: number;
  body?: unknown;
  constructor(message: string, status: number, body?: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

export async function fetchJSON<T>(
  url: string,
  init: RequestInit = {},
  timeoutMs = DEFAULT_TIMEOUT_MS
): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...init,
      headers: {
        "Content-Type": "application/json",
        ...(init.headers || {}),
      },
      signal: controller.signal,
    });

    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) throw new HttpError(data?.message || res.statusText, res.status, data);
    return data as T;
  } catch (err: any) {
    if (err?.name === "AbortError") throw new Error("La solicitud expiró. Intenta nuevamente.");
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
