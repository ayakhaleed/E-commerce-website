<template>
    <div clas="row">
        <div class="d-flex justify-content-center">
            <button style="width: 80px; " class="rounded bg-light ms-5" @click="logout()">
                <svg style="width:50px;height: 50px;" fill="#000000" height="800px" width="800px" version="1.1" id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 384.971 384.971" xml:space="preserve" transform="matrix(-1, 0, 0, 1, 0, 0)">

                    <g id="SVGRepo_bgCarrier" stroke-width="0" />

                    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

                    <g id="SVGRepo_iconCarrier">
                        <g>
                            <g id="Sign_Out">
                                <path
                                    d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03 C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03 C192.485,366.299,187.095,360.91,180.455,360.91z" />
                                <path
                                    d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279 c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179 c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
                            </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                            <g> </g>
                        </g>
                    </g>

                </svg></button>
            <h1 class="w-100" style="font-family: Sofadi One;">Products</h1>
            <button class="bg-light rounded flex-shrink-1 me-4" @click="viewCart()">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style="width: 50px; height: 50px;">
                    <g id="Cart">
                        <path d="M20.62,5A3,3,0,0,0,18.4,4L6.73,4A3,3,0,0,0,4.12,2H3A1,1,0,0,0,3,
                        4h.91a1,1,0,0,1,1,.83l1.44,8.66A3,3,0,0,0,9.3,16h8.49a3,3,0,0,0,3-2.7l.6-6A3,3,0,0
                        ,0,20.62,5Z" />
                        <path d="M17,22a2,2,0,1,1,2-2A2,2,0,0,1,17,22Zm0-2Z" />
                        <path d="M10,
                        22a2,2,0,1,1,2-2A2,2,0,0,1,10,22Zm0-2Z" />
                    </g>
                </svg>
            </button>
        </div>
        <p class="bg-danger text-light rounded-circle count" style="width:30px; height: 30px;" v-if="NumProd > 0">
            {{ NumProd }}</p>

        <div class="row m-4 g-4 bg-dark-subtle pt-4 rounded justify-content-center">
            <div v-for="product in products" :key="product.id" class="col-md-3   d-flex justify-content-between" style="margin-right: 20px; margin-bottom: 24px;">
                <div class="card w-100">
                    <img :src="product.image_url" class="card-img-top " alt="" style="height: 200px; object-fit: cover;">
                    <div class="card-body d-flex flex-column "
                        style="height: calc(100% - 150px);">
                        <div>
                            <h5 class="card-title">{{ product.name }}</h5>
                            <p class="card-text py-4">{{ product.description }}</p>
                        </div>
                        <div class="d-flex justify-content-between">
                            <button class="btn btn-primary " @click="ADDTOCART(product)" style="width:200px;">Add to
                                Cart</button>
                            <span class=" text-danger my-auto">{{ product.price }}$</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
export default {
    name: "productsPage",
    computed: {
        ...mapState(['NumProd'])
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
        ADDTOCART(product) {
            this.$store.dispatch('ADDTOCART');
            axios.post("http://localhost:4000/products", {
                id: product.id,
                name: product.name,
                description: product.description,
                image_url: product.image_url,
                price: product.price
            }).then(res => {
                console.log(res.data)
            })
                .catch(err => console.log("thers is an error", err))
        },
        viewCart() {
            this.$router.push("/cart");
        },
        logout(){
            this.$router.push("/");
        }
    },
    created() {
        this.getproducts();

        //this.getPrdByid()
    },
}
</script>

<style>
.count {
    position: relative;
    top: -70px;
    left: 1380px;
}
.sofadi-one-regular {
  font-family: "Sofadi One", system-ui;
  font-weight: 400;
  font-style: normal;
}

</style>