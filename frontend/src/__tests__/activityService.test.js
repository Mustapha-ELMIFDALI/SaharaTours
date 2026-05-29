import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the api module before importing the service
vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

import { activityService } from '../services/activityService'
import api from '../services/api'

const mockActivity = {
  id: 1,
  title: 'Randonnée Sahara',
  category: 'Aventure',
  price: 350,
  duration: '3 jours',
  difficulty: 'Modéré',
  location: 'Merzouga',
  maxPeople: 12,
  rating: 4.8,
  reviews: 120,
  description: 'Une randonnée inoubliable.',
  includes: ['Guide', 'Repas'],
}

describe('activityService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── getAll ─────────────────────────────────────────────────────────────────

  it('getAll() – calls GET /activities and returns data', async () => {
    api.get.mockResolvedValue({ data: [mockActivity] })

    const result = await activityService.getAll()

    expect(api.get).toHaveBeenCalledWith('/activities')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Randonnée Sahara')
  })

  it('getAll() – returns empty array when no activities', async () => {
    api.get.mockResolvedValue({ data: [] })

    const result = await activityService.getAll()

    expect(result).toEqual([])
  })

  // ── getById ────────────────────────────────────────────────────────────────

  it('getById() – calls GET /activities/:id and returns data', async () => {
    api.get.mockResolvedValue({ data: mockActivity })

    const result = await activityService.getById(1)

    expect(api.get).toHaveBeenCalledWith('/activities/1')
    expect(result.id).toBe(1)
    expect(result.location).toBe('Merzouga')
  })

  // ── create ─────────────────────────────────────────────────────────────────

  it('create() – calls POST /activities with payload and returns created', async () => {
    const newActivity = { title: 'Surf Essaouira', price: 200 }
    api.post.mockResolvedValue({ data: { id: 2, ...newActivity } })

    const result = await activityService.create(newActivity)

    expect(api.post).toHaveBeenCalledWith('/activities', newActivity)
    expect(result.id).toBe(2)
    expect(result.title).toBe('Surf Essaouira')
  })

  // ── update ─────────────────────────────────────────────────────────────────

  it('update() – calls PUT /activities/:id with updated data', async () => {
    const updated = { ...mockActivity, price: 400 }
    api.put.mockResolvedValue({ data: updated })

    const result = await activityService.update(1, updated)

    expect(api.put).toHaveBeenCalledWith('/activities/1', updated)
    expect(result.price).toBe(400)
  })

  // ── delete ─────────────────────────────────────────────────────────────────

  it('delete() – calls DELETE /activities/:id', async () => {
    api.delete.mockResolvedValue({})

    await activityService.delete(1)

    expect(api.delete).toHaveBeenCalledWith('/activities/1')
  })

  // ── error handling ─────────────────────────────────────────────────────────

  it('getAll() – propagates network error', async () => {
    api.get.mockRejectedValue(new Error('Network Error'))

    await expect(activityService.getAll()).rejects.toThrow('Network Error')
  })
})
