<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3">{{$t('menu.transaction')}}</div>
                <div  class=" tab-css tab-box ">
                	<div class="com-table-box">
                	  <table class="com-table">
                	  	 <tr>
                	  	 	 <th>{{$t('transaction_hash')}}</th>
                         <th>{{$t('Transaction_type')}}</th>
                	  	 	 <th class="tab-th">{{$t('block.block_height')}}
                	  	 	 	  <span class="caret-wrapper" :class="{'ascending':sortType==1,'descending':sortType==2}">
                	  	 	 	  	<i class="sort-caret ascending" @click="sort(1)"></i>
                	  	 	 	  	<i class="sort-caret descending" @click="sort(2)"></i>
                	  	 	 	  </span>
                	  	 	 </th>
                	  	 	 <th>{{$t('block.Block_time')}}</th>
                	  	 	 <th>{{$t('sender_address')}}</th>
                         <th></th>
                	  	 	 <th>{{$t('receiver_address')}}</th>
                	  	 	 <th>{{$t('amount')}}</th>
                	  	 	 <th>{{$t('fee')}}</th>
                	  	 </tr>
                	  	 <tr v-for="(item,index) in transactionList" :key="index">
                	  	 	<td>
                            <div class="d-hash ">
                              <el-tooltip class="item" effect="dark" :content="item.hash" popper-class="atooltip" placement="bottom">
                                <a class="line1" @click="linDetail(item.hash)" >{{item.hash}}</a>
                              </el-tooltip>
                            </div>
                        </td>
                         <td><div><span class="text-pri-default"><span>{{item.type==1?$t('transfer'):item.type==2?$t('deploy_contract'):$t('call_contract')}}</span></span></div></td>
                	  	 	<td><div><span class="text-pri-default"><span>{{item.block_height}}</span></span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.created_at | timefilters}}</span></div></td>
                	  	 	<td>
                            <div class="d-hash">
                             <el-tooltip class="item" effect="dark" :content="item.from" popper-class="atooltip" placement="bottom">
                                <a class="line1"  @click="linkAddressTransactionByAddress(item.from)">{{item.from}}</a>
                              </el-tooltip>
                            </div>
                        </td>
                        <td>
                          <span class="btn btn-xs btn-icon btn-soft-success rounded-circle"><i class="arrow-right"></i></span>
                        </td>
                	  	 	<td>
                           <div class="d-hash">
                               <el-tooltip class="item" effect="dark" :content="item.to" popper-class="atooltip" placement="top">
                                 <a class="line1" @click="linkAddressTransactionByAddress(item.to)">{{item.to}}</a>
                               </el-tooltip>
                            </div>
                        </td>

                	  	 	<td><div class=""><span class="text-pri-default">{{item.amount}}</span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.fee}}</span></div></td>
                	  	 </tr>
                	  </table>
                  </div>
                    <div class="page-block">

                        <el-pagination :class="{'el-pagination_en':$i18n.locale=='en'}"
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
let _this = this;
   import comheader from "@/components/header";
   import comfooter from "@/components/footer";
   import {getTransactionList} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:3,
         sortType:0,//1升序，2降序
         transactionList:[
         ],
         defaultBlockList:[],
         totalElements:10, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页
        }
     },
      beforeCreate () {
	    _this = this
    },
     components: {
        comfooter,comheader
     },
     filters:{
        timefilters(val) {
            if (val == null || val == "") {
                return _this.$i18n.t('No_time');
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
       that.getTransactionList();
     },
     methods:{
      //跳转到事务详情
      linDetail(hash){
         let that = this;
         that.$router.push({name:'transactionsDetail',params: {
             hash: hash
           }})
      },
      //跳转到地址事务
      linkAddressTransactionByAddress(address){
         let that = this;
         that.$router.push({name:'addressTransactions',params: {
             address:address
           }})
      },
      //区块排序

      sort(num){


      	let sortType = 0
      	if(this.sortType==0){
      		if(num==1){
	      		this.transactionList.sort(this.compare1('nonce'))
	      	}else{
	      		this.transactionList.sort(this.compare('nonce'))
	      	}
	      	sortType = num;
      	}

      	if(this.sortType==1){
      		if(num==1){
      			sortType = 0
      			this.transactionList = JSON.parse(JSON.stringify(this.defaultBlockList))

      		}else{
      			sortType = num;
      			this.transactionList.sort(this.compare('nonce'))
      		}
      	}

      	if(this.sortType==2){
      		if(num==2){
      			sortType = 0
      			this.transactionList = JSON.parse(JSON.stringify(this.defaultBlockList))
      		}else{
      			sortType = num;
      			this.transactionList.sort(this.compare1('nonce'))
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
          getTransactionList(obj).then(res=> {
            if(res.code==200){
              let that = this;
              that.totalElements = res.data.totalElements;
              /*
              for(let i = 0;i<res.data.content.length;i++){
                if(res.data.content[i].type == 1){
                  res.data.content[i].type = this.$i18n.t('transfer');
                }else if(res.data.content[i].type == 2){
                  res.data.content[i].type =this.$i18n.t('deploy_contract');
                }else if(res.data.content[i].type == 3){
                  res.data.content[i].type = this.$i18n.t('call_contract');
                }
              }
              */
              that.transactionList = res.data.content;
              that.defaultBlockList = JSON.parse(JSON.stringify(res.data.content))
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
          getTransactionList(obj).then(res=> {
            if(res.code==200){
              let that = this;
              that.totalElements = res.data.totalElements;
              /*
              for(let i = 0;i<res.data.content.length;i++){
                if(res.data.content[i].type == 1){
                  res.data.content[i].type = this.$i18n.t('transfer');
                }else if(res.data.content[i].type == 2){
                  res.data.content[i].type = this.$i18n.t('deploy_contract');
                }else if(res.data.content[i].type == 3){
                  res.data.content[i].type = this.$i18n.t('call_contract');
                }
              }*/
              that.transactionList = res.data.content;
              that.defaultBlockList = JSON.parse(JSON.stringify(res.data.content))
            }else{
              that.$toast(res.message,3000)
            }
          })
        },
       getTransactionList(){
         let that = this;
         let obj = {};
         obj.per_page = 10
         obj.page = 0
         getTransactionList(obj).then(res=> {
           if(res.code==200){
             let that = this;
             that.totalElements = res.data.totalElements;
             /*
             for(let i = 0;i<res.data.content.length;i++){
               if(res.data.content[i].type == 1){
                 res.data.content[i].type = this.$i18n.t('transfer');
               }else if(res.data.content[i].type == 2){
                 res.data.content[i].type = this.$i18n.t('deploy_contract');;
               }else if(res.data.content[i].type == 3){
                 res.data.content[i].type = this.$i18n.t('call_contract');
               }
             }*/
             that.transactionList = res.data.content;
             that.defaultBlockList = JSON.parse(JSON.stringify(res.data.content))
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
