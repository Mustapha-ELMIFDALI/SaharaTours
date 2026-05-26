import api from './api'

export const reservationService = {
  async getUserReservations(userId) {
    const { data } = await api.get(`/reservations/user/${userId}`)
    return data
  },

  async getAllReservations() {
    const { data } = await api.get('/reservations')
    return data
  },

  async create({ userId, userName, type, itemId, itemName, date, people, total }) {
    const { data } = await api.post('/reservations', {
      userId, userName, type, itemId, itemName, date, people, total,
    })
    return data
  },

  async updateStatus(id, status) {
    const { data } = await api.put(`/reservations/${id}/status`, { status })
    return data
  },

  async delete(id) {
    await api.delete(`/reservations/${id}`)
  },
}
