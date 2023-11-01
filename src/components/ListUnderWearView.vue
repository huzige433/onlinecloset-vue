<template>
            <el-select v-model="inputvalue" placeholder="请选择季节">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
            <el-button @click="inputvalue=null">重置</el-button>
            <el-button @click="openWindow" size="small" type="primary">添加</el-button>
    <el-card style="padding-bottom: 15%;">
    <el-table  :data="clothingList.filter(data=>!inputvalue||(data.season==inputvalue)) " table-layout="fixed" 
    :row-style="{height:'30px'}" :cell-style="{padding:'0px'}" style="font-size: 10px"
      fit border >
        
      <el-table-column label="览" min-width="35" >
            <template #default="scope" >
                <el-image style="height: 30px; display: block; margin: 0 auto;" :src="scope.row.url" :zoom-rate="1.2"
            :preview-src-list="scope.row.srcList" :initial-index="4" fit="contain" :preview-teleported="true" />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名" :filters="[{text:'夏',value:'0'},{text:'东',value:'1'}]" :filter-method="filterHandler"  />
        <el-table-column prop="clothing_length" label="衣长"  />
        <el-table-column prop="shoulder_length" label="肩宽"  />
        <el-table-column prop="body_width" label="身宽"  />
        <el-table-column prop="sleeve_length" label="袖长"  />
        <el-table-column prop="waitswidth" label="腰围"  />
        <el-table-column prop="hips" label="臀围"  />
        <el-table-column prop="pantslength" label="裤长"  />
        <el-table-column prop="pantsopeningwidth" label="裤口宽" />
        <el-table-column label="查看" >
            <template #default="scope">
                <el-button style="display:block;margin: 0 auto;" size="small"  @click="handleEdit(scope.$index, true)" >查看</el-button>
            </template>
        </el-table-column>
        <el-table-column label="修改" >
            <template #default="scope">
                <el-button style="display:block;margin: 0 auto;" size="small" @click="handleEdit(scope.$index, false)">修改</el-button>
            </template>
        </el-table-column>
        <el-table-column label="丢弃" >
            <template #default="scope">
                <el-button style="display:block;margin: 0 auto;" size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">丢弃</el-button>
            </template>
        </el-table-column>
    
    </el-table>
    </el-card>

    <el-dialog  v-model="windowVisible" :append-to-body="true" width="100%" height="50vh" >
             <EditUnderWearView v-if="windowVisible" ref="popWindow" :fetchData="fetchData" :inputdisable="inputdisable"></EditUnderWearView>
              <span slot="footer" class="dialog-footer" v-if="!inputdisable">
                  <el-button type="primary" @click="postform">提交</el-button>
                  <el-button @click="windowVisible = false">取消</el-button>
              </span>
    </el-dialog>

</template>
  
<script lang="ts" setup>
import { ref,nextTick,onMounted  } from 'vue';
import EditUnderWearView from './EditUnderWearView.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';

const windowVisible = ref(false);
const inputdisable = ref(false);
const popWindow = ref();
const tagid= ref<Number>();
const options=[{value: '0', label: '夏'},
                     {value: '1', label: '冬'},  
                     {value: '2', label: '春秋'}
                    ];
const inputvalue=ref();

interface Clothing {
    id:Number
    clothingid:Number
    name: string
    url: string
    srcList: string[]
    body_width:string
    clothing_length:string
    shoulder_width:string
    sleeve_length:string
    waitswidth:string
    hips:string
    pantslength:string
    pantsopeningwidth:string
    season:string

}

const clothingList  = ref<Clothing[]>([]);
var coatlist:any = [];
const fetchData = async (tagid:Number|undefined) => {
    if(!tagid){
        try {
        const headers={'userid':localStorage.getItem('userid')}
        const response = await axios.get('/v1/underwear/list',{headers:headers});
        const responseData = response.data;
        coatlist=responseData
      } catch (error) {
        console.error(error);
      }
    }else{
        try {
        const response = await axios.get('/v1/tags/getclothingfrontag',{params:{tagid:tagid,type:2}});
        const responseData = response.data;
        coatlist=responseData
      } catch (error) {
        console.error(error);
      }
    }
    if(coatlist){
    clothingList.value = coatlist.map((item:any) => ({
          id: item.id,
          clothingid: item.clothing.id,
          name: item.clothing.name,
          url: item.clothing.url,
          srcList: item.clothing.srcList ? JSON.parse(item.clothing.srcList) : [],
          body_width:item.bodyWidth,
          clothing_length:item.clothingLength,
          shoulder_length:item.shoulderWidth,
          sleeve_length:item.sleeveLength,
          waitswidth:item.waitswidth,
          hips:item.hips,
          pantslength:item.pantslength,
          pantsopeningwidth:item.pantsopeningwidth,
          season:item.clothing.season
        }));}

    };

    const route = useRoute();
    tagid.value=Number(route.query.tagid)
    console.log(tagid.value)
    fetchData(tagid.value)

const  openWindow= () =>{
        windowVisible.value=true
        inputdisable.value=false
        nextTick(()=>{
        popWindow.value.newInit(2)
    })
      }

const handleEdit = (index: number,edit:boolean) => {
    windowVisible.value=true
    inputdisable.value=edit
    nextTick(()=>{
        popWindow.value.dataInit(coatlist[index])
    })
    
    
}

const handleDelete = (index: number, row: Clothing) => {
    if(confirm('你确定要删除吗?')){
        const url=`/v1/deleted/${row.clothingid}`
        axios.get(url)
        .then(response=>{
            console.log(response.data)
            fetchData(tagid.value)
        })
        .catch(error=>{
            throw new Error(error.response.data)
        })
    }

}
const  postform = async () => {
    let msg=await popWindow.value.updataform();
    console.log(msg)
    if(msg){
        windowVisible.value=false
    }
 
}

const filterHandler=(value:any, row:any, column:any)=>{
        const property = column['property'];
        return row[property].indexOf(value)>-1;
      }

</script>

<style>
.el-table .cell.el-tooltip{
    padding:0 2px;
}
</style>