<template>
  <div class="wraper">
    <comheader :tabindex="tabindex"></comheader>
    <div class="h-bg-dark">
      <div class="container">

        <div class="home-banner">
          <h1 class="h4 text-white mb-3">{{$t("index.TDOS_Browser")}}</h1>

          <div class="input-group input-group-shadow">
            <div class="input-group-prepend d-none d-md-block">
              <!-- Select -->
              <select
                name="f" id="select"
                class="custom-select custom-arrow-select input-group-text font-size-base filterby"
              >
<!--                <option selected="" value="0">All Filters</option>-->
<!--                <option selected="" value="1">Addresses</option>-->
                <option selected="" value="0">{{$t("index.Transaction_hash")}}</option>
                <option value="1">{{$t("index.Block_hash")}}</option>
                <option value="2">{{$t("index.address")}}</option>
              </select>
              <!-- End Select -->
            </div>

            <input
              id="txtSearchInput"
              type="text"
              class="form-control searchautocomplete ui-autocomplete-input list-unstyled py-3 mb-0"
              autocomplete="off"
              spellcheck="false"
               :placeholder="$t('index.search_placeholder')"
              aria-describedby="button-header-search"
              name="q"
              maxlength="68"
            />

            <div class="input-group-append">
              <button class="btn btn-primary" @click="link"> <i class="fa fa-search"></i> </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content home-page-content">
      <!--参数-->
      <div class="container  t-h-param">
        <div class="row tab-css">
          <div class="col-lg-6">
            <div class="tran-box box-flex flex-between">
                <div class="tran-left box-flex flex-middle">
                  <div class="icon"><img src="../assets/img/icon-2-1.svg"/></div>
                  <div class="tran-params">
                     <h2 class="font-size-1 text-secondary">{{$t('index.Blocks_per_day')}}</h2>
                     <div>
<!--                        <el-tooltip class="item" effect="dark" popper-class="atooltip" placement="left">-->
                       <span class="text-size-1 text-link">{{blocksPerDay}}</span>
<!--                        </el-tooltip>-->
<!--                       <span class="small text-secondary" title="Transactions per Second" data-toggle="tooltip" data-placement="bottom"></span>-->
                     </div>
                  </div >
                </div>

              <div class="tran-right box-flex">
                <div>
                  <h2 class="font-size-1 text-secondary">{{$t('index.Network_ID')}}</h2>
                  <div>
                          <span class="text-size-1 text-link" >
                            {{p2pAddress}}
                            </span>
                    <span class="small text-secondary"></span>
                  </div>
                </div>
              </div>

              <div class="tran-right box-flex">
                <div>
                  <h2 class="font-size-1 text-secondary">{{$t('index.Total_transactions')}}</h2>
                  <div>
                          <span class="text-size-1 text-link" >
                            {{totalTransaction}}
                            </span>
                    <span class="small text-secondary"></span>
                  </div>
                </div>
              </div>

                <div class="tran-right box-flex">
                    <div>
                        <h2 class="font-size-1 text-secondary">{{$t('index.Average_block_time')}}</h2>
                        <div>
                          <span class="text-size-1 text-link" >
                            {{averageBlockInterval}}s
                            </span>
                          <span class="small text-secondary"></span>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <hr class="line">
          <div class="col-lg-6">
            <div class="tran-box box-flex flex-between">
                <div class="tran-left box-flex flex-middle">
                  <div class="icon"><img src="../assets/img/icon-51.svg"/></div>
                  <div class="tran-params">
                     <h2 class="font-size-1 text-secondary">{{$t('index.Current_difficulty_value')}}</h2>
                     <div style="max-width:210px">
<!--                       <el-tooltip class="item" effect="dark"  popper-class="atooltip" placement="left">-->
                       <span class="text-size-1 text-link" >
                         {{currentDifficulty}} 
                         </span>
<!--                       </el-tooltip>-->
                        <el-tooltip class="item" effect="dark" content="Transactions per Second" popper-class="atooltip" placement="bottom">
                          <span class="small text-secondary" ></span>
                        </el-tooltip>
                     </div>
                  </div >
                </div>

              <div class="tran-right box-flex">
                <div>
                  <h2 class="font-size-1 text-secondary">{{$t('index.Transaction_pool_size')}}</h2>
                  <div>
<!--                    <el-tooltip class="item" effect="dark" content="Average Hash Rate (The last 12 hours)" popper-class="atooltip" placement="bottom">-->
                          <span class="text-size-1 text-link" >
                          {{transactionSize}}
                            </span>
