<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3">区块详情 <span class="text-secondary">{{block.height}}</span></div>
                <div  class=" tab-css tab-box detail-tab">


                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>height:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{block.height}}
                           </div>
                       </div>
                   </div>

                   <hr class="hr-space">

                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>hash:</span>

                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value ">
                             <span class="key-value-hash line1">{{block.hash}}</span>
                             <a class="btncopy" :class="{'btncopy-suc':iscopyed==1}"
                             v-clipboard:copy="block.hash"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                             title="区块hash复制到剪贴板"
                             data-toggle="tooltip" data-placement="top">已复制</a>
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
                             {{block.created_at | timefilters}}
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
                             {{block.size}}
                           </div>
                       </div>
                   </div>


                    <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>miner_address:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             <a>{{block.miner_address}}</a>
                           </div>
                       </div>
                   </div>

                   <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>all_fee:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{block.all_fee}}
                           </div>
                       </div>
                   </div>

                  <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>state_root:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value key-value-line1 line1">
                             <span :title="block.state_root" data-toggle="tooltip" data-placement="top">{{block.state_root}}</span>
                           </div>
                       </div>
                   </div>

                  <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>transaction_root:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value key-value-line1 line1">
                               <span :title="block.transaction_root" data-toggle="tooltip" data-placement="top">{{block.transaction_root}}</span>
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
                           <div class="key-value key-value-line1 line1">
                             <span :title="block.payload" data-toggle="tooltip" data-placement="top">{{block.payload}}</span>
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
   import {getBlockByHeight} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:2,
         block:{
              "height": 330255,
              "hash":'9a6cf33c394dd023e33daef0e52989d99796832e6f40cdbce5a914e033feefba',
              "created_at": "2020-11-16T05:35:39.000+0000",
              "size":28,
              "miner_address":"3a50616c0d91d9d8954c315fa5f11bb796e972d3e9015",
              "all_fee":258,
              "state_root":'64678f5b4c05e3468e4d9d42324050b6af29432cd76cf1c95f2acb522bbfbb00',
              "transaction_root":'38839f248cc80ab60a8ff157fd6e96bd7337a03f6daa197d4b4aec5091828116',
              "payload":"6c8a1872900fd23fd16d4debc2e6dada2ca244a790274e226a2033f67ff96fdd9985be5c1d3d910ef263b64bd0e25fe85d77c848b8aea6656353b6abef3c5c4a"
            },
          iscopyed:0,//是否复制成功  1成功
          height:''
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
       if(this.$route.params.height == undefined || this.$route.params.height ==  "undefined"
         || this.$route.params.height == null || this.$route.params.height == "null"){
         that.height = this.$route.query.height;
       }else{
         that.height = this.$route.params.height;
       }
        that.getBlockByHeight();
     },
     methods:{
        onCopy(e) {
         this.iscopyed=1
        },
        onError(e) {
          //alert('复制失败')
        },
       getBlockByHeight() {
         let that = this;
         let obj = {}
         obj.height = that.height;
         getBlockByHeight(obj).then(res=> {
           if(res.code==2000){
             that.block = res.data;
           }else{
             that.$toast(res.message,3000)
           }
         })
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
