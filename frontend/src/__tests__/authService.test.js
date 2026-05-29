import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../services/api', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

import { authService } from '../services/authService'
import api from '../services/api'

// Raw backend response (flat)
const backendResponse = {
  token: 'jwt.token.abc123',
  id: 1,
  name: 'Mustapha',
  email: 'mustapha@test.com',
  role: 'CLIENT',
  createdAt: '2026-05-20',
}

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  // ── login ──────────────────────────────────────────────────────────────────

  it('login() – calls POST /auth/login with credentials', async () => {
    api.post.mockResolvedValue({ data: backendResponse })

    const result = await authService.login('mustapha@test.com', 'password123')

    expect(api.post).toHaveBeenCalledWith('/auth/login', {
      email: 'mustapha@test.com',
      password: 'password123',
    })
    // authService reshapes to { token, user }
    expect(result.token).toBe('jwt.token.abc123')
    expect(result.user.name).toBe('Mustapha')
    expect(result.user.role).toBe('CLIENT')
  })

  it('login() – returned user contains id, email, name, role, createdAt', async () => {
    api.post.mockResolvedValue({ data: backendResponse })

    const { user } = await authService.login('mustapha@test.com', 'password123')

    expect(user).toMatchObject({
      id: 1,
      name: 'Mustapha',
      email: 'mustapha@test.com',
      role: 'CLIENT',
      createdAt: '2026-05-20',
    })
  })

  it('login() – propagates error on wrong credentials', async () => {
    api.post.mockRejectedValue({
      response: { status: 401, data: { message: 'Identifiants invalides' } },
    })

    await expect(authService.login('bad@email.com', 'wrong')).rejects.toBeDefined()
  })

  // ── register ───────────────────────────────────────────────────────────────

  it('register() – calls POST /auth/register with user data', async () => {
    const payload = { name: 'New User', email: 'new@test.com', password: 'pass1234' }
    api.post.mockResolvedValue({
      data: { ...backendResponse, email: 'new@test.com', name: 'New User' },
    })

    const result = await authService.register(payload)

    expect(api.post).toHaveBeenCalledWith('/auth/register', payload)
    expect(result.token).toBe('jwt.token.abc123')
    expect(result.user.email).toBe('new@test.com')
  })

  it('register() – returns reshaped { token, user } object', async () => {
    api.post.mockResolvedValue({ data: backendResponse })

    const result = await authService.register({
      name: 'Test',
      email: 'test@test.com',
      password: '1234',
    })

    expect(result).toHaveProperty('token')
    expect(result).toHaveProperty('user')
    expect(result.user).toHaveProperty('id')
  })

  it('register() – propagates error when email already exists', async () => {
    api.post.mockRejectedValue({
      response: { status: 409, data: { message: 'Cet email est déjà utilisé' } },
    })

    await expect(
      authService.register({ name: 'X', email: 'existing@test.com', password: '1234' })
    ).rejects.toBeDefined()
  })
})
