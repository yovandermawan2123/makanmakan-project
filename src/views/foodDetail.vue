<template>
  <div class="food-detail">
    <Navbar />
    <div class="container">
      <!-- breadcrumb -->
      <div class="row mt-4">
        <div class="col">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <router-link to="/" class="text-dark">Home</router-link>
              </li>
              <li class="breadcrumb-item">
                <router-link to="/foods" class="text-dark">Food</router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Food Order</li>
            </ol>
          </nav>
        </div>
      </div>
      <!-- breadcrumb -->

      <div class="row mt-3">
        <div class="col-md-6">
          <img :src="require('../assets/images/' + product.gambar)" class="img-fluid shadow">
        </div>
        
        <div class="col-md-6 ">
          <h2><strong>{{product.nama}}</strong></h2>
            <hr />
          <h4>Harga: <strong>Rp. {{product.harga}}</strong></h4>

          <form class="mt-4"  v-on:submit.prevent>

            <div class="form-group">
              <label for="jumlah_pemesanan">Jumlah Pesan</label>
              <input type="number" class="form-control" v-model="pesanan.jumlahPemesanan" />
            </div>

            <div class="form-group">
              <label for="keterangan">Keterangan</label>
              <textarea class="form-control" placeholder="Keterangan seperti : pedas, nasi setengah.." v-model="pesanan.keterangan"></textarea>
            </div>

            <button type="submit" class="btn btn-danger" v-on:click="pemesanan"><b-icon-cart /> Pesan</button>

          </form>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
import axios from "axios";

export default {
  name: "FoodDetails",
  components: {
    Navbar
  },
  data() {
    return {
      product: {},
      pesanan: {}
    }
  },
  methods: {
   setProduct(data) {
     this.product = data
   },
   pemesanan(){
    
  if (this.pesanan.jumlahPemesanan) {
     this.pesanan.products = this.product;
       axios
      .post("http://localhost:3000/keranjang", this.pesanan)
      .then(() => {
        this.$router.push({ path: '/keranjang'})
      this.$toast.success('Berhasil dimasukan ke keranjang!', {
      type:'success',
      position:'top-right',
      duration: 3000,
      dismissible: true
});
        
      })
      .catch((err) => console.log(err))
  } else {
     this.$toast.success('jumlah pesanan harus diisi', {
      type:'error',
      position:'top-right',
      duration: 3000,
      dismissible: true
});
  }     
   }
  },
  mounted() {
   axios
        .get("http://localhost:3000/products/" + this.$route.params.id)
        .then(response =>
          // handle success
          this.setProduct(response.data)
        )
        .catch(error =>
          // handle error
          console.log("Gagal :", error)
        );
  }
};
</script>

<style>
</style>