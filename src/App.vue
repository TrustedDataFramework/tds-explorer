<template>
  <div id="app">
 
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">

@import './assets/custom.less';

body,html{width: 100%; height: 100%;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #1e2022; height: 100%;

}
</style>

