import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'

// import HelloWorld from ''
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
      // component: import('@/views/HelloWorld')
    }
  ]
})
