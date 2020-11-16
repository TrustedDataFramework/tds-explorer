<template>
  <div id="app">
 
    <router-view v-if="isRouterAlive" :key="$route.fullPath"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      isRouterAlive:true,
    }
  },
  provide(){
    return{
        reload:this.reload
    }
  },
  methods:{
    reload(){
        this.isRouterAlive = false;
        this.$nextTick(function () {
          this.isRouterAlive = true
        });
    }
  }

}
</script>

<style lang="less">



body,html{width: 100%; height: 100%;}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #1e2022; height: 100%;

}
</style>

