<template>
    <div v-if="products && products.length">
      <div class="product-container" >
        <div v-for="productItem in products" :key="productItem.id" class="product-card">
          <div class="card-body">
            <h5 class="card-title">{{ productItem.name }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">Rs.{{ productItem.price }} per {{ productItem.unit }}</h6>
            <p :class="{ 'availability-green': productItem.availability > 0, 'availability-red': productItem.availability === 0 }">
              {{ productItem.availability > 0 ? 'Available ' + productItem.availability + productItem.unit + 's' : 'Unavailable' }}
            </p>
            <a href="#" class="card-link">Card link</a>
            <a href="#" class="card-link">Another link</a>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No products available</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductComp',
    props: ['products'],
  };
  </script>
  
  <style scoped>
.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.product-card {
  /* box-sizing: border-box; */
  width: calc(50% - 10px); 
  
}

.card-body {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
}

</style>
