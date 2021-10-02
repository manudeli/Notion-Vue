import { request } from '@/util/api'

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {},
    }
  },

  getters: {},

  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach((key) => {
        state[key] = payload[key]
      })
    },
  },

  actions: {
    async createWorkspace({ dispatch }, payload = {}) {
      const { parentId } = payload
      await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '',
          parent: parentId,
        }),
      })
      await dispatch('readWorkspaces')
    },

    async readWorkspaces({ commit }) {
      const workspaces = await request('/documents', { method: 'GET' })

      commit('assignState', {
        workspaces,
      })
    },

    async readWorkspace({ commit }, payload) {
      const { id } = payload
      const workspace = await request(`/documents/${id}`, {
        method: 'GET',
      })
      commit('assignState', {
        currentWorkspace: workspace,
      })
    },

    async updateWorkspace({ commit }, payload) {
      const { id, title, content } = payload
      await request(`/documents/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
      })
    },

    async deleteWorkspace({ dispatch }, payload) {
      const { id } = payload
      await request(`/documents/${id}`, {
        method: 'DELETE',
      })
      await dispatch('readWorkspaces')
    },
  },
}
