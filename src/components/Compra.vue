<template>
  <section class="src-components-compra">
    <div class="jumbotron">
        <h2>Formulario de compra</h2>
        <vue-form :state="formState" @submit.prevent="comprar()">
            <div v-if="loading">
                <Loading />
            </div>
            <div class="row" v-else-if="productsInCart.length > 0">
                <div class="col-md-8">
                    <validate tag="div">
                    <label for="nombre">Nombre completo</label>
                    <input 
                        type="text" 
                        id="nombre" 
                        name="nombre"
                        class="form-control"
                        autocomplete="off"
                        v-model.trim="formData.nombre"
                        required
                        :minlength="nombreLengthMin"
                        :maxlength="nombreLengthMax"
                    >
                    <field-messages name="nombre" show="$dirty">
                        <div slot="minlength" class="alert alert-danger mt-1">
                            Se deben ingresar como mínimo {{nombreLengthMin}} caracteres
                        </div>
                        <div v-if="formData.nombre.length == nombreLengthMax" class="alert alert-danger mt-1">
                            Máximo de caracteres ({{nombreLengthMax}}) alcanzados
                        </div>
                    </field-messages>
                    </validate>
                    <br>
                    
                    <validate tag="div">
                    <label for="email">Email</label>
                    <input 
                        type="email"
                        id="email"
                        class="form-control"
                        name="email"
                        autocomplete="off"
                        v-model.number="formData.email"
                        required
                    >
                    <field-messages name="email" show="$dirty">
                        <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                    </field-messages>
                    </validate>
                    <br>

                    <validate tag="div">
                    <label for="dni">DNI</label>
                    <input 
                        type="number" 
                        id="dni" 
                        name="dni"
                        class="form-control"
                        autocomplete="off"
                        v-model.trim="formData.dni"
                        placeholder="http://placeimg.com/640/480/business"
                        :minlength="dniLengthMin"
                        required
                    >
                    <field-messages name="dni" show="$dirty">
                        <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                    </field-messages>
                    </validate>
                    <br>

                    <validate tag="div">
                    <label for="card">Tarjeta de credito/debito</label>
                    <input 
                        type="text" 
                        id="card" 
                        class="form-control"
                        name="card"
                        autocomplete="off"
                        v-model.number="formData.card"
                        placeholder="0000000000000000"
                        required
                    >
                    <field-messages name="card" show="$dirty">
                        <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                    </field-messages>
                    </validate>
                    <br>

                    <validate tag="div">
                    <label for="securityCode">Codigo de seguridad</label>
                    <input 
                        type="number" 
                        id="securityCode" 
                        class="form-control"
                        name="securityCode"
                        autocomplete="off"
                        v-model.number="formData.securityCode"
                        required
                    >
                    <field-messages name="securityCode" show="$dirty">
                        <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                    </field-messages>
                    </validate>
                    <br>
                </div>
                <div class="col-md-4">
                    <div class="media alert customCard" v-for="(product, index) in productsInCart" :key="index">
                        <img :src="product.image" width="150" :alt="product.name">
                        <div class="media-body ml-3">            
                            <h5>{{ product.name }}</h5>
                            <p>{{product.description}}</p>
                            <p>Precio $ <b>{{product.price}}</b></p>
                            <div class="col-md-4 input-group" style="padding-left: 0px;padding-right: 0px;">
                                <p>Cantidad: {{product.cant}}</p>
                            </div>
                        </div>
                    </div>
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
                                <button class="btn btn-success" :disabled="formState.$invalid" type="submit">Comprar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </vue-form>
    </div>
  </section>
</template>

<script lang="js">
  import { miMixinLocal } from '../localMixins'
  import { mapState } from 'vuex';
  import Loading from './Loading.vue';

  export default  {
    name: 'src-components-compra',
    props: [],
    components : {
        Loading
    },
    mounted () {
      this.$store.state.productsInCart.length === 0 && this.$store.dispatch('getCart')
    },
    mixins: [miMixinLocal],
    data() {
        return {
            formData : this.getInicialData(),
            formState: {},
            nombreLengthMin : 3,
            nombreLengthMax: 35,
            dniLengthMin: 1
        }
    },
    methods: {
        getInicialData() {
            return {
                nombre: '',
                email: '',
                dni: 0,
                card: '',
                securityCode: 0
            }
        },
        comprar() {
            this.$store.dispatch('purchaseProducts')
            this.$router.push('/')
            this.formData = this.getInicialData()
            this.formState._reset()
        },
    },
    computed: mapState([
        'productsInCart',
        'loading'
    ])
  }
</script>

<style scoped lang="css">
  .src-components-compra {

  }

  .customCard{
    background-color: #e2e0ff;
  }

  .total{
    background-color: white;
  }
</style>
