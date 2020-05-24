// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import simpleCalendar from './plugins/simpleCalendar/src/main.js'
import simpleCalendar from '@/dist'
console.log(simpleCalendar)
Vue.config.productionTip = false
Vue.use(simpleCalendar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
