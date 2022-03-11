<template>
  <div class="home">
    <Navbar />
    <div class="container">
      <Jumbotron />

      <div class="row mt-5">
        <div class="col">
          <h2>Best Foods</h2>
        </div>
        <div class="col">
          <router-link to="/foods" class="btn btn-danger float-right">
            <b-icon-eye />Lihat Semua
          </router-link>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <cardProduct :product="product" />
        </div>
      </div>

    </div>
    <!-- <Footer /> -->
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/navbar.vue";
import Jumbotron from "@/components/jumbotron.vue";
import cardProduct from "@/components/cardProduct.vue";
import axios from "axios";
// import Footer from "@/components/footer.vue";

export default {
  name: "Home",
  components: {
    Navbar,
    Jumbotron,
    cardProduct,
    // Footer
  },
  data() {
    return {
      products: []
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    }
  },
  mounted() {
    axios
      .get("https://makanmakan-api.000webhostapp.com/api/products")
      .then((response) =>
        // handle success
      this.setProduct(response.data.request)
     
    
)
      .catch((error) =>
        // handle error
        console.log("Gagal :", error))
  }
};
</script>
