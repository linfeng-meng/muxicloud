
import store from '@/store'

function filterMenu(arr = [], id) {
  const permissions = store.getters && store.getters.permissions
  let newArr = []
  arr.forEach(item =>{
    if(item.perms == "" || permissions.includes(item.perms)){
      newArr.push(item)
    }
  })
  let res = {}
  for (let i of newArr) {
    if (id == i.menuId) {    // 先找到跟节点
      res = {
        "name": i.path,
        "path": i.parentId == 0 ? `/${i.path}` : i.path,
        "hidden": false,
        "redirect": "noRedirect",
        "component": i.component ? i.component : "Layout",
        // "alwaysShow": true,
        "meta": {
          "title": i.menuName,
          "icon": i.icon,
          "noCache": false,
          "link": null
        }
      }
    }

    if (id == i.parentId && i.menuType != "F") {   // 把根节点的直接子节点递归收入其中      
      if (!res.children) res.children = []
      res.children.push(filterMenu(newArr, i.menuId))
    }
  }
  return res
}
export default {
  menu(menulist){
    const myTree = filterMenu(menulist, 0)
    const result = myTree.children.filter(item=>{
      return item.children && item.children.length > 0
    })
    return result
  }
}
