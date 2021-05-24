import vue from 'vue';
import api from '~/utils/api.js';
import axios from 'axios';

const x = api;
// eslint-disable-next-line func-names
x.install = function () {
  vue.prototype.$apis = this;
};

vue.prototype.$axios = axios.create();

vue.use(x);

