<template>
    <div>
        <nav class="navbar navbar-expand-lg text-bg-dark fixed-top" data-bs-theme="dark">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">Big Market</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
                    aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            {{ user.username }}
                        </li>
                    </ul>
                    <div v-if="$store.state.isAuthenticated" class="d-flex justify-content-end">
                        <form class="d-flex me-3 w-50" role="search">
                            <div class="input-group">
                                <input class="form-control" type="search" placeholder="Search" aria-label="Search"
                                    aria-describedby="button-addon2">
                                <button class="btn btn-warning" type="submit" id="button-addon2"><i
                                        class="bi bi-search"></i></button>
                            </div>
                        </form>
                        <div v-if="user.roles && user.roles[0].name == 'user'" class="me-3">
                            <a href="/cart" class="position-relative">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                    class="bi bi-cart4 text-light" viewBox="0 0 16 16">
                                    <path
                                        d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0" />
                                </svg>
                                <span v-if="carts.length != 0"
                                    class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                                    style="font-size: 9px;">
                                    {{ carts.length }}
                                </span>
                            </a>
                        </div>
                        <div class="dropdown">
                            <a class="dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                                    class="bi bi-person-circle text-light" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fill-rule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </a>
                            <ul class="dropdown-menu dropdown-menu-lg-start">
                                <li><a class="dropdown-item" href="/purchases">My Profile</a></li>
                                <li><a class="dropdown-item" href="#">Settings</a></li>
                                <li><button class="dropdown-item" @click="logoutUser">Logout</button></li>
                            </ul>
                        </div>
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
import { mapState,mapActions } from 'vuex';

export default {
    name: 'MyHeader',
    data() {
        return {
        }
    },
    computed: {
        ...mapState(['user','carts'])
    },
    methods: {
        ...mapActions(['logoutUser']), 
    }
}
</script>

<style scoped>
.dropdown-toggle::after {
    content: None
}
</style>