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

body{padding-right: 0 !important }


</style>

