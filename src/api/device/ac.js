import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/common";

// 查询ac列表
export function getACList(query) {
  return request({
    url: '/ac/list',
    method: 'get',
    params: query
  })
}
// 查询单个ac详情
export function getACView(data) {
  return request({
    url: '/ac/view?deviceUUID=' + parseStrEmpty(data),
    method: 'get'
  })
}
// 新增ac
export function createDevice() {
  return request({
    url: '/ac/create',
    method: 'post'
  })
}
// 修改ac
export function updateDevice(data) {
  return request({
    url: '/ac/update',
    method: 'put',
    data:data
  })
}
// 删除ac
export function removeDeviceBatch(data) {
  return request({
    url: '/ac/deleteBatch',
    method: 'delete',
    data:data
  })
}
export function removeDevice(data) {
  return request({
    url: '/ac/delete',
    method: 'delete',
    data:data
  })
}

// 重启
export function deviceRestart(data) {
  console.log(data);
  return request({
    url: '/ac/deviceRestart',
    method: 'post',
    params:data
  })
}

export function deviceList(query) {
  return request({
    url: 'statistic/apList',
    method: 'get',
    params: query
  })
}

export function memoryPerformance(query) {
  return request({
    url: 'statistic/memoryPerformance',
    method: 'get',
    params: query
  })
}

export function cpuPerformance(query) {
  return request({
    url: 'statistic/cpuPerformance',
    method: 'get',
    params: query
  })
}