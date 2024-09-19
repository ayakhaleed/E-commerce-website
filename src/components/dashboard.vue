<template>
    <div>
        <Navbar></Navbar>
    
        <h1 style="font-family: Sofadi One;">Users</h1>
        <table id="users-table" class="table table-bordered table-hover table-striped  bg-body-tertiary">
            <thead class="table-dark">
                <tr>
                    <th class="text-center">Username</th>
                    <th class="text-center">Email</th>
                    <th class="text-center">Role</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <!-- Users data -->
                <tr v-for="user in this.users" :key="user">
                    <td class="px-5">{{ user.username }}</td>
                    <td class="px-5">{{ user.email }}</td>
                    <td class="bg-danger-subtle rounded px-5">{{ user.role }}</td>
                    <td class="d-flex px-5"><button @click="deleteUser(user.id)"  class="rounded btn btn-danger btn-sm   w-50  me-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">

                                </path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button><br>
                        <button @click="upadateUser(user.id,user.role)" class="btn btn-primary btn-sm w-50 ">
                            <i class="bi bi-pencil-square pe-2">Update</i> 
                        </button>
                    </td>                </tr>
                <tr v-for="admin in this.admins" :key="admin">
                    <td class="px-5">{{ admin.username }}</td>
                    <td class="px-5">{{ admin.email }}</td>
                    <td class="bg-danger-subtle rounded px-5">{{ admin.role }}</td>
                    <td class="d-flex px-5"><button @click="deleteAdmin(admin.id)"  class="rounded btn btn-danger btn-sm   w-50  me-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">

                                </path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button><br>
                        <button @click="upadateUser(admin.id,admin.role)" class="btn btn-primary btn-sm w-50 ">
                            <i class="bi bi-pencil-square pe-2">Update</i> 
                        </button>
                    </td>
                </tr>


            </tbody>
        </table>
        <!-- <table id="admins-table" v-if="admins.length > 0" class="bg-secondary-subtle">
            <caption>Admins</caption>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                
                <tr v-for="admin in this.admins" :key="admin">
                    <td>{{ admin.username }}</td>
                    <td>{{ admin.email }}</td>
                    <td>{{ admin.role }}</td>
                    <td><button @click="deleteAdmin(admin.id)"  class="rounded btn btn-danger btn-sm mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round" class="feather feather-trash-2">
                                <polyline points="3 6 5 6 21 6"></polyline>
                                <path
                                    d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2">

                                </path>
                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                <line x1="14" y1="11" x2="14" y2="17"></line>
                            </svg>
                        </button><br>
                        <button @click="upadateUser(admin.id,admin.role)" class="btn btn-primary btn-sm">
                            <i class="bi bi-pencil-square"></i> Update
                        </button>
                    </td>
                </tr>

            </tbody>
        </table> -->

    </div>
</template>

<script>
import axios from 'axios';
import Navbar from "./Navbar.vue";

export default {
    name: "dashboardPage",
    components:{
        Navbar
    },
    data() {
        return {
            users: [],
            admins: [],
        };
    },
    methods: {
        getuser() {
            axios.get('http://localhost:2000/users')
                .then(res => { this.users = res.data })
                .catch(err => { console.log(err) });
        },
        getadmin() {
            axios.get('http://localhost:2000/admins')
                .then(res => { this.admins = res.data })
                .catch(err => { console.log(err) });
        },
        deleteUser(id) {
            axios.delete(`http://localhost:2000/users/${id}`)
                .then(response => {
                    console.log('User deleted:', response.data);
                    this.getuser()
                    this.getadmin()
                   
                })
                .catch(error => {
                    console.error('There was an error deleting the user:', error);
                });
        },
        deleteAdmin(id) {
            axios.delete(`http://localhost:2000/admins/${id}`)
                .then(response => {
                    console.log('Admin deleted:', response.data);
                    this.getuser()
                    this.getadmin()
                   
                })
                .catch(error => {
                    console.error('There was an error deleting the admin:', error);
                });
        },
        upadateUser(id,role){
            console.log(id);
            this.$router.push(`/updateuser/${id}/${role}`);
        }
    },
    created() {
        this.getuser()
        this.getadmin()
        //this.getPrdByid()
    },
   
}
</script>

<style ></style>