<template>
    <div class="taglist">
        <el-header>
            <el-select v-model="inputvalue" placeholder="筛选类别" @change="filtertype" clearable remote>
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
            </el-select>
            <el-button type="primary" @click="reinitdata">重置</el-button>
        </el-header>
        <el-container>
            <el-header></el-header>
            <el-main style="text-align: center;">
                <el-tag :key="tag.id" v-for="tag in temptagitems" :disable-transitions="false">
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
            options: [{value: 0, label: '衣服'}
            ,{value: 1, label: '裤子'}
            ,{value: 2, label: '内衣'}
            ,{value: 3, label: '鞋子'}],
            inputvalue: '',
            temptagitems: [],
        }
    },
    mounted(){
        this.getTagList()
    },
    computed:{

    },
    methods: {
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
            }).catch((err) => {
                console.log(err)
            })
        },
        filtertype(value){
            this.temptagitems=this.tagitems.filter((item)=>{return item.clothingtype === value})
        },
        reinitdata(){
            this.inputvalue=null;
            this.temptagitems=this.tagitems

        }

    },


}
</script>