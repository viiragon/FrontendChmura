<template>
  <section class="section">
    <h1 class="title">Mapa</h1>
     <div class="mapouter"><div class="gmap_canvas"><iframe width="1080" height="700" id="gmap_canvas" src="https://maps.google.com/maps?q=politechnika warszawska&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe></div></div>
  </section>
</template>

<script>
export default {
  name: "MapView"
};
</script>
<style>
.mapouter {
  overflow: hidden;
  height: 700px;
  width: 1080px;
}
.gmap_canvas {
  background: none !important;
  height: 700px;
  width: 1080px;
}
</style>
