import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueMoment from 'vue-moment'
import VCalendar from 'v-calendar';
import VueRouter from 'vue-router'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(VueMoment);
Vue.use(VCalendar);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
