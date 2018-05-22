
<template>
  <nav class="navbar is-info">
  <!-- <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
    </a>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div> -->

  <div id="navbarExampleTransparentExample" class="navbar-menu container">
    <div class="navbar-start">
      
      <a class="navbar-item" href="/#/list">
        List
      </a>
      <a class="navbar-item" href="/#/trip/1">
        Trip
      </a>
      <a class="navbar-item" href="/#/map">
        Map
      </a>
    </div>
    <div class="navbar-end">
      <a class="navbar-item" href="https://chmuryweb2018.azurewebsites.net/#/map">
        Nasza produkcja
      </a>
      <a class="navbar-item" href="https://buefy.github.io/#/">
        Buefy
      </a>
      <a class="navbar-item" href="https://bulma.io/">
        Bulma
      </a>
      <a class="navbar-item" href="https://vuejs.org/v2/api/">
        Vue
      </a>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: "Navbar"
};
</script>
<style>
.navbar {
  background: white;
}
</style>
