<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main contract-detail-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3 row">

                  <div class="col-md-12">
                      地址
                      <span class="title-address text-secondary">{{address}}</span>

                  </div>

                </div>

                <div class="contract-hash-detail">
                   <div class="row row-detail">
                      <div class="col-md-6 ">
                          <div class="tab-css">
                            <div class="row">
                              <div class="col-md-4"><div class="lab">余额：</div></div><div class="col-md-8">{{amount}}</div>
                            </div>
                            <hr class="hr-space"/>
                            <div class="row">
                              <div class="col-md-4"><div class="lab">区块高度：</div></div><div class="col-md-8">{{height}}</div>
                            </div>
                            <hr class="hr-space"/>
                           <div class="row">
                              <div class="col-md-4"><div class="lab">区块时间：</div></div><div class="col-md-8">{{created_at | timefilters}}</div>
                            </div>
                          </div>
                      </div>

                      <div class="col-md-6">
                          <div class="tab-css">
                            <div class="row">
                              <div class="col-md-3"><div class="lab">事务哈希：</div></div>
                              <div class="col-md-9"><div class="line1">{{tx_hash}}</div></div>
                            </div>
                            <hr class="hr-space"/>
                            <div class="row">
                              <div class="col-md-3"><div class="lab">from：</div></div>
                              <div class="col-md-9"><div class="line1">{{from}}</div></div>
                            </div>
                            <hr class="hr-space"/>
                           <div class="row">
                              <div class="col-md-3"><div class="lab">to：</div></div>
                              <div class="col-md-9"><div class="line1">{{to}}</div></div>
                            </div>
                          </div>
                      </div>

                   </div>
                </div>


                <div class="contract-tab-box tab-css">
                  <div class="tab-nav">
                     <div class="navbox">
                        <a :class="{'active':content_tab==1}" @click="content_tab=1">事务列表</a>
                        <a :class="{'active':content_tab==2}" @click="content_tab=2">合约详情
                          <!--合约验证显示-->
                          <span class="s-verified"></span>
                        </a>
                     </div>
                  </div>

                  <!--事务列表-->
                  <div v-if="content_tab==1">
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
                          <tr v-for="(item,index) in CallContractList" :key="index">
                            <td>
                                <div class="d-hash ">
                                  <el-tooltip class="item" effect="dark" :content="item.hash" popper-class="atooltip" placement="bottom">
                                    <a class="line1" @click="linDetail(item.hash)" >{{item.hash}}</a>
                                  </el-tooltip>
                                </div>
                            </td>
                            <td><div><span class="text-pri-default"><a>{{item.nonce}}</a></span></div></td>
                            <td><div class="no_wrap"><span class="text-pri-default">{{item.created_at | timefilters}}</span></div></td>
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
                  <!--合约详情-->
                  <div v-if="content_tab==2" class="contract-params">
                     <div class="param-col param-col1">
                         <div class="param-title">
                              <span>智能合约源代码</span>
                              <div class="functionBox">

                                <a class="fun-btn copy" >
                                  <el-tooltip class="item" effect="dark" content="复制合约源码到剪贴板" popper-class="top" placement="top">
                                    <em></em>
                                    </el-tooltip>
                                </a>


                                <a class="fun-btn qp" :class="{'bp':c_Screen==1}" @click.stop="contractScreen">
                                  <el-tooltip class="item" effect="dark" content="切换全屏" popper-class="top" placement="top">
                                    <em></em>
                                  </el-tooltip>
                                </a>

                              </div>
                         </div>

                          <editor
                            v-model="contract_content"
                            @init="editorInit"
                            :options="options"
                            autoComplete=true
                            width="100%"
                            :height="c_Screen==0?'300':'600'"
                            :lang="'java'"
                          >
                          </editor>
                     </div>

                     <div class="param-col param-col2">
                         <div class="param-title">
                              <span>合约ABI</span>
                              <div class="functionBox">

                                <a class="fun-btn copy">
                                    <el-tooltip class="item" effect="dark" content="复制合约ABI" popper-class="top" placement="top">
                                      <em></em>
                                    </el-tooltip>
                                </a>


                                <a class="fun-btn qp" :class="{'bp':a_Screen==1}" @click.stop="abiScreen">
                                    <el-tooltip class="item" effect="dark" content="切换全屏" popper-class="top" placement="top">
                                      <em></em>
                                    </el-tooltip>
                                </a>

                              </div>
                         </div>
                         <pre class="wordwrap js-copytextarea2" id="js-copytextarea2" :style="{'height':a_Screen==0?'200px':'400px','max-height': '400px','margin-top': '5px'}">{{abi}}</pre>
                     </div>

                     <div class="param-col param-col3">
                         <div class="param-title">
                              <span>payload</span>
                         </div>
                         <pre style="margin-top: 5px; height: 80px; max-height:200px" class="wordwrap"><font style="vertical-align: inherit;">{{binary}}</font></pre>
                     </div>

                  </div>


                </div>


            </div>
        </div>



        <comfooter></comfooter>


    </div>

</template>

