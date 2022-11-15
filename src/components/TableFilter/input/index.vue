<!-- 1.sortable时（表格排序情况下）：el-table-column组件必须添加属性 class-name="column-search-cell" 
  2. titleName 标题名称
     queruKey 属性key
     search-list 组件向父组件传递参数
  3. 标题中字体颜色改变 表示正在过滤当前字段
-->
<template>
  <div class="column-search">
    <div class="col-name" @click.stop="showSearch" :class="{'search-show': searchShow}">
      <div class="svgicon">
        <svg-icon icon-class="filter" class="" />
      </div>

      <div class="col-search-wrapper" :class="{ 'searching': searchShow }">
        <span :title="titleName">{{ titleName }}</span>
        <el-input :placeholder="$t(`common['Enter for search']`)" clearable v-show="searchShow" ref="searchInputTxt" v-model="search" size="mini"
          @keyup.enter.native="searchTable" @clear="searchTable" @blur="hideSearch"></el-input>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'inputFilter',
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
      search: null,
      searchShow: false,
      saveSearch: ""
    }
  },
  created() {
    this.defaultVal && (this.searchShow = true, this.search = this.defaultVal)
  },
  methods: {
    inputFocus() {
      this.$nextTick(function () {
        this.$refs.searchInputTxt.focus()
      })
    },
    showSearch() {
      this.searchShow = true
      this.inputFocus()
    },
    hideSearch() {
      this.search = this.saveSearch
      !this.search && this.searchShow && (this.searchShow = false)
    },
    searchTable() {
      this.saveSearch = this.search
      this.$emit("search-list", {
        prop: this.queryKey,
        searchTxt: this.search
      })
      this.hideSearch()
    }
  }
}
</script>
<style lang="scss">
.column-search {
  // background: red;
  margin-right: 24px;
  cursor: pointer;
  height: 35px;
}

.col-name {
  line-height: 35px;
  display: flex;

  .col-search-wrapper {
    flex: 1;
    display: flex;
    flex-direction: column;
  }


  .svgicon {
    font-size: 18px;
    line-height: 35px;
    vertical-align: center;
    margin-right: 5px;
  }
}

.search-show {
  color: blue;

  .searching {
    line-height: 15px;

    .el-input input {
      height: 20px;
      line-height: 20px;
      padding: 0 5px;
      border: none;
      border-radius: 0;
      border-bottom: 1px solid #444;
      background: none;
    }
    .el-input__icon{
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>