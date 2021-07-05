import Vue from 'vue'
import VueRouter from 'vue-router'

import Inicio from './components/Inicio.vue'
import Carrito from './components/Carrito.vue'
import Productos from './components/Productos.vue'
import Detalle from './components/Detalle.vue'

Vue.use(VueRouter)


export const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', redirect: '/Inicio' },
        { path: '/Inicio', component: Inicio },
        { path: '/Carrito', component: Carrito },
        { path: '/Productos', component: Productos },
        { path: '/Detalle/:id', name: 'Detalle',component: Detalle },
    ]
})