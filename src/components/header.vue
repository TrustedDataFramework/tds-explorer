<template>
    <div class="h-header " :class="{'home-header':tabindex==1}">
      <div class="container clearfix">

        <nav class="navbar navbar-expand-md  navbar-dark">
          <!-- logo-->
		  <div class="w-lg-auto">
			<a class="navbar-brand ">
				<img
				id="logo-header"
				width="160"
				src="../assets/img/tdslogo.png"
				alt="TDS Logo"
				/>
			</a>
			<div class="c-hcurprice"></div>
          </div>
           <!--头部搜索-->


				<!-- 定义折叠按钮 -->
				<button type="button" class="navbar-toggler " data-toggle="collapse" data-target="#nav-menu">
					<span class="navbar-toggler-icon"></span>
				</button>

				<!-- 把菜单包含在容器内 -->
				<div class="collapse navbar-collapse justify-content-end" id="nav-menu">
					<ul class="navbar-nav">
					<li class="nav-item" :class="{'active':tabindex==1}"><a @click="linkRouter(1)" class="nav-link">{{$t("menu.home")}}</a></li>
					<li class="nav-item" :class="{'active':tabindex==2}"><a @click="linkRouter(2)"  class="nav-link">{{$t("menu.block")}}</a></li>
					<li class="nav-item" :class="{'active':tabindex==3}"><a @click="linkRouter(3)" class="nav-link ">{{$t("menu.transaction")}}</a></li>
					<li class="nav-item" :class="{'active':tabindex==4}"><a @click="linkRouter(4)" class="nav-link ">{{$t("menu.contract")}}</a></li>
           <li class="change">
            <a @click="switchLanguage('zh')" :class="{'active':$i18n.locale=='zh'}">CN</a>
            <span class="line">/</span>
            <a @click="switchLanguage('en')" :class="{'active':$i18n.locale=='en'}">EN</a>
          </li>
					</ul>
				</div>



		  <div class="input-group input-group-shadow  com-search-box" v-if="tabindex!=1">
				<div class="input-group-prepend d-none d-md-block">
						<!-- Select -->
						<select
						name="f" id="select"
						class="custom-select custom-arrow-select input-group-text font-size-base filterby"
						>
<!--						<option selected="" value="0">All Filters</option>-->
<!--						<option value="1">Addresses</option>-->
						<option selected="" value="0">{{$t('Transaction_hash')}}</option>
						<option value="1">{{$t('Block_hash')}}</option>
              <option value="2">{{$t('address')}}</option>
						</select>
						<!-- End Select -->
					</div>

					<input
						id="txtSearchInput"
						type="text"
						class="form-control searchautocomplete ui-autocomplete-input list-unstyled py-3 mb-0"
						autocomplete="off"
						spellcheck="false"
						:placeholder="$t('search_placeholder')"
						aria-describedby="button-header-search"
						name="q"
						maxlength="68"
					/>

					<div class="input-group-append">
						<button class="btn btn-primary" @click="link"> <i class="fa fa-search"></i> </button>
					</div>
				</div>



        </nav>

      </div>
    </div>
</template>

<script>
export default {
  inject: ['reload'],
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  props:{
	  tabindex:{
		type:null,
		default:1
	  }
  },
  methods:{
    //语言切换
    switchLanguage(val){
      let that = this;
      that.$i18n.locale = val
      localStorage.setItem('lang',val)
    },
    linkRouter(num){
      let that = this
      this.reload();
      if(num==1){
        that.$router.push({path:'/'})
      }
      if(num==2){
        that.$router.push({path:'/blocks'})
      }
      if(num==3){
        that.$router.push({path:'/transactions'})
      }
      if(num==4){
        that.$router.push({path:'/contract'})
      }
    },
    link(){
      let that = this;
      let text = $("#txtSearchInput").val();
      var sel=document.getElementById("select");
      var index = sel.selectedIndex; // 选中索引
      var val= sel.options[index].value;
      if(val == 0){
        that.$router.push({path:'/transactionsDetail',query: {
            hash: text
          }})
      }else if(val == 1){
        that.$router.push({path:'/blocksDetail',query: {
            blockHash: text
          }})
      }else if(val == 2){
        that.$router.push({path:'/addressTransactions',query: {
            hash: text
          }})
      }
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.h-header {background:#fff;
-webkit-box-shadow: 0 1px 10px rgba(151,164,175,.1);
-moz-box-shadow: 0 1px 10px rgba(151,164,175,.1);
box-shadow: 0 1px 10px rgba(151,164,175,.1);
.navbar{padding: .5rem 0px !important;}
}

.t-h-header{background:#fff;}
.header_search{
	width:100%;
}
.c-hcurprice{height:40px;}
.h-header{position: relative;
  .navbar-collapse {padding-top:3rem;}
  .com-search-box{width:60%; position: absolute; top:.5rem; right:0px}
  ul li{margin-left:1em;}
}

.home-header{
  .c-hcurprice{height:0px;}
  .navbar-collapse {padding-top:0;}

}

@media(max-width: 767px){
  .h-header{
	.navbar-collapse {padding-top:0;}
	.com-header_search{width:100%;}
	.c-hcurprice{height:0px;}
	.com-search-box{width:100%; position:static; top:0; right:0px;margin-top:10px;}
	ul li{margin-left:0px;}
  }

}

</style>
