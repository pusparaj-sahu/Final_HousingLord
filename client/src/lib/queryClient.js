import { QueryClient } from "@tanstack/react-query";

/**
 * Optimized error handling with detailed messages
 */
async function throwIfResNotOk(res) {
  if (!res.ok) {
    try {
      // Try to parse JSON error response first
      const errorData = await res.clone().json().catch(() => null);
      if (errorData && (errorData.message || errorData.error)) {
        throw new Error(`${res.status}: ${errorData.message || errorData.error}`);
      }
    } catch (jsonError) {
      // Fall back to text if JSON parsing fails
      const text = await res.text().catch(() => res.statusText);
      throw new Error(`${res.status}: ${text || 'Unknown error'}`);
    }
  }
}

/**
 * Performance-optimized API request function with timeouts, caching, and error handling
 */
export async function apiRequest(
  method,
  url,
  data,
  timeout = 10000,
) {
  // Create AbortController for timeout functionality
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    // Optimized fetch configuration
    const res = await fetch(url, {
      method,
      headers: {
        ...(data ? { "Content-Type": "application/json" } : {}),
        "Cache-Control": method === "GET" ? "public, max-age=300, stale-while-revalidate=600" : "no-cache",
        "Pragma": method === "GET" ? "cache" : "no-cache"
      },
      body: data ? JSON.stringify(data) : undefined,
      credentials: "include",
      signal: controller.signal,
      // Performance optimizations
      mode: "cors",
      keepalive: true,
    });
    
    await throwIfResNotOk(res);
    return res;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      throw new Error(`Request timeout after ${timeout}ms: ${url}`);
    }
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

/**
 * Enhanced query function with optimized performance characteristics
 */
export const getQueryFn = ({ on401: unauthorizedBehavior }) => {
  return async ({ queryKey, signal }) => {
    // Create AbortController combining React Query signal and timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    
    // Combine signals if provided by React Query
    if (signal) {
      signal.addEventListener('abort', () => controller.abort());
    }
    
    try {
      // Performance optimized fetch
      const res = await fetch(queryKey[0], {
        credentials: "include",
        signal: controller.signal,
        headers: {
          "Cache-Control": "public, max-age=300, stale-while-revalidate=600",
          "Pragma": "cache"
        },
        mode: "cors",
        keepalive: true,
      });
      
      // Handle unauthorized according to options
      if (unauthorizedBehavior === "returnNull" && res.status === 401) {
        return null;
      }
      
      await throwIfResNotOk(res);
      
      // Performance optimization for response size
      const contentLength = res.headers.get('content-length');
      const isLargeResponse = contentLength && parseInt(contentLength, 10) > 100000; // 100KB
      
      if (isLargeResponse) {
        // Stream large responses for memory efficiency
        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let result = '';
        
        if (reader) {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            result += decoder.decode(value, { stream: true });
          }
          return JSON.parse(result);
        }
      }
      
      // Standard parsing for most responses
      return await res.json();
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error(`Request timeout after 8000ms: ${queryKey[0]}`);
      }
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  };
};

/**
 * Performance-optimized QueryClient configuration
 */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: 300000, // 5 minutes
      retry: (failureCount, error) => {
        // Adaptive retry strategy based on error type
        if (error instanceof Error) {
          // Don't retry client errors or timeouts
          if (error.message.startsWith('4')) return false;
          if (error.message.includes('timeout')) return false;
          // Limited retries for server errors
          if (error.message.startsWith('5')) return failureCount < 2;
        }
        return failureCount < 1;
      },
      gcTime: 600000, // 10 minutes garbage collection time
      placeholderData: 'keepPrevious', // Keep previous data while loading
      structuralSharing: true, // Optimize memory usage
    },
    mutations: {
      retry: (failureCount, error) => {
        // Only retry server errors, not client errors
        if (error instanceof Error && error.message.startsWith('4')) return false;
        return failureCount < 1;
      },
      networkMode: 'always',
    },
  },
});
