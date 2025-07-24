import { describe, it, expect, vi } from 'vitest'
import { insertReport, fetchReports, updateReportStatus } from '@/lib/supabase'

describe('Database Operations', () => {
  it('should insert a report', async () => {
    const mockReport = {
      user_id: '123',
      title: 'Test Report',
      organization_name: 'Test Org',
      form_data: { test: 'data' },
      status: 'draft'
    }

    const mockSupabaseResponse = {
      data: { ...mockReport, id: '456' },
      error: null
    }

    vi.mock('@/lib/supabase', () => ({
      supabase: {
        from: () => ({
          insert: () => ({
            select: () => ({
              single: () => mockSupabaseResponse
            })
          })
        })
      }
    }))

    const result = await insertReport(mockReport)
    expect(result.error).toBeNull()
    expect(result.data).toBeDefined()
    expect(result.data.id).toBe('456')
  })

  it('should fetch reports for a user', async () => {
    const userId = '123'
    const mockReports = [
      { id: '1', title: 'Report 1' },
      { id: '2', title: 'Report 2' }
    ]

    const mockSupabaseResponse = {
      data: mockReports,
      error: null
    }

    vi.mock('@/lib/supabase', () => ({
      supabase: {
        from: () => ({
          select: () => ({
            eq: () => ({
              order: () => mockSupabaseResponse
            })
          })
        })
      }
    }))

    const result = await fetchReports(userId)
    expect(result.error).toBeNull()
    expect(result.data).toHaveLength(2)
  })
})
