<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3">事务详情</div>
                <div  class=" tab-css tab-box detail-tab">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>hash:</span>

                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.hash}}
                             <a class="btncopy" :class="{'btncopy-suc':iscopyed==1}"
                             v-clipboard:copy="transaction.hash"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                             title="将事务哈希复制到剪贴板"
                             data-toggle="tooltip" data-placement="top">已复制</a>
                           </div>
                       </div>
                   </div>

                   <hr class="hr-space">

                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>nonce:</span>
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
                                <span class="mess-icon"></span><span>created_at:</span>
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
                                <span class="mess-icon"></span><span>from:</span>
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
                                <span class="mess-icon"></span><span>amount:</span>
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
                                <span class="mess-icon"></span><span>to:</span>
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
                                <span class="mess-icon"></span><span>payload:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.payload}}
                           </div>
                       </div>
                   </div>

                  <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>type:</span>
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
                                <span class="mess-icon"></span><span>version:</span>
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
                        <span class="mess-icon"></span><span>signature:</span>
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
                        <span class="mess-icon"></span><span>size:</span>
                      </div>
                    </div>
                    <div class="col-md-9 detail-col">
                      <div class="key-value">
                        {{transaction.size}}
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
     filters:{
       timefilters(val) {
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
               res.data.type = '转账';
             }else if(res.data.type == 2){
               res.data.type = '合约部署';
             }else if(res.data.type == 3){
               res.data.type = '合约调用';
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
