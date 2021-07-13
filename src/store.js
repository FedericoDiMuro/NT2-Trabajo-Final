import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        selectedProduct: {},
        products: [],
        productsInCart: []
    },
    actions: {
        async getProduct({ commit, state }, id) {
            state.loading = !state.loading;
            try {
                const response = await axios.get(`${process.env.VUE_APP_URL_API}/Productos/${id}`);
                state.loading = !state.loading;
                commit('setSelectedProduct', response.data)  
            } catch (e) {
                console.log('Error Axios ->', e)
            }
        },
        async getProducts({ commit, state }, search = '') {
            state.loading = !state.loading;
            try {
                const response = await axios.get(`${process.env.VUE_APP_URL_API}/Productos/?search=${search}`);
                state.loading = !state.loading;
                commit('setProducts', response.data);
            } catch (e) {
                console.log('Error Axios ->', e)
            }
        },
        async deleteProduct({ commit, state }, id) {
            try {
                const respuesta = await axios.delete(`${process.env.VUE_APP_URL_API}/Productos/${id}`)
                const prod = respuesta.data
                const index = state.products.findIndex(p => p.id == prod.id)
                commit('deleteProduct', index)
            } catch(e) {
                console.log('Error Axios ->', e)
            }
        },
        async createProduct({ commit }, product) {
            try {
                const respuesta = await axios.post(`${process.env.VUE_APP_URL_API}/Productos/`, product, {'content-type':'application/json'})
                const prod = respuesta.data
                commit('createProduct', prod)
            } catch (e) {
                console.log('Error Axios ->', e)
            }
        },
        async editProduct({ commit, state }, product){
            try{
                const respuesta = await axios.put(`${process.env.VUE_APP_URL_API}/Productos/${product.id}`, product, {'content-type':'application/json'})
                const prod = respuesta.data
                const index = state.products.findIndex(p => p.id == prod.id)
                commit('editProduct', { data: prod, index })
            } catch (e){
                console.log('Error Axios ->', e)
            }
        },
        async getCart({commit}){
            let respuesta = await axios(`${process.env.VUE_APP_URL_API}/Carrito/`)
            commit('getCartProducts', respuesta.data)
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

            let respuesta = await axios.post(`${process.env.VUE_APP_URL_API}/Carrito/`, item, {'content-type':'application/json'})
            let prod = respuesta.data
            commit('addCartProduct', prod)
        },
        async updateProductInCart({commit}, product){
            let id = product.id
            let respuesta = await axios.put(`${process.env.VUE_APP_URL_API}/Carrito/${id}`, product, {'content-type':'application/json'})
            let prod = respuesta.data
            commit('updateCartProduct', prod)
        },
        async deleteProductInCart({commit}, id){
            let respuesta = await axios.delete(`${process.env.VUE_APP_URL_API}/Carrito/${id}`)
            let prod = respuesta.data
            commit('deleteCartProduct', prod)
        }
    },
    mutations: {
        getCartProducts(state, products){
            state.productsInCart = products
        },
        addCartProduct(state, product){
            state.productsInCart.push(product)
        },
        updateCartProduct(state, prod){
            let indice = state.productsInCart.findIndex(p => p.id == prod.id)
            state.productsInCart.splice(indice, 1, prod)
        },
        deleteCartProduct(state, prod){
            let indice = state.productsInCart.findIndex(p => p.id == prod.id)
            state.productsInCart.splice(indice, 1)   
        },
        setProducts(state, products) {
            state.products = products
        },
        createProduct(state, product) {
            state.products.push(product)
        },
        editProduct(state, product) {
            state.products.splice(product.index, 1, product.data)
        },
        deleteProduct(state, index) {
            state.products.splice(index, 1)
        },
        setSelectedProduct(state, detail) {
            state.selectedProduct = detail
        }
    }
})