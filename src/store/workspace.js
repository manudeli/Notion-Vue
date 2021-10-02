import { request } from '@/util/api'

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
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
          title: '제목을 입력하세요',
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

    readWorkSpace() {},

    updateWorkspace() {},

    async deleteWorkspace({ dispatch }, payload) {
      const { id } = payload
      await request(`/documents/${id}`, {
        method: 'DELETE',
      })
      await dispatch('readWorkspaces')
    },
  },
}
