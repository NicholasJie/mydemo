<template>
    <div>
        <transition name="fade-transform" mode="out-in">
      <keep-alive>
        <!-- <keep-alive > -->
        <router-view  />
      </keep-alive>
    </transition>
    </div>

</template>

<script>

</script>

<style>

</style>