<template>
    <div class="card" style="max-width: 18rem; min-height: 30rem; max-height: 30rem;">
      <img class="card-img-top" :src="product.imagen" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">{{product.nombre}}</h5>
        <h6 class="card-subtitle mb-2 text-muted">{{product.precio | moneda}}</h6>
        <p class="card-text" style="">{{product.descripcion}}</p>
      </div>
      <div  class="card-footer">
        <p class="text-secondary" style="float: left;"><i>Stock: {{product.stock}}</i></p> 
        <button v-if="product.stock != 0" style="float: right;" class="btn btn-primary" type="button" @click="addToCart(product)">Agregar al carrito</button>
        <button v-else style="float: right;" class="btn btn-primary" type="button" disabled>Sin stock</button>
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
