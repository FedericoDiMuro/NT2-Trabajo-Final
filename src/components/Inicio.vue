<template>
  <section class="src-components-inicio">
    <div class="jumbotron">
      <div class="card-deck">
        <div v-for="(item,id) in products" :key="id">
          <Producto :product="item"/>
          <br>
        </div>
      </div>
    </div>
  </section>

</template>

<script lang="js">
  import Producto from './Producto.vue'

  export default  {
    name: 'src-components-inicio',
    components : {
      Producto
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
    computed: {

    }
}


</script>

<style scoped lang="css">
  .src-components-inicio {

  }

</style>
