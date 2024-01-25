<template>
    <div>
        <div class="modal fade" :id="`editProduct${this.productData.id}`" tabindex="-1" aria-labelledby="editProductLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editProductLabel">Edit Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-2">
                            <input v-model="product.name" type="text" class="form-control" placeholder="Name">
                            <label for="floatingInput">Name</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input v-model="product.expiry" type="date" class="form-control" placeholder="Expiry">
                            <label for="floatingPassword">Expiry</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input v-model="product.price" type="float" class="form-control" placeholder="Price">
                            <label for="floatingPassword">Price</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input v-model="product.unit" type="text" class="form-control" placeholder="Unit">
                            <label for="floatingPassword">Unit</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input v-model="product.availability" type="integer" class="form-control"
                                placeholder="Availability">
                            <label for="floatingPassword">Availability</label>
                        </div>
                        <div class="form-floating">
                            <input v-model="product.category_id" type="integer" class="form-control"
                                placeholder="Category Id">
                            <label for="floatingPassword">Category Id</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="editProduct">Update</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'EditProduct',
    props: ['productData'],
    data() {
        return {
            product: {
                name: this.productData.name,
                expiry: this.productData.expiry.split('T')[0],
                price: this.productData.price,
                unit: this.productData.unit,
                availability: this.productData.availability,
                category_id: this.productData.category_id
            }
        }
    },
    methods: {
        editProduct() {
            fetch(`${this.$store.state.baseUrl}/api/product/${this.productData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.$store.state.token
                },
                body: JSON.stringify(this.product)
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
    }
};
</script>