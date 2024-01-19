<template>
    <div>
        <CategoryComp :categoryData="categoryData" />
        <!-- <div class="d-grid gap-2 d-md-flex justify-content-md-end">
    <button class="btn btn-primary me-md-2 ms-auto" type="button">Add</button>
</div> -->
    </div>
</template>

<script>
import CategoryComp from '@/components/CategoryComp.vue';
export default {
    name: 'DashboardView',
    data() {
        return {
            
        }
    },
    computed: {
        categoryData() {
            return this.$store.state.categoryData || [];
        },
    },
    components: {
        CategoryComp,
    },
}
</script>