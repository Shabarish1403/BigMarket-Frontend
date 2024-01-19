import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://127.0.0.1:5000',
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      let token = localStorage.getItem('token')
      if (token) {
        state.token = token
        state.isAuthenticated = true
      }
      else {
        state.token = ''
        state.isAuthenticated = false
      }
    },
    setToken(state, token) {
      state.token = token
      state.isAuthenticated = true
    },
    removeToken(state) {
      state.token = ''
      state.isAuthenticated = false
    }
  },
  actions: {
    loginUser({ state, commit }, payload) {
        fetch(`${state.baseUrl}/login?include_auth_token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        })
        .then((response) => {
          if (!response.ok) {
            alert('Incorrect email or password')
          }
          return response.json()
        })
        .then((data) => {
          const token = data.response.user.authentication_token
          commit('setToken', token)
          localStorage.setItem('token', token)
          router.push('/dashboard')
        })
        .catch(error => console.error(error))
    },
    logoutUser({ state, commit }) {
      fetch(`${state.baseUrl}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': state.token
        }
      })
        .catch(error => console.error(error))
      localStorage.clear()
      commit('removeToken')
      router.push('/')
    }
  },
  modules: {
  }
})
