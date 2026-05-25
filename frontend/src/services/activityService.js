import api from './api'

export const activityService = {
  async getAll() {
    const { data } = await api.get('/activities')
    return data
  },

  async getById(id) {
    const { data } = await api.get(`/activities/${id}`)
    return data
  },

  async create(dto) {
    const { data } = await api.post('/activities', dto)
    return data
  },

  async update(id, dto) {
    const { data } = await api.put(`/activities/${id}`, dto)
    return data
  },

  async delete(id) {
    await api.delete(`/activities/${id}`)
  },
}
