<template>
  <div class="wraper">
    <div class="h-header">
      <div class="container clearfix">
        <div class="w-lg-auto">
          <a
            class="navbar-brand pt-md-0"
            href="/"
            target="_parent"
            aria-label="Etherscan"
          >
            <img
              id="logo-header"
              width="160"
              src="../assets/img/logo-ether.png"
              alt="TDS Logo"
            />
          </a>
        </div>
        <div class="navlist">
          <ul>
            <li><a>Home</a></li>
            <li><a>Block</a></li>
            <li><a>Transaction</a></li>
            <li><a>Contract</a></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="h-bg-dark">
      <div class="container">
        <h1 class="h4 text-white mb-3">The Ethereum Blockchain Explorer</h1>

        <div class="input-group input-group-shadow">
          <div class="input-group-prepend d-none d-md-block">
            <!-- Select -->
            <select
              name="f"
              class="custom-select custom-arrow-select input-group-text font-size-base filterby"
            >
              <option selected="" value="0">All Filters</option>
              <option value="1">Addresses</option>
              <option value="2">Txn Hash</option>
              <option value="3">Block</option>
            </select>
            <!-- End Select -->
          </div>

          <input
            id="txtSearchInput"
            type="text"
            class="form-control searchautocomplete ui-autocomplete-input list-unstyled py-3 mb-0"
            autocomplete="off"
            spellcheck="false"
            placeholder="Search by Address / Txn Hash / Block"
            aria-describedby="button-header-search"
            name="q"
            maxlength="68"
          />

          <div class="input-group-append">
            <button class="btn btn-primary">
              <i class="fa fa-search"></i>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="page-content home-page-content">
      <div class="container" style="margin-top: 1.25rem">
        <div class="row">
          <div class="col-lg-6 mb-4 mb-lg-0">
            <div class="card">
              <div class="card-header">
                <h2 class="card-header-title">Latest Blocks</h2>
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
                              <a>{{ item.height }}</a>
                            </p>
                            <p class="b-time text-secondary text-nowrap">
                              {{ item.time }}
                            </p>
                          </div>
                        </div>
                        <!--手机端显示的样式-->
                        <div class="media-body">
                          <span class="d-inline-block d-sm-none">Block</span>
                          <a class="b-color-active">{{ item.height }}</a>
                          <span class="b-time text-secondary text-nowrap">{{
                            item.time
                          }}</span>
                        </div>
                      </div>
                      <div class="col-sm-8 w-media">
                        <div class="blockInfo blockInfo-1">
                          <div class="b-address">
                            <span class="color-default b-miner">Miner</span>
                            <span
                              class="b-color-active b-height p-hash line1"
                              >{{ item.hash }}</span
                            >
                          </div>
                          <div class="b-txns">
                            <!--事务数为0的时候显示下面的span-->
                            <a
                              class="b-color-active txns color-default"
                              data-toggle="tooltip"
                              data-placement="top"
                              title="Transactions in this Block"
                              >{{ item.anum }} txns</a
                            >
                            <!--<span class="color-default no-txn">0 txn</span>-->
                            <span class="b-time text-secondary text-nowrap">{{
                              item.atime
                            }}</span>
                          </div>
                        </div>
                        <div class="fr b-num text-secondary">
                          <span
                            class="s-amount"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Block Reward"
                          >
                            {{ item.amount }}WDC
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr class="hr-space" v-if="index != blockList.length - 1" />
                  </div>
                </el-scrollbar>
              </div>
              <div class="card-footer">
                <a class="btn btn-xs btn-block btn-soft-primary"
                  >View all blocks</a
                >
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="card">
              <div class="card-header">
                <h2 class="card-header-title">Latest Transactions</h2>
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
                              <a>{{ item.hash }}</a>
                            </p>
                            <p class="b-time text-secondary text-nowrap">
                              {{ item.time }}
                            </p>
                          </div>
                        </div>
                        <!--手机端显示的样式-->
                        <div class="media-body">
                          <span class="d-inline-block d-sm-none">Tx#</span>
                          <a class="b-color-active t-hash line1">{{
                            item.hash
                          }}</a>
                          <span class="b-time text-secondary text-nowrap">{{
                            item.time
                          }}</span>
                        </div>
                      </div>
                      <div class="col-sm-8 w-media">
                        <div class="blockInfo blockInfo-1">
                          <div class="b-address">
                            <span class="color-default b-miner">From</span>
                            <span
                              class="b-color-active b-height p-hash line1"
                              >{{ item.From }}</span
                            >
                          </div>
                          <div class="b-txns">
                            <span class="color-default b-miner">To</span>
                            <span
                              class="b-color-active b-height p-hash p-hash2 line1"
                              >{{ item.To }}</span
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
                            {{ item.amount }}WDC
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr class="hr-space" v-if="index != blockList.length - 1" />
                  </div>
                </el-scrollbar>
              </div>
              <div class="card-footer">
                <a class="btn btn-xs btn-block btn-soft-primary"
                  >View all blocks</a
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
import comfooter from "@/components/footer";

export default {
  data() {
    return {
      blockList: [
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "0",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "0",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
        {
          height: "1365789",
          hash: "ffllelfjeokdksllkflflskldk",
          time: "2 mins ago",
          anum: "168",
          atime: "in 4 secs",
          amount: 20,
        },
      ],
      transitionList: [
        {
          hash:
            "0x42de1d9da24bd878fa80cd9b2233966ed31568eb24ae1946f04ff5945e4454ee",
          From: "0x35bf994c0cc6d786079a513707b88db0825184cd",
          To: "0x644d1d0a766cb32cc9b2d29906727ca17462fe41",
          amount: 0,
          time: "27 secs ago",
        },
      ],
    };
  },
  components: {
    comfooter,
  },
  methods: {},
  mounted() {
    let that = this;
    that.$nextTick(() => {
      $('[data-toggle="tooltip"]').tooltip();
    });
  },
};
</script>

<style scoped="" lang="less">
@import url("../assets/index.less");
</style>