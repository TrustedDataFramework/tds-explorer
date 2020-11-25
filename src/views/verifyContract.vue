<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main contract-detail-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3 row">

                  <div class="verify-title">
                       <p class="pt">验证并发布合约源代码</p>
                       <p class="pmess">输入合约地址和合约源代码</p>
                  </div>

                </div>

                <div class="contract-tab-box tab-css">

                  <!--合约详情-->
                  <div  class="contract-params contract-params-form">

                     <div class="param-col param-col4">
                        <div class="param-title"><span>合约地址</span></div>
                        <div class="din din-address">
                            <input placeholder="请输入合约地址" v-model="address" @change="changeAddress"/>
                        </div>

                     </div>

                     <div class="param-col param-col1">
                         <div class="param-title">
                              <span>智能合约源代码</span>

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

                         </div>
                         <pre class="wordwrap js-copytextarea2" id="js-copytextarea2" :style="{'height':a_Screen==0?'200px':'400px','max-height': '400px','margin-top': '5px'}">{{ABI}}</pre>
                     </div>

                     <div class="param-col param-col3">
                         <div class="param-title">
                              <span>构造函数字节码</span>
                         </div>
                         <pre style="margin-top: 5px; height: 80px; max-height:200px" class="wordwrap"><font style="vertical-align: inherit;"></font>{{binary}}</pre>
                     </div>

                     <div class="btnbox">
                        <input type="button" class="btn btn-primary fun-btn" value="验证并发布" @click="verifyContract"/>
                        <input type="button" class="btn btn-reset fun-btn" value="重置" @click="reset"/>

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
   import {getABIByAddress,getPayloadByAddress,uploadContractCode} from '@/API/api';

import 'brace/ext/language_tools'

   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:4,


         transactionList:[
           {}
         ],
         contract_content:'',

         options: {
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true /*自动补全*/,
            readOnly: false,
            showPrintMargin: false
          },

         defaultBlockList:[],
         totalElements:20, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页

         transaction:{
            },
          iscopyed:0,//是否复制成功  1成功
          content_tab:2, //1表示事务列表  2表示合约详情

          a_Screen:0,//0表示abi全屏  1表示abi半屏
          c_Screen:0,//0表示智能合约全屏  1表示智能合约半屏

          address:'',
          ABIByContract:'',
          ABIByBack:'',
          ABI:'',
          binary:''

        }
     },
     components: {
        comfooter,comheader,editor
     },


     mounted(){
       let that = this;
        that.defaultBlockList = JSON.parse(JSON.stringify(that.transactionList))
        //that.getTransactionDetail();
     },
     methods:{
       changeAddress(){
         let that = this;
         let address = that.address
         that.getABIByAddress(address);
         that.getPayloadByAddress(address);
       },
       getABIByAddress(address){
         let that = this;
         let obj = {}
         obj.address = address;
         getABIByAddress(obj).then(res=> {
           if(res.code==200){
             res.data.abi = JSON.stringify(res.data.abi);
             that.ABI = res.data.abi;
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

       verifyContract(){
         let that = this;

         //获取后端ABI
         let obj = {}
         obj.address = that.address;
         getABIByAddress(obj).then(res=> {
           if(res.code==200){
             that.ABIByBack=res.data.abi;
             that.getSdk();
           }else{
             that.$toast(res.message,3000)
           }
         })


       },

       getSdk(){
         let that = this;
         let num = 0;
         //获取js.sdk ABI
         let code = that.contract_content;
         const contract = new tdsSDK.Contract();
         try {
           // 编译合约得到字节码
           contract.abi = tdsSDK.compileABI(code);
         }catch(err){
           that.$toast("请检查代码",3000)
           return;
         }
         that.ABIByContract = contract.abi;
         console.log(that.ABIByContract)
         console.log(that.ABIByBack)
         console.log(JSON.stringify(that.ABIByContract))
         console.log(JSON.stringify(that.ABIByBack))
         //校验两个ABI是否相同
         var jsonLength1 = 0;
         var jsonLength2 = 0;
         for (var item1 in that.ABIByBack) {
           jsonLength1++;
         }
         for (var item2 in that.ABIByContract) {
           jsonLength2++;
         }
         if(jsonLength1 != jsonLength2) {
           that.$toast("校验失败",3000);
           return;
         }else{
           for(let i = 0;i<that.ABIByBack.length;i++){
             let inputsLength1 = 0;
             let inputsLength2 = 0;
             let outputsLength1 = 0;
             let outputsLength2 = 0;
             let name1 = that.ABIByBack[i].name;
             let type1 = that.ABIByBack[i].type;
             let inputs1 = that.ABIByBack[i].inputs;
             let outputs1 = that.ABIByBack[i].outputs;
             for(var j = 0;j<that.ABIByContract.length;j++){
               let name2 = that.ABIByContract[j].name;
               let type2 = that.ABIByContract[j].type;
               let inputs2 = that.ABIByContract[j].inputs;
               let outputs2 = that.ABIByContract[j].outputs;
               if(type1 == type2 && name1 == name2){
                 for (let j = 0;j< inputs1.length;j++) {
                   inputsLength1++;
                 }
                 for (let j = 0;j< inputs2.length;j++) {
                   inputsLength2++;
                 }
                 for (let j = 0;j< outputs1.length;j++) {
                   outputsLength1++;
                 }
                 for (let j = 0;j< outputs2.length;j++) {
                   outputsLength2++;
                 }
                 if(inputsLength1 == inputsLength2) {
                    if(inputsLength1 > 0){
                      let typeNum = 0;
                      for(let k = 0;k<inputs1.length;k++){
                        if(inputs1[k].type == inputs2[k].type){
                          typeNum++;
                        }
                      }
                      if(typeNum == inputsLength1){
                          if(outputsLength1 == outputsLength2){
                            if(outputsLength1 > 0){
                              let outNum = 0;
                              for(let l = 0;l<outputs1.length;l++){
                                if(outputs1[l].type == outputs2[l].type){
                                  outNum++;
                                }
                              }
                              if(outNum == outputsLength1){
                                num++;
                                break;
                              }
                            }else{
                              num++;
                              break;
                            }
                          }
                      }
                    }else{
                      num++;
                      break;
                    }
                 }
               }
             }
           }
           if(num == jsonLength1){
             this.$confirm('验证成功，是否上传代码?', '确认', {
               confirmButtonText: '确定',
               cancelButtonText: '取消',
               type: 'warning'
             }).then(() => {
               let obj = {}
               obj.code = that.contract_content;
               obj.address = that.address
               uploadContractCode(JSON.stringify(obj)).then(res=> {
                 if(res.code==200){
                   this.$message({
                     type: 'success',
                     message: '上传成功'
                   });
                 }else{
                   that.$toast(res.message,3000)
                 }
               })
             }).catch(() => {
               this.$message({
                 type: 'info',
                 message: '已取消上传'
               });
             });
           }else{
             this.$confirm('校验失败,请检查代码或地址')
           }
         }
       },
       reset(){
         let that = this;
         that.contract_content = ''
         that.address = ''
         that.binary = ''
         that.ABI = ''
       },

        onCopy(e) {
         this.iscopyed=1
        },

        onError(e) {
          //alert('复制失败')
        },
    }


   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>
