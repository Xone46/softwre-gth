import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faList, faEnvelope, faTrash, faPencil, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Add icons to the library
library.add(faHome, faEnvelope, faList, faTrash, faPencil, faEye);

// Register the FontAwesomeIcon component globally
Vue.component('font-awesome-icon', FontAwesomeIcon);

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