<template>
  <div style="margin:1rem">

    <!-- Approvals -->
    <div class="mb-2" v-if="user.roles && user.roles[0].name === 'admin'" align="right">
      <a class="btn btn-dark" href="/admin">Approvals</a>
    </div>

    <!-- Flash Message -->
    <div class="container" align="center">
      <div v-if="flashMessage != ''" :key="flashMessage" class="alert alert-warning alert-dismissible fade show col-md-5"
        role="alert">
        {{ flashMessage }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
          @click="clearFlashMessage"></button>
      </div>
    </div>

    <!-- No data available -->
    <div v-if="categories.length == 0">
      <p>No Categories or Products are available</p>
      <button v-if="user.roles && user.roles[0].name === 'manager'" class="btn btn-primary">Add</button>
    </div>

    <!-- Categories and Products -->
    <div>
      <!-- Categories -->
      <div v-for="category in categories" :key="category.id">

        <!-- Category details -->
        <div class="card mb-2">
          <div class="card-body text-center">
            <div class="d-flex justify-content-between">
              <div class="d-flex">
                <h2 class="card-title me-2">{{ category.name }}</h2>
                <div v-if="user.roles && ['manager', 'admin'].includes(user.roles[0].name)">
                  <button class="btn btn-warning me-1" data-bs-toggle="modal"
                    :data-bs-target="`#editCategory${category.id}`"><i class="bi bi-pencil-square"></i></button>
                  <button class="btn btn-danger" @click="deleteCategory(category.id)"><i
                      class="bi bi-trash3"></i></button>
                  <EditCategory :categoryData="category"></EditCategory>
                </div>
              </div>

              <!-- Add Product -->
              <div v-if="user.roles && user.roles[0].name === 'manager'">
                <button class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="`#addProduct${category.id}`">Add
                  Product <i class="bi bi-plus-circle"></i></button>
                <AddProduct :category_id="category.id"></AddProduct>
              </div>
            </div>

            <!-- No Products -->
            <div v-if="category.products.length == 0">
              <p>No Products are availbale</p>
            </div>

            <!-- Products -->
            <div class="d-flex flex-row flex-nowrap overflow-auto">
              <div v-for="product in category.products" :key="product.id">

                <!-- Product details -->
                <div class="card me-1">
                  <div class="card-body">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title me-2">{{ product.name }}</h4>
                      <small class="align-self-center mb-2"><b>(<i class="bi bi-currency-rupee"></i>{{ product.price }}/{{
                        product.unit }})</b></small>
                    </div>
                    <p class="card-text">Expriy: {{ product.expiry }}</p>
                    <p class="card-text align-self-center">Availability: {{ product.availability }}</p>

                    <!-- User operations -->
                    <div v-if="(!isAuthenticated) || (user.roles && user.roles[0].name === 'user')">
                      <div align="center">
                        <div class="input-group" style="width:6rem">
                          <div class="input-group-prepend">
                            <span class="input-group-text hover" @click="decrementValue(product)">-</span>
                          </div>
                          <input type="text" class="form-control form-control-sm text-center"
                            v-model="product.quantity" />
                          <div class="input-group-append">
                            <span class="input-group-text hover" @click="incrementValue(product)">+</span>
                          </div>
                        </div>
                      </div>
                      <div class="mt-3">
                        <button class="btn btn-warning me-2" @click="addToCart(product)">Add to cart</button>
                        <button class="btn btn-danger" @click="buyNow(product)">Buy Now</button>
                      </div>
                    </div>

                    <!-- Edit and Delete Product -->
                    <div v-if="user.roles && user.roles[0].name === 'manager'">
                      <button class="btn btn-warning me-1" data-bs-toggle="modal"
                        :data-bs-target="`#editProduct${product.id}`"><i class="bi bi-pencil-square"></i></button>
                      <button class="btn btn-danger" @click="deleteProduct(product.id)">
                        <i class="bi bi-trash3"></i>
                      </button>
                      <EditProduct :productData="product"></EditProduct>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'HomeView',
  data() {
    return {
    }
  },
  mounted() {
  },
  computed: {
    ...mapState(['categories', 'flashMessage', 'user', 'isAuthenticated']),
  },
  methods: {
    async addToCart(product) {
      if (!this.$store.state.isAuthenticated) {
        this.$router.push('/login')
      } else {
        const response = await fetch(`${this.$store.state.baseUrl}/api/addtocart/${product.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authentication-Token': localStorage.getItem('token')
          },
          body: JSON.stringify({ 'product_id': product.id, 'quantity': product.quantity })
        })
        const data = await response.json()
        if (data.message) {
          this.$store.state.flashMessage = data.message
        }
        this.$store.dispatch('fetchUser')
      }
    },
    buyNow(product) {
      if (!this.$store.state.isAuthenticated) {
        this.$router.push('/login')
      } else {
        if (confirm(`Are you sure you want to buy ${product.name} of quantity ${product.quantity}`)) {
          const payload = { 'product_id': product.id, 'quantity': product.quantity }
          this.$store.dispatch('buyNow', payload)
        }
      }
    },
    clearFlashMessage() {
      this.$store.state.flashMessage = ''
    },
    incrementValue(product) {
      product.quantity++;
    },
    decrementValue(product) {
      if (product.quantity > 1) {
        product.quantity--;
      }
    },
    deleteProduct(product_id) {
      if (confirm('Are you sure you want to delete?')) {
        fetch(`${this.$store.state.baseUrl}/api/product/${product_id}`, {
          method: 'DELETE',
          headers: {
            'Authentication-Token': this.$store.state.token
          }
        })
          .then(response => {
            return response.json()
          })
          .then(data => {
            if (data.message) {
              this.$store.state.flashMessage = data.message
            }
            this.$store.dispatch('fetchData')
          })
      }
    },
    deleteCategory(category_id) {
      this.$store.getters.deleteCategory(category_id)
    },
  }
}
</script>

<style scoped>
.card-body {
  /* min-height: 300px; */
  min-width: 300px;
  /* margin-right: 5px; */
}

.hover {
  cursor: pointer;
}
</style>
