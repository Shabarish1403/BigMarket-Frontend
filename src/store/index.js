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
    categoryData: [
      {
        id: 1,
        name: 'Category 1',
        active: true,
        comments: 'Test comments for Category 1',
        products: [
          {
            id: 101,
            name: 'Product 1',
            expiry: '2024-01-20', 
            price: 10,
            unit: 'pcs',
            availability: 50,
            category_id: 1,
            purchases: [],
            carts: [],
          },
          {
            id: 102,
            name: 'Product 2',
            expiry: '2024-01-20', 
            price: 10,
            unit: 'pcs',
            availability: 50,
            category_id: 1,
            purchases: [],
            carts: [],
          },
        ]
      }
    ],
      
  },
  getters: {
    getCategoryData: state => {
      return state.categoryData;
    },
    getCategories(state) {
      return state.categories
    },
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
    setUser(state,data) {
      state.user = data
    },
  },
  actions: {
    fetchData({state,commit}) {
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
          this.dispatch('fetchUser')
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
    },
    async fetchUser({state,commit}) {
      const response = await fetch(`${state.baseUrl}/api/getuser`, {
        method: 'GET',
        headers: {
          'Authentication-Token':state.token
        }
      })
      const data = await response.json()
      console.log(data)
      commit('setUser',data)
      // return data
    }
  },
  modules: {
  }
})
