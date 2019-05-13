// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import ElementUI from 'element-ui';
import laydate from 'layui-laydate';
import './assets/style/reset.css';
import './assets/style/common.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'layui-laydate/dist/theme/default/laydate.css';
import App from './App';
import router from './router';
import filter from './common/filter';  // 引入过滤公共方法库
import Echarts from 'echarts';
import store from './store/index';
import publicFn from './common/publicFn';
import common from './common/common';
import loadComponent from './common/loadComponent';
import Alert from './components/common/alert/index.js';

Vue.use(ElementUI);
Vue.use(laydate); // 这个是单独的一个时间控件
// window.addEventListener('resize', () => {
//   router.go(0)
// }, false)
Vue.config.productionTip = false;

Object.keys(filter).forEach((key) => {  // 把引入过滤的公共方法循环注册vue过滤器
  Vue.filter(key, filter[key])
})

Vue.directive('tip', {  // 定义全局自定义指令
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el, binding) {
    // 赋值
    el.title = binding.value
  }
})

console.log(Vue.version, Alert); // 查看版本号

Vue.prototype.$echarts = Echarts;
Vue.prototype.$publicFn = publicFn;
Vue.prototype.$laydate = laydate;
Vue.prototype.$common = common;
Vue.prototype.$myAlert = Alert;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
