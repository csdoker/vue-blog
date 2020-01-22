<template>
  <div class="loading-wrapper">
    <div class="loading">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style scoped lang="scss">
.loading-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(255,255,255, .5);
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 999999;
}
.loading {
  position: relative;
  transform: translateX(-30px) translateY(-30px);
}
.loading > div {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  margin: 0;
  width: 60px;
  height: 60px;
  animation: loading 1s 0s linear infinite;
  background-color: #4d4d4d;
  border-radius: 100%;
}
.loading > div:nth-child(2) {
  -webkit-animation-delay: -0.4s;
  animation-delay: -0.4s;
}
.loading > div:nth-child(3) {
  -webkit-animation-delay: -0.2s;
  animation-delay: -0.2s;
}
@-webkit-keyframes loading {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}

@keyframes loading {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
    opacity: 0;
  }

  5% {
    opacity: 1;
  }

  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
