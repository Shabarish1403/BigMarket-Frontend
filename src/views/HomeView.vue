<template>
  <div style="margin:1rem">
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
                    <h4 class="card-title">{{ product.name }}</h4>
                    <p class="card-text">Expriy: {{ product.expiry }}</p>
                    <p class="card-text">Price: {{ product.price }}/{{ product.unit }}</p>
                    <p class="card-text">Availability: {{ product.availability }}</p>
                    <button class="btn btn-warning me-2">Add to cart</button>
                    <button class="btn btn-danger">Buy</button>
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

    }
  },
  computed: {
    categories() {
      return this.$store.state.categories
    }
  }
}
</script>

<style scoped>
.scrollable-cards {
  overflow-x: auto;
  white-space: nowrap;
}

.card-body {
  /* min-height: 300px; */
  min-width: 300px;
  /* margin-right: 5px; */
}
</style>