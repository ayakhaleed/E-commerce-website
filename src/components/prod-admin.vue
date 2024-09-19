<template>
    <div>

        <Navbar></Navbar>
        <button @click="Addnew()" class="rounded mb-5" style="font-size: 16px;font-family: Sofadi One;">
            Add New
        </button>
        <h1 style="font-family: Sofadi One;">Products</h1>

        <table id="products-table" v-if="products.length > 0" class="table table-bordered table-hover table-striped products-table bg-body-tertiary" >
            
            <thead class="table-dark">
                <tr>
                    <th class="text-center">Product ID</th>
                    <th class="text-center">Product Name</th>
                    <th class="text-center">Description</th>
                    <th class="text-center">Image URL</th>
                    <th class="text-center">Price</th>
                    <th class="text-center">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in products" :key="product.id">
                    <td class="text-center px-5">{{ product.id }}</td>
                    <td class="text-center px-5">{{ product.name }}</td>
                    <td class="text-center imgurl px-3">{{ product.description }}</td>
                    <td class="text-center imgurl px-3" style="width: 200px !important;">{{ product.image_url }}</td>
                    <td class="text-center px-3">{{ product.price }}</td>
                    <td class="d-flex px-3"><button @click="deleteProd(product.id)"  class="rounded btn btn-danger btn-sm   w-50  me-4">
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
                        <button @click="upadateProd(product.id,product.role)" class="btn btn-primary btn-sm w-50 ">
                            <i class="bi bi-pencil-square pe-2">Update</i> 
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>


    </div>
</template>

<script>
import axios from 'axios';
import Navbar from "./Navbar.vue";
export default {
    name: "prodAdmin",
    components: {
        Navbar
    },
    data() {
        return {
            products: [],
        };
    },
    methods: {
        getproducts() {
            axios.get('http://localhost:3000/products')
                .then(res => { this.products = res.data })
                .catch(err => { console.log(err) });
        },
        deleteProd(id) {
            axios.delete(`http://localhost:3000/products/${id}`)
                .then(response => {
                    console.log('product deleted:', response.data);
                    this.getproducts()

                })
                .catch(error => {
                    console.error('There was an error deleting the product:', error);
                });
        },
        Addnew() {
            this.$router.push("/Addprod");
        },
        upadateProd(id) {
            this.$router.push(`Addprod/${id}`);
        }
    },
    created() {
        this.getproducts();

        //this.getPrdByid()
    },
}
</script>

<style scoped>
#products-table {
        width: 100% !important;
        max-width: 1000px; /* Or any width you prefer */
    }
    .imgurl{
    word-wrap: break-word;
    overflow-wrap: break-word;
    max-width: 300px; /* Adjust based on your needs */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
    </style>