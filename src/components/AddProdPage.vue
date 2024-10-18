<template>
    <div class="d-flex ">
        <div>
            <h1 style="font-family: Sofadi One;">Add Product Page</h1>

            <h1 v-if="id_update">ID : {{ this.id_update }}</h1>
            <form action="" @submit.prevent="id_update ? EditPrdById() : AddNewPrd()">
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter Product ID"
                        v-model="id">
                    <label for="floatingInput">Product ID</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter Product Title"
                        v-model="name">
                    <label for="floatingInput">Product Title</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter Product Description"
                        v-model="desc">
                    <label for="floatingInput">Product Description</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="Enter Product Image url"
                        v-model="imgurl">
                    <label for="floatingInput">Product Image url</label>
                </div>
                <div class="form-floating">
                    <input type="number" class="form-control" id="floatingPassword" placeholder="Enter Product Price"
                        v-model="price">
                    <label for="floatingPassword">Product Price</label>
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
    name: "AddProdPage",
    data() {
        return {
            id: "",
            name: "",
            desc: "",
            imgurl: "",
            price: 0,
            id_update: ''
        }
    },
    methods: {
        AddNewPrd() {
            axios.put(`https://prods-b3100-default-rtdb.firebaseio.com/products/${this.id}.json`, {
                id: this.id,
                name: this.name,
                description: this.desc,
                image_url: this.imgurl,
                price: this.price
            }).then(res => {
                console.log(res.data)
                this.$router.push("/prod-admin")
            })
                .catch(err => console.log("thers is an error", err))
        },
        EditPrdById() {
            axios.put(`https://prods-b3100-default-rtdb.firebaseio.com/products/${this.id_update}.json`,
                {
                    id: this.id,
                    name: this.name,
                    description: this.desc,
                    image_url: this.imgurl,
                    price: this.price
                }
            )
                .then(res => {
                    console.log(res.data)
                    this.$router.push("/prod-admin")
                })
                .catch(err => console.log(err))
        },
        getPrdById() {
            axios.get(`https://prods-b3100-default-rtdb.firebaseio.com/${this.id_update}.json`)
                .then(res => {
                    this.id = res.data.id;
                    this.name = res.data.name;
                    this.desc = res.data.description;
                    this.imgurl = res.data.image_url;
                    this.price = res.data.price;
                }).catch(err => console.log(err))
        }
    },
    created() {
        this.id_update = this.$route.params.id;
        if (this.id_update) {
            this.getPrdById()
        }
    }

}
</script>

<style scoped></style>