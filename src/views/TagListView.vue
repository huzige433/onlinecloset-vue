<template>
    <div class="taglist">
        


        <el-container>
            <el-main style="text-align: center;">
            <el-page-header @back="goBack" content="按季节展示标签">
            <el-select v-model="inputvalue" placeholder="筛选类别" @change="filtertype" clearable remote>
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
            <el-button type="primary" @click="reinitdata">重置</el-button>
            </el-page-header>
                <el-tag :key="tag.id" v-for="tag in temptagitems" :disable-transitions="false" @close="handleClose(tag)" closable>
                    <router-link :to="computedRoute(tag)" class="tag-link">{{ tag.label }}</router-link>
                </el-tag>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'taglist',
    data() {
        return {
            tagitems: [],
            options: [{value: 0, label: '上装'}
            ,{value: 1, label: '下装'}
            ,{value: 2, label: '内衣'}
            ,{value: 3, label: '鞋子'}],
            inputvalue: null,
            temptagitems: [],
        }
    },
    mounted(){
        this.getTagList()
        
    },
    computed:{

    },
    destroyed(){
        sessionStorage.removeItem("taginputfilter")
    },
    methods: {
        goBack() {
            this.$router.push('/')
        },
        computedRoute(tag) {
            console.log(tag.clothingtype )
            switch (tag.clothingtype) {
                case 0:
                return { name: 'coat', query: { 'tagid': tag.value, 'type': tag.clothingtype } }
                    break;
                case 1:
                return { name: 'pants', query: { 'tagid': tag.value, 'type': tag.clothingtype } }
                    break;
                case 2:
                return { name: 'underwear', query: { 'tagid': tag.value, 'type': tag.clothingtype } }
                    break;
                case 3:
                return { name: 'shoe', query: { 'tagid': tag.value, 'type': tag.clothingtype } }
                    break;
                default:
                    return { name: 'coat', query: { 'tagid': tag.value, 'type': tag.clothingtype } }
                    break;
            }
  },
    getTagList() {
            axios.get(`/v1/tags/gettagoptions`).then((res) => {
                this.tagitems = res.data.map((item) => {
                    return {
                        value: item.id,
                        label: item.name,
                        clothingtype:item.clothingtype
                    }
                })
                this.temptagitems=this.tagitems
                if(sessionStorage.getItem('taginputfilter')!==null){
                this.inputvalue=Number(sessionStorage.getItem('taginputfilter'))
                this.filtertype(this.inputvalue)
        }
            }).catch((err) => {
                console.log(err)
            })
        },
        filtertype(value){
            this.temptagitems=this.tagitems.filter((item)=>{return item.clothingtype === value})
            sessionStorage.setItem('taginputfilter',this.inputvalue)
        },
        reinitdata(){
            this.inputvalue=null;
            this.temptagitems=this.tagitems
            sessionStorage.removeItem("taginputfilter")

        },
        handleClose(tag){
            this.$confirm('确认关闭？所有相关标签会取消关联').then(_=>{
                axios.get(`/v1/tags/remove/${tag.value}`).then((res) =>{
                this.temptagitems.splice(this.temptagitems.indexOf(tag), 1);
            }).catch((err) =>{console.log(err )})
            }).catch(_=>{})

        }

    },


}
</script>