<template>
    <div class="form-container" :class="{ 'dark-mode': isDarkMode }">
        <div class="header">
            <h2 style="width:100%">Create an Account</h2>
        </div>
        <form action="#" id="registration-form" @submit.prevent="handleSubmit">
            <div class="input-group">
                <label for="username">Username</label>
                <input type="text" id="username" name="username" v-model.trim.lazy="formValues.userName" required>
            </div>
            <div class="input-group">
                <label for="email">Email</label>
                <input type="email" id="email" name="email" v-model.trim.lazy="formValues.email" required>
            </div>
            <div class="input-group">
                <label for="password">Password</label>
                <input type="password" id="password" name="password" v-model.trim.lazy="formValues.password" required>
            </div>
            <div class="input-group">
                <label for="confirm-password">Confirm Password</label>
                <input type="password" id="confirm-password" name="confirm-password"
                    v-model.trim.lazy="formValues.cPassword" required>
            </div>
            <div class="input-group">
                <label for="role">Role</label>
                <div class="role-options d-flex ">
                    <div class="d-flex ms-5">
                        <input type="radio" name="role" value="user" v-model="formValues.role" id="role1" class=" me-2">
                        <label for="role1" class="me-5 ">User</label>
                    </div>
                    <div class="d-flex ms-5">
                        <input type="radio" name="role" value="admin" v-model="formValues.role" id="role2"
                            class=" me-2">
                        <label for="role2">Admin</label>
                    </div>
                </div>
            </div>
            <div class="input-group terms" style="display:flex;">
                <input type="checkbox" id="terms" name="terms" value="terms" style="width:20px;" class="me-5" required>
                <label for="terms">I agree to the terms and conditions</label>
            </div>
            <button type="submit">Register</button>
        </form>
        <div class="text-center mt-4">
            <p>Already have an account? <RouterLink to="/login">Sign in here</RouterLink>
            </p>
        </div>

    </div>
    <button class="rounded" id="dark-mode-toggle" @click="toggleDarkMode">{{ isDarkMode ? 'Light Mode' : 'Dark Mode'
        }}</button>{{ this.formValues.role }}







</template>

<script>

// import userPage from './components/user-table.vue'
// import adminPage from './components/admin-table.vue'
import axios from 'axios';

export default {
    name: 'signUp',
    components: {
        // userPage,
        // adminPage
    },
    data() {
        return {
            formValues: {
                userName: "",
                email: "",
                password: "",
                cPassword: "",
                role: ""
            },
            userBtnFlag: false,
            adminBtnFlag: false,
            users: [],
            admins: [],
            isDarkMode: false,
            cuurtable: Boolean,

        };
    },
    methods: {
        getuser() {
            axios.get("https://prods-b3100-default-rtdb.firebaseio.com/users/users.json")
                .then(res => { this.users = res.data; console.log(this.users, "users") })
                .catch(err => { console.log(err,"anaaa") });
        },
        getadmin() {
            axios.get("https://prods-b3100-default-rtdb.firebaseio.com/users/users.json")
                .then(res => { this.admins = res.data })
                .catch(err => { console.log(err) });
        },
        handleSubmit() {
            if (this.formValues.role == 'user') {
                for (let usr in this.users) {
                    if (this.users[usr].email == this.formValues.email) {
                        alert("this email already exist!")
                        return;
                    }
                }
                for (var ad in this.admins) {
                    if (this.admins[ad].email === this.formValues.email) {
                        alert("this email already exist!")
                        return;
                    }
                }
                axios.post("https://prods-b3100-default-rtdb.firebaseio.com/users/users.json", {
                    username: this.formValues.userName,
                    email: this.formValues.email,
                    password: this.formValues.password,
                    cPassword: this.formValues.cPassword,
                    role: this.formValues.role,
                }).then(res => {
                    console.log(res);
                    this.$router.push("/products");
                })
                    .catch(err => { console.log(err) });

            }

            if (this.formValues.role == 'admin') {

                console.log("fwwwwwwwwww");
                for (var admin in this.admins) {
                    if (this.admins[admin].email === this.formValues.email) {
                        alert("this email already exist!")
                        return;
                    }
                }
                for (let usr in this.users) {
                    if (this.users[usr].email == this.formValues.email) {
                        alert("this email already exist!")
                        return;
                    }
                }

                
                axios.post("https://prods-b3100-default-rtdb.firebaseio.com/users/admins.json", {
                    username: this.formValues.userName,
                    email: this.formValues.email,
                    password: this.formValues.password,
                    cPassword: this.formValues.cPassword,
                    role: this.formValues.role
                }).then(res => { console.log(res) })
                    .catch(err => { console.log(err) });
                this.$router.push("/dashboard");
            }


            // let obj = {
            //     userName: this.formValues.userName,
            //     email: this.formValues.email,
            //     role: this.formValues.role
            // }

            // if (this.formValues.role == 'user') {

            //     this.users.push(obj);

            // }

            // else if (this.formValues.role == 'admin') {
            //     this.admins.push(obj);
            // }

            this.formValues.userName = ''; // Clear the input after submission
            this.formValues.email = ''; // Reset the selected role
            this.formValues.password = '';
            this.formValues.cPassword = '';
            this.formValues.role = '';


        },
        toggleDarkMode() {
            this.isDarkMode = !this.isDarkMode; // Toggle the dark mode state
        },

       
    },
    created() {
        this.getuser()
        this.getadmin()
        //this.getPrdByid()
    },
}


