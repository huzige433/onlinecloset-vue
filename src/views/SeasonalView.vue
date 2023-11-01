<template>
    <div class="seasonal">
        <el-container>
            <el-main>
                <el-page-header @back="goBack" content="按季节展示衣服">
            <el-select v-model="value" placeholder="请选择" @change="getdata">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
            <el-button @click="value=null;getdata()">重置</el-button>
            </el-page-header>
            <el-divider></el-divider>
        <el-row :gutter="10">
          <el-lable>上装</el-lable>
          <el-col v-for="clothing in coatdata" :key="clothing.id" :span="4">
              
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: auto;"></el-image>
            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="10">
          <el-lable>下装</el-lable>
          <el-col v-for="clothing in pantsdata" :key="clothing.id" :span="4">
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: auto;"></el-image>
              </div>

          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="10">
          <el-lable>内衣</el-lable>
          <el-col v-for="clothing in underweardata" :key="clothing.id" :span="4">
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: auto;"></el-image>

            </div>
          </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="10">
          <el-lable>鞋子</el-lable>
          <el-col v-for="clothing in shoedata" :key="clothing.id" :span="4" style="margin-bottom: 15%;">
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: auto;"></el-image>
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
    name: 'seasonal',
    created() {
        this.getdata();
    },
    methods: {
        goBack() {
            this.$router.push('/')

        },
        getdata(seasonnum){
          var url;
          if(seasonnum===undefined||seasonnum===null){
            url=`/v1/imglist`
          }else{
            url=`/v1/imglist/${seasonnum}`
          }        
            axios.get(url,{headers:{"userid":localStorage.getItem('userid')}})
            .then((response) =>{
                this.clothingdata=response.data;
                this.coatdata=this.clothingdata.filter((data)=>{return data.type === 0})
                this.pantsdata=this.clothingdata.filter((data)=>{return data.type === 1})
                this.underweardata=this.clothingdata.filter((data)=>{return data.type === 2})
                this.shoedata=this.clothingdata.filter((data)=>{return data.type === 3})
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
            value:'',
            coatdata:[],
            pantsdata:[],
            underweardata:[],
            shoedata:[],
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