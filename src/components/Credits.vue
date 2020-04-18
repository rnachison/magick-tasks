<template>
<div id="credits-container">
  <Header />
  <div class="credit-wrapper">
    Created by:
    <b-link href="https://rebecca-nachison.herokuapp.com" target="_blank">Rebecca Nachison</b-link>
  </div>
  <div class="credit-wrapper">
    Icons:
    <b-link href="http://www.freepik.com" target="_blank">Designed by macrovector_official / Freepik</b-link>
  </div>
  <div class="credit-wrapper">
    Candles:
    <b-link href="http://www.freepik.com" target="_blank">Designed by rawpixel.com / Freepik</b-link>
  </div>
  <div class="credit-wrapper">
    Day and Night toggle adapted from:
    <b-link href="https://codepen.io/bnthor/pen/WQBNxO" target="_blank">Benjamin Réthoré</b-link>
  </div>
  <div class="credit-wrapper">
    Card animation inspired by:
    <b-link href="https://codepen.io/william-goldsworthy/pen/JzVajj" target="_blank">William Goldsworthy</b-link>
  </div>
  <div class="credit-wrapper">
    Glow inspired by:
    <b-link href="https://codepen.io/Stockin/pen/XPvpoB" target="_blank">Stockin</b-link>
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
  #credits-container {
    .credit-wrapper {
      margin-bottom: 10px;
    }
  }
</style>
