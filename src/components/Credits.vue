<template>
<div class="credits-container">
  <Header />
  <div class="">
    Created by:
    <b-link href="https://rebecca-nachison.herokuapp.com/">Rebecca Nachison</b-link>
  </div>
  <div class="">
    Icons:
    <b-link href="http://www.freepik.com">Designed by macrovector_official / Freepik</b-link>
  </div>
  <div class="">
    Candles:
    <b-link href="http://www.freepik.com">Designed by rawpixel.com / Freepik</b-link>
  </div>
  <div class="">
    Day and Night toggle adapted from:
    <b-link href="https://codepen.io/bnthor/pen/WQBNxO">Benjamin Réthoré</b-link>
  </div>
  <div class="">
    Card animation inspired by:
    <b-link href="https://codepen.io/william-goldsworthy/pen/JzVajj">William Goldsworthy</b-link>
  </div>
</div>
</template>

<script>

import Header from './Header.vue';

export default {
  name: 'Credits',
  components: {
    Header
  }
}
</script>

<style lang="scss">
</style>
