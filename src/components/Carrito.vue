<template>
  <section class="src-components-carrito">
    <div class="jumbotron">
      <h1>Mi carrito</h1>
      <div class="row" v-if="getProductsInCart.length > 0">
        <div class="col-md-8">
          <button class="btn btn-danger ml-3 float-right" @click="clearCart()">Limpiar carrito</button>
          <br>
          <br>
          <div class=" media alert customCard" v-for="(product, index) in getProductsInCart" :key="index">
            <img :src="product.image" width="150" :alt="product.name">
            <div class="media-body ml-3">
              <button class="btn btn-danger ml-3 float-right" @click="borrar(index)">x</button>
              <h5><u>{{ product.name }}</u></h5>
              <br>
              <p>{{product.description}}</p>
              <p>Precio $ <b>{{product.price}}</b></p>
              <p>Stock disponible: <i>{{product.stockMax}}</i></p>
              
              <div class="col-md-4 input-group" style="padding-left: 0px;padding-right: 0px;">
                <p class="mr-2" style="margin: auto;">Cantidad: </p>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Cantidad" 
                  readonly 
                  v-bind:value="product.cant" 
                  :max="product.stockMax"
                >
                <div class="input-group-append" id="button-addon4">
                  <button class="btn btn-outline-secondary" type="button" v-on:click="product.cant--" :disabled="product.cant <= 1" >-</button>
                  <button class="btn btn-outline-secondary" type="button" v-on:click="product.cant++" :disabled="product.cant == product.stockMax">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-4">
          <br>
          <br>
          <div class="media total rounded-sm">
            <div class="media-body m-3">
              <br>
              <h4><b>Total del carrito</b></h4>
              <hr>
              
                <p>A pagar</p>
                <h5>$ {{totalCarrito}}</h5>
              
              
              
                <button class="btn btn-success ">Realizar compra</button>
              
            </div>
          </div>
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
  import { miMixinLocal } from '../localMixins'


  export default  {
    name: 'src-components-carrito',
    props: [],
    mounted () {

    },
    mixins: [miMixinLocal],
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

  .customCard{
    background-color: #e2e0ff;
  }

  .total{
    background-color: white;
  }
</style>
