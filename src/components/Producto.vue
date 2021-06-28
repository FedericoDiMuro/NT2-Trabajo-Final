<template>
    <div class="card" style="max-width: 18rem; min-height: 30rem; max-height: 30rem;">
      <img class="card-img-top" :src="product.imagen" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{product.nombre}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">$ {{product.precio}}</h6>
        <p class="card-text" style="">{{product.descripcion}}</p>
      </div>
      <div v-if="product.stock != 0" class="card-footer text-right">
        <!--Mostar cantidad de stock --> 
        <!-- <p class="text-left" style="">Stock: {{product.stock}}</p> --> 
        <a class="btn btn-primary" @click="addToCart(product)">Agregar al carrito</a>
      </div>
      <div v-else class="card-footer text-right">
        <a class="btn btn-primary disabled">Sin stock</a>
      </div>
    </div>
</template>

<script lang="js">

  export default  {
    name: 'src-components-producto',
    props: {
      product: Object
    },
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      addToCart(product){
        this.$store.dispatch('addToCart', product)
      }
    },
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-producto {

  }

  .jumbotron{

  }
</style>
