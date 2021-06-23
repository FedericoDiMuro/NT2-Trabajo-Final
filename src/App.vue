<template>
  <div id="app" >
    <Navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  }
}
</script>

<style>
  #app {

  }

  h1 {
    color: rgb(5 36 68);
  }
  
  .jumbotron {

  }
</style>
