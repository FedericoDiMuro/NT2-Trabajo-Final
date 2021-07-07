<template>
  <section class="src-components-productos">
    <div class="jumbotron">
      <h2>Listado de productos</h2>
      <div v-show="!showForm">
        <button class="btn btn-success my-3" @click="agregarProducto()">Agregar Producto</button>
      </div>
      <div v-show="showForm">
        <div class="col-md-6">
          <vue-form :state="formState" @submit.prevent="enviar()">
            <validate tag="div">
              <label for="nombre">Nombre</label>
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
              <label for="imagen">Url de imagen</label>
              <input 
                type="text" 
                id="imagen" 
                name="imagen"
                class="form-control"
                autocomplete="off"
                v-model.trim="formData.imagen"
                placeholder="http://placeimg.com/640/480/business"
                required
              >
              <field-messages name="imagen" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
              </field-messages>
            </validate>
            <br>
            
            <validate tag="div">
              <label for="precio">Precio</label>
              <input 
                type="number" 
                id="precio" 
                class="form-control"
                name="precio"
                autocomplete="off"
                v-model.number="formData.precio"
                required
                :min="precioMin"
                :max="precioMax"
              >
              <field-messages name="precio" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                <div slot="min" class="alert alert-danger mt-1">El precio mínimo es de {{precioMin | moneda }}</div>
                <div slot="max" class="alert alert-danger mt-1">El precio máximo es de {{precioMax | moneda }}</div>
              </field-messages>
            </validate>
            <br>

            <validate tag="div">
              <label for="stock">Stock</label>
              <input 
                type="number" 
                id="stock" 
                class="form-control"
                name="stock"
                autocomplete="off"
                v-model.number="formData.stock"
                required
                :min="stockMin"
                :max="stockMax"
              >
              <field-messages name="stock" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                <div slot="min" class="alert alert-danger mt-1">El stock mínimo es de {{stockMin}}</div>
                <div slot="max" class="alert alert-danger mt-1">El stock máximo es de {{stockMax}}</div>
              </field-messages>
            </validate>
            <br>
            
            <validate tag="div">
              <label for="descripcion">Descripción</label>
              <input 
                type="text" 
                id="descripcion" 
                name="descripcion"
                class="form-control"
                autocomplete="off"
                v-model.trim="formData.descripcion"
                :minlength="descripcionMin"
                required
              >
              <field-messages name="descripcion" show="$dirty">
                <div slot="required" class="alert alert-danger mt-1">Campo requerido</div>
                <div slot="minlength" class="alert alert-danger mt-1">La descripción mínima es de {{descripcionMin}} caracteres</div>
              </field-messages>
            </validate>
            <br>
            
            <button class="btn btn-success my-4" :disabled="formState.$invalid" type="submit">Cargar</button>
            <button class="btn btn-danger my-4 ml-3" type="button" @click="cancelar()">Cancelar</button>
          </vue-form>
        </div>
      </div>
      <div v-if="loading">
        <Loading />
      </div>
      <div v-else>
        <div v-if="products.length > 0">
          <div class="table-responsive">
            <table class="table">
              <tr>
                <th>Imagen</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acción</th>
              </tr>
              <tr v-for="(product, index) in products" :key="index">
                <td>
                  <img :src="product.imagen" width="50" :alt="product.nombre">
                </td>
                <td>{{ product.nombre }}</td>
                <td>{{ product.precio | moneda }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <button class="btn btn-info" type="button" @click="editar(product)">
                    Editar
                  </button>
                  <button class="btn btn-danger ml-3" type="button" @click="deleteProducto(product.id)">
                    Borrar
                  </button>
                </td>
              </tr>
            </table>
          </div>
        </div>
        <h4 v-else class="alert alert-danger">No se encontraron productos</h4>
      </div>
    </div>
  </section>
</template>

<script lang="js">
  import { mapState } from 'vuex';
  import Loading from './Loading.vue';

  export default  {
    name: 'src-components-productos',
    props: [],
    components : {
      Loading
    },
    mounted () {
      this.$store.state.products.length === 0 && this.getProductos()
    },
    data () {
      return {
        showForm: false,
        formData : this.getInicialData(),
        formState: {},
        nombreLengthMin : 3,
        nombreLengthMax: 35,
        precioMin: 1,
        precioMax: 1000000,
        stockMin: 1,
        stockMax: 100000,
        descripcionMin: 10
      }
    },
    methods: {
      getProductos() {
        this.$store.dispatch('getProducts');
      },
      crearProducto(product) {
        this.$store.dispatch('createProduct', product);
      },
      editarProducto(product) {
        this.$store.dispatch('editProduct', product);
      },
      deleteProducto(index) {
        this.$store.dispatch('deleteProduct', index);
      },
      agregarProducto(){
        this.showForm = true;
        this.getInicialData();
      },
      getInicialData() {
        return {
          id: 0,
          nombre: '',
          imagen: '',
          precio: 0,
          stock: 0,
          descripcion: ''
        }
      },
      enviar() {
        const prod = { ...this.formData }
        prod.id == 0 ? this.crearProducto(prod) : this.editarProducto(prod)
        this.formData = this.getInicialData()
        this.formState._reset()
      },
      cancelar(){
        this.formData = this.getInicialData()
        this.formState._reset()
        this.showForm = false;
      },
      editar(product){
        this.showForm = true;
        this.formData = { ...product }
        this.formState._reset()
      },
    },
    computed: mapState([
      'products',
      'loading'
    ])
  }
</script>

<style scoped lang="css">
  .src-components-productos {

  }
</style>
