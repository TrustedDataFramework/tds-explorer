<template>
	<div class="wraper">
		 <div class="h-header">
		    <div class="container clearfix">
		       <div class="w-lg-auto">
              <a class="navbar-brand  pt-md-0" href="/" target="_parent" aria-label="Etherscan">
                  <img id="logo-header" width="160"  src="../assets/img/logo-ether.png" alt="TDS Logo">                                                               
              </a>                       
            </div>
            <div class="navlist">
            	<ul>
            		<li><a>Home</a></li>
            		<li><a>Block</a></li>
            		<li><a>Transaction</a></li>
            		<li><a>Contract</a></li>
            	</ul>
            </div>
		    </div>
		 </div>
		 <div class="h-bg-dark">
		 	 <div class="container">
		 	 	  <h1 class="h4 text-white mb-3">
            The Ethereum Blockchain Explorer
          </h1>

          <div class="input-group input-group-shadow">
            <div class="input-group-prepend d-none d-md-block">
              <!-- Select -->
                <select name="f" class="custom-select custom-arrow-select input-group-text font-size-base filterby">
                    <option selected="" value="0">All Filters</option>
                    <option value="1">Addresses</option>
                    <option value="2">Transaction hash</option>
                    <option value="3">Block Hash</option>
                </select>
              <!-- End Select -->
            </div>

            <input id="txtSearchInput" type="text" class="form-control searchautocomplete ui-autocomplete-input list-unstyled py-3 mb-0" autocomplete="off" spellcheck="false" placeholder="Search by Address / Txn Hash / Block / Token / Ens" aria-describedby="button-header-search" name="q" onkeyup="handleSearchText(this);" maxlength="68">
            <input type="hidden" value="" id="hdnSearchText">
            <input type="hidden" value="" id="hdnSearchLabel">
             <div class="input-group-append">
                
                <button class="btn btn-primary" type="submit">
                  <i class="fa fa-search"></i>
                </button>
            </div>
          </div>
          
		 	 </div>
		 </div>
		 
		 <div class="page-content home-page-content" >	
		 	
		 	<div class="container" style="margin-top: 1.25rem;">
		 		<div class="row">
		 			  <div class="col-lg-6 mb-4 mb-lg-0">
		 			  	  <div class="card">
			 			  	  <div class="card-header">
			 			  	  	 <h2 class="card-header-title">Latest Blocks</h2>
			 			  	  </div>
			 			  	  <div class="list-box block-list">
					 			  	 	<happy-scroll color="rgba(0,0,0,0.5)" size="5" resize>
								        <!-- 内层盒子——内容区 -->
								        <div class="con">
								        	 <div class="row block-row">
								        	 	   <div class="col-sm-4">
								        	 	   	  <div class="btn-icon btn-soft-secondary">Bk</div>
								        	 	   	  <div class="blockInfo">
								        	 	   	  	 <p class="b-height">
								        	 	   	  	 	 <a>11228676</a>
								        	 	   	  	 </p>
								        	 	   	  	 <p class="b-time text-secondary text-nowrap">2 mins ago</p>
								        	 	   	  </div>
								        	 	   </div>
								        	 	   <div class="col-sm-8">
								        	 	   	  <div class="blockInfo blockInfo-1">
								        	 	   	  	  <div class="b-height b-address">ddkfkffllglglglkdjdk</div>
								        	 	   	  	  <div class="b-height b-txns">
								        	 	   	  	  	<a class="b-height txns">223 txns</a>
								        	 	   	  	  	<span class="b-time text-secondary text-nowrap">in 15 secs</span>
								        	 	   	  	  </div>
								        	 	   	  </div>
								        	 	   	  <div class="fr b-num text-secondary">
								        	 	   	  	<span class="s-amount">2.9096WDC</span>
								        	 	   	  </div>
								        	 	   </div>
								        	 </div>
								        	<hr class="hr-space">
								        </div>
								      </happy-scroll>
						      </div>
						      <div class="card-footer">
						      	 <a class="btn btn-xs btn-block btn-soft-primary">View all blocks</a>
						      </div>
					      </div>
		 			  </div>
		 			  <div class="col-lg-6"></div>
		 		</div>
		 	</div>
		 
		 </div>
		 
	   <comfooter></comfooter>
	</div>
</template>

<script>
	import comfooter from '@/components/footer'
	export default{
		data(){
			return{
				
			}
		},
		components:{
			comfooter
		},
		methods:{
			
		}
	}
</script>

<style scoped="" lang="less">
@import url("../assets/index.less");
</style>