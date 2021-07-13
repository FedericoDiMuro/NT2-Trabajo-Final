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
        async getCart({ commit, state }){
            state.loading = !state.loading;
            try {
                const respuesta = await axios(`${process.env.VUE_APP_URL_API}/Carrito/`)
                commit('getCartProducts', respuesta.data)
                state.loading = !state.loading;
            } catch(e) {
                console.log('Error Axios ->', e)
            }
        },
        async addProductInCart({commit}, product){
            try {
                const item = {
                    idProduct: product.id,
                    image: product.imagen,
                    name: product.nombre,
                    description: product.descripcion,
                    price: product.precio,
                    stockMax: product.stock,
                    cant: 1
                }

                const respuesta = await axios.post(`${process.env.VUE_APP_URL_API}/Carrito/`, item, {'content-type':'application/json'})
                const prod = respuesta.data
                commit('addCartProduct', prod)
            } catch(e) {
                console.log('Error Axios ->', e)
            }
        },
        async updateProductInCart({commit}, product){
            try {
                const id = product.id
                const respuesta = await axios.put(`${process.env.VUE_APP_URL_API}/Carrito/${id}`, product, {'content-type':'application/json'})
                const prod = respuesta.data
                commit('updateCartProduct', prod)
            } catch(e) {
                console.log('Error Axios ->', e)
            }
        },
        async deleteProductInCart({commit}, id){
            try {
                const respuesta = await axios.delete(`${process.env.VUE_APP_URL_API}/Carrito/${id}`)
                const prod = respuesta.data
                commit('deleteCartProduct', prod)
            } catch(e) {
                console.log('Error Axios ->', e)
            }
        },
        async purchaseProducts({ state, commit, dispatch }){
            try {
                const promises = [];
                for (const product of state.productsInCart) {
                    promises.push(axios.delete(`${process.env.VUE_APP_URL_API}/Carrito/${product.id}`));
                }

                await Promise.all(promises).then((data) => {
                    data.map(response => {
                        const newProduct = { ...response.data, stock: response.data.stockMax - 1}
                        dispatch('editProduct', newProduct)
                        commit('deleteCartProduct', response.data)
                    })
                })

                alert("Los productos fueron comprados!");
            } catch(e) {
                console.log('Error Axios ->', e)
            }
        },
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