<template>
  <div class="column-search-by-time" :class="{ 'search-show': searchShow }" :style="{ 'color': searchShow ? theme : '' }">
    <el-popover ref="popover" placement="bottom" trigger="click" v-model="visible" @hide="hideSearch">

      <el-date-picker v-model="time" type="datetimerange" range-separator="-" :start-placeholder="$t(`common['Start time']`)"
        :end-placeholder="$t(`common['End time']`)" clearable @clear="searchTable">
      </el-date-picker>
      <div :style="{'text-align':'right','padding':'10px 0 0'}">
        <el-button type="success" @click="searchTable" size="mini">{{ $t('common.Confirm') }}</el-button>
      </div>

      <div slot="reference" class="col-name" @click.stop="open">
        <div class="svgicon">
          <svg-icon icon-class="filter" />
        </div>

        <div class="col-search-wrapper">
          <span :title="titleName">{{ titleName }}</span>
        </div>
      </div>
    </el-popover>
  </div>
</template>
<script>
export default {
  name: 'timeFilter',
  props: {
    titleName: {
      type: String,
      required: true
    },
    queryKey: {
      type: String,
      required: true
    },
    defaultVal: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      time: null,
      searchShow: false,
      saveTime: "",
      visible: false
    }
  },
  created() {
    this.time = this.defaultVal
    this.saveTime = this.time
    this.searchShow = !!this.time
  },
  computed: {
    theme() {
      return this.$store.state.settings.theme;
    }
  },
  methods: {
    hideSearch() {
      this.time = this.saveTime
      this.searchShow = !!this.time
    },
    searchTable() {
      this.saveTime = this.time
      this.searchShow = !!this.time
      this.$emit("search-list", {
        prop: this.queryKey,
        searchTime: this.time
      })
      this.visible = false
    },
    open() {
      if (this.visible) this.$refs.popover.doClose(),
        window.event.stopImmediatePropagation();
      else {
        this.searchShow = true;
        var e = document.createElement("div");
        document.body.append(e),
          e.click(),
          document.body.removeChild(e)
      }

    }
  }
}
</script>