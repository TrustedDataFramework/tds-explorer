<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">
            
            <div class="container">
                <div class="page-tilte pb-3 pt-3">区块</div>
                <div  class=" tab-css tab-box">
                    <el-table class="tds-table tds-trans-table"  :cell-class-name="cellClass" :row-class-name="tableRowClassName"
                        :data="blockList"
                        style="width: 100%">
                        <el-table-column prop="height" label="事务hash"  >
                            <template slot-scope="scope">
                                <div><a class="line1">{{scope.row.hash}}</a></div>      
                            </template>
                        </el-table-column>
                        <el-table-column prop="nonce" label="区块高度"  class="tab-height" >
                            <template slot-scope="scope">
                                <div><a >{{scope.row.nonce}}</a></div>      
                            </template>
                        </el-table-column>
                        <el-table-column prop="created_at" label="出块时间"  >
                           <template slot-scope="scope">
                              <div><span>{{scope.row.created_at |　timefilters}}</span></div>                           
                           </template>
                        </el-table-column>
                        <el-table-column prop="from" label="from" >
                            <template slot-scope="scope">
                                <div><a class="line1">{{scope.row.from}}</a></div>      
                            </template>
                        </el-table-column>
                        <el-table-column prop="to" label="to" >
                            <template slot-scope="scope">
                                <div><a class="line1">{{scope.row.from}}</a></div>      
                            </template>
                        </el-table-column>
                   
                      
                        <el-table-column prop="amount" label="amount" ></el-table-column>
                        <el-table-column prop="fee" label="手续费"  ></el-table-column>
                    </el-table>
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
            </div>
        </div>
        


        <comfooter></comfooter>
        <template>
          <el-backtop target=".wrapper" :bottom=80></el-backtop>
       </template>

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
         blockList:[
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0},
           {hash:'179b8ddf22d2c7f3a86b6f33ffef0cc05b6958d03299f599ffb54b9e1c6f0157',nonce:'33049',created_at:'2020-11-16T05:36:29.000+0000',from:'0xb2de23a3d3ae9fc31af7267a046f1f2bb396dc5b',to:'0x35269977f0a9f687b3368a04ae61d735a91ffd5f',amount:'20',fee:0}
           
         ],
         totalElements:6000, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页
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
                let d = new Date(val);   //val 为表格内取到的后台时间
 
                let month =d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1;
                let day = d.getDate() < 10 ? "0" + d.getDate() : d.getDate();
                let hours = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
                let min = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
                let sec = d.getSeconds() < 10 ? "0" + d.getSeconds() : d.getSeconds();
                let times=d.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + min + ':' + sec;
                
                return times;
               
            }
        }
     },
     methods:{
      
      
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
        if(row.columnIndex==0){
          return 'ntab-hash';
        }

      },

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
     }
     
   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>