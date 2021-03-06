import Vue from 'vue';
import App from './App.vue';
import "vue-material-design-icons/styles.css";
import 'leaflet/dist/leaflet.css'; 


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
