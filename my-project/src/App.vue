<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">

    <!-- msg属性を介して子コンポーネント(HelloWorld.vue)へ文字列データを渡す -->
    <HelloWorld msg="Vue CLIの世界へようこそ！"/>
  </div>
</template>

<script>

//HelloWorld.vueからHelloWorldを読み込む
import HelloWorld from './components/HelloWorld.vue'

//App.vueをオブジェクト変数Appとしてexportする
//componentsオプションで、HelloWorldをAppの子コンポーネントとして登録する
export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
