const DEFAULT_HUB_URL = 'https://hub.sabo.com.vn';
const DEFAULT_LOCAL_HUB_URL = 'http://localhost:9000';

function isLocalHost(hostname: string): boolean {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

export function resolveHubUrl(): string {
  const hubUrl = process.env.NEXT_PUBLIC_HUB_URL ?? DEFAULT_HUB_URL;
  const localHubUrl = process.env.NEXT_PUBLIC_HUB_LOCAL_URL ?? DEFAULT_LOCAL_HUB_URL;

  if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined' && isLocalHost(window.location.hostname)) {
    return localHubUrl;
  }

  return hubUrl;
}
