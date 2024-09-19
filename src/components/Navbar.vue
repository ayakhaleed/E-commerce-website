<template>
    <div>
      <nav class="navbar navbar-expand-lg bg-dark rounded mb-5" >
          <div class="container-fluid w-100" >
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-around">
                <li class="nav-item">
                  <router-link class="nav-link active link-light" aria-current="page" to="/dashboard">Users</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link active link-light" aria-current="page" to="/prod-admin">Products</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link active link-light" aria-current="page" to="/login">log out</router-link>
                </li>
                </ul>
                
                
                
            </div>
          </div>
        </nav>
    </div>
  </template>
  
  <script>
  export default {
    name: "navBar",
  };
  </script>
  
  <style>
  </style>