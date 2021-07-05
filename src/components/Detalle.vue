<template>
  <section class="src-components-detalle">
    <h1 class="mt-2 detail">Detalle</h1>
    <hr /><br />
    <div class="productDetail-details">
      <img class="card-img-top" :src="detail.imagen" alt="Card image cap" />
      <div class="card text-center">
        <div class="card-header"><h1>{{ detail.nombre }}</h1> </div>
        <div class="card-body">
          <h5 class="card-title"> {{ detail.precio | moneda }} </h5>
          <p class="card-text">
            {{ detail.descripcion }}
          </p>         
        </div>
        <div class="card-footer text-muted"><i>Stock: {{ detail.stock }}</i></div>
      </div>
    </div>
  </section>
</template>

<script lang="js">

  export default  {
    name: 'src-components-detalle',
     props: {
    },
    mounted () {   
      this.getProductDetail();
    },
    data () {
      return {  
        productsUrl: 'https://60af31f85b8c300017debe4c.mockapi.io/Productos/',
        detail: {},      
      }  
    },
    methods: {
      async getProductDetail() {
        console.log('getProductDetail')
        try {
          let respuesta = await this.axios(this.productsUrl + this.$route.params.id)
          console.log('AXIOS GET',respuesta.data)
          this.detail = respuesta.data             
        }
        catch(error) {
          console.log(error)
        }
      },
    },
    computed: {

    }
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
