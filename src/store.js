/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: false,
    completedTickets: [],
    uncompletedTickets: []
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
    },
    getUser(state) {
      return state.user
    },
    getCompletedTicketList(state) {
      return state.completedTickets
    },
    getUncompletedTicketList(state) {
      return state.uncompletedTickets
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    setLoading(state, payload) {
      state.loading = payload
    },
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
    }
  },
  actions: {

    userRegister({commit}, payload) {
      api.userRegister(payload).then(res => {
        commit('setLoading', false)
      }).catch(err => {
        // console.log(err.message)
        commit('setLoading', false)
        commit('setError', err.message)
      })
    },

    userLogin({commit}, payload) {
      commit('setLoading', true)
      api.userLogin(payload).then(res => {
        localStorage.setItem('user', JSON.stringify(res.data.user))
        commit('setUser', res.data.profile)
        commit('setLoading', false)
        router.push({name: 'home'}).catch(err => {})
      }).catch(err => {
        // console.log(err.message)
        commit('setLoading', false)
        commit('setError', err.message)
      })
    },

    autoLogin({commit}, payload) {
      commit('setLoading', true)
      api.userCheck(payload.token).then(res => {
        if (res.data.username === payload.username) {
          commit('setUser', res.data.profile)
        } else {
          localStorage.removeItem('user')
          commit('setUser', null)
          router.push({name: 'login'}).catch(err => {})
        }
        commit('setLoading', false)
      }).catch(err => {
        // console.log(err.message)
        localStorage.removeItem('user')
        router.push({name: 'login'}).catch(err => {})
        commit('setLoading', false)
        commit('setError', err.message)
      })
    },

    userLogout({commit}) {
      commit('setLoading', true)
      const user = JSON.parse(localStorage.getItem('user'))
      api.userLogout(user.token).then(() => {
        alert('정상적으로 로그아웃 되었습니다.')
        commit('setLoading', false)
        commit('setUser', null)
        localStorage.removeItem('user')
        router.push({name: 'login'}).catch(err => {})
      }).catch(err => {
        // console.log(err.message)
        commit('setUser', null)
        commit('setLoading', false)
        commit('setError', err.message)
        localStorage.removeItem('user')
        router.push({name: 'login'}).catch(err => {})
      })
    },

    submitForm({commit}, payload) {
      commit('setLoading', true)
      const user = JSON.parse(localStorage.getItem('user'))
      api.submitForm(payload, user.token).then(() => {
        // commit('setUser', null)
        commit('setLoading', false)
        alert('신청이 완료되었습니다.')
        router.push({name: 'home'}).catch(err => {})
      }).catch(err => {
        console.log(err.message)
        commit('setLoading', false)
        commit('setError', err.message)
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
        commit('setLoading', false)
        commit('setError', err.message)
      })
    }
  }
})
