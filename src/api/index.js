import axios from 'axios'

// const rootPath = 'http://127.0.0.1:8000'
// const authUrl = '/accounts'
const rootPath = 'https://autosrt.herokuapp.com'
const authUrl = rootPath + '/accounts'
const ticketUrl = rootPath + '/ticket/api/status/'

export default {
  
  userRegister(params) {
    return axios.post(`${authUrl}/register/`, params)
  },

  userLogin(params) {
    return axios.post(`${authUrl}/login/`, params)
  },
  
  async userCheck(token) {
    try {
      const res = await axios.request({
        url: `${authUrl}/user/`,
        method: 'get',
        headers: {'Authorization': 'hnd '+ token},
      })
      return res
    } catch(err) {
      console.log(err.message)
    }
  },

  userLogout(token) {
    return axios.request({
      url: `${authUrl}/logout/`,
      method: 'post',
      headers: {'Authorization': 'hnd '+ token},
    })
  },

  submitForm(params, token) {
    return axios.request({
      url: ticketUrl,
      method: 'post',
      params: params,
      headers: {'Authorization': 'hnd '+ token}
    })
  }
}