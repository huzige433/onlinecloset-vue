<template>
  <div class="Index">
    <div class="common-layout">
      <el-container>
        <el-header style="height: 11vh;">
          <el-avatar :src="avatarsrc" size="large" @click="changeuser" style="right: 2%;top:1%;position: absolute;"></el-avatar>
          <el-text style="color: aliceblue;font-size: large;">总消费：{{ money.money }}</el-text>
        </el-header>
        <el-main style="margin-left: 1rem;width: 88%;">
          <el-row :gutter="20">
            <el-col :span="6">
              <router-link :to="{name:'coat'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">上装<br/>({{ countjson.coatcount }})</el-text>
                </div>
              </router-link>
            </el-col>
            <el-col :span="6">
              <router-link :to="{name:'pants'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">下装<br/>({{ countjson.pantscount }})</el-text>
                </div>
              </router-link>
            </el-col>
            <el-col :span="6">
              <router-link :to="{name:'underwear'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">内衣<br/>({{ countjson.underwearcount }})</el-text>
                </div>
              </router-link>
            </el-col>
            <el-col :span="6">
              <router-link :to="{name:'shoe'}">
                <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">鞋子<br/>({{ countjson.shoecount }})</el-text>
                </div>
              </router-link>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="6">
              <router-link :to="{name:'recycle'}">
              <div class="grid-content ep-bg-purple" style="justify-content: center;display: flex; min-height: 20vh;">
                  <el-text class="mx-1" style="color: aliceblue;font-size: large;">回收<br/>({{ countjson.recycle }})</el-text>
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
      avatarsrc:'',
      money:0
    };
  },
  mounted() {
    this.getcount();
    this.getmoney();
    if(localStorage.getItem('userid')==1){
      this.avatarsrc=new URL('../assets/avatar/1.jpg',import.meta.url).href
    }else if(localStorage.getItem('userid')==2){
      this.avatarsrc=new URL('../assets/avatar/2.jpg',import.meta.url).href
    }
  },
  methods: {
    getcount(){
      axios.get('/v1/count',
      {headers:{'userid':localStorage.getItem('userid')}}
      ).then((res) =>{
        this.countjson=res.data
      })
    },
    changeuser(){
      localStorage.removeItem('userid')
      this.$router.push('/user')
    },
    getmoney(){
      axios.get('/v1/getmoneysum',
      {headers:{'userid':localStorage.getItem('userid')}}
      ).then((res) =>{
        this.money=res.data
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