<template>
    <div class="d-flex">
        <div>
            <h1 style="font-family: Sofadi One;">Your Cart</h1>
            <div class="row m-4 bg-dark-subtle pt-4 rounded">
                <div v-for="product in products" :key="product.id"
                    :class="['col-md-4', 'mb-4', 'd-flex', { 'col-md-12': products.length === 1, 'col-md-6': products.length === 2 }]">
                    <div class="card w-100">
                        <img :src="product.image_url" class="card-img-top" alt=""
                            style="height: 300px; object-fit: cover;">
                        <div class="card-body d-flex flex-column justify-content-between"
                            style="height: calc(100% - 150px);">
                            <div>
                                <h5 class="card-title">{{ product.name }}</h5>
                                <p class="card-text my-4">{{ product.description }}</p>
                            </div>
                            <div class="mt-auto justify-content-around flex w-100">
                                <span class="me-4 text-primary">{{ product.price }}$</span>
                                <button class="btn btn-danger" @click="DeleteItem(product)" style="width:150px;">Delete
                                    from Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button @click="$router.go(-1)" type="button" class="btn-close ms-5 me-5" aria-label="Close"></button>
    </div>

</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name: "cartPage", data() {
        return {
            products: [],

        };
    },
    computed: {
        ...mapState(['NumProd'])
    },
    methods: {
        getproducts() {
            axios.get('http://localhost:4000/products')
                .then(res => { this.products = res.data })
                .catch(err => { console.log(err) });
        },
        DeleteItem(product) {
            this.$store.dispatch('DeleteItem');
            axios.delete(`http://localhost:4000/products/${product.id}`)
                .then(response => {
                    console.log('product deleted:', response.data);
                    this.getproducts()

                })
                .catch(error => {
                    console.error('There was an error deleting the product:', error);
                });
        }
    },
    created() {
        this.getproducts();

        //this.getPrdByid()
    },


}
</script>

<style scoped></style>