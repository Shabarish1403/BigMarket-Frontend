<template>
    <div>
        <nav class="navbar navbar-expand-lg bg-dark fixed-top" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Big Market</a>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                    <div v-if="$store.state.isAuthenticated" class="d-flex">
                        <form class="d-flex me-2" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form>
                        <button class="btn btn-danger" @click="logoutUser">Log Out</button>
                    </div>
                    <div v-else>
                        <a class="btn btn-info" href="/login" role="button">Log In</a>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'MyHeader',
    data() {
        return {
        }
    },
    methods: {
        logoutUser() {
            this.$store.dispatch('logoutUser')
        }
    }
}
</script>

<style scoped></style>