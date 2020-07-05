// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import simpleCalendarVue from 'simple-calendar-vue'
Vue.config.productionTip = false
Vue.use(simpleCalendarVue)

import webData from 'webdata2excel'
// console.log(webData)
webData([
  {
    key: 'a',
    label: '测试'
  },
  {
    key: 'b',
    label: '测试1'
  },
  {
    key: 'c',
    label: '测试2'
  }
], [
  {
    a: '1',
    b: 0
  },
  {
    a: 2,
    b: 3,
    c: 222
  }
], '文件名')
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
