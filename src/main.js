import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'materialize-css/dist/css/materialize.min.css' 
import messagePlugin from '@/tools/message.plugin'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(messagePlugin)



const firebaseConfig = {
  apiKey: "AIzaSyD2VwLAJTXmIGEhUZ7XP7_yloCRGgo0_mw",
  authDomain: "esoft-6c224.firebaseapp.com",
  databaseURL: "https://esoft-6c224-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "esoft-6c224",
  storageBucket: "esoft-6c224.appspot.com",
  messagingSenderId: "82325387230",
  appId: "1:82325387230:web:c372bf94e086aa14338f4f",
  measurementId: "G-H5TS2KSBR3"
}

let app

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
if (!app)
{
  new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
}
})