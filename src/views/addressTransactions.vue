<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main address-transaction-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3 row">

                  <div class="col-md-6">

                      {{$t('index.address')}}
                      <span class="title-address text-secondary">{{address}}</span>
                      <el-tooltip class="item" effect="dark" :content="$t('copy_the_address')" popper-class="atooltip" placement="top">
                      <span class="at-btn at-btn-copy" :class="{'btn-copy-suc':copySecs>0}" 
                        v-clipboard:copy="address"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                      >

                      </span>
                      </el-tooltip>
                      <el-tooltip class="item" effect="dark" :content="$t('view_QR_code')" popper-class="atooltip" placement="top">
                      <span class="at-btn at-btn-see" >
                        <em data-target="#myModal" data-toggle="modal"  @click="qrcodeScan();"></em>
                      </span>
                      </el-tooltip>
                  </div>
                  <div class="col-md-3 col-balance">
                      {{$t('current_nonce')}}：<span>{{nonce}}</span>
                  </div>
                  <div class="col-md-3 col-balance">
                    {{$t('Current_balance')}}：<span>{{amount}}</span>
                  </div>

                </div>



                <div  class=" tab-css tab-box ">
                	<div class="com-table-box">
                	  <table class="com-table">
                	  	 <tr>
                	  	 	 <th>{{$t('transaction_hash')}}</th>
                	  	 	 <th class="tab-th">{{$t('block.block_height')}}
                	  	 	 	  <span class="caret-wrapper" :class="{'ascending':sortType==1,'descending':sortType==2}">
                	  	 	 	  	<i class="sort-caret ascending" @click="sort(1)"></i>
                	  	 	 	  	<i class="sort-caret descending" @click="sort(2)"></i>
                	  	 	 	  </span>
                	  	 	 </th>
                	  	 	 <th>{{$t('block.Block_time')}}</th>
                	  	 	 <th>{{$t('from')}}</th>
<!--                         <th></th>-->
                	  	 	 <th>{{$t('to')}}</th>
                	  	 	 <th>{{$t('amount')}}</th>
                	  	 	 <th>{{$t('fee')}}</th>
                	  	 </tr>
                	  	 <tr v-for="(item,index) in blockList" :key="index">
                	  	 	<td>
                            <div class="d-hash ">
                               <el-tooltip class="item" effect="dark" :content="item.hash" popper-class="atooltip" placement="top">
                                 <a class="line1" @click="linDetail(item.hash)" >{{item.hash}}</a>
                               </el-tooltip>
                            </div>
                        </td>
                	  	 	<td><div><span class="text-pri-default"><span>{{item.block_height}}</span></span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.created_at | timefilters}}</span></div></td>
                	  	 	<td>
                            <div class="d-hash">
                              <el-tooltip class="item" effect="dark" :content="item.from" popper-class="atooltip" placement="top">
                              <span class="line1" v-if="item.from==address">{{item.from}}</span>
                              <span class="line1"  v-if="item.from!=address">{{item.from}}</span>
                              </el-tooltip>
                            </div>
                        </td>
<!--                        <td>-->
<!--                           <span class="transType" :class="{'type-out':item.type==1,'type-in':item.type==2}">{{item.type==1?'out':'in'}}</span>-->
<!--                        </td>-->
                	  	 	<td>
                           <div class="d-hash">
                             <el-tooltip class="item" effect="dark" :content="item.to" popper-class="atooltip" placement="top">
                               <span class="line1"  v-if="item.to==address">{{item.to}}</span>
                              <span class="line1 text-pri-default"  v-if="item.to!=address">{{item.to}}</span>
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


        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
          <div class="modal-dialog code-modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                  &times;
                </button>
                <div class="code-address">{{address}}</div>
              </div>
              <div class="modal-body">
                 <div class="code qrcodeimg">
                  <div id="qrcode" ref="qrcode"></div>
                 </div>
              </div>

            </div>
          </div>
        </div>



    </div>

