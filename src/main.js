import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

import MyHeader from '@/components/MyHeader.vue'
import AddProduct from '@/components/AddProduct.vue'
import EditProduct from '@/components/EditProduct.vue'
import AddCategory from '@/components/AddCategory.vue'
import EditCategory from '@/components/EditCategory.vue'

Vue.component('MyHeader',MyHeader)
Vue.component('AddProduct',AddProduct)
Vue.component('EditProduct',EditProduct)
Vue.component('AddCategory',AddCategory)
Vue.component('EditCategory',EditCategory)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
