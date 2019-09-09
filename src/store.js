import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import "firebase/functions"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    userInfo: null,
    error: null,
    loading: false,
    permission: false
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null && state.user !== undefined
    },
    isAdmin(state) {
      return state.user !== null && state.permission === true
    },
    getUser(state) {
      return state.user
    },
    getUserInfo(state) {
      return state.userInfo
    }
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
    setPermission(state, payload) {
      state.permission = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    userSignup({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password).then(firebaseUser => {
        firebase.firestore().collection('users').doc(firebaseUser.user.uid).set({
          loginType: payload.loginType,
          id: payload.id,
          password: payload.password,
          phone: payload.phone,
          point: 10000,
          registed_at: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
          commit('setLoading', false)
        }).catch(err => {
          console.log(err.message)
          commit('setError', err.message)
          commit('setLoading', false)
        })
        firebase.auth().currentUser.then(user => {
          user.updateProfile({
            displayName: payload.id
          })
        })
      }).catch(err => {
        console.log(err.message)
        commit('setError', err.message)
        commit('setLoading', false)
      })
    },

    userSignin({commit}, payload) {
      commit('setLoading', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password).then(firebaseUser => {
        // commit('setUser', {
        //   id: firebaseUser.displayName,
        //   uid: firebaseUser.user.uid
        // })
        commit('setUser', firebaseUser.user)
        commit('setLoading', false)
        commit('setError', null)
      }).catch(err => {
        if (err.code === 'auth/user-not-found') {
          commit('setError', '이메일을 확인해 주세요')
          alert('이메일을 확인해 주세요')
        } else if (err.code === 'auth/wrong-password') {
          commit('setError', '비밀번호가 일치하지 않습니다')
          alert('비밀번호가 일치하지 않습니다')
        } else {
          commit('setError', err.message)
          alert(err.code, err.message)
        }
      })
    },

    autoSignin({commit}, payload) {
      commit('setUser', payload)
    },

    userSignout({commit}) {
      commit('setLoading', true)
      firebase.auth().signOut().then(() => {
        commit('setUser', null)
        commit('setLoading', false)
      });
    },

    getUserInfo({commit}, payload) {
      commit('setLoading', true)
      firebase.firestore().collection('users').doc(payload.uid).get().then(doc => {
        const data = doc.data()
        data.id = doc.id
        console.log(data)
        commit('setUserInfo', data)
        commit('setLoading', false)
      }).catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
    },

    addAdmin({commit}, payload) {
      commit('setLoading', true)
      const addAdminRole = firebase.functions().httpsCallable('addAdminRole')
      addAdminRole(payload).then(msg => {
        console.log(msg)
        alert(msg)
        commit('setLoading', false)
      })
    },

    checkPermission({commit}) {
      commit('setLoading', true)
      firebase.auth().currentUser.getIdTokenResult().then(idTokenResult => {
        // eslint-disable-next-line
        if (!!idTokenResult.claims.admin) {
          commit('setPermission', true)
        } else {
          commit('setPermission', false)
        }
      }).catch(err => {
        console.log(err)
      })
      commit('setLoading', false)
    },
    
    createReservation({commit}, payload) {
      commit('setLoading', true)
      console.log(payload)
      firebase.firestore().collection('reservations').doc().set({
        id: payload.id,
        password: payload.password,
        uid: payload.uid,
        depart: payload.depart,
        arrive: payload.arrive,
        adult: payload.adult,
        child: payload.child,
        date: payload.date,
        tickets: payload.tickets,
        created_at: firebase.firestore.FieldValue.serverTimestamp(),
        completed: false
      }).then(() => {
        commit('setLoading', false)
      }).catch(err => {
        commit('setError', err.message)
        commit('setLoading', false)
      })
    }
  }
})
