<template>
            <el-select v-model="inputvalue" placeholder="筛选季节">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
            <el-button @click="inputvalue=null" size="small" >重置</el-button>
            <el-button @click="openWindow" size="small" type="primary">添加</el-button>
    <el-card>
    <el-table  :data="clothingList.filter(data=>!inputvalue||(data.season==inputvalue))" table-layout="fixed" :show-overflow-tooltip="true" 
    :row-style="{height:'20px'}" :cell-style="{padding:'0px'}" style="font-size: 10px"
    :header-cell-style="{padding:'0px'}"
      fit border >
        
        <el-table-column label="览" min-width="40%" >
            <template #default="scope" >
                <el-image style="max-height: 25px; max-width: 25px; display:block;margin: 0 auto;" :src="scope.row.url" :zoom-rate="1.2"
                    :preview-src-list="scope.row.srcList" :initial-index="4" fit="contain" :preview-teleported="true"  />
            </template>
        </el-table-column>
        <el-table-column prop="name" label="名" :filters="[{text:'短袖',value:'短袖'},{text:'衬衫',value:'衬衫'}]" :filter-method="filterHandler" min-width="40%" />
        <el-table-column prop="body_width" label="身宽" min-width="90%" />
        <el-table-column prop="clothing_length" label="衣长" min-width="50%" />
        <el-table-column prop="shoulder_length" label="肩宽" min-width="50%" />
        <el-table-column prop="sleeve_length" label="袖长" min-width="100%" />
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
             <EditCoatView v-if="windowVisible" ref="popWindow" :fetchData="fetchData" :inputdisable="inputdisable"></EditCoatView>
              <span slot="footer" class="dialog-footer" v-if="!inputdisable">
                  <el-button type="primary" @click="postform">提交</el-button>
                  <el-button @click="windowVisible = false">取消</el-button>
              </span>
    </el-dialog>

</template>
  
<script lang="ts" setup>
import { ref,nextTick,onMounted  } from 'vue';
import EditCoatView from './EditCoatView.vue';
import axios from 'axios';

const windowVisible = ref(false);
const inputdisable = ref(false);
const popWindow = ref();
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
    shoulder_length:string
    sleeve_length:string
    season:string

}

const clothingList  = ref<Clothing[]>([]);
var coatlist:any = [];
const fetchData = async () => {
      try {
        const response = await axios.get('/v1/coat/list');
        const responseData = response.data;
        coatlist=responseData
        clothingList.value = responseData.map((item:any) => ({
          id: item.id,
          clothingid: item.clothing.id,
          name: item.clothing.name,
          url: item.clothing.url,
          srcList: item.clothing.srcList ? JSON.parse(item.clothing.srcList) : [],
          body_width:item.bodyWidth,
          clothing_length:item.clothingLength,
          shoulder_length:item.shoulderWidth,
          sleeve_length:item.sleeveLength,
          season:item.clothing.season
        }));
      } catch (error) {
        console.error(error);
      }
    };

onMounted(fetchData);

const  openWindow= () =>{
        windowVisible.value=true
        inputdisable.value=false
      }

const handleEdit = (index: number,edit:boolean) => {
    windowVisible.value=true
    inputdisable.value=edit
    nextTick(()=>{
        popWindow.value.dataInit(coatlist[index])
    })
    
    
}

const handleDelete = (index: number, row: Clothing) => {
    if(confirm('你确定要丢弃吗?')){
        const url=`/v1/deleted/${row.clothingid}`
        axios.get(url)
        .then(response=>{
            console.log(response.data)
            fetchData()
        })
        .catch(error=>{
            throw new Error(error.response.data)
        })
    }

}
const postform = () => {
    if(popWindow.value.updataform()==true){
        windowVisible.value=false
    }
 
}

const filterHandler=(value:any, row:any, column:any)=>{
        const property = column['property'];
        return row[property].indexOf(value)>-1;
      }

</script>

<style>
.el-table .cell{
    padding: 5px;
}
</style>