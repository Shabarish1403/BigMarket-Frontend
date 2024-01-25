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
    admin: {},
    carts: [],
    purchases: [],
    flashMessage: ''
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
    },
    setCategories(state, data) {
      state.categories = data
    },
    setUser(state, data) {
      state.user = data
    },
    setAdmin(state,data) {
      state.admin = data
    },
    setCart(state) {
      state.carts = state.user.carts
    },
    setPurchases(state) {
      state.purchases = state.user.purchases
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
    loginUser({ state, commit }, payload) {
      fetch(`${state.baseUrl}/login?include_auth_token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.meta.code == 400) {
          state.flashMessage = data.response.errors[0]
        } else {
          const token = data.response.user.authentication_token
          commit('setToken', token)
          localStorage.setItem('token', token)
          this.dispatch('fetchUser')
          this.dispatch('fetchAdmin')
          router.push('/')
        }
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
      router.go()
    },
    fetchUser({ state, commit }) {
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
          commit('setUser', data)
          commit('setCart')
          commit('setPurchases')
        })
    },
    fetchAdmin({state,commit}) {
      fetch(`${state.baseUrl}/api/admin`, {
        method: 'GET',
        headers: {
          'Authentication-Token': state.token
        }
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          commit('setAdmin', data)
      })
    },
    deleteCart({state}, cart_id) {
      fetch(`${state.baseUrl}/api/cart/${cart_id}`, {
          method: 'DELETE',
          headers: {
              'Authentication-Token': state.token
          }
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        if (data.message) {
          state.flashMessage = data.message
          this.dispatch('fetchUser')
        }
      })
    },
    buyNow({ state }, payload) {
      console.log(payload)
      fetch(`${state.baseUrl}/api/addpurchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': state.token
        },
        body: JSON.stringify(payload)
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          console.log(data)
          if (data.message) {
            state.flashMessage = data.message
          }
          this.dispatch('fetchData')
          this.dispatch('fetchUser')
        })
    },
    deleteCategory({state},category_id) {
      if (confirm('Are you sure you want to delete?')) {
        fetch(`${state.baseUrl}/api/category/${category_id}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': state.token
          }
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            if (data.message) {
              state.flashMessage = data.message
            }
            this.dispatch('fetchData')
            this.dispatch('fetchAdmin')
          })
      }
    },
  },
  modules: {
  }
})
