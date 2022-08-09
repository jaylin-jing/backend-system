import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'assets/less/index.less'
import axios from 'axios'
// import '../src/api/mock.js'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
Vue.prototype.$axios = axios
// Vue.prototype.$confirm = ElementUI.MessageBox.confirm
// Vue.prototype.$message = ElementUI.Message
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  store.commit('getToken')
  const token = store.state.user.token
  if (!token && to.name !== 'login') {
      next({name: 'login'})
  } else if (token && to.name === 'login') {
      next({name: 'Main'})
  } else {
      next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App),
  created(){
    store.commit("addMenu", router);
  }
}).$mount('#app')
