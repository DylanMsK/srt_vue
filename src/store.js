/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    loading: false,
    error: false
  },
  getters: {
  },
  mutations: {
  },
  actions: {
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
