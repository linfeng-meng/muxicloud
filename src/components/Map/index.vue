<template>
  <div class='map-wrap'>
    <baidu-map class="bm-view" :center="center" :zoom="zoom" :scroll-wheel-zoom="true" :point="true" @ready="handler">
      <bm-marker v-if="search" :position="center" :dragging="true" />
      <!-- <div v-for="(v, k) in markerdata" :key="k">
        <bm-marker :position="{ lng: v.lng, lat: v.lat }">
          <bm-label :content="v.sitename" :offset="{ width: 0, height: 0 }" />
        </bm-marker>
      </div> -->

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
      <div class="search" v-if="search">
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
import { getSiteInfo } from '@/api/monitor/overview'
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
  props: {
    search: {
      default: true
    },
    markerdata: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      BMap: null,
      map: null,
      marker: [],
      zoom: 6,//地图放大缩小的值
      center: { lng: 116.404, lat: 39.915 },//地图坐标
      address: '',//搜索地址
      searchResult: [],//自动匹配地址结果
      showResultFlag: false,
      selectInfo: Object.assign({}, defaultInfo)
    }
  },
  mounted() {
    this.address = ""
  },
  methods: {
    handler({ BMap, map }) {
      this.BMap = BMap
      this.map = map
      this.setMarker()
    },
    setMarker(){
      this.map.clearOverlays()
      let bPoints = []
      if (this.markerdata.length > 0) {
        for (let i = 0; i < this.markerdata.length; i++) {
          const statePoint = new this.BMap.Point(this.markerdata[i].lng, this.markerdata[i].lat);
          bPoints.push(statePoint)
          this.marker[i] = new this.BMap.Marker(statePoint);
          this.map.addOverlay(this.marker[i]);
          const label = new this.BMap.Label(this.markerdata[i].sitename, { offset: new BMap.Size(-10, 25) });
          // marker.setLabel(label);
          this.marker[i].setTitle(this.markerdata[i].sitename);
          this.marker[i].addEventListener("click", () => { this.getSiteDetail(i) }); //监听事件
        }
        this.setZoom(bPoints)
      } else {
        const geolocation = new BMap.Geolocation()
        const that = this
        geolocation.getCurrentPosition(function (r) {
          const position = {
            lng: r.point.lng,
            lat: r.point.lat
          }
          that.center = position
        }, { enableHighAccuracy: true })
      }
    },
    getSiteDetail(i) {
      getSiteInfo({ 'siteuuid': this.markerdata[i].siteuuid }).then(response => {
        const res = response.data
        let content = `<table cellpadding="0" cellspacing="0" class="labelTable">
          <tr>
            <td  width="100">AP</td>
            <td>
              <span class="status-icon GREEN"></span>${res.apOnlineNum} / <span class="status-icon GRAY"></span>${res.apOfflineNum}
            </td>
          </tr>
          <tr>
            <td>AC</td>
            <td>
              <span class="status-icon GREEN"></span>${res.acOnlineNum} / <span class="status-icon GRAY"></span>${res.acOfflineNum}
            </td>
          </tr>
          <tr>
            <td>${this.$t('common.Gateway')}</td>
            <td>
              <span class="status-icon GREEN"></span>${res.gwOnlineNum} / <span class="status-icon GRAY"></span>${res.gwOfflineNum}
            </td>
          </tr>
          <tr>
            <td>${this.$t('route.Switch')}</td>
            <td>
              <span class="status-icon GREEN"></span>${res.switchOnlineNum} / <span class="status-icon GRAY"></span>${res.switchOfflineNum}
            </td>
          </tr>
          <tr>
            <td>CAP</td>
            <td>
              <span class="status-icon GREEN"></span>${res.capOnlineNum} / <span class="status-icon GRAY"></span>${res.capOfflineNum}
            </td>
          </tr>
          <tr>
            <td>MESH</td>
            <td>
              <span class="status-icon GREEN"></span>${res.dsccOnlineNum} / <span class="status-icon GRAY"></span>${res.dsccOfflineNum}
            </td>
          </tr>
          <tr>
            <td>${this.$t('route.Controller')}</td>
            <td>
              <span class="status-icon GREEN"></span>${res.meshOnlineNum} / <span class="status-icon GRAY"></span>${res.meshOfflineNum}
            </td>
          </tr>
        </table>`
        const opts = {
          width: 250, // 信息窗口宽度
          height: 210, // 信息窗口高度
          title: '<h4>' + this.markerdata[i].sitename + '</h4>', // 信息窗口标题
          enableMessage: true, //设置允许信息窗发送短息
        }
        const infoWindow = new this.BMap.InfoWindow(content, opts);
        this.marker[i].openInfoWindow(infoWindow)
      })
    },
    setZoom(bPoints) {
      console.log(bPoints);
      var view = this.map.getViewport(eval(bPoints));
      var mapZoom = view.zoom;
      var centerPoint = view.center;
      console.log(mapZoom,centerPoint);
      this.map.centerAndZoom(centerPoint, mapZoom / 1.1);
    },
    handleSelect(item) {
      let self = this
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
          if (res && res.Yr) {
            self.searchResult = [...res.Yr]
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
  },
  watch: {
    markerdata: {
      handler: function (n) {
        this.map && this.setMarker()
      },
      deep: !0
    }
  }
}
</script>
<style lang="scss" scoped>
.map-wrap {
  height: 100%;
  position: relative;

  .search {
    width: 300px;
    margin: 5px;
  }

  .search-result {
    width: 300px;
    margin-left: 5px;
    padding: 10px;
    background: #fff;
    max-height: 300px;
    overflow-y: auto;
  }

  .bm-view {
    height: 100%;

    .map {
      width: 100%;
      height: 100%;
    }
  }

  .search-wrap {
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
