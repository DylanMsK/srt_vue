/* eslint-disable */
import api from '@/api'
import router from '@/router'

const state = {
  userProfiles: [],
  userTickets: [],
  loading: false,
  error: false,
}

const getters = {
  getUserTickets() {
    return state.userTickets
  },
  getUserProfiles() {
    return state.userProfiles
  }
}

const mutations = {
  setUserTickets(state, payload) {
    state.userTickets = payload
  },
  setUserProfiles(state, payload) {
    state.userProfiles = payload
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
}

const actions = {
  getUserTickets({commit}) {
    commit('setLoading', true)
    const user = JSON.parse(localStorage.getItem('user'))
    api.getUserTickets(user.token).then(res => {
      commit('setUserTickets', res.data)
      commit('setLoading', false)
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
    })
  },

  editUserTicket({commit}, payload) {
    commit('setLoading', true)
    const user = JSON.parse(localStorage.getItem('user'))
    api.editUserTicket(payload, user.token).then(res => {
      commit('setLoading', false)
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
    })
  },

  getUserProfiles({commit}) {
    commit('setLoading', true)
    const user = JSON.parse(localStorage.getItem('user'))
    api.getUserProfiles(user.token).then(res => {
      console.log('admin', res.data)
      commit('setUserProfiles', res.data)
      commit('setLoading', false)
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
    })
  },

  editUserProfile({commit}, payload) {
    commit('setLoading', true)
    const user = JSON.parse(localStorage.getItem('user'))
    api.editUserProfile(payload, user.token).then(res => {
      commit('setLoading', false)
      router.push({name: 'bigbrother'}).catch(err => {})
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
    })
  }
}

export default {
  namespaced: true,
	state,
	getters,
  actions,
  mutations
}
