<template>
    <div>
        <div class="container-fluid" style="padding-top:8rem" align="center">
            <div v-if="flashMessage != ''" class="alert alert-success alert-dismissible fade show col-md-3" role="alert">
                {{ flashMessage }}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div v-if="show">
                <h2>Welcome</h2>
                <form @submit="loginUser" class="col-md-3 mx-auto" id="login">
                    <input class="form-control mb-2" v-model="user.email" type="email" placeholder="Email" required>
                    <input class="form-control mb-2" v-model="user.password" type="password" placeholder="Password"
                        required>
                    <button class="btn btn-primary" type="submit">Login</button>
                </form>
                <small>Don't have an account? <a class="link hover" @click="toggleLogin">Sign Up</a></small>
            </div>
            <div v-else>
                <h2>Welcome</h2>
                <form @submit="signupUser" class="col-md-3 mx-auto" id="signup">
                    <select v-model="user.role" class="form-select mb-2" aria-label="Default select example">
                        <option value="user" selected>User</option>
                        <option value="manager">Manager</option>
                    </select>
                    <input class="form-control mb-2" v-model="user.email" type="email" placeholder="Email" required>
                    <input class="form-control mb-2" v-model="user.username" placeholder="Username" required>
                    <input class="form-control mb-2" v-model="user.name" placeholder="Name" required>
                    <input class="form-control mb-2" v-model="user.password" type="password" placeholder="Password"
                        required>
                    <input class="form-control mb-2" v-model="user.confirmPassword" type="password"
                        placeholder="Confirm Password" required>
                    <button class="btn btn-primary" type="submit">Sign Up</button>
                </form>
                <small>Already have an account? <a class="link hover" @click="toggleLogin">Log In</a></small>
            </div>
        </div>
    </div>
</template>

<script>
// import { mapState } from 'vuex';
export default {
    name: 'LoginView',
    data() {
        return {
            show: true,
            flashMessage: '',
            user: {
                email: '',
                username: '',
                name: '',
                password: '',
                confirmPassword: '',
                role: 'user'
            },
        }
    },
    mounted() {
    },
    computed: {
    },
    methods: {
        loginUser(event) {
            event.preventDefault();
            localStorage.clear()
            const payload = {
                email: this.user.email,
                password: this.user.password
            }
            this.$store.dispatch('loginUser', payload)
        },
        signupUser(event) {
            event.preventDefault()
            fetch(`${this.$store.state.baseUrl}/api/adduser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(this.user)
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    if (data.message) {
                        this.flashMessage = data.message
                    } else {
                        this.flashMessage = 'Sign up Successful. Please Login'
                    }
                    this.toggleLogin()
                })
                .catch(error => console.error(error))
        },
        toggleLogin() {
            this.show = !this.show
            this.user.email = ''
            this.user.username = ''
            this.user.name = ''
            this.user.password = ''
            this.user.confirmPassword = ''
            this.user.role = 'user'
        }
    }
}
</script>

<style scoped>
.hover {
    cursor: pointer;
}
</style>