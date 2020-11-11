// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import $ from 'jquery'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

import 'font-awesome/css/font-awesome.min.css' 

import "overlayscrollbars/css/OverlayScrollbars.css";
import OverlayScrollbars from "overlayscrollbars";
import { OverlayScrollbarsPlugin } from "overlayscrollbars-vue";



import 'babel-polyfill'

import router from './router'
Vue.config.productionTip = false

Vue.use(OverlayScrollbarsPlugin);
Vue.use(OverlayScrollbars);
Vue.use(router);






/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

OverlayScrollbars(document.body, {
    nativeScrollbarsOverlaid: {
        initialize: false
    }
});