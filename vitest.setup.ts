import '@testing-library/jest-dom/vitest';
import { vi, beforeAll, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';

beforeAll(() => {
  // Mock next/navigation
  vi.mock('next/navigation', () => ({
    useRouter: () => ({
      push: vi.fn(),
      replace: vi.fn(),
      refresh: vi.fn(),
    }),
    useSearchParams: () => ({
      get: vi.fn(),
    }),
  }));

  // Mock environment variables
  vi.mock('process.env', () => ({
    NEXT_PUBLIC_SUPABASE_URL: 'http://localhost:54321',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'test-key',
  }));
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});
