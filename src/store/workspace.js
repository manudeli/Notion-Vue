import router from '@/routes'
import { request } from '@/util/api'

export default {
  namespaced: true,
  state() {
    return {
      workspaces: [],
      currentWorkspace: {},
      currentWorkspacePath: [],
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
      const workspace = await request('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: '',
          parent: parentId,
        }),
      })
      await dispatch('readWorkspaces')
      router.push({
        name: 'Workspace',
        params: {
          id: workspace.id,
        },
      })
    },

    async readWorkspaces({ commit, dispatch }) {
      const workspaces = await request('/documents', { method: 'GET' })

      commit('assignState', {
        workspaces,
      })
      dispatch('findWorkspacePath')
      if (!workspaces.length) {
        dispatch('createWorkspace')
      }
    },

    async readWorkspace({ commit }, payload) {
      const { id } = payload
      try {
        const workspace = await request(`/documents/${id}`, {
          method: 'GET',
        })
        commit('assignState', {
          currentWorkspace: workspace,
        })
      } catch (error) {
        router.push('/error')
      }
    },

    async updateWorkspace({ dispatch }, payload) {
      const { id, title, content } = payload
      await request(`/documents/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, content }),
      })

      dispatch('readWorkspaces')
    },

    async deleteWorkspace({ state, dispatch }, payload) {
      const { id } = payload
      await request(`/documents/${id}`, {
        method: 'DELETE',
      })

      await dispatch('readWorkspaces')

      if (id === parseInt(router.currentRoute.value.params.id, 10)) {
        router.push({
          name: 'Workspace',
          params: {
            id: state.workspaces[0].id,
          },
        })
      }
    },

    findWorkspacePath({ state, commit }) {
      const currentWorkspaceId = parseInt(
        router.currentRoute.value.params.id,
        10
      )
      function find(workspace, parents) {
        if (currentWorkspaceId === workspace.id) {
          commit('assignState', {
            currentWorkspacePath: [...parents, workspace],
          })
        }
        if (workspace.documents) {
          workspace.documents.forEach((ws) => find(ws, [...parents, workspace]))
        }
      }
      state.workspaces.forEach((workspace) => find(workspace, []))
    },
  },
}
