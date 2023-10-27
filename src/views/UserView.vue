<template>
    <div class="userview">
      <el-container>
        <el-header></el-header>
        <el-main style="text-align: center;">
            <el-card>
          <div class="avatar-container">
            <el-avatar icon="el-icon-user-solid" :src="avatarsrc1" size="large"></el-avatar>
            <span>嘎</span>
            <el-button class="select-btn" @click="setuserid(1)">选择</el-button>
          </div>
            </el-card>
            <el-card>
          <div class="avatar-container">
            <el-avatar icon="el-icon-user-solid" size="large" :src="avatarsrc2" ></el-avatar>
            <span>宝</span>
            <el-button class="select-btn" @click="setuserid(2)">选择</el-button>
          </div>
            </el-card>
        </el-main>
      </el-container>
    </div>
  </template>

  <script>

  export default {
    name: 'userview',
    data() {
      return {
        avatarsrc1:"",
        avatarsrc2:""
      }
    },
    methods: {
        setuserid(userid){
            localStorage.setItem("userid",userid)
            this.$router.push('/home')
        }
    },
    mounted() {
        this.avatarsrc1=new URL('../assets/avatar/1.jpg',import.meta.url).href
        this.avatarsrc2=new URL('../assets/avatar/2.jpg',import.meta.url).href
        if(localStorage.getItem("userid")){
            this.$router.push('/home')
        }
    }
  }


  </script>


  <style>
  .avatar-container {
    display: flex;
    flex-direction: column;
    justify-content: center; /* 水平居中 */
    align-items: center; /* 垂直居中 */
  }
  
  .select-btn {
    min-width: 80px; /* 最小宽度 */
    max-width: 120px; /* 最大宽度 */
  }
  </style>
  