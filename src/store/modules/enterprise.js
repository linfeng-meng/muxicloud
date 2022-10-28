// import cache from '@/plugins/cache'

const state = {
  enterprise: "",
  site: ""
}

const mutations = {
  SET_ENTERPRISE: (state, enterprise) => {
    state.enterprise = enterprise
    // cache.local.set("last_select_site_id",enterprise)
  },
  SET_SITE: (state, site) => {
    state.site = site
    // cache.local.set("last_select_site_id",)
  }
}

const actions = {
  setEnterprise({ commit }, enterprise) {
    commit('SET_ENTERPRISE', enterprise)
  },
  setSite({ commit }, site) {
    commit('SET_SITE', site)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
