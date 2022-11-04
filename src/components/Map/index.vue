<template>
  <div class='map-wrap'>
    <baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" :point="true" @ready="handler">
      <bm-marker :position="center" :dragging="true" />
      <bm-view class="map" />
      <!-- 官网搜索api -->
      <!-- <bm-control :offset="{width: '10px', height: '10px'}">
            <bm-auto-complete v-model="address" :sugStyle="{zIndex: 3000}">
            <input placeholder="请输入地名关键字" />
            </bm-auto-complete>
        </bm-control> -->
      <!-- <bm-local-search :keyword="address" :auto-viewport="true" @searchcomplete="onSearchComplete" :panel="false" /> -->
    </baidu-map>
    <div class="search-wrap">
      <!-- 搜索框 -->
      <div class="search">
        <el-input placeholder="请输入内容" @keyup.enter.native="handleSearch" v-model="address" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
      <!-- 检索结果 -->
      <div v-show="showResultFlag" class="search-result">
        <div v-for="(item, index) in searchResult" class="item" :key="index" @click="handleSelect(item)">
          <p class="title">{{ item.title }}</p>
          <p class="address">{{ item.address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const defaultInfo = {
  lng: 0,
  lat: 0,
  addressStr: '',
  title: '',
  province: '', // 省
  city: '', // 市
  district: '' // 区
}
export default {
  name: 'Map',
  // props: {
  //   "center":{
  //     default:{lng: 116.404, lat: 39.915}
  //   },
  //   "address":{
  //     type:String,
  //     default:""
  //   },
  // },
  data() {
    return {
      BMap: null,
      map: null,
      zoom: 15,//地图放大缩小的值
      center: { lng: 116.404, lat: 39.915 },//地图坐标
      address: '',//搜索地址
      searchResult: [],//自动匹配地址结果
      showResultFlag: false,
      selectInfo: Object.assign({}, defaultInfo)
    }
  },
  mounted(){
    this.address = ""
  },
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      const geolocation = new BMap.Geolocation()
      const that = this
      geolocation.getCurrentPosition(function (r) {
        const position = {
          lng: r.point.lng,
          lat: r.point.lat
        }
        that.center = position
      }, { enableHighAccuracy: true })
      this.zoom = 15
    },
    handleSelect(item) {
      let self = this
      // console.log('item', item)
      let title = item.title
      let { lng, lat } = item.marker.point
      // 以下代码是为了根据经纬度去转换出 省、市、区的信息出来。如果，不需要，可以自行修改。
      let point = new this.BMap.Point(lng, lat)
      let geoc = new this.BMap.Geocoder()
      geoc.getLocation(point, function (res) {
        let addString =
          res.addressComponents.province + res.addressComponents.city + res.addressComponents.district + title
        self.showResultFlag = false
        self.address = addString
        self.map.clearOverlays() //清除地图上所有覆盖物point
        self.map.addOverlay(new self.BMap.Marker({ lng, lat }))
        self.center.lng = lng
        self.center.lat = lat
        self.zoom = 20,
        self.selectInfo = {
          lng,
          lat,
          addressStr: addString,
          title: title,
          province: res.addressComponents.province,
          city: res.addressComponents.city,
          district: res.addressComponents.district
        }
      })
    },
    onSearchComplete(res) {
      if (res && res.Xr) {
        this.searchResult = [...res.Xr]
        if (this.searchResult.length > 0) {
          this.showResultFlag = true
        } else {
          this.showResultFlag = false
        }
      }
    },
    handleSearch() {
      let self = this
      // self.showResultFlag = true
      self.selectInfo = Object.assign({}, defaultInfo)
      let local = new this.BMap.LocalSearch(this.map, {
        renderOptions: {
          map: this.map,
          selectFirstResult: false
        },
        onSearchComplete: function (res) {
          console.log(res);
          if (res && res.Xr) {
            self.searchResult = [...res.Xr]
            if (self.searchResult.length > 0) {
              self.showResultFlag = true
            } else {
              self.showResultFlag = false
            }
          } else {
            self.showResultFlag = false
          }
        }
      })
      local.search(this.address)
    }
  }
}
</script>
<style lang="scss" scoped>
.map-wrap {
  position: relative;
  .search{
    width: 300px;
    margin: 5px;
  }
  .search-result{
    width: 300px;
    margin-left: 5px;
    padding: 10px;
    background: #fff;
    max-height: 300px;
    overflow-y: auto;
  }
  .bm-view {
    height: 500px;

    .map {
      width: 100%;
      height: 100%;
    }
  }
  .search-wrap{
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
