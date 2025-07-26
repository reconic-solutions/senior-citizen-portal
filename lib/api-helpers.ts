import { NextRequest } from 'next/server';

/**
 * Get the authentication token from the request headers or cookies
 */
export function getAuthToken(request: NextRequest): string | null {
  // Try to get token from Authorization header
  const authHeader = request.headers.get('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.substring(7);
  }
  
  // Try to get token from cookie
  const token = request.cookies.get('token')?.value;
  return token || null;
}

/**
 * Format query parameters for API requests
 */
export function formatQueryParams(params: Record<string, any>): string {
  const queryParams = new URLSearchParams();
  
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, String(value));
    }
  });
  
  return queryParams.toString();
}

/**
 * Handle API errors
 */
export async function handleApiError(response: Response): Promise<{ error: string, status: number }> {
  try {
    const data = await response.json();
    return {
      error: data.error || 'An unexpected error occurred',
      status: response.status
    };
  } catch (error) {
    return {
      error: 'Failed to parse error response',
      status: response.status
    };
  }
}

/**
 * Create a fetch request with authentication
 */
export async function authenticatedFetch(
  url: string,
  options: RequestInit = {},
  token: string
) {
  const headers = new Headers(options.headers);
  headers.set('Authorization', `Bearer ${token}`);
  
  return fetch(url, {
    ...options,
    headers
  });
}