<template>
  
  <div id="app">
    <app-navbar></app-navbar>
    <router-view class="container"/>
  </div>
</template>

<script>

import Navbar from "@/components/NavbarComponent";

export default {
  name: 'App',
  components: {
    'app-navbar': Navbar
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

$bg-color: #f5f5f5;
body {
  background-color: $bg-color;
}
</style>
