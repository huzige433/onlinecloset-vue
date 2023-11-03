<template>
    <div class="recycle">
        <el-container>
            <el-main>
              <el-page-header @back="goBack" ></el-page-header>
              <span>回收站(长按移出回收站)</span>
        <el-card>
        <el-row :gutter="10">
          <el-col v-for="clothing in clothingdata" :key="clothing.id" :span="4">
              <div class="bg-purple" >
                <el-image :src="clothing.url" style="width: 50px;height: auto;" @touchstart.prevent="goTouchstart(clothing.id)" @touchend.prevent="goTouchend()"></el-image>
            </div>
          </el-col>
        </el-row>
        </el-card>
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
        },
        goTouchstart(clothingid){ 
            let _this = this;
            clearTimeout(_this.timeOutEvent);
            _this.timeOutEvent = setTimeout(function() {
                _this.timeOutEvent = 0;
                //  处理长按事件...
                _this.$confirm("是否取回?").then(_=>{
                    console.log(clothingid)
                    const url=`/v1/redeleted/${clothingid}`
                    axios.get(url)
                    .then(response=>{
                        console.log(response.data)
                        _this.clothingdata=_this.clothingdata.filter(item=>item.id!==clothingid)
                    })
                    .catch(error=>{
                        console.log(error)
                    })
    
                }).catch(_=>{})
            }, 600);

        },
        
//手如果在600毫秒内就释放，则取消长按事件
goTouchend() {
    let _this = this;
    clearTimeout(_this.timeOutEvent);
    if (_this.timeOutEvent !== 0) {
        //  处理单击事件}
    }}
    },
    data() {
        return {
           clothingdata:[],
           options: [{value: '0', label: '夏'},
                     {value: '1', label: '冬'},  
                     {value: '2', label: '春秋'}
                    ],
            value:'',
            timeOutEvent:0 //记录触摸时长
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