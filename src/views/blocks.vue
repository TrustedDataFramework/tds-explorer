<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">
            
            <div class="container">
                <div class="page-tilte pb-3 pt-3">区块</div>
                <div  class=" tab-css tab-box">
                    <div class="com-table-box">
                	  <table class="com-table block-list-tab">
                	  	 <tr>
                	  
                	  	 	 <th class="tab-th">区块高度
                	  	 	 	  <span class="caret-wrapper" :class="{'ascending':sortType==1,'descending':sortType==2}">
                	  	 	 	  	<i class="sort-caret ascending" @click="sort(1)"></i>
                	  	 	 	  	<i class="sort-caret descending" @click="sort(2)"></i>
                	  	 	 	  </span>
                	  	 	 </th>
                	  	 	 <th>出块时间</th>
                	  	 	 <th class="b-tran-num">事务数量</th>
                	  	 	 <th>矿工地址</th>
                	  	 	 <th>总收益</th>
                	  	 </tr>
                	  	 <tr v-for="(item,index) in blockList" :key="index">	 	
                	  	 	<td><div><span class="text-pri-default"><a @click="linbkDetail">{{item.height}}</a></span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.created_at}}</span></div></td>
                	  	 	<td><div class="d-hash"><a class="line1">{{item.size}}</a></div></td>
                	  	 	<td>
                                <div class="d-hash">
                                   <a class="line1"  :title="item.miner_address" 
                                   data-toggle="tooltip" data-placement="top">{{item.miner_address}}</a>
                                </div>
                             </td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.all_fee}}</span></div></td>
                	  	 </tr>
                	  </table>
                  </div> 
                    <div class="page-block">
                      
                        <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 25, 50, 100]"
                        :page-size="pageSize"
                        layout="sizes, prev, pager, next"
                        :total="totalElements">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        


        <comfooter></comfooter>
        <template>
          <el-backtop target=".wrapper" :bottom=80></el-backtop>
       </template>

    </div>

</template>
<script>
   import comheader from "@/components/header"; 
   import comfooter from "@/components/footer"; 
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:2,
         sortType:0,//1升序，2降序
         blockList:[
           {height:'33049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'333'},
           {height:'32049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'11'},
           {height:'31049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'22'},
           {height:'30049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'33'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'44'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'55'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'66'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'77'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'88'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'99'},
         ],
         totalElements:6000, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页
         defaultBlockList:[]
        }
     },
     components: {
        comfooter,comheader
     },
     filters:{
        timefilters(val) {
            console.log(val)
            if (val == null || val == "") {
                return "暂无时间";
            } else {
                let d = new Date(val);   //val 为表格内取到的后台时间
 
                let month =d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
                let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
                let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
                let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
                let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
                let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
                
                return times;
               
            }
        }
     },
     mounted(){
     	let that = this;
        that.defaultBlockList = JSON.parse(JSON.stringify(that.blockList))
          that.$nextTick(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
     },
     methods:{
        //区块详情
        linbkDetail(){
        let that = this;
        that.$router.push({name:'blocksDetail'})
        },

        
        sort(num){
      	
      	
      	let sortType = 0
      	if(this.sortType==0){
      		if(num==1){
	      		this.blockList.sort(this.compare1('height'))
	      	}else{
	      		this.blockList.sort(this.compare('height'))
	      	}
	      	sortType = num;
      	}
      	
      	if(this.sortType==1){
      		if(num==1){
      			sortType = 0
      			this.blockList = JSON.parse(JSON.stringify(this.defaultBlockList))
      			
      		}else{
      			sortType = num;
      			this.blockList.sort(this.compare('height'))
      		}
      	}
      	
      	if(this.sortType==2){
      		if(num==2){
      			sortType = 0
      			this.blockList = JSON.parse(JSON.stringify(this.defaultBlockList))
      		}else{
      			sortType = num;
      			this.blockList.sort(this.compare1('height'))
      		}
      	}
      	this.sortType = sortType
      	//console.log(this.sortType)
      },
      //降序
      compare(attr) {
          return function(a,b){
              var val1 = a[attr];
              var val2 = b[attr];
              return val2 - val1;
          }
          
      },
      //升序
      compare1(attr) {
          return function(a,b){
              var val1 = a[attr];
              var val2 = b[attr];
              return val1 - val2;
          }
      },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
     },
     beforeDestroy(){
      if($(".tooltip ")){
         $(".tooltip ").remove();
      }       
     }
     
   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>