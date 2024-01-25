<template>
  <div>
    <div class="modal fade" id="addCategory" tabindex="-1" aria-labelledby="addCategoryLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Header -->
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="addCategoryLabel">Add Category</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <!-- Body -->
          <div class="modal-body">
            <div class="form-floating mb-3">
              <input v-model="category.name" type="text" class="form-control" id="floatingInput" placeholder="Name">
              <label for="floatingInput">Name</label>
            </div>
          </div>
          <!-- Footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="addCategory">Add</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AddCategory',
  data() {
    return {
      category: {
        name: ''
      }
    }
  },
  methods: {
    addCategory() {
      fetch(`${this.$store.state.baseUrl}/api/addcategory`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authentication-Token': this.$store.state.token
        },
        body: JSON.stringify(this.category)
      })
        .then(response => {
          return response.json()
        })
        .then(data => {
          if (data.message) {
            this.$store.state.flashMessage = data.message
          }
          this.$store.dispatch('fetchData')
          this.category = {
            name: '',
          };
        })
    }
  }
};
</script>

<style scoped>
</style>