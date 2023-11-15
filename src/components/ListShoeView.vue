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
            <el-button @click="openWindow"  type="primary">添加</el-button>
    <el-card style="padding-bottom: 15%;">
    <el-table  :data="clothingList.filter(data=>!inputvalue||(data.season==inputvalue)) " table-layout="fixed" :show-overflow-tooltip="false" 
    :row-style="{height:'60px'}" :cell-style="{padding:'0px'}" style="font-size: 10px" row-key="clothingid"
      fit border >
      <el-table-column prop="name" label="名字" :filters="getfildername" :filter-method="filterHandler" />
      <el-table-column label="预览" min-width="60" >
            <template #default="scope" >
                <el-image style=" height: 60px; display: block; margin: 0 auto;" :src="scope.row.url" :zoom-rate="1.2"
            :preview-src-list="scope.row.srcList" :initial-index="4" fit="contain" :preview-teleported="true" />
            </template>
        </el-table-column>
        
        <el-table-column prop="size" label="尺码"  />
        <el-table-column label="查看" >
            <template #default="scope">
                <el-button style="display:block;margin: 0 auto;" size="small"  @click="handleEdit(scope.$index,scope.row.id,true)" >查看</el-button>
            </template>
        </el-table-column>
        <el-table-column label="修改" >
            <template #default="scope">
                <el-button style="display:block;margin: 0 auto;" size="small" @click="handleEdit(scope.$index, scope.row.id,false)">修改</el-button>
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
             <EditShoeView v-if="windowVisible" ref="popWindow" :fetchData="fetchData" :inputdisable="inputdisable"></EditShoeView>
              <span slot="footer" class="dialog-footer" v-if="!inputdisable">
                  <el-button type="primary" @click="postform">提交</el-button>
                  <el-button @click="windowVisible = false">取消</el-button>
              </span>
    </el-dialog>

</template>
  
<script lang="ts" setup>
import { ref,nextTick,onMounted,computed } from 'vue';
import EditShoeView from './EditShoeView.vue';
import axios from 'axios';
import { useRoute } from 'vue-router';
import Sortable from 'sortablejs'

const windowVisible = ref(false);
const inputdisable = ref(false);
const popWindow = ref();
const tagid= ref<Number>();
const orderref=ref();
const options=[{value: '0', label: '夏'},
                     {value: '1', label: '冬'},  
                     {value: '2', label: '春秋'}
                    ];
const inputvalue=ref();
const issort=ref(false);

interface Clothing {
    id:Number
    clothingid:Number
    name: string
    url: string
    srcList: string[]
    size:string
    season:string

}

const clothingList  = ref<Clothing[]>([]);
var coatlist:any = [];
const fetchData = async (tagid:Number|undefined) => {
    if(!tagid){
        issort.value=false
        try {
        const headers={'userid':localStorage.getItem('userid')}
        const response = await axios.get('/v1/shoe/list',{headers:headers});
        const responseData = response.data;
        coatlist=responseData
      } catch (error) {
        console.error(error);
      }
    }else{
        issort.value=true
        try {
        const headers={'userid':localStorage.getItem('userid')}
        const response = await axios.get('/v1/tags/getclothingfrontag',{headers:headers,params:{tagid:tagid,type:3}});
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
          size:item.clothing.size,
          body_width:item.bodyWidth,
          clothing_length:item.clothingLength,
          shoulder_length:item.shoulderWidth,
          sleeve_length:item.sleeveLength,
          season:item.clothing.season
        }));}
        sortArry(clothingList.value)

    };

    onMounted(()=>{
    const route = useRoute();
    tagid.value=Number(route.query.tagid)
    console.log(tagid.value)
    fetchData(tagid.value)
    initSort()
    });

const  openWindow= () =>{
        windowVisible.value=true
        inputdisable.value=false
        nextTick(()=>{
        popWindow.value.newInit(3)
    })
      }

const handleEdit = (index: number,coatid: Number,edit:boolean) => {
    const coat=coatlist.filter((item:any) => item.id == coatid)[0]
    windowVisible.value=true
    inputdisable.value=edit
    nextTick(()=>{
        popWindow.value.dataInit(coat)
    })
}

const handleDelete = (index: number, row: Clothing) => {
    if(confirm('你确定要丢弃吗?')){
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
        return row[property]===value;
      }

      const  initSort=()=> {
const el = document.querySelectorAll('.el-table__body-wrapper  table  tbody')[0]
// const sortable = new Sortable(el, options);
// 根据具体需求配置options配置项
const sortable = new Sortable(el, {
handle: '.el-image',
animation: 500,
delay:50,
disabled:issort.value,
onEnd: (e:any) => { // 监听拖动结束事件
    const arr = clothingList.value; // 获取表数据
    arr.splice(e.newIndex, 0, arr.splice(e.oldIndex, 1)[0]); // 数据处理，获取最新的表格数据
    nextTick(() => {
    clothingList.value = arr;
    console.log(clothingList.value);
    const order =clothingList.value.map((item:any)=>{
        return item.clothingid
    })
    console.log(order)
    saveorder(order)

});
}
})
}

const sortArry=(arry:Array<Number>|any)=>{
    const headers={'userid':localStorage.getItem('userid')}
    axios.get(`/v1/sort/3`,{headers:headers}).then(
        (res:any)=>{
            orderref.value=res.data
            let order=orderref.value.sortarry
            console.log(order)
            const filteredArr = clothingList.value;
            filteredArr.sort((a, b) => {
            const indexA = order.indexOf(a.clothingid);
            const indexB = order.indexOf(b.clothingid);
            if (indexA == -1 && indexB === -1) {
                return 0; // 如果两个对象的 id 都不在 order 数组中，则保持它们的原始顺序
            } else if (indexA === -1) {
                return 1; // 如果只有 a 的 id 不在 order 数组中，则将 a 排在 b 后面
            } else if (indexB === -1) {
                return -1; // 如果只有 b 的 id 不在 order 数组中，则将 b 排在 a 后面
            } else {
                return indexA - indexB; // 如果两个对象的 id 都在 order 数组中，则按照它们在 order 数组中的顺序排序
            }
            });
        }
    ).catch(_=>{})
}

const saveorder=(arry:Array<Number>|any)=>{
    let order=orderref.value
    const data={'id':order?order.id:null,"type":order?order.type:3,"userid":localStorage.getItem("userid"),'sortarry':JSON.stringify(arry)}
    axios.post("/v1/sort",data).then(
        (res:any)=>{
            console.log(res.data)
        })
}

const getfildername=computed(()=>{
    const uniqueClothingNames = [...new Set(clothingList.value.map(item => item.name))];
    console.log(uniqueClothingNames)
    return uniqueClothingNames.map((item:any)=>{
        return {
            text:item,
            value:item
        }
    })
})
</script>

<style>
.el-table .cell.el-tooltip{
    padding:0 2px;
}
</style>