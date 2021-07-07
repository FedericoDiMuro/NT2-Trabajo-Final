<template>
  <section class="src-components-inicio">
    <div class="jumbotron">
      <div v-if="loading">
        <Loading />
      </div>
      <div v-else-if="products.length > 0" class="row m-md-n3">
        <Producto v-for="(item,id) in products" :key="id" :product="item"/>
      </div>
      <div v-else>
        <p class="alert alert-danger">
          No se encontraron productos!
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import { mapState } from 'vuex'
  import Producto from './Producto.vue'
  import Loading from './Loading.vue'

  export default  {
    name: 'src-components-inicio',
    components : {
      Producto,
      Loading
    },
    props: [],
    mounted () {
      this.$store.state.products.length === 0 && this.getProductos()
    },
    methods: {
      getProductos() {
        this.$store.dispatch('getProducts');
      }
    },
    computed: mapState([
      'products',
      'loading'
    ])
  }
</script>

<style scoped lang="css">
  .src-components-inicio {

  }
  .jumbotron {
  
  }
</style>
