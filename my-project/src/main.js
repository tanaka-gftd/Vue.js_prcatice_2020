/* main.jsは、new Vue()で生成されるルートコンポーネントをindex.htmlの<div id="app">にマウント（関連付け）している */

//Vue.jsを利用するために、最初にimportする
import Vue from 'vue'

//App.vueをオブジェクト変数Appとして取得し、main.jsから参照できるようにする
import App from './App.vue'

Vue.config.productionTip = false

//取得したAppは、描画担当のrenderオプションのh関数に引数として渡している（ES6の構文）
new Vue({
  render: h => h(App),
}).$mount('#app')

/* 上記の関数は、下記のものと同様の処理
createElement：引数に指定した要素をDOM要素として生成する

render: function(createElement) {
  return createdElement(App)
}
*/
