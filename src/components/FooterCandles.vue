<template>
  <div class="candle-wrapper">
    <img src="../assets/40144-edited.svg" alt="candles" class="img-fluid candles">
  </div>
</template>

<script>
export default {
  name: 'FooterCandles'
}
</script>

<style lang="scss" scoped>

  .candle-wrapper {
    position: fixed;
    bottom: 0;
    right: 0;
    width: 37vw;
    z-index: 10;

    .candles {
      filter: drop-shadow( 14px 3px 2px rgba(243, 93, 39, .63));
    }
  }

</style>
