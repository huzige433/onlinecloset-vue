<template>
  <div class="listpage">
    <el-page-header @back="goBack" ></el-page-header>
    <el-tabs v-model="activeName" class="demo-tabs"  stretch lazy >
      <el-tab-pane label="衣服" name="first"><ListCoatView /></el-tab-pane>
      <el-tab-pane label="裤子" name="second"><ListPantsView /></el-tab-pane>
      <el-tab-pane label="内衣" name="third"><ListUnderWearView /></el-tab-pane>
      <el-tab-pane label="鞋子" name="fourth"><ListShoeView /></el-tab-pane>
      <el-tab-pane label="回收站" name="five"><recycleView /></el-tab-pane>
    </el-tabs>
    
    <el-backtop :right="10" :bottom="50" />
  </div>
</template>


<script >
import ListCoatView from '@/components/ListCoatView.vue'
import ListPantsView from '@/components/ListPantsView.vue'
import ListUnderWearView from '@/components/ListUnderWearView.vue'
import ListShoeView from '@/components/ListShoeView.vue'
import recycleView from '@/views/RecycleView.vue'
export default {
  name: 'ListPage',
  components: {ListCoatView,ListPantsView,ListUnderWearView,ListShoeView,recycleView},
  data(){
    return {
      activeName: ''
    }
  },
  created(){
    const route = this.$route.path
    if (route === '/list/coat') {
        this.activeName = 'first'
      } else if (route === '/list/pants') {
        this.activeName = 'second'
      }else if(route === '/list/underwear'){
        this.activeName = 'third'
      }else if(route === '/list/shoe'){
        this.activeName = 'fourth'
      }else {
        // 默认展示的组件
        this.activeName = 'first'
      }
  },
  computed: {
    selectedComponent() {
      const route = this.$route.path
      if (route === '/list/coat') {
        this.activeName = 'first'
      } else if (route === '/list/pants') {
        this.activeName = 'second'
      }else if(route === '/list/underwear'){
        this.activeName = 'third'
      }else if(route === '/list/shoe'){
        this.activeName = 'fourth'
      }
       else {
        // 默认展示的组件
        this.activeName = 'first'
      }}},
  methods: {
    goBack() {
            this.$router.back()
        }
  }
}

</script>

<style>

</style>