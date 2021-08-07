<template>
<div>
  <b-navbar toggleable="lg" type="light">
    <div class="container">

 <b-navbar-brand href="#">Makan-Makan</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
  
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/foods">Foods</router-link>
          </li>

      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
     
          <li class="nav-item">
            <router-link class="nav-link" to="/keranjang">
            Keranjang
             <b-icon icon="b-icon-bag"></b-icon>
             <span class="badge badge-danger ml-2 ">{{ updateKeranjang ? updateKeranjang.length : jumlahPemesanan.length }}</span>
            </router-link>
          </li>
          
    
      </b-navbar-nav>
    </b-collapse>

    </div>
   
  </b-navbar>
</div>





 
</template>

<script>
import axios from "axios";

export default {
  name: "Navbar",
  data() {
    return {
      jumlahPemesanan: []
    }
  },
  props: ['updateKeranjang'],
  methods: {
    setJumlah(data) {
      this.jumlahPemesanan = data
    }
  },
  mounted() {
     axios
      .get("http://localhost:3000/keranjang")
      .then((response) =>
        // handle success
      this.setJumlah(response.data)
)
      .catch((error) =>
        // handle error
        console.log("Gagal :", error))
  },
};
</script>

<style>

.router-link-exact-active{
  font-weight: bold;
}
</style>