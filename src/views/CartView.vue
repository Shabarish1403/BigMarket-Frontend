<template>
    <div style="margin:1rem">
        <div v-if="carts.length == 0">
            <p>No products available in the cart. <a href="/">Continue Shopping</a></p>
        </div>
        <div v-else class="container-fluid d-flex justify-content-between" align="left">
            <div class="w-75">
                <div v-for="cart in carts" :key="cart.id" class="card mb-2" align="left">
                    <div class="d-flex justify-content-between" style="margin:2rem">
                        <div>
                            <h4 class="">{{ getCategory(cart.product_id).name }} - {{ getProduct(cart.product_id).name }}
                            </h4>
                            <p>Rs.{{ getProduct(cart.product_id).price }}/{{ getProduct(cart.product_id).unit }}</p>
                            <div class="d-flex">
                                <div class="input-group" style="width:6rem">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text hover" @click="decrementValue(cart)">-</span>
                                    </div>
                                    <input type="text" class="form-control form-control-sm text-center"
                                        v-model="cart.quantity" />
                                    <div class="input-group-append">
                                        <span class="input-group-text hover" @click="incrementValue(cart)">+</span>
                                    </div>
                                </div>
                                <button class="btn btn-link link-danger" @click="deleteCart(cart.id)"><i
                                        class="bi bi-trash3"></i></button>
                            </div>
                        </div>
                        <div class="align-self-center d-flex">
                            <i class="bi bi-currency-rupee"></i>
                            <h4>{{ getPrice(cart) }}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div id="totalPrice" class="card w-25 ms-3 position-fixed end-0 me-2">
                <div class="" style="margin:1rem" align="center">
                    <h4>Total Payable Amount</h4>
                    <h6>Subtotal:<b><i class="bi bi-currency-rupee"></i>{{ getTotalPrice }}</b></h6>
                    <button class="btn btn-warning w-100" @click="buyAll()">Proceed to Buy</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'CartView',
    data() {
        return {
            flashMessage: ''
        }
    },
    computed: {
        ...mapState(['carts', 'categories']),
        getTotalPrice() {
            return this.carts.reduce((total, cart) => {
                const product = this.getProduct(cart.product_id);
                const price = cart.quantity * product.price;
                return total + price;
            }, 0).toFixed(2);
        },
    },
    methods: {
        getCategory(product_id) {
            const category = this.categories.find(category => {
                return category.products.some(product => product.id === product_id);
            });
            return category
        },
        getProduct(product_id) {
            const category = this.getCategory(product_id)
            if (category) {
                const product = category.products.find(product => product.id === product_id)
                return product
            }
        },
        getPrice(cart) {
            const quantity = cart.quantity
            const product = this.getProduct(cart.product_id)
            return (quantity * product.price).toFixed(2)
        },

        incrementValue(cart) {
            cart.quantity++;
        },
        decrementValue(cart) {
            if (cart.quantity > 1) {
                cart.quantity--;
            }
        },
        deleteCart(cart_id) {
            this.$store.dispatch('deleteCart',cart_id)
        },
        buyAll() {
            if (confirm(`Are you sure you want to buy all products`)) {
                this.carts.forEach(cart => {
                    const payload = {'product_id':cart.product_id,'quantity':cart.quantity}
                    console.log(cart)
                    this.$store.dispatch('buyNow', payload)
                    this.deleteCart(cart.id)
                }) 
            }
        }
    }
}
</script>

<style scoped>
.hover {
    cursor: pointer;
}
</style>