<template>
  <el-dropdown trigger="click" class="international" @command="handleSetLanguage">
    <span class="el-dropdown-link">
      {{language}}
      <!-- <svg-icon class-name="international-icon" icon-class="language" /> -->
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item :disabled="language==='zh'" command="zh">
        中
      </el-dropdown-item>
      <el-dropdown-item :disabled="language==='en'" command="en">
        EN
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
export default {
  computed: {
    language() {
      switch (this.$store.getters.language) {
        case 'en':
          return "EN"
        case 'zh':
          return "中"
        default:
          return "中"
      }
    }
  },
  methods: {
    handleSetLanguage(lang) {
      this.$i18n.locale = lang
      this.$store.dispatch('app/setLanguage', lang)
      this.$message({
        message: this.$t('common["Switch Language Success"]'),
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .el-dropdown-link {
    cursor: pointer;
    font-size: 18px;
  }

</style>
