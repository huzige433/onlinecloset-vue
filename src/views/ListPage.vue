<template>
  <div class="listpage">
    <el-page-header @back="goBack" ></el-page-header>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick"  stretch  >
      <el-tab-pane label="上装" name="first"><ListCoatView  v-if="getshow('first').ishow"/></el-tab-pane>
      <el-tab-pane label="下装" name="second"><ListPantsView  v-if="getshow('second').ishow"/></el-tab-pane>
      <el-tab-pane  label="内衣" name="third"><ListUnderWearView v-if="getshow('third').ishow"/></el-tab-pane>
      <el-tab-pane  label="鞋子" name="fourth"><ListShoeView v-if="getshow('fourth').ishow" /></el-tab-pane>
      <el-tab-pane  label="回收站" name="five"><recycleView v-if="getshow('five').ishow" /></el-tab-pane>
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
      activeName: '',
      isshow:[{name:"first",ishow:false},{name:"second",ishow:false}
      ,{name:"third",ishow:false},{name:"fourth",ishow:false},
      {name:"five",ishow:false}]

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
      this.isshow.find((item)=>{return item.name=== this.activeName}).ishow=true
      
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
        },
        handleClick(_tab) {
          this.isshow.map((item)=>{
            if(item.name===_tab.props.name){
              item.ishow=true
            }else{
              item.ishow=false
            }
          })
    },
    getshow(name){
     console.log(this.isshow.find((item)=>{return item.name===name}).ishow)
      return  this.isshow.find((item)=>{return item.name===name})
    }
  }
}

</script>

<style>

</style>