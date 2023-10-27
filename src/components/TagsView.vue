<template>
    <div class="TagsView">
        <el-tag
  :key="tag"
  v-for="tag in dynamicTags"
  closable
  :disable-transitions="false"
  @close="handleClose(tag)">
  {{tag}}
</el-tag>
<el-select
  class="input-new-tag"
  filterable
  allow-create
  v-if="inputVisible"
  v-model="inputValue"
  ref="saveTagInput"
  size="small"
  @keyup.enter.native="handleInputConfirm"
  @blur="handleInputConfirm"
  @query="handleInputConfirm"
  @change="handleInputConfirm"
>
<el-option v-for="(key,id) in options" :key="id" :label="key.label" :value="key.value"></el-option>
</el-select>
<el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
</template>


<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 180px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>

<script>
import axios from 'axios'
  export default {
    name: 'TagsView',
    data() {
      return {
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        options:[],
        clothing:{},

      };
    },
    mounted() {
      this.saveTagtoclothing()
    },
    methods: {
      initdata(clothing){
        this.clothing=clothing
        if(clothing.id){
          axios.get(`/v1/tags/gettag/${clothing.id}`).then((res) =>{
          this.dynamicTags=res.data.map((item) => {return item.name})
        }).catch((err) =>{
          console.log(err)})
        }
          axios.get(`/v1/tags/gettagoptions/${clothing.type}`).then((res)=>{
              this.options=res.data.map((item)=>{
                return {
                  value:item.name,
                  label:item.name,
                  id:item.id
                }
              })
            }).catch((err)=>{
              console.log(err)})
      },

      handleClose(tag) {
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      },

      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
        //   this.$refs.saveTagInput.$refs.input.focus();

        });
      },

      handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue&&this.dynamicTags.indexOf(inputValue)==-1) {
          if(this.dynamicTags.indexOf(inputValue)==-1){
            let body={
            name:inputValue,
            clothingtype:this.clothing.type}
            axios.post('/v1/tags/save',body).then((res)=>{
            this.dynamicTags.push(inputValue);
            this.options.push({value:inputValue,label:inputValue,id:res.data.id})
            this.inputVisible = false;
            this.inputValue = '';
          }).catch((err)=>{
            alert("添加失败")
          })
          }else{
            this.dynamicTags.push(inputValue);
            this.inputVisible = false;
            this.inputValue = '';
          }
        }
      },

      saveTagtoclothing(clothingid){
        this.dynamicTags=["1","2","3"]
        axios.get('/v1/tags/savetag_clothing',{params:{clothingid:clothingid,tagids:this.dynamicTags}}).then((res)=>{}).catch((err)=>{})
      }
      
    }
  }
</script>