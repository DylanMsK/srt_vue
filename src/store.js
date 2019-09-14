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
    error: false
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
    },
    getUser(state) {
      return state.user
    }

  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
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
        commit('setLoading', false)
        commit('setError', err.message)
      })
    },

    userLogout({commit}) {
      commit('setLoading', true)
      const user = JSON.parse(localStorage.getItem('user'))
      api.userLogout(user.token).then(() => {
        alert('정상적으로 로그아웃 되었습니다.')
        localStorage.removeItem('user')
        commit('setUser', null)
        commit('setLoading', false)
        router.push({name: 'login'}).catch(err => {})
      }).catch(err => {
        // console.log(err.message)
        commit('setLoading', false)
        commit('setError', err.message)
      })
    },

    submitForm({commit}, payload) {
      commit('setLoading', true)
      const user = JSON.parse(localStorage.getItem('user'))
      api.submitForm(payload, user.token).then(() => {
        alert('db 저장 완료')
        commit('setUser', null)
        commit('setLoading', false)
      }).catch(err => {
        console.log(err.message)
        commit('setLoading', false)
        commit('setError', err.message)
      })
    },

    // 장고로 저장하기
    // payload: {

    // }
    setNewTicket({commit}, payload) {

    },

    // 장고에서 불러오기
    // payload: {

    // }
    getTicket({commit}, payload) {

    }
  }
})
