<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3">
                    <button class="btn-vefify" @click="linkVerifyContract">验证合约</button>合约
                </div>
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
                         <th></th>
                	  	 	 <th>to</th>
                	  	 	 <th>amount</th>
                	  	 	 <th>手续费</th>
                	  	 </tr>
                	  	 <tr v-for="(item,index) in contractList" :key="index">
                	  	 	<td>
                            <div class="d-hash ">
                              <el-tooltip class="item" effect="dark" :content="item.tx_hash" popper-class="atooltip" placement="bottom">
                                <a class="line1" @click="linDetail(item.tx_hash)" >{{item.tx_hash}}</a>
                              </el-tooltip>
                            </div>
                        </td>
                	  	 	<td><div><span class="text-pri-default"><a>{{item.height}}</a></span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.created_at | timefilters}}</span></div></td>
                	  	 	<td>
                            <div class="d-hash">
                             <el-tooltip class="item" effect="dark" :content="item.from" popper-class="atooltip" placement="bottom">
                                <a class="line1"  @click="linkAddressTransaction">{{item.from}}</a>
                              </el-tooltip>
                            </div>
                        </td>
                        <td>
                          <span class="btn btn-xs btn-icon btn-soft-success rounded-circle"><i class="arrow-right"></i></span>
                        </td>
                	  	 	<td>
                           <div class="d-hash">
                               <el-tooltip class="item" effect="dark" :content="item.to" popper-class="atooltip" placement="top">
                                 <a class="line1" @click="linkAddressTransaction">{{item.to}}</a>
                               </el-tooltip>
                            </div>
                        </td>

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
   import {getContractList} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:4,
         sortType:0,//1升序，2降序
          contractList:[
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'31049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0}

         ],
         defaultBlockList:[],
         totalElements:10, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页
        }
     },
     components: {
        comfooter,comheader
     },
     filters:{
        timefilters(val) {
            //console.log(val)
            if (val == null || val == "") {
                return "暂无时间";
            } else {
              var offset = new Date().getTimezoneOffset()/60;
              if(!val){
                return '-';
              }
              let that = this;
              //UTCDateString = renderTime(UTCDateString);
              val = val.replace("-","/");
              val = val.replace("T"," ");
              val = replaceAll(val);
              val = val.substring(0,19);

              function formatFunc(str) {    //格式化显示
                return str > 9 ? str : '0' + str
              }
              var date2 = new Date(val);//这步是关键
              var year = date2.getFullYear();
              var mon = formatFunc(date2.getMonth() + 1);
              var day = formatFunc(date2.getDate());
              var hour = date2.getHours();
              hour = formatFunc(hour);
              var min = formatFunc(date2.getMinutes());
              var sec = formatFunc(date2.getSeconds());
              var dateStr = year+'/'+mon+'/'+day+' '+hour+':'+min+':'+sec;
              //var dateStr = "2020/9/2 23:01:01";
              var dateStr1 = eosFormatTime2(dateStr,offset);
              var year1 = dateStr1.getFullYear();
              var mon1 = formatFunc(dateStr1.getMonth() + 1);
              var day1 = formatFunc(dateStr1.getDate());
              var hour1 = dateStr1.getHours();
              hour1 = formatFunc(hour1);
              var min1 = formatFunc(dateStr1.getMinutes());
              var sec1 = formatFunc(dateStr1.getSeconds());
              var dateStr2 = year1+'-'+mon1+'-'+day1+' '+hour1+':'+min1+':'+sec1;
              return dateStr2;

              function eosFormatTime2(oldTimes1,offset) {
                var x = oldTimes1; // 取得时间"2017-07-08 13:00:00"
                var time = new Date(x);
                var timeNum = offset;//小时数
                time.setHours(time.getHours() - timeNum);
                return time;
              }
              function replaceAll(str) {
                if(str!=null)
                  str = str.replace(/-/g,"/")
                return str;
              }

            }
        }
     },
     mounted(){
     	let that = this;
       that.getContractList();
     },
     methods:{
       //跳转到验证合约页面
      linkVerifyContract(){
         let that = this;
         that.$router.push({name:'verifyContract'})
      },
      //跳转到合约详情
      linDetail(hash){
         let that = this;
         that.$router.push({name:'contractDetail',params: {
             hash: hash
        }})
      },
      //跳转到地址事务
      linkAddressTransaction(){
         let that = this;
         that.$router.push({name:'addressTransactions'})
      },
      //区块排序

      sort(num){


      	let sortType = 0
      	if(this.sortType==0){
      		if(num==1){
	      		this.contractList.sort(this.compare1('nonce'))
	      	}else{
	      		this.contractList.sort(this.compare('nonce'))
	      	}
	      	sortType = num;
      	}

      	if(this.sortType==1){
      		if(num==1){
      			sortType = 0
      			this.contractList = JSON.parse(JSON.stringify(this.defaultBlockList))

      		}else{
      			sortType = num;
      			this.contractList.sort(this.compare('nonce'))
      		}
      	}

      	if(this.sortType==2){
      		if(num==2){
      			sortType = 0
      			this.contractList = JSON.parse(JSON.stringify(this.defaultBlockList))
      		}else{
      			sortType = num;
      			this.contractList.sort(this.compare1('nonce'))
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
          let that = this;
          that.pageSize = val;
          let obj = {};
          obj.per_page = val;
          obj.page = that.currentPage;
          getContractList(obj).then(res=> {
            if(res.code==200){
              let that = this;
              that.totalElements = res.data.totalElements;
              that.contractList = res.data.content;
            }else{
              that.$toast(res.message,3000)
            }
          })
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          let that = this;
          that.currentPage = val;
          let obj = {};
          obj.per_page = that.pageSize;
          obj.page = val-1;
          getContractList(obj).then(res=> {
            if(res.code==200){
              let that = this;
              that.totalElements = res.data.totalElements;
              that.contractList = res.data.content;
            }else{
              that.$toast(res.message,3000)
            }
          })
        },
       getContractList(){
         let that = this;
         let obj = {};
         obj.per_page = 10
         obj.page = 0
         getContractList(obj).then(res=> {
           if(res.code==200){
             let that = this;
             that.totalElements = res.data.totalElements;
             that.contractList = res.data.content;
             that.defaultBlockList = JSON.parse(JSON.stringify(that.contractList))
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
     },


   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>
