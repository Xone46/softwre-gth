import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    // Prevent blank screen in Electron builds
    this.$router.push('/');
  }
}).$mount('#app')