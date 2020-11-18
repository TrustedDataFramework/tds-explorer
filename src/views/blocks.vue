<template>
    <div class="wrapper">
        <comheader :tabindex="tabindex"></comheader>
        <div class="tds-block-main">

            <div class="container">
                <div class="page-tilte pb-3 pt-3">区块</div>
                <div  class=" tab-css tab-box">
                    <div class="com-table-box">
                	  <table class="com-table block-list-tab">
                	  	 <tr>

                	  	 	 <th class="tab-th">区块高度
                	  	 	 	  <span class="caret-wrapper" :class="{'ascending':sortType==1,'descending':sortType==2}">
                	  	 	 	  	<i class="sort-caret ascending" @click="sort(1)"></i>
                	  	 	 	  	<i class="sort-caret descending" @click="sort(2)"></i>
                	  	 	 	  </span>
                	  	 	 </th>
                	  	 	 <th>出块时间</th>
                	  	 	 <th class="b-tran-num">事务数量</th>
                	  	 	 <th>矿工地址</th>
                	  	 	 <th>总收益</th>
                	  	 </tr>
                	  	 <tr v-for="(item,index) in blockList" :key="index">
                	  	 	<td><div><span class="text-pri-default"><a @click="linbkDetail(item.height)">{{item.height}}</a></span></div></td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.created_at | timefilters}}</span></div></td>
                	  	 	<td><div class="d-hash"><a class="line1">{{item.transcationSize}}</a></div></td>
                	  	 	<td>
                                <div class="d-hash">
                                     <el-tooltip class="item" effect="dark" :content="item.miner_address" popper-class="atooltip" placement="top">


                                   <a class="line1"  >{{item.miner_address}}</a>
                                   </el-tooltip>
                                </div>
                             </td>
                	  	 	<td><div class=""><span class="text-pri-default">{{item.all_fee}}</span></div></td>
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
   import {getBlockList} from '@/API/api';
   export default{
     inject: ['reload'],
     data(){
        return {
         tabindex:2,
         sortType:0,//1升序，2降序
         blockList:[
           {height:'33049',size:'258',created_at:'2020-11-16T05:36:29.000+0000',miner_address:'0a4a47008077f8f5c8d18b673ff2243735b2fad48f1af32bffe662382f73c741',all_fee:'333'}
         ],
         totalElements:6000, //总条数
         pageSize:10,//默认每页条数
         currentPage:0,//当前页
         defaultBlockList:[]
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
        that.defaultBlockList = JSON.parse(JSON.stringify(that.blockList))

        that.getBlockList();
     },
     methods:{
        //区块详情
        linbkDetail(height){
        let that = this;
        that.$router.push({name:'blocksDetail',params: {
            height: height
          }})
        },


       getBlockList(){
         let that = this;
         let obj = {};
         obj.per_page = 10
         obj.page = 0
         getBlockList(obj).then(res=> {
           if(res.code==2000){
             let that = this;
             for(var i = 0;i<res.data.content.length;i++) {
               res.data.content[i].transcationSize = res.data.content[i].body.length;
             }
             that.totalElements = res.data.totalElements;
             that.blockList = res.data.content;
           }else{
             that.$toast(res.message,3000)
           }
         })
       },



        sort(num){


      	let sortType = 0
      	if(this.sortType==0){
      		if(num==1){
	      		this.blockList.sort(this.compare1('height'))
	      	}else{
	      		this.blockList.sort(this.compare('height'))
	      	}
	      	sortType = num;
      	}

      	if(this.sortType==1){
      		if(num==1){
      			sortType = 0
      			this.blockList = JSON.parse(JSON.stringify(this.defaultBlockList))

      		}else{
      			sortType = num;
      			this.blockList.sort(this.compare('height'))
      		}
      	}

      	if(this.sortType==2){
      		if(num==2){
      			sortType = 0
      			this.blockList = JSON.parse(JSON.stringify(this.defaultBlockList))
      		}else{
      			sortType = num;
      			this.blockList.sort(this.compare1('height'))
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

        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            let that = this;
            that.pageSize = val;
            let obj = {};
            obj.per_page = val;
            obj.page = that.currentPage;
            getBlockList(obj).then(res=> {
              if(res.code==2000){
                let that = this;
                for(var i = 0;i<res.data.content.length;i++) {
                  res.data.content[i].transcationSize = res.data.content[i].body.length;
                }
                that.totalElements = res.data.totalElements;
                that.blockList = res.data.content;
              }else{
                that.$toast(res.message,3000)
              }
            })
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
          let that = this;
          that.currentPage = val;
          let obj = {};
          obj.per_page = that.pageSize;
          obj.page = val;
          getBlockList(obj).then(res=> {
            if(res.code==2000){
              let that = this;
              for(var i = 0;i<res.data.content.length;i++) {
                res.data.content[i].transcationSize = res.data.content[i].body.length;
              }
              that.totalElements = res.data.totalElements;
              that.blockList = res.data.content;
            }else{
              that.$toast(res.message,3000)
            }
          })
        }
     },


   }
</script>

<style scoped lang='less'>
@import url("../assets/blocks.less");

</style>
