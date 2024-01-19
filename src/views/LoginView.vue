<template>
    <div>
        <div class="container-fluid" style="padding-top:8rem">
            <div v-if="show">
                <h2>Welcome</h2>
                <form @submit="loginUser" class="col-md-3 mx-auto" id="login">
                    <input class="form-control mb-2" v-model="user.email" type="email" placeholder="Email" required>
                    <input class="form-control mb-2" v-model="user.password" type="password" placeholder="Password"
                        required>
                    <button class="btn btn-primary" type="submit">Login</button>
                </form>
                <small>Don't have an account? <a class="link hover" @click="logon">Sign Up</a></small>
            </div>
            <div v-else>
                <h2>Welcome</h2>
                <form @submit="signupUser" class="col-md-3 mx-auto" id="signup">
                    <input class="form-control mb-2" v-model="user.email" type="email" placeholder="Email" required>
                    <input class="form-control mb-2" v-model="user.username" placeholder="Username" required>
                    <input class="form-control mb-2" v-model="user.name" placeholder="Name" required>
                    <input class="form-control mb-2" v-model="user.password" type="password" placeholder="Password"
                        required>
                    <input class="form-control mb-2" v-model="user.confirmPassword" type="password" placeholder="Confirm Password"
                        required>
                    <button class="btn btn-primary" type="submit">Sign Up</button>
                </form>
                <small>Already have an account? <a class="link hover" @click="logon">Log In</a></small>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'LoginView',
    data() {
        return {
            show: true,
            user: {
                email: '',
                username: '',
                name: '',
                password: '',
                confirmPassword: ''
            },
        }
    },
    mounted() {
    },
    methods: {
        loginUser(event) {
            event.preventDefault();
            localStorage.clear()
            const payload = {
                email: this.user.email,
                password: this.user.password
            }
            this.$store.dispatch('loginUser',payload)
        },
        logon() {
            this.show = !this.show 
        }
    }
}
</script>

<style scoped>
.hover {
    cursor: pointer;
}
</style>