import Vue from 'vue'
import App from './App.vue'
import VueRouter, {RouteConfig} from 'vue-router'
import Homepage from './views/Homepage.vue'
import Login from './views/Login.vue'

Vue.use(VueRouter)

const myRouteArr: Array<RouteConfig> = [
  {name:"le Home Page", path: "/", component: Homepage},
  {name:"le Login Page", path: "/login", component: Login}
]

const myRouter = new VueRouter({routes: myRouteArr})
new Vue({
  router: myRouter,

  render: h => h(App),
}).$mount('#app')
