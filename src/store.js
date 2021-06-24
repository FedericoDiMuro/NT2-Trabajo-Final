import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        productsInCart: []
    },
    actions: {
        addToCart({commit}, product){
            commit('add', product)
        },
        clearCart({commit}){
            commit('clear')
        }
    },
    mutations: {
        add(state, product){
            let prod = state.productsInCart.find(x => x.id == product.id);
            var item = {
                id: product.id,
                name: product.nombre,
                image: product.imagen,
                description: product.descripcion,
                price: product.precio,
                cant: 1
            }
            if(!prod){
                state.productsInCart.push(item)
            }
            else{
                let index = state.productsInCart.indexOf(prod)
                state.productsInCart[index].cant += 1
            }
        },
        clear(state){
            state.productsInCart = []
        }
    }
})