import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import info from './modules/info'
import moment from 'moment' 
import firebase from "firebase/app"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
   actions: {
    async fetchCurrency({commit}) {
      try{
      const lastCheck = (await firebase.database().ref(`/lastCheck/`).once('value')).val()
      if (!lastCheck)
      {
        const res = await fetch('https://www.cbr-xml-daily.ru/latest.js')
        const resjson = await res.json()
        resjson.date = moment(date).utc(false).format()
        await firebase.database().ref(`/lastCheck/`).set(resjson)  
        return resjson
      }
      const date = new Date()
      const Now = moment(date).utc(false).format()
      const LastDate = moment(lastCheck.date).utc(false).format()
      const timeDif = moment(Now).diff(moment(LastDate), 'minute') // разница времени с последней загрузкой
      if (timeDif >= 20)
      {
        try{
        const res = await fetch('https://www.cbr-xml-daily.ru/latest.js')
        const resjson = await res.json()
        resjson.date = moment(date).utc(false).format()
        await firebase.database().ref(`/lastCheck/`).set(resjson)  
        return resjson
        }
        catch (e) {
          e.code = 'JSONMiss'
          commit('setError', e)
          return lastCheck 
        }
      }
      else return lastCheck
      }
      catch (e) {
        commit('setError', e) 
        throw e      
    }
    }
  },
  modules: {
    auth, info
  }
})
