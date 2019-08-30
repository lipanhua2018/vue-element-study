<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import testuser from './service/testuser.js';

export default {
  name: 'App',
  mixins: [testuser], // vue混合的用法
  provide() {
    return {
      app: this
    }
  },
  created () {
      // console.log(this)
  }

}
</script>

<style>

</style>
