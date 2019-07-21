<template>
  <div id="app" />
</template>

<script>
import gameStart from '@/game'
export default {
  mounted() {
    gameStart()
  }
}
</script>

<style lang="scss">
body,
html {
  font-size: 14px;
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}

canvas {
  display: block;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  min-width: 800px;
  background: #333;
}
</style>
