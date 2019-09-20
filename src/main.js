import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import firebase from 'firebase/app';
import './registerServiceWorker'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.VUE_APP_FIREBASE_APP_ID
};
firebase.initializeApp(firebaseConfig)

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  created() {
    if ('user' in localStorage) {
      store.dispatch('autoLogin', JSON.parse(localStorage.getItem('user')))
    } else {
      router.push({name: 'login'}).catch(err => {})
    }
  },
  render: h => h(App)
})
