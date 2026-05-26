import api from './api'

export const userService = {
  // Utilisateur connecté
  async updateProfile(req) {
    const { data } = await api.put('/users/me', req)
    return data
  },

  // Admin
  async getAll() {
    const { data } = await api.get('/users')
    return data
  },

  async createUser(req) {
    const { data } = await api.post('/users', req)
    return data
  },

  async update(id, dto) {
    const { data } = await api.put(`/users/${id}`, dto)
    return data
  },

  async delete(id) {
    await api.delete(`/users/${id}`)
  },
}
