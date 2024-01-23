<template>
  <div id="app">
    <MyHeader style="padding-top: 4rem;"></MyHeader>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate() {
    this.$store.commit('initializeStore')
    this.$store.dispatch('fetchData')
    const token = localStorage.getItem('token')
    if (token) {
      this.$store.dispatch('fetchUser')
    }
  },
  mounted() {
    // const token = localStorage.getItem('token')
    // if (token) {
    //   this.fetchUser(token)
    // }
  },
  methods: {
    // async fetchUser(token) {
    //   const response = await fetch(`${this.$store.state.baseUrl}/api/getuser`, {
    //     method: 'GET',
    //     headers: {
    //       'Authentication-Token': token,
    //     },
    //   });
    //   const data = await response.json();
    //   this.$store.commit('setUser', data);
    // },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
