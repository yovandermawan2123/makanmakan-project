<template>
  <div class="myjumbotron">
    <!-- Desktop -->
    <div class="d-none d-md-block">
      <div class="row mt-4">
        <div class="col-md-6">
          <div class="sidetext">
            <h2>
              <strong>Delicious Food's Menu,</strong>
              <br />In Your Gadget
            </h2>
            <p>Ayo, pilih dan pesan segera makanan favorit anda!</p>
            <router-link to="/foods" class="btn btn-md btn-danger">
              <b-icon-arrow-right></b-icon-arrow-right>Pesan
            </router-link>
          </div>
        </div>

        <div class="col-md-6">
          <img src="../assets/images/jumbotron-image.png" alt width="100%" />
        </div>
      </div>
    </div>

    <!-- Mobile -->
    <div class="d-sm-block d-md-none">
      <div class="row mt-4">
        <div class="col-md-6 mb-3" >
          <img src="../assets/images/jumbotron-image.png" alt width="100%" />
        </div>
        
        <div class="col-md-6">
          <div class="sidetext-mobile">
            <h2>
              <strong>Delicious Food's Menu,</strong>
              <br />In Your Gadget
            </h2>
            <p>Ayo, pilih dan pesan segera makanan favorit anda!</p>
            <router-link to="/foods" class="btn btn-md btn-danger">
              <b-icon-arrow-right></b-icon-arrow-right>Pesan
            </router-link>
          </div>
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Jumbotron"
};
</script>

<style>
.sidetext h2 {
  margin-top: 20%;
}


</style>