<template>
  <div class="app-container">
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane :label="$t(`device['CAP Management']`)" name="cap">
        <CAP></CAP>
      </el-tab-pane>
      <el-tab-pane :label="$t(`device['AP Management']`)" name="ap">配置管理</el-tab-pane>
      <el-tab-pane :label="$t(`device['MESH Management']`)" name="mesh">角色管理</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import CAP from './CAP'
export default {
  name: 'AP',
  components: { CAP },
  data() {
    return {
      activeName: "cap"
    }
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    }
  }
}
</script>