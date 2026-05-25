import api from './api'

export const authService = {
  async login(email, password) {
    const { data } = await api.post('/auth/login', { email, password })
    // Backend returns flat: { token, id, name, email, role, createdAt }
    // Reshape to { token, user } expected by AuthContext
    return {
      token: data.token,
      user: { id: data.id, name: data.name, email: data.email, role: data.role, createdAt: data.createdAt },
    }
  },

  async register({ name, email, password }) {
    const { data } = await api.post('/auth/register', { name, email, password })
    return {
      token: data.token,
      user: { id: data.id, name: data.name, email: data.email, role: data.role, createdAt: data.createdAt },
    }
  },
}