</script>

<style>
/* Base Styles */
/* Base Styles */
/* Base Styles */
body {
    font-family: 'Inter', sans-serif;
    background-color: #f4f5f7;
    display: flex !important;
    justify-content: center;
    margin: 0;
    transition: background-color 0.3s ease;
}

/* Form Container */
.form-container {
    background-color: #fff;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    width: 600px;
    max-width: 800px;
    box-sizing: border-box;
    transition: background-color 0.3s ease, box-shadow 0.3s ease;
}

/* Header */
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 25px;
}

h2 {
    font-size: 24px;
    font-weight: 700;
    color: #333;
}

.dark-mode {
    background-color: black;
    color: white;
}

#dark-mode-toggle:hover {
    background-color: #0056b3;
}

/* Input Group */
.input-group {
    margin-bottom: 20px;
}

.input-group label {
    display: block;
    margin-bottom: 5px;
    font-weight: 600;
    color: #555;
}

.input-group input,
.input-group select {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-sizing: border-box;
    font-size: 16px;
    color: #333;
    transition: border-color 0.3s, box-shadow 0.3s;
}

.input-group input:focus,
.input-group select:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.3);
}

/* Role Options */
.role-options {
    display: flex;

}

.role-options label {
    font-weight: 600;
    color: #555;
}

.role-options input {
    margin-right: 3px;
}

/* Buttons */
button {
    padding: 12px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease, box-shadow 0.3s;
    width: 300px;
    justify-self: right;
}

button:hover {
    background-color: #0056b3;
    box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
}

/* Table Buttons */
.table-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
}

.table-buttons button {
    width: 48%;
}

/* Table Styles */
.table-container {
    margin-top: 20px;
}

table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
}

thead th {
    background-color: #007bff;
    color: #fff;
    padding: 12px;
    text-align: left;
    font-weight: 600;
}

tbody td {
    padding: 12px;
    border-bottom: 1px solid #eee;
    color: #555;
}

tbody tr:last-child td {
    border-bottom: none;
}



/* Dark Mode */
.dark-mode body {
    background-color: #181818;
}

.dark-mode .form-container {
    background-color: #333;
    box-shadow: 0 4px 20px rgba(255, 255, 255, 0.1);
}

.dark-mode h2,
.dark-mode label,
.dark-mode button,
.dark-mode thead th {
    color: #fff;
}

.dark-mode .input-group input,
.dark-mode .input-group select {
    background-color: #444;
    color: #fff;
    border: 1px solid #555;
}

.dark-mode #dark-mode-toggle {
    background-color: #ccc;
    color: #333;
}

.dark-mode #dark-mode-toggle:hover {
    background-color: #aaa;
}
</style>
