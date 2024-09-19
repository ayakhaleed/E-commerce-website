<template>
    <div class="d-flex ">
        <div>
            <h1 style="font-family: Sofadi One;" class="mb-4">Update User Page</h1>
            <form action="" @submit.prevent="EditUserById()">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter " v-model="username">
                    <label for="floatingInput">User Name</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter " v-model="email">
                    <label for="floatingInput">User Email</label>
                </div>
                <div class="input-group">
                    <label for="role">Role</label>
                    <div class="role-options d-flex ">
                        <div class="d-flex ms-5">
                            <input type="radio" name="role" value="user" v-model="role" id="role1" class=" me-2">
                            <label for="role1" class="me-5 ">User</label>
                        </div>
                        <div class="d-flex ms-5">
                            <input type="radio" name="role" value="admin" v-model="role" id="role2" class=" me-2">
                            <label for="role2">Admin</label>
                        </div>
                    </div>
                </div>

                <button class="btn btn-dark w-100">Submit</button>
            </form>
        </div>
        <button @click="$router.go(-1)" type="button" class="btn-close ms-5" aria-label="Close"></button>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "updateuserPage",
    data() {
        return {
            id: "",
            username: "",
            email: "",
            role: "",
            pass: "",
            cpass: ""
        }

    },
    methods: {
        EditUserById() {
            console.log(this.role, this.$route.params.role);
            if (this.role == 'user' && this.$route.params.role == 'user') {

                axios.put(`http://localhost:2000/users/${this.id}`,
                    {
                        id: this.id,
                        username: this.username,
                        email: this.email,
                        role: this.role,
                        password: this.pass,
                        cPassword: this.cpass

                    }
                )
                    .then(res => {
                        console.log(res.data)
                        this.$router.push("/dashboard")
                    })
                    .catch(err => console.log(err))
            }
            else if (this.role == 'admin' && this.$route.params.role == 'admin') {
                axios.put(`http://localhost:2000/admins/${this.id}`,
                    {
                        id: this.id,
                        username: this.username,
                        email: this.email,
                        role: this.role,
                        password: this.pass,
                        cPassword: this.cpass,
                    }
                )
                    .then(res => {
                        console.log(res.data)
                        this.$router.push("/dashboard")
                    })
                    .catch(err => console.log(err))
            }
            else {
                if (this.role == 'user') {
                    axios.delete(`http://localhost:2000/admins/${this.id}`)
                        .then(response => {
                            console.log('admin deleted:', response.data);

                        })
                        .catch(error => {
                            console.error('There was an error deleting the product:', error);
                        });

                    axios.post("http://localhost:2000/users", {
                        id: this.id,
                        username: this.username,
                        email: this.email,
                        role: this.role,
                        password: this.pass,
                        cPassword: this.cpass
                    }).then(res => {
                        console.log(res.data)
                        this.$router.push("/dashboard")

                    })
                        .catch(err => console.log("thers is an error", err))
                }
                else if (this.role == 'admin') {
                    axios.delete(`http://localhost:2000/users/${this.id}`)
                        .then(response => {
                            console.log('user deleted:', response.data);

                        })
                        .catch(error => {
                            console.error('There was an error deleting the product:', error);
                        });

                    axios.post("http://localhost:2000/admins", {
                        id: this.id,
                        username: this.username,
                        email: this.email,
                        role: this.role,
                        password: this.pass,
                        cPassword: this.cpass
                    }).then(res => {
                        console.log(res.data)
                        this.$router.push("/dashboard")
                    })
                        .catch(err => console.log("thers is an error", err))
                }

            }

        },
        getUserById() {
            if (this.role == 'user') {
                axios.get(`http://localhost:2000/users/${this.id}`)
                    .then(res => {
                        this.id = res.data.id;
                        this.username = res.data.username;
                        this.email = res.data.email;
                        this.role = res.data.role;
                        this.pass = res.data.password;
                        this.cpass = res.data.cPassword;
                    }).catch(err => console.log(err))
            }
            else {
                axios.get(`http://localhost:2000/admins/${this.id}`)
                    .then(res => {
                        this.id = res.data.id;
                        this.username = res.data.username;
                        this.email = res.data.email;
                        this.role = res.data.role;
                        this.pass = res.data.password;
                        this.cpass = res.data.cPassword;
                    }).catch(err => console.log(err))
            }

        }
    },
    created() {
        this.id = this.$route.params.id;
        this.role = this.$route.params.role;
        this.getUserById();
    }
}
</script>

<style scoped></style>