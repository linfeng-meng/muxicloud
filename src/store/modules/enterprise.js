import cache from '@/plugins/cache'

import { enterpriseTreeSelect } from "@/api/system/user";
import user from './user'

const state = {
  roleInfo: [],
  currentSite: {
    id: "",
    parentId: 0,
    type: "",
    name: "",
    firstSiteId: "",
    firstName: ""
  },
  enterpriseSiteList: "",
  siteIDs: [],
  siteTreeFresh: !1,
}

const mutations = {
  SET_CURRENT_SITE: function (state, t) {
    state.currentSite = Object.assign({}, t)
  },
  SET_SITE_TREE_FRESH: function (state, t) {
    state.siteTreeFresh = t
  },
  SET_SITE_IDS: function (state, t) {
    state.siteIDs = t
  },
  SET_ENTER_SITE: function (state, enterpriseSiteList) {
    state.enterpriseSiteList = enterpriseSiteList
  }
}

const actions = {
  getCurrentSite({ commit }, data) {

  },
  getSiteTreeList({ commit }) {
    return new Promise((resolve, reject) => {
      enterpriseTreeSelect().then(res => {
        const trees = res.data.trees
        const defaultTree = res.data.defaultTree
        const currentSiteId = cache.local.get("last_select_site_id")
        const idArray = siteIds(trees)
        commit('SET_ENTER_SITE', trees)
        commit('SET_SITE_IDS', idArray)
        let id, type, parentId, name, firstName, firstSiteId
        if (currentSiteId && idArray.includes(currentSiteId)) {
          id = currentSiteId
          const currentSiteData = getCurrentSiteDetail(currentSiteId, trees)
          if (currentSiteData.enterprisename) {
            type = 1
            parentId = 0
            name = currentSiteData.enterprisename
            if (currentSiteData.site && currentSiteData.site.length > 0) {
              firstName = currentSiteData.site[0].sitename
              firstSiteId = currentSiteData.site[0].siteuuid
            }
          } else {
            type = 2
            name = firstName = currentSiteData.sitename
            parentId = firstSiteId = currentSiteData.enterpriseuuid
          }
          commit('SET_CURRENT_SITE', {
            id,
            type,
            parentId,
            name,
            firstName,
            firstSiteId
          })
        } else {
          if(defaultTree&&defaultTree.site.length>0){
            const defaultSite = defaultTree.site[0]
            type = 2
            name = firstName = defaultSite.sitename
            id = firstSiteId = defaultSite.siteuuid
            parentId = defaultSite.enterpriseuuid
            cache.local.set("last_select_site_id",id)
          } else {
            type = 1
            parentId = 0
            id = trees[0].enterpriseuuid
            name = trees[0].enterprisename
            if (trees[0].site && trees[0].site.length > 0) {
              firstName = trees[0].site[0].sitename
              firstSiteId = trees[0].site[0].siteuuid
            }
            cache.local.set("last_select_site_id",id)
          }
          commit('SET_CURRENT_SITE', {
            id,
            type,
            parentId,
            name,
            firstName,
            firstSiteId
          })
        }
        resolve(res.data.trees)
      })
    })
  },

  changeSite({ commit, dispatch }, data) {
    commit('SET_CURRENT_SITE', data.currentSite)
    cache.local.set("last_select_site_id", data.currentSite.id)
    // data()

  },
  setSite({ commit }, site) {
    commit('SET_SITE', site)
  }
}
//获取企业站点id数组
function siteIds(e) {
  var t = [];
  return e.forEach(function (e) {
    t.push(e.enterpriseuuid), e.site instanceof Array && e.site.length > 0 && e.site.forEach(function (e) {
      t.push(e.siteuuid)
    })
  }), t
}
function getCurrentSiteDetail(e, t) {
  for (var n = t.length, r = 0; r < n; r++) {
    if (t[r].enterpriseuuid === e) return t[r];
    if (t[r].site && t[r].site instanceof Array)
      for (var a = t[r].site.length, o = 0; o < a; o++)
        if (t[r].site[o].siteuuid === e) return t[r].site[o]
  }
  return !1
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
