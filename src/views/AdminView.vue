<template>
    <div style="margin:1rem">

        <!-- Flash Message -->
        <div class="container" align="center">
            <div v-if="flashMessage != ''" :key="flashMessage"
                class="alert alert-warning alert-dismissible fade show col-md-5" role="alert">
                {{ flashMessage }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
                    @click="clearFlashMessage"></button>
            </div>
        </div>

        <div class="d-flex justify-content-between" align="center">
            <div class="container-fluid" id="pendingManagers">
                <h4 class="mb-2">Pending Managers</h4>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div class="col">
                        <div v-for="manager in admin.pending_managers" :key="manager.id" class="card me-4"
                            style="width:18rem">
                            <div class="card-body">
                                <div class="card-text text-start">
                                    <p>Email: {{ manager.email }}</p>
                                    <p>Username: {{ manager.username }}</p>
                                    <p>Name: {{ manager.name }}</p>
                                </div>
                                <button class="btn btn-success me-2" @click="approveManager(manager.id)">Approve</button>
                                <button class="btn btn-danger">Deny</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid" id="pendingCategories">
                <h4 class="mb-2">Pending Categories</h4>
                <div class="row row-cols-1 row-cols-md-2 g-4">
                    <div v-for="category in admin.pending_categories" :key="category.id" class="card me-4"
                        style="width:18rem">
                        <div class="col">
                            <div class="card-body">
                                <div class="card-text text-start">
                                    <p>Name: {{ category.name }}</p>
                                    <p>Comments: {{ category.comments }}</p>
                                </div>
                                <button class="btn btn-success me-2" @click="approveCategory(category)">Approve</button>
                                <button class="btn btn-danger" @click="deleteCategory(category.id)">Deny</button>
                            </div>
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
    name: "AdminView",
    data() {
        return {

        }
    },
    mounted() {
        this.$store.dispatch('fetchAdmin')
    },
    computed: {
        ...mapState(['admin', 'flashMessage'])
    },
    methods: {
        approveManager(manager_id) {
            fetch(`${this.$store.state.baseUrl}/api/user/${manager_id}`, {
                method: 'PUT',
                headers: {
                    'Authentication-Token': this.$store.state.token
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.message) {
                        this.$store.state.flashMessage = data.message
                    }
                    this.$store.dispatch('fetchAdmin')
                })
        },
        approveCategory(category) {
            fetch(`${this.$store.state.baseUrl}/api/category/${category.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authentication-Token': this.$store.state.token
                },
                body: JSON.stringify(category)
            })
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    if (data.message) {
                        this.$store.state.flashMessage = data.message
                    } else {
                        this.$store.state.flashMessage = ""
                    }
                    this.$store.dispatch('fetchData')
                    this.$store.dispatch('fetchAdmin')
                })
        },
        deleteCategory(category_id) {
            this.$store.dispatch('deleteCategory',category_id)
        },
        clearFlashMessage() {
            this.$store.state.flashMessage = ''
        },
    }
}
</script>