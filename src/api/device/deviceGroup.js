
import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/common";

export function getGroup(data) {
  return request({
    url: '/deviceGroup/list',
    method: 'post',
    params: data
  })
}
export function getGroupView(data) {
  return request({
    url: '/deviceGroup/view?groupUUID=' + parseStrEmpty(data),
    method: 'get'
  })
}
// 新增Group
export function createGroup() {
  return request({
    url: '/deviceGroup/create',
    method: 'post'
  })
}
// 修改Group
export function updateGroup(data) {
  return request({
    url: '/deviceGroup/update',
    method: 'put',
    data:data
  })
}
// 删除Group
export function removeGroupBatch(data) {
  return request({
    url: '/deviceGroup/deleteBatch',
    method: 'delete',
    data:data
  })
}
export function removeGroup(data) {
  return request({
    url: '/deviceGroup/delete',
    method: 'delete',
    data:data
  })
}
