<template>

    <body class="bg-light">
        <div class="container">
            <div class="row justify-content-center align-items-center ">
                <div class="">
                    <div class="card shadow-lg">
                        <div class="card-body p-5">
                            <h4 class="card-title text-center mb-4">Account Login</h4>
                            <form @submit.prevent="login">
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email address</label>
                                    <input type="email" class="form-control" id="email" placeholder="Enter your email"
                                        v-model.trim.lazy="formValues.email" required>
                                </div>
                                <div class="mb-3">
                                    <label for="password" class="form-label">Password</label>
                                    <input type="password" class="form-control" id="password"
                                        placeholder="Enter your password" v-model.trim.lazy="formValues.password"
                                        required>
                                </div>
                                <div class="d-grid">
                                    <button type="submit" class="btn btn-primary btn-lg">Login</button>
                                </div>
                            </form>
                            <div class="text-center mt-3">
                                <a href="#" class="text-muted">Forgot your password?</a>
                            </div>
                        </div>
                    </div>
                    <div class="text-center mt-4">
                        <p>Don't have an account? <RouterLink to="/signup">Sign up here</RouterLink></p>
                    </div>
                </div>
            </div>
        </div>
    </body>
</template>

<script>
import axios from 'axios';
export default {
    name: "logIn",
    data() {
        return {
            formValues: {
                email: "",
                password: "",
            },
            emailstored: "",
            users: [],
            admins: [],
            found: Boolean,
            personrole: '',
            personpass: '',
        }
    },
    methods: {
        getuser() {
            axios.get('https://prods-b3100-default-rtdb.firebaseio.com/users/users.json')
                .then(res => { this.users = res.data })
                .catch(err => { console.log(err) });
        },
        getadmin() {
            axios.get('https://prods-b3100-default-rtdb.firebaseio.com/users/admins.json')
                .then(res => { this.admins = res.data })
                .catch(err => { console.log(err) });
        },

        login() {
            for (let usr in this.users) {
                if (this.users[usr].email == this.formValues.email) {

                    this.found = true;
                    this.personrole = 'user';
                    this.personpass = this.users[usr].password;
                }
            }
            for (let admin in this.admins) {
                if (this.admins[admin].email == this.formValues.email) {
                    this.found = true;
                    this.personrole = 'admin';
                    this.personpass = this.admins[admin].password;
                }
            }

            if (this.found == true) {
                if (this.personrole == 'user') {
                    //
                    if (this.personpass == this.formValues.password) {
                        this.$router.push("/products");
                    }
                    else{
                        alert('you entered wrong password!');
                    }

                }
                if (this.personrole == 'admin') {
                    if (this.personpass == this.formValues.password) {
                        this.$router.push("/dashboard");
                    }
                    else{
                        alert('you entered wrong password!');
                    }
                    //
                }
            }
            else {
                alert("you are not registered , please sign up first")
                this.$router.push("/signup");
            }
        },

    },
    created() {
        this.getuser()
        this.getadmin()
        //this.getPrdByid()
    },
}
</script>

<style ></style>