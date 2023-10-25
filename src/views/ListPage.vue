<template>
  <div class="listpage">
    <el-page-header @back="goBack" ></el-page-header>
    <component :is="selectedComponent" />
  </div>
</template>


<script >
import ListCoatView from '@/components/ListCoatView.vue'
import ListPantsView from '@/components/ListPantsView.vue'
import ListUnderWearView from '@/components/ListUnderWearView.vue'
import ListShoeView from '@/components/ListShoeView.vue'
export default {
  name: 'ListPage',
  components: {ListCoatView,ListPantsView,ListUnderWearView,ListShoeView},
  computed: {
    selectedComponent() {
      const route = this.$route.path
      if (route === '/list/coat') {
        return 'ListCoatView'
      } else if (route === '/list/pants') {
        return 'ListPantsView'
      }else if(route === '/list/underwear'){
        return 'ListUnderWearView'
      }else if(route === '/list/shoe'){
        return 'ListShoeView'
      }
       else {
        // 默认展示的组件
        return 'ListCoatView'
      }}},
  methods: {
    goBack() {
            this.$router.go (-1)
        }
  }
}

</script>

<style>

</style>