import axios from 'axios'

const rootPath = 'http://127.0.0.1:8000/'
// const rootPath = 'https://autosrt-v2.herokuapp.com/'
const authUrl = rootPath + 'accounts/'
const ticketUrl = rootPath + 'tickets/'
const adminUrl = rootPath + 'bigbrothers/'

export default {
  
  checkLogin(params) {
    return axios.get(`https://9cpa5xyu8j.execute-api.ap-northeast-2.amazonaws.com/default/srtid_check?srtid=${params.username}&srtpw=${params.password}&logintype=${params.loginType}`)
  },

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

  getSchedules(dpt, arr, date, time) {
    return axios.get(`https://ahg58uol78.execute-api.ap-northeast-2.amazonaws.com/default/get_srt_time?dpt=${dpt}&arr=${arr}&date=${date}&dptime=${time}`)
  },

  subtractPoint(params, token) {
    return axios.patch(`${authUrl}edit/`, params, {headers: {"Authorization": "srt " + token}})
  },

  submitForm(params, token) {
    return axios.post(`${ticketUrl}submit/`, params, {headers: {"Authorization": "srt " + token}})
  },

  userTickets(token) {
    return axios.get(`${ticketUrl}`, {headers: {"Authorization": "srt " + token}})
  },

  getUserTickets(token) {
    return axios.get(`${adminUrl}tickets/`, {headers: {"Authorization": "srt " + token}})
  },

  editUserTicket(params, token) {
    return axios.patch(`${adminUrl}tickets/${params.id}/`, params, {headers: {"Authorization": "srt " + token}})
  },

  getUserProfiles(token) {
    return axios.get(`${adminUrl}profiles/`, {headers: {"Authorization": "srt " + token}})
  },

  editUserProfile(params, token) {
    return axios.patch(`${adminUrl}profiles/${params.id}/`, params, {headers: {"Authorization": "srt " + token}})
  }

}