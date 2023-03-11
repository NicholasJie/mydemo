<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

import Layout from './layout/index.vue';
export default {
  name: 'App',
  components:{
    // Layout,
}
}
</script>

<style>
  body {
    padding: 0;
    margin: 0;
  }
</style>
