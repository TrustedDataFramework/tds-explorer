<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">
            
            <div class="container">
                <div class="page-tilte pb-3 pt-3">交易明细</div>
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
                             title="将Txn哈希复制到剪贴板" 
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
                             {{transaction.created_at}}
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
                             <a>{{transaction.from}}</a>
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
                             <a>{{transaction.from}}</a>
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
                                <span class="mess-icon"></span><span>fee:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.fee}}
                           </div>
                       </div>
                   </div>
                  
                  <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>gas_limit:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                              {{transaction.gas_limit}}
                           </div>
                       </div>
                   </div>
                  <hr class="hr-space">
                   <div class="row">
                       <div class="col-md-3 detail-col">
                            <div class="lab">
                                <span class="mess-icon"></span><span>gas_price:</span>
                            </div>
                       </div>
                       <div class="col-md-9 detail-col">
                           <div class="key-value">
                             {{transaction.gas_price}}
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
         tabindex:3,
         transaction:{
           "hash": "3a50616c0d91d9d8954c315fa5f11bb796e972d3e90151dae209501ccf44e2cc",
            "version": 1634693120,
            "type": 0,
            "nonce": 33044,
            "from": "9cbf30db111483e4b84e77ca0e39378fd7605e1b",
            "amount": 20,
            "payload": "02b507fe1afd0cc7a525488292beadbe9f143784de44f8bc1c991636509fd50936",
            "to": "9cbf30db111483e4b84e77ca0e39378fd7605e1b",
            "signature": "",
            "fee": 0,
            "size": 78,
            "position": 0,
            "gas_limit": 0,
            "gas_price": 0,
            "created_at": "2020-11-16T05:35:39.000+0000"
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
     }
     
   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>