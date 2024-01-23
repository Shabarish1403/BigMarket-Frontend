<template>
  <div style="margin:1rem">
    <div class="container-fluid" align="center">
      <div v-if="flashMessage != ''" :key="flashMessage" class="alert alert-warning alert-dismissible fade show col-md-5"
        role="alert">
        {{ flashMessage }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
          @click="clearFlashMessage"></button>
      </div>
    </div>
    <div v-if="categories.length == 0">
      <p>No Categories or Products are available</p>
      <button class="btn btn-primary">Add</button>
    </div>
    <div>
      <div v-for="category in categories" :key="category.id">
        <div class="card mb-2">
          <div class="card-body">
            <h2 class="card-title">{{ category.name }}</h2>
            <div v-if="category.products.length == 0">
              <p>No Products are availbale</p>
              <button class="btn btn-primary">Create</button>
            </div>
            <div class="d-flex flex-row flex-nowrap overflow-auto">
              <div v-for="product in category.products" :key="product.id">
                <div class="card me-1">
                  <div class="card-body">
                    <div class="d-flex justify-content-center">
                      <h4 class="card-title me-2">{{ product.name }}</h4>
                      <small class="align-self-center mb-2"><b>(<i class="bi bi-currency-rupee"></i>{{ product.price }}/{{
                        product.unit }})</b></small>
                    </div>
                    <p class="card-text">Expriy: {{ product.expiry }}</p>
                    <p class="card-text align-self-center">Availability: {{ product.availability }}</p>
                    <div align="center">
                      <div class="input-group" style="width:6rem">
                        <div class="input-group-prepend">
                          <span class="input-group-text hover" @click="decrementValue(product)">-</span>
                        </div>
                        <input type="text" class="form-control form-control-sm text-center" v-model="product.quantity" />
                        <div class="input-group-append">
                          <span class="input-group-text hover" @click="incrementValue(product)">+</span>
                        </div>
                      </div>
                    </div>
                    <div class="mt-3">
                      <button class="btn btn-warning me-2" @click="addToCart(product)">Add to cart</button>
                      <button class="btn btn-danger">Buy Now</button>
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

export default {
  name: 'HomeView',
  data() {
    return {
      flashMessage: '',
      quantity: 1
    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    },
    user() {
      return this.$store.state.user
    }
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
          this.flashMessage = data.message
        }
        this.$store.dispatch('fetchUser')
      }
    },
    clearFlashMessage() {
      this.flashMessage = ''
    },
    incrementValue(product) {
      product.quantity++;
    },
    decrementValue(product) {
      if (product.quantity > 1) {
        product.quantity--;
      }
    }
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
