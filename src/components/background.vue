<template>
  <div>
    <div class="bg-color"></div>
    <div class="bg"></div>
    <div class="line-box" style="transform: translateY(0px)">
      <div :class="`l${i}`" v-for="i in 4" :key="i"></div>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style scoped>
.bg {
  background: url("@/assets/img/meltyblood_typelumina_background.png") top
    no-repeat;
  width: 100%;
  background-size: cover;
  height: 100vh;
  position: fixed;
}
.bg-color {
  background: rgba(0, 4, 59, 0.6);
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 90;
}
/* .line-box {
  width: 100%;
  height: 100%;
  position: fixed;
}
.line-box .l1 {
  -webkit-transform: skewY(-10deg);
  transform: skewY(-10deg);
  top: 325px;
}
.line-box div {
  position: absolute;
  width: 100%;
  height: 3px;
  background: #fff;
  -webkit-box-shadow: 0 0 20px #3792f9;
  box-shadow: 0 0 20px #3792f9;
  pointer-events: none;
} */
</style>