<!--                    </el-tooltip>-->
                  </div>
                </div>
              </div>

                <div class="tran-right box-flex">
                    <div>
                        <h2 class="font-size-1 text-secondary">{{$t('index.Consensus_mechanism')}}</h2>
                        <div>
<!--                          <el-tooltip class="item" effect="dark" content="Average Hash Rate (The last 12 hours)" popper-class="atooltip" placement="bottom">-->
                          <span class="text-size-1 text-link" >
                          {{consensus}}
                            </span>
<!--                          </el-tooltip>-->
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>

      <div class="container" style="margin-top: 1.25rem">
        <div class="row">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="card">
              <div class="card-header">
                <h2 class="card-header-title"><!--Latest Blocks-->{{$t('index.Latest_block')}}</h2>
              </div>
              <div class="list-box block-list">
                <el-scrollbar class="block-tab">
                  <!-- 内层盒子——内容区 -->

                  <div
                    class="row-col"
                    v-for="(item, index) in blockList"
                    :key="index"
                  >
                    <div class="row block-row">
                      <div class="col-sm-4 w-media">
                        <div class="pc-media">
                          <div class="btn-icon btn-soft-secondary">Bk</div>
                          <div class="blockInfo">
                            <p class="b-color-active">
                              <a @click="linkHeight(item.height)">{{ item.height}}</a>
                            </p>
                            <p class="b-time text-secondary text-nowrap">
                              {{ item.time }}
                            </p>
                          </div>
                        </div>
                        <!--手机端显示的样式-->
                        <div class="media-body">
                          <span class="d-inline-block d-sm-none">Block</span>
                          <a class="b-color-active" @click="linkHeight(item.height)">{{ item.height }}</a>
                          <span class="b-time text-secondary text-nowrap">{{ item.time }}</span>
                        </div>
                      </div>
                      <div class="col-sm-8 w-media">
                        <div class="blockInfo blockInfo-1">
                          <div class="b-address">
                            <span class="color-default b-miner" ><!--Miner--></span >
                            <a class="b-color-active p-hash line1" @click="linkBlockHash(item.hash)">{{ item.hash }}</a >
                          </div>
                          <div class="b-txns">
                            <!--事务数为0的时候显示下面的span-->
                            <a
                              class="b-color-active txns color-default"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Transactions in this Block"
                              @click="linkSize(item.height)"
                              >{{ item.transcationSize }} txns</a
                            >
                            <!--<span class="color-default no-txn">0 txn</span>-->
                            <span class="b-time text-secondary text-nowrap">{{ item.created_at | timefilters}}</span>
                          </div>
                        </div>
                        <div class="fr b-num text-secondary">
                          <span
                            class="s-amount"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Block Reward"
                          >
                            size:{{ item.size }} bytes
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr class="hr-space" v-if="index != blockList.length - 1" />
                  </div>
                </el-scrollbar>
              </div>
              <div class="card-footer">
                <a class="btn btn-xs btn-block btn-soft-primary" @click="linkBlock"
                  ><!--View all blocks-->{{$t('index.View_all_blocks')}}</a
                >
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h2 class="card-header-title">
                  <!--Latest Transactions-->{{$t('index.Latest_transaction')}}
                </h2>
              </div>
              <div class="list-box block-list transactions-list">
                <el-scrollbar class="block-tab">
                  <!-- 内层盒子——内容区 -->

                  <div
                    class="row-col"
                    v-for="(item, index) in transitionList"
                    :key="index"
                  >
                    <div class="row block-row">
                      <div class="col-sm-4 w-media">
                        <div class="pc-media">
                          <div class="btn-icon btn-soft-secondary">Tx</div>
                          <div class="blockInfo">
                            <p class="b-color-active line1 t-hash">
                              <a  @click="linkTransHash(item.hash)">{{ item.hash }}</a>
                            </p>
                            <p class="b-time text-secondary text-nowrap">
                              {{ item.created_at | timefilters}}
                            </p>
                          </div>
                        </div>
                        <!--手机端显示的样式-->
                        <div class="media-body">
                          <span class="d-inline-block d-sm-none">Tx#</span>
                          <a class="b-color-active t-hash line1" @click="linkTransHash(item.hash)">{{
                            item.hash
                          }}</a>
                          <span class="b-time text-secondary text-nowrap">{{
                            item.created_at | timefilters
                          }}</span>
                        </div>
                      </div>
                      <div class="col-sm-8 w-media">
                        <div class="blockInfo blockInfo-1">
                          <div class="b-address">
                            <span class="color-default b-miner">From</span>
                            <a
                              class="b-color-active p-hash line1"
                              @click="linkAddress(item.from)">{{ item.from }}</a
                            >
                          </div>
                          <div class="b-txns">
                            <span class="color-default b-miner">To</span>
                            <a
                              class="b-color-active p-hash p-hash2 line1"
                              @click="linkAddress(item.to)">{{ item.to }}</a
                            >
                          </div>
                        </div>
                        <div class="fr b-num text-secondary">
                          <span
                            class="s-amount"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="amount"
                          >
                            {{ item.amount }}
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr class="hr-space" v-if="index != blockList.length - 1" />
                  </div>
                </el-scrollbar>
              </div>
              <div class="card-footer">
                <a class="btn btn-xs btn-block btn-soft-primary" @click="linkTransaction"
                  ><!--View all blocks-->{{$t('index.View_all_transactions')}}</a
                >
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
let  _this
import comfooter from "@/components/footer";
import comheader from "@/components/header";
import {getBlockList,getTransactionList,getRpcStat,getTransactionSize} from '@/API/api';
import axios from 'axios'
export default {
 
  data() {
    return {

      tabindex:1,

      blockList: [
      ],
      transitionList: [
      ],
      blocksPerDay:'',
      averageBlockInterval:'',
      currentDifficulty:'',
      consensus:'',
      totalTransaction:'',
      transactionSize:'',
      p2pAddress:''
    };
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

  mounted() {
    let that = this;
    that.getRpcStat();
    that.getBlockList();
    that.getTransactionList();
    that.getTransactionSize();
  },
  methods:{
    linkBlock(){
      let that = this;
      that.$router.push({path:'/blocks'})
    },
    linkTransaction(){
      let that = this;
      that.$router.push({path:'/transactions'})
    },
    linkHeight(height){
      let that = this;
      that.$router.push({name:'blocksDetail',params: {
          height: height
        }})
    },
    linkSize(height){
      let that = this;
      that.$router.push({name:'blocksTransaction',params: {
          height: height
        }})
    },
    linkBlockHash(blockHash){
      let that = this;
      that.$router.push({path:'/blocksDetail',query: {
          blockHash: blockHash
        }})
    },
    linkAddress(address){
      let that = this;
      that.$router.push({name:'addressTransactions',params: {
          address: address
        }})
    },
    linkTransHash(hash){
      let that = this;
      that.$router.push({path:'/transactionsDetail',query: {
          hash: hash
        }})
    },
    link(){
      let that = this;
      let text = $("#txtSearchInput").val();
      let sel=document.getElementById("select");
      let index = sel.selectedIndex; // 选中索引
      let val= sel.options[index].value;
      if(val == 0){
        that.$router.push({path:'/transactionsDetail',query: {
            hash: text
          }})
      }else if(val == 1){
        that.$router.push({path:'/blocksDetail',query: {
            blockHash: text
          }})
      }else if(val == 2){
        that.$router.push({path:'/addressTransactions',query: {
            hash: text
          }})
      }
    },
    getBlockList(){
      let that = this;
      let obj = {};
      obj.per_page = 10
      obj.page = 0
      getBlockList(obj).then(res=> {
        if(res.code==200){
          let that = this;
          that.blockList = res.data.content;
          for(var i of res.data.content){
            i.transcationSize = i.body.length;
          }
        }else{
          that.$toast(res.message,3000)
        }
      })
    },
    getTransactionList(){
      let that = this;
      let obj = {};
      obj.per_page = 10
      obj.page = 0
      getTransactionList(obj).then(res=> {
        if(res.code==200){
          let that = this;
          that.transitionList = res.data.content;
          that.totalTransaction = res.data.totalElements;
        }else{
          that.$toast(res.message,3000)
        }
      })
    },
    getRpcStat() {
      let that = this;
      getRpcStat().then(res=> {
        if (res.code == 200) {
          that.blocksPerDay = res.data.blocksPerDay;
          that.averageBlockInterval = res.data.averageBlockInterval;
          that.p2pAddress = res.data.p2pAddress.split(":")[0];
          if(res.data.currentDifficulty == ""){
            that.currentDifficulty = 0 ;
          }else{
            that.currentDifficulty = res.data.currentDifficulty;
          }
          that.consensus = res.data.consensus;
        } else {
          that.$toast(res.message, 3000)
        }
      })
    },
    getTransactionSize() {
      let that = this;
      getTransactionSize().then(res=> {
        if (res.code == 200) {
          that.transactionSize = res.data.total;
        } else {
          that.$toast(res.message, 3000)
        }
      })
    },
  }
};
</script>

<style scoped="" lang="less">
@import url("../assets/index.less");
</style>
