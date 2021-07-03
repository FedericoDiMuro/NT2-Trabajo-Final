import Vue from 'vue'

Vue.filter('moneda', function(value) {
    return '$' + value
})  