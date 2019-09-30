/* eslint-disable */
import api from '@/api'
import router from '@/router'

const state = {
  completedTickets: [],
  uncompletedTickets: [],
  loading: false,
  error: false,
}

const getters = {
  getCompletedTicketList(state) {
    return state.completedTickets
  },
  getUncompletedTicketList(state) {
    return state.uncompletedTickets
  },
}

const mutations = {
  setUserTicketList(state, payload) {
    const uncompleted = []
    const completed = []
    for (let i=0; i < payload.length; i++) {
      if (payload[i].is_complete === true) {
        completed.push(payload[i])
      } else {
        uncompleted.push(payload[i])
      }
    }
    state.uncompletedTickets = uncompleted
    state.completedTickets = completed
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
}

const actions = {
  subtractPoint({commit}, payload) {
    commit('setLoading', true)
    const user = JSON.parse(localStorage.getItem('user'))
    api.subtractPoint(payload, user.token).then(() => {
      commit('setLoading', false)
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
    })
  },

  submitForm({commit}, payload) {
    commit('setLoading', true)
    const user = JSON.parse(localStorage.getItem('user'))
    api.submitForm(payload, user.token).then(() => {
      commit('setLoading', false)
      alert('신청이 완료되었습니다.')
      router.push({name: 'home'}).catch(err => {})
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
      router.push({name: 'home'}).catch(err => {})
    })
  },

  userTickets({commit}) {
    commit('setLoading', true)
    const user = JSON.parse(localStorage.getItem('user'))
    api.userTickets(user.token).then(tickets => {
      commit('setUserTicketList', tickets.data)
      commit('setLoading', false)
    }).catch(err => {
      commit('setError', err.message)
      commit('setLoading', false)
    })
  },
}

export default {
  namespaced: true,
	state,
	getters,
  actions,
  mutations
}
