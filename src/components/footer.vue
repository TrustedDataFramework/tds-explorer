<template>
  <div class="footer">
  	 <div class="container">
  	   <div class="intro font-size-1">
  	      <p class="text-white">TDOS is a Block Explorer and Analytics Platform for TDOS, a decentralized smart contracts platform.</p>
  	   </div>
  	  <div class="footer-link">
  	   	  <a href="mailto:hermosatdos@qq.com">{{$t('contact_us')}}：<!--service@wdc852.com-->hermosatdos@qq.com</a>
  	   	 
			   <div class="link">
					{{$t('link')}}:
			     <a href="https://www.tdos.net/">{{$t('TDOS_official_website')}}</a>
			    <a href="http://120.76.101.153:8282/#/">{{$t('DAPP_official_website')}}</a>
			   </div>
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

.footer-link{color:#fff; cursor: pointer; padding-top:.35rem;font-size: .71094rem;
  a{color:#fff;font-size: .71094rem; margin: .1rem 30px;}
  a:hover{color:#fff; }
  .link{display: inline;
     a{margin-left: 0px; margin-right: 10px;}
  }
}

</style>
