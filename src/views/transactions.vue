<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">
            
            <div class="container">
                <div class="page-tilte pb-3 pt-3">区块</div>
                <div  class=" tab-css tab-box ">
                	<div class="com-table-box">
                	  <table class="com-table">
                	  	 <tr>
                	  	 	 <th>事务hash</th>
                	  	 	 <th class="tab-th">区块高度
                	  	 	 	  <span class="caret-wrapper" :class="{'ascending':sortType==1,'descending':sortType==2}">
                	  	 	 	  	<i class="sort-caret ascending" @click="sort(1)"></i>
                	  	 	 	  	<i class="sort-caret descending" @click="sort(2)"></i>
                	  	 	 	  </span>
                	  	 	 </th>
                	  	 	 <th>出块时间</th>
                	  	 	 <th>from</th>
                	  	 	 <th>to</th>
                	  	 	 <th>amount</th>
                	  	 	 <th>手续费</th>
                	  	 </tr>
                	  	 <tr v-for="(item,index) in blockList">
                	  	 	<td><div class="d-hash "><a class="line1">{{item.hash}}</a></div></td>
                	  	 	<td><div><span class="text-pri-default"><a>{{item.nonce}}</a></span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.created_at}}</span></div></td>
                	  	 	<td><div class="d-hash"><a class="line1">{{item.from}}</a></div></td>
                	  	 	<td><div class="d-hash"><a class="line1">{{item.to}}</a></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.amount}}</span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.fee}}</span></div></td>
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
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'31049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'32049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'3049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0}
           
         ],
         defaultBlockList:[],
         totalElements:6000, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页
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
     },
     methods:{
      sort(num){
      	
      	
      	let sortType = 0
      	if(this.sortType==0){
      		if(num==1){
	      		this.blockList.sort(this.compare1('nonce'))
	      	}else{
	      		this.blockList.sort(this.compare('nonce'))
	      	}
	      	sortType = num;
      	}
      	
      	if(this.sortType==1){
      		if(num==1){
      			sortType = 0
      			this.blockList = JSON.parse(JSON.stringify(this.defaultBlockList))
      			
      		}else{
      			sortType = num;
      			this.blockList.sort(this.compare('nonce'))
      		}
      	}
      	
      	if(this.sortType==2){
      		if(num==2){
      			sortType = 0
      			this.blockList = JSON.parse(JSON.stringify(this.defaultBlockList))
      		}else{
      			sortType = num;
      			this.blockList.sort(this.compare1('nonce'))
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
      //表格酒奇偶行显示不一样
      tableRowClassName({row, rowIndex}) {
        if (rowIndex%2 === 1) {
          return 'odd-row';
        } else if (rowIndex%2 === 0) {
          return 'even-row';
        }

      },
      //表头单元格的className的回调方法
      cellClass(row){
        if(row.columnIndex==0 || row.columnIndex==4 || row.columnIndex==5){
          return 'ntab-hash';
        }

      },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
     }
     
   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>