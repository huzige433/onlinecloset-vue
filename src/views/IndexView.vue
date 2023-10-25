<template>
  <div class="Index">
    <div class="common-layout">
      <el-container>
        <el-header style="height: 11vh;"></el-header>
        <el-main style="margin-left: 1rem;width: 88%;">
          <el-row :gutter="20">
            <el-col :span="6">
              <router-link :to="{name:'coat'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">上装({{ countjson.coatcount }})</el-text>
                </div>
              </router-link>
            </el-col>
            <el-col :span="6">
              <router-link :to="{name:'pants'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">裤子({{ countjson.pantscount }})</el-text>
                </div>
              </router-link>
            </el-col>
            <el-col :span="6">
              <router-link :to="{name:'underwear'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">内衣({{ countjson.underwearcount }})</el-text>
                </div>
              </router-link>
            </el-col>
            <el-col :span="6">
              <router-link :to="{name:'shoe'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">鞋子({{ countjson.shoecount }})</el-text>
                </div>
              </router-link>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <router-link :to="{name:'recycle'}">
              <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex; min-height: 20vh;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">回收({{ countjson.recycle }})</el-text>
                </div>
              </router-link>
            </el-col>
            <el-col :span="6">
              <div class="grid-contentdown ep-bg-purple" />
            </el-col>
            <el-col :span="6">
              <div class="grid-contentdown ep-bg-purple" />
            </el-col>
            <el-col :span="6">
              <div class="grid-contentdown ep-bg-purple" />
            </el-col>
          </el-row>
        </el-main>
        <el-footer></el-footer>
      </el-container>

      
    </div>
  </div>
</template>


<script>
import axios from 'axios';


export default {
  name: 'Index',
  components: {},
  data() {
    return {
      countjson: {},
    };
  },
  mounted() {
    this.getcount();
  },
  methods: {
    getcount(){
      axios.get('/v1/count').then((res) =>{
        this.countjson=res.data
      })
    }
  }
}

</script>

<style>
.el-row {
  margin-bottom: 20px;

}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 45vh;
}
.grid-contentdown {
  border-radius: 4px;
  min-height: 24vh;
}
</style>