<script>
   import comheader from "@/components/header";
   import comfooter from "@/components/footer";
   import editor from 'vue2-ace-editor'
   const tdsSDK = require("@salaku/js-sdk");
    import 'brace/ext/language_tools'
   import {getContractByHash,getCallContractList,getABIByAddress,getPayloadByAddress,getCodeByAddress} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:4,

         sortType:0,//1升序，2降序
          CallContractList:[
         ],
         contract_content:'',

         options: {
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true /*自动补全*/,
            readOnly: true,
            showPrintMargin: false
          },

         defaultBlockList:[],
         totalElements:10, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页

         transaction:{
            },
          iscopyed:0,//是否复制成功  1成功
          content_tab:1, //1表示事务列表  2表示合约详情

          a_Screen:0,//0表示abi全屏  1表示abi半屏
          c_Screen:0,//0表示智能合约全屏  1表示智能合约半屏

          amount:'',
          tx_hash:'',
          height:'',
          from:'',
          to:'',
          created_at:'',
          address:'',

          abi:'',
          binary:''

        }
     },
     components: {
        comfooter,comheader,editor
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
        that.defaultBlockList = JSON.parse(JSON.stringify(that.CallContractList))
        that.getContractByHash();
        //that.getCallContractList();
        //that.getABIByAddress();
        //that.getBinaryByAddress();
     },
     methods:{
       //智能合约源代码
       contractScreen(){
        if(this.c_Screen==0){
            this.c_Screen = 1
          }else{
            this.c_Screen = 0
          }
       },
     	 //abi全屏
     	 abiScreen(){
     	 	if(this.a_Screen==0){
     	 		this.a_Screen = 1
     	 	}else{
     	 		this.a_Screen = 0
     	 	}
     	 },
       editorInit: function() {
          //require("brace/ext/language_tools"); //language extension prerequsite...
            require("brace");
          require("brace/mode/html");
          require("brace/mode/javascript"); //language
          require("brace/mode/less");
          require("brace/mode/java");
          require('brace/theme/chrome')

          require("brace/mode/json");
          require('brace/snippets/javascript')
          require('brace/snippets/java')
          let _this = this;
        //_this.$refs.aaa.editor.setShowFoldWidgets(true);折叠属性



        },
       //跳转到事务详情
      linDetail(hash){
         let that = this;
         that.$router.push({name:'transactionsDetail',params: {
             hash: hash
           }})
      },
      //跳转到地址事务
      linkAddressTransaction(){
         let that = this;
         that.$router.push({name:'addressTransactions'})
      },

        onCopy(e) {
         this.iscopyed=1
        },
       getContractByHash(){
         let hash = this.$route.params.hash;
         let obj = {};
         obj.hash = hash;
         getContractByHash(obj).then(res=> {
           if(res.code==200){
             let that = this;
             that.$root.address = res.data.address;
             that.amount = res.data.amount;
             that.address = res.data.address;
             that.height = res.data.height;
             that.from = res.data.from;
             that.to = res.data.to;
             that.tx_hash = res.data.tx_hash;
             that.created_at = res.data.created_at;
             that.getCallContractList(that.address);
             that.getABIByAddress(that.address);
             that.getPayloadByAddress(that.address);
             that.getCodeByAddress(that.address);
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
       getCallContractList(address){
         let that = this;
         let obj = {}
         obj.address = address;
         obj.per_page = that.pageSize;
         obj.page = that.currentPage;
         getCallContractList(obj).then(res=> {
           if(res.code==200){
             let that = this;
             that.totalElements = res.data.totalElements;
             that.CallContractList = res.data.content;
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
       getABIByAddress(address){
         let that = this;
         let obj = {}
         obj.address = address;
         getABIByAddress(obj).then(res=> {
           if(res.code==200){
             res.data.abi = JSON.stringify(res.data.abi);
             that.abi = res.data.abi;
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
       getPayloadByAddress(address){
         let that = this;
         let obj = {}
         obj.address = address;
         getPayloadByAddress(obj).then(res=> {
           if(res.code==200){
             that.binary = res.data;
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
       getCodeByAddress(address){
         let that = this;
         let obj = {}
         obj.address = address;
         getCodeByAddress(obj).then(res=> {
           if(res.code==200){
             that.contract_content = res.data;
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
        onError(e) {
          //alert('复制失败')
        },

        //区块排序

      sort(num){


      	let sortType = 0
      	if(this.sortType==0){
      		if(num==1){
	      		this.CallContractList.sort(this.compare1('nonce'))
	      	}else{
	      		this.CallContractList.sort(this.compare('nonce'))
	      	}
	      	sortType = num;
      	}

      	if(this.sortType==1){
      		if(num==1){
      			sortType = 0
      			this.CallContractList = JSON.parse(JSON.stringify(this.defaultBlockList))

      		}else{
      			sortType = num;
      			this.CallContractList.sort(this.compare('nonce'))
      		}
      	}

      	if(this.sortType==2){
      		if(num==2){
      			sortType = 0
      			this.CallContractList = JSON.parse(JSON.stringify(this.defaultBlockList))
      		}else{
      			sortType = num;
      			this.CallContractList.sort(this.compare1('nonce'))
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
      //每页条数
      handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
      },
      //当前页点击
       handleCurrentChange(val) {

       }



    }


   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>
