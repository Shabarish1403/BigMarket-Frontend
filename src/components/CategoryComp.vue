<template>
  <div v-if="categoryData && categoryData.length">
    <div v-for="category in categoryData" :key="category.id" class="card">
      <div class="card-body">
        <h5 class="card-title text-center">{{ category.name }}</h5>
        <div class="card" style="width: 18rem; margin-top: 10px;">
          <ProductComp :products="category.products" />
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>No categories or products available</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductComp from './ProductComp.vue';

export default {
  name: 'CategoryComp',
  computed: {
    ...mapState(['categoryData']),
  },
  components: {
    ProductComp,
  },
};
</script>

<style scoped>
/* .card-body {
  display: flex;
  flex-direction: column;
  overflow-x: auto;
} */

/* .card {
  flex: 0 0 auto;
  margin-top: 10px;
} */
</style>
