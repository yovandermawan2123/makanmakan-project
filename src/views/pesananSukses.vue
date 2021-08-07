<template>
  <div class="pesanan-sukses">
      <Navbar />
    <div class="container">
        <div class="row justify-content-center mt-5">
            <div class="col text-center">
                   <img
                      :src="require ('../assets/images/waiting.png')"
                      
               width="300px"
                    />
                <h2><strong>Berhasil Dipesan!</strong></h2>
                <h4>Pesanan anda segera diproses <br> Selamat menunggu</h4>
             
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/navbar.vue";
export default {
 name: "pesananSukses",
  components: {
    Navbar
  }
}
</script>

<style>

</style>