<template>
  <section class="src-components-carrito">
    <div class="jumbotron">
      <h1>Mi carrito</h1>
      <div class="row" v-if="getProductsInCart.length > 0">
        <div class="col-md-8">
          <button class="btn btn-danger ml-3 float-right" @click="clearCart(getProductsInCart)">Limpiar carrito</button>
          <br>
          <br>
          <div class=" media alert customCard" v-for="(product, index) in getProductsInCart" :key="index">
            <img :src="product.image" width="150" :alt="product.name">
            <div class="media-body ml-3">
              <button class="btn btn-danger ml-3 float-right" @click="deleteProduct(product.id)">x</button>              
              <router-link v-bind:to="'/Detalle/'+product.idProduct">               
              <h5><u>{{ product.name }}</u></h5>
              </router-link>
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
                  <button class="btn btn-outline-secondary" type="button" v-on:click="downgradeCant(product)" :disabled="product.cant <= 1" >-</button>
                  <button class="btn btn-outline-secondary" type="button" v-on:click="upgradeCant(product)" :disabled="product.cant == product.stockMax">+</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-3">
          <br>
          <br>
          <div class="media total rounded-sm">
            <div class="media-body m-3">
              <br>
              <h4><b>Total del carrito</b></h4>
              <hr>
              <div class="row mx-md-n3">
                <div class="px-md-2"><div class="p-2">Cantidad de productos seleccionados:</div></div>
                <div class="px-md-2"><div class="p-2"><i>{{cantidadTotal}}</i></div></div>
                <div class="px-md-2"><div class="p-2">Total a pagar:</div></div>
                <div class="px-md-2"><div class="p-2"><h5>{{totalCarrito | moneda}}</h5></div></div>
              </div>
              <hr>
              <div class="text-center">
                <button class="btn btn-success">Realizar compra</button>
              </div>          
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
      this.$store.dispatch('getCart')
    },
    mixins: [miMixinLocal],
    data () {
      return {

      }
    },
    methods: {
      clearCart(products){
        for (let index = 0; index < products.length; index++) {
          this.$store.dispatch('deleteProductInCart', products[index].id)
        }
      },
      deleteProduct(id){
        this.$store.dispatch('deleteProductInCart', id)
      },
      upgradeCant(product){
        product.cant ++
        this.$store.dispatch('updateProductInCart', product)
      },
      downgradeCant(product){
        product.cant --
        this.$store.dispatch('updateProductInCart', product)
      }
    },
    computed: {
      getProductsInCart(){
        return this.$store.state.productsInCart
      },
    }
}


</script>

<style scoped lang="css">
  .src-components-carrito {

  }

  .customCard{
    background-color: #e2e0ff;
  }

  .total{
    background-color: white;
  }
</style>
