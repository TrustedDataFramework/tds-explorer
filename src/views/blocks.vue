<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">
            
            <div class="container">
                <div class="page-tilte pb-3 pt-3">区块</div>
                <div  class=" tab-css tab-box">
                    <el-table class="tds-table"
                        :data="blockList"
                        style="width: 100%">
                        <el-table-column prop="height" label="区块高度" align="center" sortable class="tab-height" >
                            <template slot-scope="scope">
                                <div><a >{{scope.row.height}}</a></div>      
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="created_at"
                        label="出块时间"
                        align="center"
                    
                        
                        >

                        <template slot-scope="scope">
                            <div><span>{{scope.row.created_at |　timefilters}}</span></div>
                        
                        </template>
                        </el-table-column>
                        <el-table-column
                        prop="size"
                        label="事务数量"
                    
                        align="center">
                        <template slot-scope="scope">
                                <div><a >{{scope.row.size}}</a></div>      
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="miner_address"
                        label="矿工地址"
                        align="center"
                        width='280px'
                        class="tab-address"
                        >
                            <template slot-scope="scope">
                                <div class="line1"><a >{{scope.row.miner_address}}</a></div>      
                            </template>
                        </el-table-column>
                        <el-table-column
                        prop="all_fee"
                        label="总收益"
                        align="center"
                        >
                        </el-table-column>
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
           {height:'33049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'333'},
           {height:'32049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'11'},
           {height:'31049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'22'},
           {height:'30049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'33'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'44'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'55'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'66'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'77'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'88'},
           {height:'33349',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'99'},
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