<template>
  <div>
    <Navbar></Navbar>

    <div class="container">
      <div class="row mt-4">
        <div class="col">
          <h2>
            Daftar
            <strong>Makanan</strong>
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col">
          <div class="input-group mb-3">
            <input
            v-model="search"
              type="text"
              class="form-control"
              placeholder="Cari Makanan Favorit Anda..."
              aria-label="Cari"
              aria-describedby="basic-addon1"
              @keyup="searchFoods"
            />
            <span class="input-group-text" id="basic-addon1">
              <b-icon-search />
            </span>
          </div>
        </div>
      </div>

      <div class="row mb-3">
        <div class="col-md-4 mt-4" v-for="product in products" :key="product.id">
          <cardProduct :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Navbar from "@/components/navbar.vue";
import cardProduct from "@/components/cardProduct.vue";
import axios from "axios";

export default {
  name: "Foods",
  components: {
    Navbar,
    cardProduct
  },
  data() {
    return {
      products: [],
      search: ""
    };
  },
  methods: {
    setProduct(data) {
      this.products = data;
    },
    searchFoods() {
      axios
        .get("http://localhost:3000/products?q=" + this.search)
        .then(response =>
          // handle success
          this.setProduct(response.data)
        )
        .catch(error =>
          // handle error
          console.log("Gagal :", error)
        );
    }
  },

  mounted() {
    axios
      .get("http://localhost:3000/products")
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