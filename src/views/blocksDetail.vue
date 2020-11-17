<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">
            
            <div class="container">
                <div class="page-tilte pb-3 pt-3">区块 <span class="text-secondary">＃11273202</span></div>
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
                             {{block.created_at}}
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
             iscopyed:0//是否复制成功  1成功
        }
       
     },
     components: {
        comfooter,comheader
     },
     filters:{
       
     },
     mounted(){
       let that = this;
        that.$nextTick(() => {
          $('[data-toggle="tooltip"]').tooltip();
        });
     },
     methods:{
        onCopy(e) {
         this.iscopyed=1
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