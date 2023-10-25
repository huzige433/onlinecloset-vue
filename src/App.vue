<template>
  <div class="bg"><router-view /></div>
  <MainTabBar></MainTabBar>
</template>


<style lang="less">
  .bg{
    width: 100%;
    height: 100%;
    background-image: url('@/assets/bg.jpg');
    background-size:100% 100%;
  }
</style>

<script>
import MainTabBar from "./views/MainTabBar.vue";
export default {
  name: 'App',
  components: {
    MainTabBar,
  },
}
</script>

