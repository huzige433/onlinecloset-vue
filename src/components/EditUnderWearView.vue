<!--一个组件多用，添加/编辑弹窗-->
<template>
    <div class="mycontainer">
        <el-form :inline="true" ref="form" label-width="auto">
            <TagsView ref="tagWindow" />
            <el-form-item label="图片">
                <el-upload class="avatar-uploader" action="lei" :on-change="handleChange" :show-file-list="false"
                    :http-request="uploadImages" :disabled="inputdisable" accept="image/*"><!--覆盖默认上传-->
                    <el-image v-if="form.clothing.url" :src="form.clothing.url" class="avatar"></el-image>
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-form-item label="照片路径" prop="form" v-show="false">
                    <el-input v-model="form.clothing.url" :disabled="inputdisable" clearable></el-input>
                </el-form-item>
                <el-form-item label="上装更多照片路径" prop="form" v-show="false">
                    <el-input v-model="form.clothing.srcList" :disabled="inputdisable" clearable></el-input>
                </el-form-item>

            </el-form-item>
            <el-form-item label="名称">
                <el-input type="text" v-model="form.clothing.name" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="尺寸">
                <el-input type="text" v-model="form.clothing.size" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="衣长">
                <el-input type="text" v-model="form.clothingLength" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="肩宽">
                <el-input type="text" v-model="form.shoulderWidth" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="身宽">
                <el-input type="text" v-model="form.bodyWidth" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="袖长">
                <el-input type="text" v-model="form.sleeveLength" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="腰围">
                <el-input type="text" v-model="form.waitswidth" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="臀围">
                <el-input type="text" v-model="form.hips" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="裤口宽">
                <el-input type="text" v-model="form.pantsopeningwidth" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="裤长">
                <el-input type="text" v-model="form.pantslength" :disabled="inputdisable"></el-input>
            </el-form-item>
            
            <el-form-item label="价格">
                <el-input type="price" v-model="form.clothing.price" :disabled="inputdisable"></el-input>
            </el-form-item>
            <el-form-item label="季节">
                <el-select v-model="form.clothing.season" :disabled="inputdisable" placeholder="请选择">
                    <el-option v-for="(key,id) in seasonoption" :key="id" :label="key.label" :value="key.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间">
                <!-- <el-input type="text" v-model="form.clothing.buytime" :disabled="inputdisable"></el-input> -->
                <el-date-picker v-model="form.clothing.buytime" type="date" placeholder="选择日期"
                    :disabled="inputdisable"></el-date-picker>
            </el-form-item>
            <el-form-item label="描述" style="width: 100%;">
                <el-input type="textarea" v-model="form.clothing.descript" :autosize="{ minRows: 2, maxRows: 10 }"
                    :disabled="inputdisable"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
 
<script >
import axios from 'axios';
import TagsView from './TagsView.vue';
import {nextTick} from 'vue';
export default {
    name: 'EditCoatView',
    components: {TagsView},
    props: {
        fetchData: {
            type: Function,
            required: true
        },
        inputdisable: { type: Boolean, default: true }
    },
    data() {
        return {
            form: {
                id: '',
                clothingLength: '',
                shoulderWidth: '',
                bodyWidth: '',
                sleeveLength: '',
                waitswidth:'',
                hips: '',
                pantslength:'',
                pantsopeningwidth:'',
                clothing: {
                    id: '',
                    name: '',
                    url: '',
                    descript: '',
                    srcList: '',
                    size: '',
                    price: '',
                    buytime: '',
                    season:''
                }
            },
            tempUrl: '',
            formItems: [], // 表单项配置对象数组
            seasonoption: [ 
                {label: '夏', value: 0},
                {label: '冬', value: 1},
                {label: '春秋', value: 2}],
        }
    },
    methods: {
        dataInit(data) {
            if (data) {
                this.form = data
                this.form.clothing.srcList = JSON.stringify(data.clothing.srcList);
                // this.form.url = data.url;
                // this.form.name = data.name;
                // this.form.descript = data.descript;
                // this.form.id = data.id;
                nextTick(()=>{
                    this.$refs.tagWindow.initdata(this.form.clothing)
                })
            }
        },
        newInit(type) {
            this.isnewclothing=true
            console.info(type)
            if (type!=null) {
                this.form.clothing.type = type
                nextTick(()=>{
                    this.$refs.tagWindow.initdata(this.form.clothing)
                })
            }
        },
        handleChange(file, fileList) {
            this.tempUrl = URL.createObjectURL(file.raw);
        },
        async updataform() {
            const form1 = this.form;
            if (form1.clothing.url == '' || form1.clothing.name == '' 
            ||form1.clothing.url==null||form1.clothing.name==null) {
                alert('请填写完整信息')
                return false
            }
            form1.clothing.srcList = '["' + this.form.clothing.url + '"]';

            if(!form1.clothing.userid){
                form1.clothing.userid=localStorage.getItem('userid');
            }
            console.info(form1);
            await axios.post('/v1/underwear/add', form1)
                .then((response) => {
                    console.info("提交成功");
                    if(this.isnewclothing){
                        this.newclothingid=response.data.clothing.id
                        this.$refs.tagWindow.newclothing(this.newclothingid)
                    }

                })
                .catch((error) => {
                    console.error(error);
                    alert('表单提交失败');
                    return false
                });
            clearTimeout(this.timer);  //清除延迟执行 

            this.timer = setTimeout(() => {   //设置延迟执行
                this.fetchData()
            }, 500);
            return true

        },
        //实现图片上传功能
        httpRequest(item) {
            //验证图片格式大小信息
            const isJPG = item.file.type == 'image/jpeg' || item.file.type == 'image/png';
            const isLt2M = item.file.size / 1024 / 1024 < 20;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 20MB!');
            }
            //图片格式大小信息没问题 执行上传图片的方法
            if (isJPG && isLt2M == true) {
                // post上传图片
                const formData = new FormData();
                formData.append('smfile', item.file);

                axios.post('/api/v2/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        'Authorization': 'BYzKn7Fsu7jjuvh03tD7ltWe1qP0TJbM',
                    },
                    timeout: 60000
                }).then((res) => {
                    if (res.data.code == "image_repeated") {
                        console.info("图片已存在")
                        this.form.clothing.url = res.data.images
                    } else {
                        console.log(res.data.data.url);
                        this.form.clothing.url = res.data.data.url
                    }

                });

            }
        },
        uploadImages(item) {
            //验证图片格式大小信息
            const isJPG = item.file.type == 'image/jpeg' || item.file.type == 'image/png';
            const isLt2M = item.file.size / 1024 / 1024 < 20;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 或 PNG 格式!');
            }
            if (!isLt2M) {
                this.$message.error('上传图片大小不能超过 20MB!');
            }
            //图片格式大小信息没问题 执行上传图片的方法
            if (isJPG && isLt2M == true) {
                // post上传图片
                const formData = new FormData();
                formData.append('file', item.file);
                axios.post('/v1/uploadImages', formData).then((res) => {
                    this.form.clothing.url=res.data
                }).catch((err) =>{console.log(err)});
            }
        },
    },
}
</script>


<style lang="less" scoped>
.mycontainer {
    display: flex;
    flex-direction: column;
    justify-content: space-around
}

.avatar-uploader {
    margin-top: 20px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 108px;
    height: 108px;
}

.avatar-uploader:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}

.avatar {
    width: 108px;
    height: 108px;
    display: flex;
}
.el-form-inline {
    display: flex;
    flex-wrap: wrap;
}
.el-form-item {
    width: 90%;
}
</style>