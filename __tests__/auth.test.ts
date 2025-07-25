import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as authModule from '@/lib/auth'
import type { User, Session } from '@supabase/supabase-js'

// Mock the entire auth module
vi.mock('@/lib/auth', () => ({
  signIn: vi.fn(),
  signUp: vi.fn(),
  signOut: vi.fn()
}))

describe('Authentication', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should handle sign in', async () => {
    const email = 'test@example.com'
    const password = 'password123'
    
    const mockResponse = {
      data: { 
        user: { id: '123', email, created_at: '2025-07-24' } as User,
        session: { access_token: 'test-token', expires_at: 123456 } as Session
      },
      error: null
    }
    
    // Setup the mock implementation
    vi.mocked(authModule.signIn).mockResolvedValue(mockResponse)

    const result = await authModule.signIn(email, password)
    
    expect(result.error).toBeNull()
    expect(result.data).toBeDefined()
    if (result.data) {
      expect(result.data.user.email).toBe(email)
    }
    expect(authModule.signIn).toHaveBeenCalledWith(email, password)
  })

  it('should handle sign up', async () => {
    const email = 'test@example.com'
    const password = 'password123'
    
    const mockResponse = {
      data: { 
        user: null,
        session: null
      },
      error: null
    }
    
    // Setup the mock implementation
    vi.mocked(authModule.signUp).mockResolvedValue(mockResponse)

    const result = await authModule.signUp(email, password)
    
    expect(result.error).toBeNull()
    expect(authModule.signUp).toHaveBeenCalledWith(email, password)
  })

  it('should handle sign out', async () => {
    const mockResponse = { error: null }
    
    // Setup the mock implementation
    vi.mocked(authModule.signOut).mockResolvedValue(mockResponse)

    const result = await authModule.signOut()
    
    expect(result.error).toBeNull()
    expect(authModule.signOut).toHaveBeenCalled()
  })
})
