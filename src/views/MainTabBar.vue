<template>
  <tab-bar>
    <tab-bar-item path="/home" active-color="">
      <template v-slot:item-icon>
        <img src="../assets/tabbar/home.png" alt="" height="15">
      </template>
      <template v-slot:item-icon-active>
        <img src="../assets/tabbar/home.png" alt="" height="50">
      </template>
      <template v-slot:item-text>
        <div>首页</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/seasonal" active-color="">
      <template v-slot:item-icon>
        <img src="../assets/tabbar/detailed.png" alt="" height="15">
      </template>
      <template v-slot:item-icon-active>
        <img src="../assets/tabbar/detailed.png" alt="" height="50" >
      </template>
      <template v-slot:item-text>
        <div>分类</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/taglist" active-color="">
      <template v-slot:item-icon>
        <img src="../assets/tabbar/detailed.png" alt="" height="15">
      </template>
      <template v-slot:item-icon-active>
        <img src="../assets/tabbar/detailed.png" alt="" height="50" >
      </template>
      <template v-slot:item-text>
        <div>标签</div>
      </template>
    </tab-bar-item>
    <tab-bar-item path="/recycle" active-color="">
      <template v-slot:item-icon>
        <img src="../assets/tabbar/recycle.png" alt="" height="15">
      </template>
      <template v-slot:item-icon-active>
        <img src="../assets/tabbar/recycle.png" alt="" height="50">
      </template>
      <template v-slot:item-text>
        <div>回收</div>
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

 
<script lang="ts">
import TabBar from '@/components/TabBar.vue'
import TabBarItem from '@/components/TabBarItem.vue'
export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
}
}
</script>
 
<style>
</style>