</template>
<script>
   let _this = this;
   import QRCode from "qrcode2";
   import comheader from "@/components/header";
   import comfooter from "@/components/footer";
   import {getTransactionListByAddress,getNonceAndBalance} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:3,
         sortType:0,//1升序，2降序
         blockList:[
         ],
         defaultBlockList:[],
         totalElements:10, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页

         address:'',//传过来的地址赋值
         copySecs:0,
          amount:'',
          nonce:''
        }
     },
     components: {
        comfooter,comheader
     },
      beforeCreate () {
	    _this = this
    },
     filters:{
        timefilters(val) {
            if (val == null || val == "") {
                 return _this.$i18n.t('No_time');
            } else {
                // let d = new Date(val);   //val 为表格内取到的后台时间
                //
                // let month =d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
                // let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
                // let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
                // let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
                // let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
                // let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
                //
                // return times;
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
       that.defaultBlockList = JSON.parse(JSON.stringify(that.blockList))
        that.$nextTick(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
       let hash = this.$route.query.hash;
       if(hash != undefined){
         that.address = hash;
         that.getTransactionListByAddress();
       }else {
         let address = this.$route.params.address;
         if(address != undefined){
           that.address = address;
         }else{
           that.address = sessionStorage.getItem('address');
         }
         sessionStorage.setItem('address',that.address);
         that.getTransactionListByAddress();
       }
       that.getNonceAndBalance();
     },
     methods:{
      //跳转到事务详情
      linDetail(hash){
         let that = this;
         that.$router.push({name:'transactionsDetail',params: {
             hash:hash
           }})
      },

      onCopy(e) {
        let that = this;
        this.copySecs=0

        this.timer = setInterval(function(){
            that.copySecs++;

            if(that.copySecs==5){

              that.copySecs =0
               clearInterval(that.timer);
            }
        }, 200);
      },
      onError(e) {
        //alert('复制失败')
      },
       getTransactionListByAddress(){
         let that = this;
         let obj = {}
         obj.address = that.address;
         obj.per_page = 10;
         obj.page = 0;
         getTransactionListByAddress(obj).then(res=> {
           if(res.code==200){
             that.totalElements = res.data.totalElements;
             that.blockList = res.data.content;
             that.defaultBlockList = JSON.parse(JSON.stringify(that.blockList))
           }else{
             that.$toast(res.message,3000)
           }
         })
       },

       getNonceAndBalance(){
         let that = this;
         getNonceAndBalance(that.address).then(res=> {
           if(res.code==200){
             that.amount = res.data.balance
             that.nonce = res.data.nonce
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
       //
       // getTransactionByTo(){
       //   let that = this;
       //   let obj = {}
       //   obj.to = that.address;
       //   obj.per_page = 10;
       //   obj.page = 0;
       //   getTransactionByTo(obj).then(res=> {
       //     if(res.code==200){
       //       that.totalElements = res.data.totalElements;
       //       that.blockList = res.data.content;
       //       that.defaultBlockList = JSON.parse(JSON.stringify(that.blockList))
       //     }else{
       //       that.$toast(res.message,3000)
       //     }
       //   })
       // },

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
          let that = this;
          that.pageSize = val;
          let obj = {};
          obj.address = that.address;
          obj.per_page = val;
          obj.page = that.currentPage;
          getTransactionListByAddress(obj).then(res=> {
            if(res.code==200){
              that.totalElements = res.data.totalElements;
              that.blockList = res.data.content;
              that.defaultBlockList = JSON.parse(JSON.stringify(that.blockList))
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
          obj.address = that.address;
          obj.per_page = that.pageSize;
          obj.page = val-1;
          getTransactionListByAddress(obj).then(res=> {
            if(res.code==200){
              that.totalElements = res.data.totalElements;
              that.blockList = res.data.content;
              that.defaultBlockList = JSON.parse(JSON.stringify(that.blockList))
            }else{
              that.$toast(res.message,3000)
            }
          })
        },
        //字符串转为二维码
        qrcodeScan() {
          //生成二维码
          let that = this;

          if (document.getElementById("qrcode") != null) {
            document.getElementById("qrcode").innerHTML = "";
          }
          //console.log(document.getElementById("qrcode").innerHTML)
          this.$nextTick(() => {
            let qrcode = new QRCode("qrcode", {
              width: 235, // 二维码宽度
              height: 235, // 二维码高度
              text: that.address,
              correctLevel: 3,
            });
          });
        },
     },
    beforeDestroy(){
      if($(".tooltip ")){
         $(".tooltip ").remove();
      }
      if(this.timer){
        clearInterval(this.timer);
      }

     }

   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>
