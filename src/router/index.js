import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

// 解决重复点击路由报错的BUG
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}



export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () =>import('@/views/home'),
      meta:{
      	title:'首页'
      }
    },
    {
      path: '/blocks',
      name: 'blocks',
      component: () =>import('@/views/blocks'),
      meta:{
      	title:'区块'
      }
    },
    {
      path: '/blocksDetail',
      name: 'blocksDetail',
      component: () =>import('@/views/blocksDetail'),
      meta:{
      	title:'事务详情'
      }
    },
    {
      path: '/transactions',
      name: 'transactions',
      component: () =>import('@/views/transactions'),
      meta:{
      	title:'事务'
      }
    },
    {
      path: '/addressTransactions/:from?/:to?/:type',
      name: 'addressTransactions',
      component: () =>import('@/views/addressTransactions'),
      meta:{
      	title:'事务'
      }
    },
    
    {
      path: '/transactionsDetail/:hash',
      name: 'transactionsDetail',
      component: () =>import('@/views/transactionsDetail'),
      meta:{
      	title:'事务详情'
      }
    },

    {
      path: '/contract',
      name: 'contract',
      component: () =>import('@/views/contract'),
      meta:{
      	title:'合约'
      }
    },
    {
      path: '/contractDetail',
      name: 'contractDetail',
      component: () =>import('@/views/contractDetail'),
      meta:{
      	title:'合约详情'
      }
    },
    {
      path: '/verifyContract',
      name: 'verifyContract',
      component: () =>import('@/views/verifyContract'),
      meta:{
      	title:'验证合约'
      }
    },
  ]
})
