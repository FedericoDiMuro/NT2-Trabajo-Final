<template>
  <section class="src-components-carrito">
    <div class="jumbotron">
      <h1>Mi carrito</h1>
      <div v-if="getProductsInCart.length > 0">
        <button class="btn btn-danger ml-3 float-right" @click="clearCart()">Limpiar carrito</button>
        <br>
        <br>
        <div class="col-md-8 media alert alert-warning" v-for="(product, index) in getProductsInCart" :key="index">
          <img :src="product.image" width="150" :alt="product.name">
          <div class="media-body ml-3">
            <button class="btn btn-danger ml-3 float-right" @click="borrar(index)">x</button>
            <h5><u>{{ product.name }}</u></h5>
            <br>
            <p>{{product.description}}</p>
            <p>Precio $ <b>{{product.price}}</b></p>
            <p>Cantidad <i>{{product.cant}}</i></p>
            <div class="col-sm-2 input-group">
              <input type="text" class="form-control" placeholder="Cantidad" v-bind:value="product.cant" >
              <div class="input-group-append" id="button-addon4">
                <button class="btn btn-outline-secondary" type="button">-</button>
                <button class="btn btn-outline-secondary" type="button">+</button>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">

        </div>
      </div>
      <div v-else>
        <p class="alert alert-danger">
          El carrito esta vacío
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-carrito',
    props: [],
    mounted () {

    },
    data () {
      return {

      }
    },
    methods: {
      clearCart(){
        this.$store.dispatch('clearCart')
      }
    },
    computed: {
      getProductsInCart(){
        return this.$store.state.productsInCart
      }
    }
}


</script>

<style scoped lang="css">
  .src-components-carrito {

  }
  
  .jumbotron {
  
  }
</style>
