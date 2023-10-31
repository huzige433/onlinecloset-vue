<template>
  <div class="TagsView">
    <el-tag :key="tag.id" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
      <router-link  target="_blank" :to="computedRoute(tag)" class="tag-link" @click="goToPageWithParams(tag)">{{ tag.name }}</router-link>
    </el-tag>
    <el-select class="input-new-tag" filterable allow-create v-if="inputVisible" v-model="inputValue" vlaue-key="id" ref="saveTagInput"
      size="small"  @blur="handleInputConfirm" @query="handleInputConfirm"
      >
      <el-option v-for="(key, id) in options" :key="id" :label="key.label" :value="key.value"></el-option>
    </el-select>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
  </div>
</template>


<style>
.el-tag+.el-tag {
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
      dynamicTags: [],//clongting_tag
      inputVisible: false,
      inputValue: '',
      options: [],//tags
      clothing: {},

    };
  },
  methods: {
    goToPageWithParams(tag){
      console.log(tag.id,tag.clothingtype)
      // this.$router.push({name:'Login', params: { id: this.id }})
      
    },
    computedRoute(tag) {
            console.log(tag.clothingtype )
            switch (tag.clothingtype) {
                case 0:
                return { name: 'coat', query: { 'tagid': tag.id, 'type': tag.clothingtype } }
                    break;
                case 1:
                return { name: 'pants', query: { 'tagid': tag.id, 'type': tag.clothingtype } }
                    break;
                case 2:
                return { name: 'underwear', query: { 'tagid': tag.id, 'type': tag.clothingtype } }
                    break;
                case 3:
                return { name: 'shoe', query: { 'tagid': tag.id, 'type': tag.clothingtype } }
                    break;
                default:
                    return { name: 'coat', query: { 'tagid': tag.id, 'type': tag.clothingtype } }
                    break;
            }
  },
    initdata(clothing) {
      this.clothing = clothing
      if (clothing.id) {
        axios.get(`/v1/tags/gettag/${clothing.id}`).then((res) => {
          this.dynamicTags = res.data.map((item) => {
            return {
              id: item.id,
              name: item.name,
              clothingtype:item.clothingtype
            }
          })
        }).catch((err) => {
          console.log(err)
        })
      }
      this.initoptions(clothing.type)
    },
    initoptions(type){
      axios.get(`/v1/tags/gettagoptions/${type}`).then((res) => {
        this.options = res.data.map((item) => {
          return {
            value: item.name,
            label: item.name,
            id: item.id
          }
        })
      }).catch((err) => {
        console.log(err)
      })
    },
    handleClose(tag) {
      if(this.clothing.id!=''){
        this.deldetetag(tag,this.clothing.id)
      }else{
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
      }
      

    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.focus();

      });
    },

      async handleInputConfirm(value) {
      let inputValue = this.inputValue;
        if (inputValue&&!this.dynamicTags.find(tag => tag.name === inputValue)&&!this.options.find(tag => tag.value === inputValue)) {
          console.log('op新增op添加tag')
          let tagid=await this.addoptions(inputValue,this.clothing.type)
          if(this.clothing.id!=''){
            this.addtag(tagid,this.clothing.id,inputValue)
          }else{
            this.dynamicTags.push({id:tagid,name:inputValue});
          }
          

          

        } else if(inputValue&&!this.dynamicTags.find(tag => tag.name === inputValue)&&this.options.find(tag => tag.value === inputValue)) {
          if(this.clothing.id!=''){
            console.log('op已有,不新增op添加tag')
            let tagid=this.options.find(tag => tag.value === inputValue).id
            this.addtag(tagid,this.clothing.id,inputValue)
          }else{
            let tagid=this.options.find(tag => tag.value === inputValue).id
            this.dynamicTags.push({id:tagid,name:inputValue});
          }

        }

    },
   addoptions(name,type) {
      let body = {
        name: name,
        clothingtype: type
      }
       return axios.post('/v1/tags/save', body).then((res) => {
        console.log(res)
        this.options.push({ value: this.inputValue, label: this.inputValue, id: res.data })
        this.inputVisible = false;
        this.inputValue = '';
        return res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    addtag(tagid,clothingid,inputValue){
      axios.post('/v1/tags/savetag_clothing',
        {
          clothingid:clothingid,
          tagid:tagid
        }
      ).then((res)=>{
        this.dynamicTags.push({id:tagid,name:inputValue});
        console.log(res.data)
      }).catch(err=>{console.log(err)})
    },
    deldetetag(tag,clothingid){
      axios.post(`/v1/tags/deletetag_clothing`,{
        clothingid:clothingid,
        tagid:tag.id
      }
      ).then((res)=>{
        this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        console.log(res.data)
      }).catch(err=>{console.log(err)})
    },
    //新建衣服的保存全部标签
    newclothing(clothingid){
      this.dynamicTags.map((tag)=>{
        axios.post('/v1/tags/savetag_clothing',
        {
          clothingid:clothingid,
          tagid:tag.id
        }
      ).then((res)=>{
        console.log(res.data)
      }).catch(err=>{console.log(err)})
      })
    }


  }
}
</script>