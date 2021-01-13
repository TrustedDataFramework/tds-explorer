<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3">{{$t('Transaction_details')}}</div>
                <div  class=" tab-css tab-box detail-tab">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_hash_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>hash:</span>

                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.hash}}
                             <a class="btncopy" :class="{'btncopy-suc':iscopyed==1}"
                             v-clipboard:copy="transaction.hash"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                              :title="$t('block.Block_clipboard')"
                             data-toggle="tooltip" data-placement="top">{{$t('replicated')}}</a>
                           </div>
                       </div>
                   </div>

                   <hr class="hr-space">

                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_nonce_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>nonce:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.nonce}}
                           </div>
                       </div>
                   </div>

                  <hr class="hr-space">

                  <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_create_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>created_at:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.created_at | timefilters}}
                           </div>
                       </div>
                   </div>

                   <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_from_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>from:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             <a @click="linkAddress(transaction.from)">{{transaction.from}}</a>
                           </div>
                       </div>
                   </div>

                    <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_amount_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>amount:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.amount}}
                           </div>
                       </div>
                   </div>

                    <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_to_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>to:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             <a @click="linkAddress(transaction.to)">{{transaction.to}}</a>
                           </div>
                       </div>
                   </div>

                  <hr class="hr-space">
                  <div class="row">
                    <div class="col-md-3 detail-col">
                      <div class="lab">
                        <el-tooltip class="item" effect="dark" :content="$t('gas_price_mess')" popper-class="atooltip" placement="bottom">
                          <span class="mess-icon"></span>
                        </el-tooltip>
                        <span>gas_price:</span>
                      </div>
                    </div>
                    <div class="col-md-9 detail-col">
                      <div class="key-value">
                        {{transaction.gas_price}}
                      </div>
                    </div>
                  </div>

                  <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_type_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>type:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                              {{transaction.type}}
                           </div>
                       </div>
                   </div>
                  <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" :content="$t('trans_version_mess')" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>version:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.version}}
                           </div>
                       </div>
                   </div>
                  <hr class="hr-space">
                  <div class="row">
                    <div class="col-md-3 detail-col">
                      <div class="lab">
                        <el-tooltip class="item" effect="dark" :content="$t('trans_signature_mess')" popper-class="atooltip" placement="bottom">
                          <span class="mess-icon"></span>
                        </el-tooltip>
                        <span>signature:</span>
                      </div>
                    </div>
                    <div class="col-md-9 detail-col">
                      <div class="key-value">
                        {{transaction.signature}}
                      </div>
                    </div>
                  </div>
                  <hr class="hr-space">
                  <div class="row">
                    <div class="col-md-3 detail-col">
                      <div class="lab">
                        <el-tooltip class="item" effect="dark" :content="$t('trans_size_mess')" popper-class="atooltip" placement="bottom">
                          <span class="mess-icon"></span>
                        </el-tooltip>
                        <span>size:</span>
                      </div>
                    </div>
                    <div class="col-md-9 detail-col">
                      <div class="key-value">
                        {{transaction.size}} bytes
                      </div>
                    </div>
                  </div>

                  <hr class="hr-space">
                  <div class="row">
                    <div class="col-md-3 detail-col">
                      <div class="lab">
                        <el-tooltip class="item" effect="dark" :content="$t('trans_payload_mess')" popper-class="atooltip" placement="bottom">
                          <span class="mess-icon"></span>
                        </el-tooltip>
                        <span>payload:</span>
                      </div>
                    </div>
                    <div class="col-md-9 detail-col"  >
                      <div class="key-value">
                        {{transaction.payload}}
                      </div>
                    </div>
                  </div>

                </div>
            </div>
        </div>



        <comfooter></comfooter>


    </div>

</template>
<script>
let _this =this;
   import comheader from "@/components/header";
   import comfooter from "@/components/footer";
   import {getTransactionByTxHash} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:3,
         transaction:{
            },
          iscopyed:0,//是否复制成功  1成功
          hash:''
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
        that.$nextTick(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
       if(that.$route.params.hash == undefined || that.$route.params.hash ==  "undefined"
       || that.$route.params.hash == null || that.$route.params.hash == "null"){
         that.hash = that.$route.query.hash
       }else{
         that.hash = that.$route.params.hash;
       }
        that.getTransactionDetail();
     },
     methods:{
        onCopy(e) {
         this.iscopyed=1
        },
       //区块详情
       linkAddress(address){
         let that = this;
         that.$router.push({name:'addressTransactions',params: {
             address: address
           }})
       },
       getTransactionDetail(){
         let that = this;
         let obj = {};
         obj.hash = that.hash;
         getTransactionByTxHash(obj).then(res=> {
           if(res.code==200){
             let that = this;
             if(res.data.type == 0){
               res.data.type = 'coin base';
             }else if(res.data.type == 1){
               res.data.type = 'transfer';
             }else if(res.data.type == 2){
               res.data.type = 'deploy contract';
             }else if(res.data.type == 3){
               res.data.type = 'call contract';
             }
             that.transaction = res.data;
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
        onError(e) {
          //alert('复制失败')
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
