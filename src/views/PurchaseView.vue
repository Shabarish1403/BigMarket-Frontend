<template>
    <div style="margin:1rem">
        <h2 class="text-start ms-2 mb-3">My Purchases</h2>

        <div v-if="purchases.length == 0">
            <p>No purchases available. <a href="/">Keep shopping</a></p>
        </div>
        <div v-else class="container">
            <div class="row row-cols-1 row-cols-md-2 g-4">
                <div v-for="purchase in purchases" :key="purchase.id" class="col">
                    <div class="card mb-2 text-start">
                        <div class="card-body d-flex justify-content-between" style="">
                            <div>
                                <div class="d-flex">
                                    <h4 class="card-title me-2">{{ getCategory(purchase.product_id).name }} -
                                        {{ getProduct(purchase.product_id).name }}</h4>
                                    <small class="align-self-center mb-2">({{ purchase.quantity }} units)</small>
                                </div>
                                <div>
                                    <p class="card-text">Rs.{{ getProduct(purchase.product_id).price }}/{{
                                        getProduct(purchase.product_id).unit }}</p>
                                </div>
                            </div>

                            <div class="align-self-center d-flex">
                                <i class="bi bi-currency-rupee"></i>
                                <h4>{{ getPrice(purchase) }}</h4>
                            </div>
                        </div>
                        <div class="card-footer">
                            {{ purchase.purchased_at }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'PurchaseView',
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['purchases', 'categories'])
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
        getPrice(purchase) {
            const quantity = purchase.quantity
            const product = this.getProduct(purchase.product_id)
            return (quantity * product.price).toFixed(2)
        },
    }
}
</script>