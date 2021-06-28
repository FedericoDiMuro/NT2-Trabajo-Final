export var miMixinLocal = {
    computed: {
        totalCarrito() {
            let total = 0.0;
            for (let index = 0; index < this.$store.state.productsInCart.length; index++) {
                const element = this.$store.state.productsInCart[index];
                total += (element.price * element.cant)
            }

            return total
          }
    }
}
  