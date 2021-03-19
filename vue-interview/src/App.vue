<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" v-model="hello" v-if="hello" />
    <div @click="hello = '1'">{{url}}</div>
    <div>{{url}}</div>
    <component :is="name" v-model="url"></component>
  </div>
</template>

<script>
import Span from './components/Span.vue'
import Input from './components/Input.vue'

export default {
  name: 'App',
  data () {
    return { hello: '', name: 'Input', url: "我是" }
  },
  components: {
    HelloWorld: () => import('./components/HelloWorld.vue'), Span, Input
  },
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
