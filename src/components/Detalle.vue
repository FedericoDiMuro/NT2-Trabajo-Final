<template>
  <section class="src-components-detalle">
    <h1 class="mt-2 detail">Detalle</h1>
    <hr /><br />
    <div v-if="loading">
      <Loading />
    </div>
    <div v-else class="productDetail-details">
      <img class="card-img-top" :src="selectedProduct.imagen" alt="Card image cap" />
      <div class="card text-center">
        <div class="card-header"><h1>{{ selectedProduct.nombre }}</h1> </div>
        <div class="card-body">
          <h5 class="card-title"> {{ selectedProduct.precio | moneda }} </h5>
          <p class="card-text">
            {{ selectedProduct.descripcion }}
          </p>         
        </div>
        <div class="card-footer text-muted"><i>Stock: {{ selectedProduct.stock }}</i></div>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import { mapState } from 'vuex'
  import Loading from './Loading.vue'

  export default  {
    name: 'src-components-detalle',
    components : {
      Loading
    },
    props: {},
    mounted () {
      this.getProducto()
    },
    methods: {
      getProducto() {
        this.$store.dispatch('getProduct', this.$route.params.id);
      }
    },
    computed: mapState([
      'selectedProduct',
      'loading'
    ])
  }
</script>

<style scoped lang="css">
img {
  max-width: 600px;
  height: auto;
  width: 100%;
  max-height: 400px;
}
.productDetail-details {
  padding: 24px;
  display: flex;
  justify-content: space-between;
}
p {
  margin: 0 40px;
  font-size: 20px;
  text-align: left;
}
.card-text {
  margin: 30px;
  text-align: center;
}
.card-body {
    padding: 3.25rem;
}
.detail{
  text-align: center;
}
</style>
