<template>
<div class="card shadow card-product" >
<img :src="gambar" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">{{ product.name }}</h5>
    <p class="card-text">Harga : {{product.price}}</p>
    <router-link class="btn btn-danger" :to="'/foods/'+product.id"><b-icon-cart /> Pesan</router-link>
  </div>
</div>
</template>

<script>
export default {
name: 'cardProduct',
props:['product'],
   computed: {
  gambar: function(){
    return require ("../assets/images/" +this.product.image)
  }
  }
}
</script>

<style>

</style>