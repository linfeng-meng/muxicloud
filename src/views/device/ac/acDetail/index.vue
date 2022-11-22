<template>
  <div class="app-container">
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item :title="$t(`device['Device List']`)" name="1">
        <device></device>
      </el-collapse-item>
      <el-collapse-item :title="$t(`device['Memory Detail']`)" name="2">
        <memory></memory>
      </el-collapse-item>
      <el-collapse-item :title="$t(`device['CPU Detail']`)" name="3">
        <cpu></cpu>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import device from './device'
import memory from './memory'
import cpu from './cpu'
export default {
  components: {
    device, memory, cpu
  },
  data() {
    return {
      activeNames: ["1", "2", "3"]
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    }
  }
}
</script>
<style lang="scss">
.app-container {

  // ::v-deep .el-collapse-item__header {
  .el-collapse-item__header {
    padding: 0 10px;
    background: #f5f7fa !important;
  }

  .nearly {
    text-align: right
  }
}
</style>