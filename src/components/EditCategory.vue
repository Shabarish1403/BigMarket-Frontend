<template>
    <div>
      <div class="modal fade" :id="`editCategory${this.categoryData.id}`" tabindex="-1" aria-labelledby="editCategoryLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <!-- Header -->
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="editCategoryLabel">Edit Category</h1>
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
              <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="editCategory">Update</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  export default {
    name: 'EditCategory',
    props: ['categoryData'],
    data() {
      return {
        category: {
          name: this.categoryData.name
        }
      }
    },
    methods: {
      editCategory() {
        fetch(`${this.$store.state.baseUrl}/api/category/${this.categoryData.id}`, {
          method: 'PUT',
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
            // this.category = {
            //   name: '',
            // };
          })
      }
    }
  };
  </script>
  
  <style scoped>
  </style>