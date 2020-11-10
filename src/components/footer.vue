<template>
  <div class="footer">
  	 <div class="container">
  	   <div class="intro font-size-1">
  	      <p class="text-white">TDS is a Block Explorer and Analytics Platform for TDS, a decentralized smart contracts platform.</p>
  	   </div>
  	   <div class="footer-link">
  	   	  <a href="mailto:service@wdc852.com">联系我们：service@wdc852.com</a>
  	   	  <a href="https://www.wisdchain.com">友情链接：Wisdom Public Chain官网</a>
  	   </div>
  	   <hr class="opacity-md">
  	   <div class="copyright font-size-1">
  	   	 <p class="text-white">
  	   	 	2018-2019 Wisdom Public Chain Foundation. All rights reserved
  	   	 </p>
  	   </div>
  	 </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.footer{background-color:#21325b !important; width:100%; padding: 30px 0;
background-image: url(../assets/abstract-shapes-20.svg); text-align: center;}

.footer-link{color:#fff; cursor: pointer; padding-top:.35rem;
  a{color:#fff;font-size: .71094rem; margin: .1rem 30px;}
  a:hover{color:#fff; }
}

</style>
