import { createApp } from 'vue'
import App from './App.vue'
import { createRouter,createWebHistory } from 'vue-router';
import logIn from "./components/login.vue";
import signUp from "./components/signup.vue";
import dashboardPage from "./components/dashboard.vue";
import productsPage from "./components/products.vue";
import errorPage from "./components/errorPage.vue";
import prdAdmin from "./components/prod-admin.vue";
import addProd_Page from "./components/AddProdPage.vue";
import updateUser from "./components/updateUserPage.vue";
import  cart from "./components/cartPage.vue";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";

import store from './Store.js';
const routes=[
    {path:"/",component:logIn,alias:"/login"},
    {path:"/signup",component:signUp},
    {path:"/dashboard",component:dashboardPage},
    {path:"/products",component:productsPage},
    {path:"/prod-admin",component:prdAdmin},
    {path:'/addProd',component:addProd_Page},
    {path:'/addProd/:id',component:addProd_Page},
    {path:'/updateuser/:id/:role',component:updateUser},
    {path:'/cart',component:cart},
    {path:"/:NotFound(.*)*",component:errorPage}
    
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

createApp(App).use(router).use(store).mount('#app')
