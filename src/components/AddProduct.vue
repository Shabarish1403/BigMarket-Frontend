<template>
    <div>
        <div class="modal fade" :id="`addProduct${this.category_id}`" tabindex="-1" aria-labelledby="addProductLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="addProductLabel">Add Product</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-2">
                            <input v-model="product.name" type="text" class="form-control" placeholder="name">
                            <label for="floatingInput">Name</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input v-model="product.expiry" type="date" class="form-control" placeholder="expiry">
                            <label for="floatingPassword">Expiry</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input v-model="product.price" type="float" class="form-control" placeholder="Price">
                            <label for="floatingPassword">Price</label>
                        </div>
                        <div class="form-floating mb-2">
                            <input v-model="product.unit" type="text" class="form-control" placeholder="unit">
                            <label for="floatingPassword">Unit</label>
                        </div>
                        <div class="form-floating">
                            <input v-model="product.availability" type="integer" class="form-control"
                                placeholder="availability">
                            <label for="floatingPassword">availability</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                            @click="addProduct">Add</button>
                        {{ this.product.category_id }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AddProduct',
    props: ['category_id'],
    data() {
        return {
            product: {
                name: '',
                expiry: '',
                price: '',
                unit: '',
                availability: '',
                category_id: this.category_id
            }
        }
    },
    created() {
        // this.product.category_id = this.category_id;
    },
    methods: {
        addProduct() {
            console.log(this.product)
            fetch(`${this.$store.state.baseUrl}/api/addproduct`, {
                method: 'POST',
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
                    this.product = {
                        name: '',
                        expiry: '',
                        price: '',
                        unit: '',
                        availability: '',
                        category_id: this.category_id
                    };
                })
        }
    }
};
</script>