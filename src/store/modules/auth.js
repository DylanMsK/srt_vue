/* eslint-disable */
import api from '@/api'
import router from '@/router'

const state = {
  user: null,
  role: 'user',
  loading: false,
  error: false,
}

const getters = {
  isAuthenticated(state) {
    return state.user !== null && state.user !== undefined
  },
  getUser(state) {
    return state.user
  },
  getRole(state) {
    return state.role
  },  
}

const mutations = {
  setUser(state, payload) {
    // console.log(payload)
    if (payload === null) {
      state.user = null
      state.role = 'user'
    } else {
      state.user = payload.user
      state.role = payload.role
    }
  },
  setError(state, payload) {
    state.error = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
}

const actions = {
  userRegister({commit}, payload) {
    commit('setLoading', true)
    api.checkLogin(payload).then(res => {
      /*
      res.data == 1     ==> 정상 로그인
      res.data == 2     ==> 없는 아이디
      res.data == 3     ==> 비밀번호 오류
      */
      if (res.data === 1) {
        // console.log('정상 로그인')
        api.userRegister(payload).then(() => {
          commit('setLoading', false)
          alert('회원가입이 완료되었습니다. 다시 로그인 해주세요.')
          router.push({name: 'login'}).catch(() => {})
        }).catch(err => {
          alert('회원가입 오류입니다. 다시 진행해 주세요.')
          commit('setLoading', false)
          commit('setError', err.message)
          router.push({name: 'signup'}).catch(() => {})
        })
      } else if (res.data === 2) {
        // console.log('아이디 오류')
        alert('SRT 홈페이지에 등록된 회원이 아닙니다. 아이디를 확인해 주세요.')
        commit('setLoading', false)
      } else {
        // console.log('비밀번호 오류')
        alert('비밀번호가 일치하지 않습니다. 비밀번호를 확인해 주세요. 3회 이상 틀릴시 계정이 정지됩니다.')
        commit('setLoading', false)
        router.push({name: 'signup'}).catch(() => {})
      }
    }).catch(err => {
      alert('서버 오류입니다. 현재 서비스를 이용할 수 없습니다.')
      commit('setLoading', false)
      commit('setError', err.message)
      router.push({name: 'login'}).catch(() => {})
    })

  },

  userLogin({commit}, payload) {
    commit('setLoading', true)
    api.userLogin(payload).then(res => {
      localStorage.setItem('user', JSON.stringify(res.data.user))
      commit('setUser', {user: res.data.profile, role: res.data.role})
      commit('setLoading', false)
      router.push({name: 'home'}).catch(() => {})
    }).catch(err => {
      alert('아이디와 비밀번호를 확인해 주세요.')
      commit('setLoading', false)
      commit('setError', err.message)
    })
  },

  autoLogin({commit}, payload) {
    commit('setLoading', true)
    api.userCheck(payload.token).then(res => {
      if (res.data.username === payload.username) {
        commit('setUser', {user: res.data.profile, role: res.data.role})
      } else {
        localStorage.removeItem('user')
        commit('setUser', null)
        router.push({name: 'login'}).catch(() => {})
      }
      commit('setLoading', false)
    }).catch(err => {
      localStorage.removeItem('user')
      router.push({name: 'login'}).catch(() => {})
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
      commit('setUser', null)
      commit('setError', err.message)
      commit('setLoading', false)
      localStorage.removeItem('user')
      router.push({name: 'login'}).catch(err => {})
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
