const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  language: state => state.app.language,
  dict: state => state.dict.dict,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  topbarRouters:state => state.permission.topbarRouters,
  defaultRoutes:state => state.permission.defaultRoutes,
  sidebarRouters:state => state.permission.sidebarRouters,
  //site
  enterpriseSiteList:state => state.enterprise.enterpriseSiteList,
  currentSite:state => state.enterprise.currentSite,
  siteIDs:state => state.enterprise.siteIDs,
  siteTreeFresh:state => state.enterprise.siteTreeFresh,
}
export default getters
