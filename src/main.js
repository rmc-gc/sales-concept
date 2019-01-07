import Vue from 'vue';
import VueCurrencyFilter from 'vue-currency-filter';
import VueMoment from 'vue-moment';
import VueRouter from 'vue-router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import App from './App.vue';

// Required for credit card input masking
const VueInputMask = require('vue-inputmask').default;

Vue.use(VueAxios, axios);
Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: false,
});
Vue.use(VueMoment);
Vue.use(VueRouter);
Vue.use(VueInputMask);

Vue.config.productionTip = false;

const sessionObject = {
  accessToken: 'ABC1234567890DEF',
  custNo: 'AA12345678',
  custName: 'RMc Tradings Inc.',
};

new Vue({
  render: h => h(App, {
    props: {
      sessionObject,
    },
  }),
}).$mount('#app');
