// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import simpleCalendarVue from 'simple-calendar-vue'
console.log(simpleCalendarVue)
Vue.config.productionTip = false
Vue.use(simpleCalendarVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
