<template>
  <div class="col-md-3 p-md-3">
    <div class="card">
      <router-link :to="{name:'Detalle',params:{id: product.id}}">
        <img class="card-img-top" :src="product.imagen" alt="Card image cap" />
      </router-link>
      <div class="card-body">
        <h5 class="card-title">{{ product.nombre }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          {{ product.precio | moneda }}
        </h6>
        <p class="card-text" style="">{{ product.descripcion }}</p>
      </div>
      <div class="card-footer">
        <p class="text-secondary" style="float: left">
          <i>Stock: {{ product.stock }}</i>
        </p>
        <button
          v-if="product.stock != 0"
          style="float: right"
          class="btn btn-primary"
          type="button"
          @click="addToCart(product)"
        >
          Agregar al carrito
        </button>
        <button
          v-else
          style="float: right"
          class="btn btn-primary"
          type="button"
          disabled
        >
          Sin stock
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="js">
  export default  {
    name: 'src-components-producto',
    components : {},
    props: {
      product: Object,
    },
    mounted () {
    },
    data () {
      return {
        loadingCart: false
      }
    },
    methods: {
      addToCart(product){
        this.loadingCart = true
        let prod = this.$store.state.productsInCart.find(x => x.idProduct == product.id)
        if(prod){
          prod.cant += 1
          this.$store.dispatch('updateProductInCart', prod)
        }
        else{
          this.$store.dispatch('addProductInCart', product)
        }
        this.loadingCart = false
      }
    },
    computed: {

    }
  }
</script>

<style scoped lang="css">
.src-components-producto {
}

</style>
