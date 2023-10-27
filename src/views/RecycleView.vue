<template>
    <div class="recycle">
        <el-container>
            <el-main>
              <el-page-header @back="goBack" ></el-page-header>
        <el-row :gutter="10">
          <span>回收站</span>
          <el-col v-for="clothing in clothingdata" :key="clothing.id" :span="4">
              <div class="bg-purple">
                <el-image :src="clothing.url"></el-image>
            </div>
          </el-col>
        </el-row>
        </el-main>
        </el-container>
    </div>
</template>



<script>
import axios from 'axios';

export default {
    name: 'recycle',
    created() {
        this.getdata();
    },
    methods: {
        goBack() {
            this.$router.push('/')

        },
        getdata(seasonnum){
          const url=`/v1/recycle`  
            axios.get(url,{headers:{"userid":localStorage.getItem("userid")}})
            .then((response) =>{
                this.clothingdata=response.data;
            })
            .catch((error)=>{
                console.log(error)
            })
        }
    },
    data() {
        return {
           clothingdata:[],
           options: [{value: '0', label: '夏'},
                     {value: '1', label: '冬'},  
                     {value: '2', label: '春秋'}
                    ],
            value:''
        };
    },
}
</script>

<style>
.el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }
.clearfix span{
    color: azure;
    font-size: large;
}
</style>