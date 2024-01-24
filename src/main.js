import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

import MyHeader from '@/components/MyHeader.vue'
import AddProduct from '@/components/AddProduct.vue'

Vue.component('MyHeader',MyHeader)
Vue.component('AddProduct',AddProduct)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
