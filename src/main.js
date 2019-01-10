// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import $ from 'jquery'

import Router from 'vue-router'
import VueResource from 'vue-resource'
import VueI18n from 'vue-i18n'
import language from './language/language'
import routes from './router/routes'
import store from './vuex/store'

import App from './App'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

const xssFilters = require('xss-filters');

Vue.use(VueResource)
Vue.use(VueI18n)
Vue.use(Router)

const router = new Router({
  routes,
});

Vue.config.productionTip = false

// 通过拦截器 对post过去的内容进行转义
Vue.http.interceptors.push(function(request, next) {
    if(request.method == 'POST'){
        if(request.body!=null){
            for(let key in request.body){
                if((typeof request.body[key]) == 'string'){
                    request.body[key] = xssFilters.inHTMLData(request.body[key]);
                }
            }
        }
    }else{
        if(!$.isEmptyObject(request.params)){
            for(let key in request.params){
                if((typeof request.params[key]) == 'string'){
                    request.params[key] = xssFilters.inHTMLData(request.params[key]);
                }
            }
        }
    }
    // console.log(request);
    next((response)=>{
        // function htmlDecode(input){
        //     var e = document.createElement('div');
        //     e.innerHTML = input;
        //     return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
        // }
        if(response.body){
            // if(response.body.hasOwnProperty('data')){
            //     let list = response.body.data;
            //     let style = list.constructor
            //     if(style == Array){
            //         list.filter((e)=>{
            //             for(let key in e){
            //                 if(typeof e[key] == 'string'){
            //                     e[key] = htmlDecode(e[key]);
            //                 }
            //             }
            //         });
            //     }
            //     if(style == Object){
            //         for(let key in list){
            //             if(typeof list[key] == 'string'){
            //                 list[key] = htmlDecode(list[key]);
            //             }
            //         }
            //     }
            // }
        }
    });
});
/*******************************************************/
function getTarget(node = document.body) {
  if (node === true) return document.body;
  return node instanceof window.Node ? node : document.querySelector(node);
}

const homes = new Map();

const directives = {
  menuIcon(el, {value}) {
      let icon = '';
      if (!value || value === 'null') icon = '';
      else if (value.indexOf('icon-') !== -1) icon = `<i class="seraph ${value}" data-icon="icon"></i>`;
      else icon = `<i class="layui-icon" data-icon="${value}">${value}</i>`;
      el.innerHTML = icon;
  },
  parent: {
      inserted(el, {value}) {
          const {parentNode} = el;
          const home = document.createComment('');
          let hasMovedOut = false;
          if (value !== false) {
              parentNode.replaceChild(home, el); // moving out, el is no longer in the document
              getTarget(value).appendChild(el); // moving into new place
              hasMovedOut = true;
          }
          if (!homes.has(el)) homes.set(el, {parentNode, home, hasMovedOut}); // remember where home is or should be
      },
      unbind(el) {
          homes.delete(el);
          if (el.remove) el.remove();
          else if (el.removeNode) el.removeNode(true);
      }
  }
};

$.each(directives, (key, val) => Vue.directive(key, val))
/********************************************************************/
/* eslint-disable no-new */
global.i18n = new VueI18n({
  locale: "zh_CN",
  messages: language
})

new Vue({
  i18n: i18n,
  router,
  store,// 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  el: '#app',
  template: '<App/>',
  components: { App },
}).$mount('#app')

