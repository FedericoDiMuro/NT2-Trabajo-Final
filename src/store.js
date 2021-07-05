import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading: false,
        products: [],
        productsInCart: []
    },
    actions: {
        async getProducts({ commit, state }) {
            state.loading = !state.loading;
            try {
                const response = await axios.get(`${process.env.VUE_APP_URL_API}/Productos/`);

                if (response.data.length !== 0) {
                    state.loading = !state.loading;
                    commit('setProducts', response.data);
                }
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
                const respuesta = await this.axios.post(`${process.env.VUE_APP_URL_API}/Productos/`, product, {'content-type':'application/json'})
                const prod = respuesta.data
                commit('createProduct', prod)
            } catch (e) {
                console.log('Error Axios ->', e)
            }
        },
        async editProduct({ commit, state }, product){
            try{
                const respuesta = await this.axios.put(`${process.env.VUE_APP_URL_API}/Productos/${product.id}`, product, {'content-type':'application/json'})
                const prod = respuesta.data
                const index = state.products.findIndex(p => p.id == prod.id)
                commit('editProduct', { data: prod, index })
            } catch (e){
                console.log('Error Axios ->', e)
            }
        }
    },
    mutations: {
        addToCart(state, product){
            const prod = state.productsInCart.find(x => x.id == product.id);
            const item = {
                id: product.id,
                name: product.nombre,
                image: product.imagen,
                description: product.descripcion,
                price: product.precio,
                cant: 1,
                stockMax: product.stock
            }

            if (!prod) {
                state.productsInCart.push(item)
            } else {
                const index = state.productsInCart.indexOf(prod)
                state.productsInCart[index].cant += 1
            }
        },
        clearCart(state){
            state.productsInCart = []
        },
        deleteProductInCart(state, index){
            state.productsInCart.splice(index, 1)
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
        }
    }
})