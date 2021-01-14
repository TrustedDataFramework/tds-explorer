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
import i18n from './tools/i18n'
import enLocale from 'element-ui/lib/locale/lang/en'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import toastRegistry from './components/toast/index'
Vue.use(toastRegistry)
Vue.use(VueClipboard)
Vue.use(ElementUI,{
  i18n: (key, value) => i18n.t(key, value) // 在注册Element时设置i18n的处理方法
}) //为了实现element插件的多语言切换);


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
  i18n,
  router,
  components: { App },
  template: '<App/>'
})


