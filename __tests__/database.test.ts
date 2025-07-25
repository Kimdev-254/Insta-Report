import { describe, it, expect, vi, beforeEach } from 'vitest'
import * as supabaseModule from '@/lib/supabase'

// Mock the entire supabase module
vi.mock('@/lib/supabase', () => ({
  insertReport: vi.fn(),
  fetchReports: vi.fn(),
  updateReportStatus: vi.fn(),
  supabase: {
    from: vi.fn()
  }
}))

describe('Database Operations', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should insert a report', async () => {
    const mockReport = {
      user_id: '123',
      title: 'Test Report',
      organization_name: 'Test Org',
      form_data: { test: 'data' },
      status: 'draft'
    }

    const mockResponse = {
      data: { ...mockReport, id: '456' },
      error: null
    }

    // Setup the mock implementation
    vi.mocked(supabaseModule.insertReport).mockResolvedValue(mockResponse)

    const result = await supabaseModule.insertReport(mockReport)
    
    expect(result.error).toBeNull()
    expect(result.data).toBeDefined()
    expect(result.data.id).toBe('456')
    expect(supabaseModule.insertReport).toHaveBeenCalledWith(mockReport)
  })

  it('should fetch reports for a user', async () => {
    const userId = '123'
    const mockReports = [
      { id: '1', title: 'Report 1' },
      { id: '2', title: 'Report 2' }
    ]

    const mockResponse = {
      data: mockReports,
      error: null
    }

    // Setup the mock implementation
    vi.mocked(supabaseModule.fetchReports).mockResolvedValue(mockResponse)

    const result = await supabaseModule.fetchReports(userId)
    
    expect(result.error).toBeNull()
    expect(result.data).toHaveLength(2)
    expect(supabaseModule.fetchReports).toHaveBeenCalledWith(userId)
  })
})
