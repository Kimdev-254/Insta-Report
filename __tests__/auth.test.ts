import { describe, it, expect, vi } from 'vitest'
import { signIn, signUp, signOut } from '@/lib/auth'

describe('Authentication', () => {
  it('should handle sign in', async () => {
    const email = 'test@example.com'
    const password = 'password123'
    
    const mockSupabaseResponse = {
      data: { user: { id: '123', email } },
      error: null
    }
    
    vi.mock('@/lib/supabase', () => ({
      supabase: {
        auth: {
          signInWithPassword: vi.fn().mockResolvedValue(mockSupabaseResponse)
        }
      }
    }))

    const result = await signIn(email, password)
    expect(result.error).toBeNull()
    expect(result.data).toBeDefined()
  })

  it('should handle sign up', async () => {
    const email = 'test@example.com'
    const password = 'password123'
    
    const mockSupabaseResponse = {
      data: { user: null },
      error: null
    }
    
    vi.mock('@/lib/supabase', () => ({
      supabase: {
        auth: {
          signUp: vi.fn().mockResolvedValue(mockSupabaseResponse)
        }
      }
    }))

    const result = await signUp(email, password)
    expect(result.error).toBeNull()
  })
})
