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
                      :src="require ('../assets/images/' + keranjang.products.gambar)"
                      class="img-fluid shadow"
                      width="200px"
                    />
                  </td>
                  <td>
                    <strong>{{keranjang.products.nama}}</strong>
                  </td>
                  <td>{{keranjang.keterangan ? keranjang.keterangan : "-" }}</td>
                  <td class="text-center">{{keranjang.jumlahPemesanan}}</td>
                  <td>Rp. {{keranjang.products.harga}}</td>
                  <td>
                    <strong>Rp. {{keranjang.products.harga * keranjang.jumlahPemesanan}}</strong>
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
                    <strong>Rp. {{ totalHarga }}</strong>
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
             <input type="text" class="form-control" v-model="pesanan.nama" />
            </div>

               <div class="form-group">
              <label for="noMeja">Nomor Meja</label>
               <input type="number" class="form-control" v-model="pesanan.noMeja" /> 
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
        .delete("http://localhost:3000/keranjang/" + id)
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
              .get("http://localhost:3000/keranjang")
              .then(response =>
                // handle success
                this.setKeranjangs(response.data)
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
   if (this.pesanan.nama && this.pesanan.noMeja) {
     this.pesanan.keranjangs = this.keranjangs;
     axios
     .post("http://localhost:3000/pesanans", this.pesanan)
      .then(() => {
        //hapus semua keranjang
        this.keranjangs.map(function(item) {
          return axios
          .delete("http://localhost:3000/keranjang/" + item.id)
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
      .get("http://localhost:3000/keranjang")
      .then(response =>
        // handle success
        this.setKeranjangs(response.data)
      )
      .catch(error =>
        // handle error
        console.log("Gagal :", error)
      );
  },
  computed: {
    totalHarga() {
      return this.keranjangs.reduce(function(items, data) {
        return items + data.products.harga * data.jumlahPemesanan;
      }, 0);
    }
  }
};
</script>

<style>
</style>