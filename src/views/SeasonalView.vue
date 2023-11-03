<template>
  <div class="seasonal">
    <el-container>
      <el-main>
        <el-page-header @back="goBack" content="按季节展示上装">
          <el-select v-model="value" placeholder="请选择" @change="getdata">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-button @click="value = null; getdata()">重置</el-button>
        </el-page-header>
        <el-card>
          <div slot="header" class="clearfix">
            <span style="color: black;">上装</span>
          </div>
          <el-row :gutter="10">
            <el-col v-for="clothing in coatdata" :key="clothing.id" :span="4">
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: 50px;"></el-image>
              </div>
            </el-col>
          </el-row>
        </el-card>

        <el-card>
          <div slot="header" class="clearfix">
            <span style="color: black;">下装</span>
          </div>
          <el-row :gutter="10">

            <el-col v-for="clothing in pantsdata" :key="clothing.id" :span="4">
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: 50px;"></el-image>
              </div>

            </el-col>
          </el-row>
        </el-card>
        <el-card>

          <div slot="header" class="clearfix">
            <span style="color: black;">内衣</span>
          </div>
          <el-row :gutter="10">
            <el-col v-for="clothing in underweardata" :key="clothing.id" :span="4">
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: 50px;"></el-image>

              </div>
            </el-col>
          </el-row>
        </el-card>
        <el-card>

          <div slot="header" class="clearfix">
            <span style="color: black;">鞋子</span>
          </div>
          <el-row :gutter="10">

            <el-col v-for="clothing in shoedata" :key="clothing.id" :span="4" style="padding-bottom: 15%;">
              <div class="bg-purple">
                <el-image :src="clothing.url" style="width: 50px; height: 50px;"></el-image>
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
  name: 'seasonal',
  created() {
    this.getdata();
  },
  methods: {
    goBack() {
      this.$router.push('/')

    },
    getdata(seasonnum) {
      var url;
      if (seasonnum === undefined || seasonnum === null) {
        url = `/v1/imglist`
      } else {
        url = `/v1/imglist/${seasonnum}`
      }
      axios.get(url, { headers: { "userid": localStorage.getItem('userid') } })
        .then((response) => {
          this.clothingdata = response.data;
          this.coatdata = this.clothingdata.filter((data) => { return data.type === 0 })
          this.sortArry(this.coatdata, 0)
          this.pantsdata = this.clothingdata.filter((data) => { return data.type === 1 })
          this.sortArry(this.pantsdata, 1)
          this.underweardata = this.clothingdata.filter((data) => { return data.type === 2 })
          this.sortArry(this.pantsdata, 2)
          this.shoedata = this.clothingdata.filter((data) => { return data.type === 3 })
          this.sortArry(this.pantsdata, 3)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    sortArry(arry,type){
      const headers = { 'userid': localStorage.getItem('userid') }
      axios.get(`/v1/sort/${type}`, { headers: headers }).then(
        (res) => {
          let order = res.data.sortarry
          console.log(order)
          const filteredArr = arry;
          filteredArr.sort((a, b) => {
            const indexA = order.indexOf(a.id);
            const indexB = order.indexOf(b.id);
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
      ).catch((error)=>{console.log(error)})
     
    }
  },
  data() {
    return {
      clothingdata: [],
      options: [{ value: '0', label: '夏' },
      { value: '1', label: '冬' },
      { value: '2', label: '春秋' }
      ],
      value: '',
      coatdata: [],
      pantsdata: [],
      underweardata: [],
      shoedata: [],
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>