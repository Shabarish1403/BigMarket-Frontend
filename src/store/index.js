import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    baseUrl: 'http://127.0.0.1:5000',
    isAuthenticated: false,
    token: '',
    categories: [],
    user: {},
    carts: [],
  },
  getters: {
  },
  mutations: {
    setCategoryData(state, data) {
      state.categoryData = data;
    },
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
    },
    setCategories(state, data) {
      state.categories = data
    },
    setUser(state, data) {
      state.user = data
    },
    setCart(state) {
      state.carts = state.user.carts
    }
  },
  actions: {
    fetchData({ state, commit }) {
      fetch(`${state.baseUrl}/api/categories`, {
        method: 'GET',
      })
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          commit('setCategories', data)
        })
    },
    async loginUser({ state, commit }, payload) {
      const response = await fetch(`${state.baseUrl}/login?include_auth_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      if (!response.ok) {
        alert('Incorrect email or password')
      }
      const data = await response.json()
      const token = data.response.user.authentication_token
      commit('setToken', token)
      localStorage.setItem('token', token)
      this.dispatch('fetchUser')
      router.push('/')
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
      router.go()
    },
    // async fetchUser({ state, commit }) {
    //   const response = await fetch(`${state.baseUrl}/api/getuser`, {
    //     method: 'GET',
    //     headers: {
    //       'Authentication-Token': state.token
    //     }
    //   })
    //   const data = await response.json()
    //   // console.log(data)
    //   commit('setUser', data)
    //   // return data
    // },
    fetchUser({state,commit}) {
      fetch(`${state.baseUrl}/api/getuser`, {
        method: 'GET',
        headers: {
          'Authentication-Token': state.token
        }
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        commit('setUser',data)
        commit('setCart',data)
      })
    }
  },
  modules: {
  }
})
