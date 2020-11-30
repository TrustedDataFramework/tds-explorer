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
                              <el-tooltip class="item" effect="dark" content="Also known as Block Number. The block height, which indicates the length of the blockchain, increases after the addition of the new block." popper-class="atooltip" placement="bottom">
                                  <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>height:</span>
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
                              <el-tooltip class="item" effect="dark" content="The hash of the block header of the current block." popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>hash:</span>

                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value ">
                             <span class="key-value-hash line1">{{block.hash}}</span>
                             <a class="btncopy" :class="{'btncopy-suc':iscopyed==1}"
                             v-clipboard:copy="block.hash"
                             v-clipboard:success="onCopy"
                             v-clipboard:error="onError"
                             title="区块哈希复制到剪贴板"
                             data-toggle="tooltip" data-placement="top">已复制</a>
                           </div>
                       </div>
                   </div>


                  <hr class="hr-space">

                  <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" content="The date and time at which a block is mined." popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>created_at:</span>
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
                              <el-tooltip class="item" effect="dark" content="The block size is actually determined by the block's gas limit." popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>size:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{block.size}} bytes
                           </div>
                       </div>
                   </div>


                    <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" content="Miner who successfully include the block onto the blockchain." popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>miner_address:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             <a @click="linkAddress(block.miner_address)">{{block.miner_address}}</a>
                           </div>
                       </div>
                   </div>

                   <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                              <el-tooltip class="item" effect="dark" content="Miner who successfully include the block onto the blockchain." popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>all_fee:</span>
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
                              <el-tooltip class="item" effect="dark" content="The root of the state trie" popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>state_root:</span>
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
                              <el-tooltip class="item" effect="dark" content="Miner who successfully include the block onto the blockchain." popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>transaction_root:</span>
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
                              <el-tooltip class="item" effect="dark" content="Miner who successfully include the block onto the blockchain." popper-class="atooltip" placement="bottom">
                                <span class="mess-icon"></span>
                              </el-tooltip>
                              <span>payload:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value key-value-line1 line1">
                             <span :title="block.payload" data-toggle="tooltip" data-placement="top">{{block.payload}}</span>
                           </div>
                       </div>
                   </div>
                  <hr class="hr-space">
                  <div class="row">
                    <div class="col-md-3 detail-col">
                      <div class="lab">
                        <el-tooltip class="item" effect="dark" content="Miner who successfully include the block onto the blockchain." popper-class="atooltip" placement="bottom">
                          <span class="mess-icon"></span>
                        </el-tooltip>
                        <span>version:</span>
                      </div>
                    </div>
                    <div class="col-md-9 detail-col">
                      <div class="key-value key-value-line1 line1">
                        <span :title="block.payload" data-toggle="tooltip" data-placement="top">{{block.version}}</span>
                      </div>
                    </div>
                  </div>
                  <hr class="hr-space">
                  <div class="row">
                    <div class="col-md-3 detail-col">
                      <div class="lab">
                        <el-tooltip class="item" effect="dark" content="The hash of the block from which this block was generated, also known as its parent block." popper-class="atooltip" placement="bottom">
                          <span class="mess-icon"></span>
                        </el-tooltip>
                        <span>hash_prev:</span>
                      </div>
                    </div>
                    <div class="col-md-9 detail-col">
                      <div class="key-value key-value-line1 line1">
                        <span :title="block.payload" data-toggle="tooltip" data-placement="top">{{block.hash_prev}}</span>
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
   import {getBlockByHeight,getBlockByHash} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:2,
         block:{},
          iscopyed:0,//是否复制成功  1成功
          blockHash:'',
          height:''
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
       if(this.$route.params.height == undefined || this.$route.params.height ==  "undefined"
         || this.$route.params.height == null || this.$route.params.height == "null"){
         if(this.$route.query.blockHash != undefined){
           that.getBlockByHash();
         }else {
           if(this.$route.query.height == undefined ){
             that.height = sessionStorage.getItem('height');
           }else {
             that.height = this.$route.query.height;
           }
           that.getBlockByHeight();
         }
       }else{
         if(this.$route.query.blockHash != undefined){
           that.getBlockByHash();
         }else {
           that.height = this.$route.params.height;
           that.getBlockByHeight();
         }
       }
       sessionStorage.setItem('height',that.height);
     },
     methods:{
        onCopy(e) {
         this.iscopyed=1
        },
        onError(e) {
          //alert('复制失败')
        },
       //区块详情
       linkAddress(address){
         let that = this;
         that.$router.push({name:'addressTransactions',params: {
             address: address
           }})
       },
       getBlockByHeight() {
         let that = this;
         let obj = {}
         obj.height = that.height;
         getBlockByHeight(obj).then(res=> {
           if(res.code==200){
             that.block = res.data;
           }else{
             that.$toast(res.message,3000)
           }
         })
       },
       getBlockByHash() {
         let that = this;
         let obj = {}
         obj.blockHash = this.$route.query.blockHash;
         getBlockByHash(obj).then(res=> {
           if(res.code==200){
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
