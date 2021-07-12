import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const URL_CART = 'https://60af31f85b8c300017debe4c.mockapi.io/Carrito/'
export default new Vuex.Store({
    state: {
        productsInCart: []
    },
    actions: {
        async getCart({commit}){
            let respuesta = await axios(URL_CART)
            commit('getProducts', respuesta.data)
        },
        async addProductInCart({commit}, product){
            var item = {
                idProduct: product.id,
                image: product.imagen,
                name: product.nombre,
                description: product.descripcion,
                price: product.precio,
                stockMax: product.stock,
                cant: 1
            }

            let respuesta = await axios.post(URL_CART, item, {'content-type':'application/json'})
            let prod = respuesta.data
            commit('addProduct', prod)
        },
        async updateProductInCart({commit}, product){
            let id = product.id
            let respuesta = await axios.put(URL_CART+id, product, {'content-type':'application/json'})
            let prod = respuesta.data
            commit('updateProduct', prod)
        },
        async deleteProductInCart({commit}, id){
            let respuesta = await axios.delete(URL_CART+id)
            let prod = respuesta.data
            commit('deleteProduct', prod)
        }
    },
    mutations: {
        getProducts(state, products){
            state.productsInCart = products
        },
        addProduct(state, product){
            state.productsInCart.push(product)
        },
        updateProduct(state, prod){
            let indice = state.productsInCart.findIndex(p => p.id == prod.id)
            state.productsInCart.splice(indice, 1, prod)
        },
        deleteProduct(state, prod){
            let indice = state.productsInCart.findIndex(p => p.id == prod.id)
            state.productsInCart.splice(indice, 1)   
        }
    }
})