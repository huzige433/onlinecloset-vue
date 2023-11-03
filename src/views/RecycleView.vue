<template>
    <div class="recycle">
        <el-container>
            <el-main>
                <el-page-header @back="goBack" v-if="showme"></el-page-header>
                <span v-if="showme">回收站</span>
                <el-card>
                    <el-row :gutter="10">
                        <el-col v-for="clothing in clothingdata" :key="clothing.id" :span="4">
                            <div class="bg-purple">
                                <el-image :src="clothing.url" style="width: 50px;height: auto;" @click="showButtons(clothing)"></el-image>
                                <div v-if="clothing.showButtons" style="position: relative; display: flex;align-items:flex-end;z-index: 9;flex-direction: column;">
                                    <el-button @click="redeleted(clothing.id)" type="primary" size="small">恢复</el-button>
                                    <el-button @click="remove(clothing.id)" type="danger" size="small">删除</el-button>
                                    <!-- <el-button @click="console.log(clothing)" type="primary" size="small">查看</el-button> -->
                                </div>
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
        const route = this.$route.path
        if (route === '/recycle') {
            this.showme=true
        }
    },
    methods: {
        goBack() {
            this.$router.push('/')

        },
        getdata(seasonnum) {
            const url = `/v1/recycle`
            axios.get(url, { headers: { "userid": localStorage.getItem("userid") } })
                .then((response) => {
                    this.clothingdata = response.data.map(clothing => {
                        return {
                            ...clothing,
                            showButtons: false
                        };
                    });

                })
                .catch((error) => {
                    console.log(error)
                })
        },
        redeleted(clothingid) {
            let _this = this;
            _this.$confirm("是否取回?").then(_ => {
                    console.log(clothingid)
                    const url = `/v1/redeleted/${clothingid}`
                    axios.get(url)
                        .then(response => {
                            console.log(response.data)
                            _this.clothingdata = _this.clothingdata.filter(item => item.id !== clothingid)
                        })
                        .catch(error => {
                            console.log(error)
                        })

                }).catch(_ => { })

        },
        remove(clothingid) {
            let _this = this;
            _this.$confirm("真的要彻底删除么?").then(_ => {
                    const url = `/v1/remove/${clothingid}`
                    axios.get(url)
                        .then(response => {
                            console.log(response.data)
                            _this.clothingdata = _this.clothingdata.filter(item => item.id !== clothingid)
                        })
                        .catch(error => {
                            console.log(error)
                        })

                }).catch(_ => { })

        },
        showButtons(clothing) {
            this.clothingdata.forEach(item => {
                if(item.id === clothing.id){
                    item.showButtons=!item.showButtons
                }else{
                    item.showButtons=false
                }
            });
            },
        

    },
    data() {
        return {
            clothingdata: [],
            options: [{ value: '0', label: '夏' },
            { value: '1', label: '冬' },
            { value: '2', label: '春秋' }
            ],
            value: '',
            timeOutEvent: 0, //记录触摸时长
            showme:false
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

.clearfix span {
    color: azure;
    font-size: large;
}
</style>