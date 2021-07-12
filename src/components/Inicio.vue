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
      this.$store.dispatch('getCart'),
      this.getProducts()
    },
    data () {
      return {
        productsUrl: 'https://60af31f85b8c300017debe4c.mockapi.io/Productos/',
        products: []
      }
    },
    methods: {
      async getProducts() {
        try {
          let response = await this.axios(this.productsUrl)
          this.products = response.data
        }
        catch(error) {
          console.log(error)
        }
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

</style>
