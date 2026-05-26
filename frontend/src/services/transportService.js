import api from './api'

export const transportService = {
  async getAll() {
    const { data } = await api.get('/transports')
    return data
  },

  async getById(id) {
    const { data } = await api.get(`/transports/${id}`)
    return data
  },

  async create(dto) {
    const { data } = await api.post('/transports', dto)
    return data
  },

  async update(id, dto) {
    const { data } = await api.put(`/transports/${id}`, dto)
    return data
  },

  async delete(id) {
    await api.delete(`/transports/${id}`)
  },
}
