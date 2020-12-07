<template>
  <div class="footer">
  	 <div class="container">
  	   <div class="intro font-size-1">
  	      <p class="text-white">TDOS is a Block Explorer and Analytics Platform for TDOS, a decentralized smart contracts platform.</p>
  	   </div>
  	   <div class="footer-link">
  	   	  <a href="mailto:hermosatdos@qq.com">联系我们：hermosatdos@qq.com</a>
  	   	  <a href="https://www.tdos.net">友情链接：TDOS官网</a>
          <a href="https://www.wisdchain.com">DAPP官网</a>
         <a href="https://www.wisdchain.com">运维工具官网</a>
  	   </div>
  	   <hr class="opacity-md">
  	   <div class="copyright font-size-1">
  	   	 <p class="text-white">
           Copyright©  Changzhou yongyang Information Technology Co., Ltd . 2020 All rights reserved
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
