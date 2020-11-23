// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import 'babel-polyfill'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueClipboard from 'vue-clipboard2'

import toastRegistry from './components/toast/index'
Vue.use(toastRegistry)
Vue.use(VueClipboard)
Vue.use(ElementUI);

import './assets/custom.less';

import router from './router'
Vue.config.productionTip = false



const contract = new tdsSDK.Contract()
const fs = require('fs')
// 编译合约得到字节码
contract.abi = tdsSDK.compileABI('')
console.log(contract.abi)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})


