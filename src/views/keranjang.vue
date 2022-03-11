<template>
  <div class="keranjang">
    <Navbar :updateKeranjang="keranjangs"/>
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
              <li class="breadcrumb-item active" aria-current="page">Keranjang</li>
            </ol>
          </nav>
        </div>
      </div>
      <!-- breadcrumb -->

      <div class="row">
        <div class="col">
          <h2>
            Keranjang
            <strong>Saya</strong>
          </h2>
          <div class="table-responsive mt-3">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Foto</th>
                  <th scope="col">Makanan</th>
                  <th scope="col">Keterangan</th>
                  <th scope="col">Jumlah</th>
                  <th scope="col">Harga</th>
                  <th scope="col">Total Harga</th>
                  <th scope="col">Hapus</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(keranjang, index) in keranjangs" :key="keranjang.id">
                  <th>{{index +1}}</th>
                  <td>
                    <img
                      :src="require ('../assets/images/' + keranjang.product.image)"
                      class="img-fluid shadow"
                      width="200px"
                    />
                  </td>
                  <td>
                    <strong>{{keranjang.product.name}}</strong>
                  </td>
                  <td>{{keranjang.description ? keranjang.description : "-" }}</td>
                  <td class="text-center">{{keranjang.amount}}</td>
                  <td>Rp. {{keranjang.product.price}}</td>
                  <td>
                    <strong>Rp. {{keranjang.product.price * keranjang.amount}}</strong>
                  </td>
              
                  <td align="center" class="text-danger" @click="hapusKeranjang(keranjang.id)">
                    <b-icon-trash />
                  </td>
                </tr>

                <tr>
                  <td colspan="6" align="right">
                    <strong>Total Harga :</strong>
                  </td>
                  <td>
                    
                    <strong >Rp. {{ totalHarga }}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

    <div class="row justify-contend-end">
      <div class="col-md-4">
         <form class="mt-4" v-on:submit.prevent>

            <div class="form-group">
              <label for="nama">Nama</label>
             <input type="text" class="form-control" v-model="pesanan.name" />
            </div>

               <div class="form-group">
              <label for="noMeja">Nomor Meja</label>
               <input type="number" class="form-control" v-model="pesanan.no_table" /> 
            </div>

          

            <button type="submit" class="btn btn-danger float right" @click="checkout"><b-icon-cart /> Pesan</button>

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
  name: "Keranjang",
  components: {
    Navbar
  },
  data() {
    return {
     
      keranjangs: [],
      pesanan: {}
      
    };
  },
  methods: {
    setKeranjangs(data) {
      this.keranjangs = data;
    },
    hapusKeranjang(id) {
      axios
        .delete("https://makanmakan-api.000webhostapp.com/api/orders" + id)
        .then(() =>
          // handle success
          {
            this.$toast.success("Pesanan berhasil dihapus dari keranjang!", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true
            });
            

            //reload halaman
            axios
              .get("https://makanmakan-api.000webhostapp.com/api/orders")
              .then(response =>
                // handle success
               this.setKeranjangs(response.data.request)
              )
              .catch(error =>
                // handle error
                console.log("Gagal :", error)
              );
          }
        )
        .catch(error =>
          // handle error
          console.log("Gagal :", error)
        );
    },
      checkout(){
        
   if (this.pesanan.name && this.pesanan.no_table) {
     this.pesanan.keranjangs = this.keranjangs;
     axios
     .post("https://makanmakan-api.000webhostapp.com/api/orderdetails", this.pesanan)
      .then(() => {
        //hapus semua keranjang
        this.keranjangs.map(function(item) {
          return axios
          .delete("https://makanmakan-api.000webhostapp.com/api/orders/" + item.id)
         .catch((error) => console.log(error))
        });
         this.$router.push({ path: '/pesananSukses'})
      this.$toast.success('Berhasil dipesan!', {
      type:'success',
      position:'top-right',
      duration: 3000,
      dismissible: true
});
    
      })
     
   } else {
         this.$toast.success("Nama dan no meja harus diisi", {
              type: "error",
              position: "top-right",
              duration: 3000,
              dismissible: true
         });
   }
    
  }
  },


  mounted() {
    axios
      .get("https://makanmakan-api.000webhostapp.com/api/orders")
      .then(response =>
        // handle success
      this.setKeranjangs(response.data.request)
     
      )
      .catch(error =>
        // handle error
        console.log("Gagal :", error)
      );
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function(items, data) {
        return items + data.product.price * data.amount;
      }, 0);
    },
    id_order(){
     return this.keranjangs.reduce(function(data) {
        data.id
      }, 0);
    }
  }
};
</script>

<style>
</style>