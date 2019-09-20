import axios from 'axios'

// const rootPath = 'http://127.0.0.1:8000/'
const rootPath = 'https://autosrt-v2.herokuapp.com/'
const authUrl = rootPath + 'accounts/'
const ticketUrl = rootPath + 'tickets/'

export default {
  
  userRegister(params) {
    return axios.post(`${authUrl}register/`, params)
  },

  userLogin(params) {
    return axios.post(`${authUrl}login/`, params)
  },
  
  userCheck(token) {
    return axios.get(`${authUrl}user/`, {headers: {"Authorization": "srt "+ token}})
  },

  userLogout(token) {
    return axios.post(`${authUrl}logout/`, {headers: {'Authorization': 'srt '+ token}})
  },

  submitForm(params, token) {
    return axios.post(`${ticketUrl}submit/`, params, {headers: {"Authorization": "srt " + token}})
  },

  userTickets(token) {
    return axios.get(`${ticketUrl}/`, {headers: {"Authorization": "srt " + token}})
  }
}