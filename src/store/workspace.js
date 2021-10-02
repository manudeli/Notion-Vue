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
    createWorkspace() {},
    async readWorkspaces({ commit }) {
      const workspaces = await fetch('https://kdt.roto.codes/documents/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-username': 'jonghyeon123',
        },
      }).then((res) => res.json())

      commit('assignState', {
        workspaces,
      })
    },
    readWorkSpace() {},
    updateWorkspace() {},
    deleteWorkspace() {},
  },
}
