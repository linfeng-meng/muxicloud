import request from '@/utils/request'

// 查询2.4/5G接入数、终端认证状态、上下行速率
export function getStaStatus(query) {
  return request({
    url: 'panel/staStatus',
    method: 'get',
    params: query
  })
}
// 查询activeAp
export function getHealthStatus(query) {
  return request({
    url: 'panel/getHealthStatus',
    method: 'get',
    params: query
  })
}
// 查询activeAp
export function getActiveAp(query) {
  return request({
    url: 'panel/activeApMap',
    method: 'get',
    params: query
  })
}
// 查询告警
export function getAlarmMap(query) {
  return request({
    url: 'panel/alarmMap',
    method: 'get',
    params: query
  })
}
// 查询signal
export function getSignalMap(query) {
  return request({
    url: 'panel/staSignalMapCustom',
    method: 'get',
    params: query
  })
}
// 查询Channel
export function getChannelMap(query) {
  return request({
    url: 'panel/staChannelMap',
    method: 'get',
    params: query
  })
}
// 查询Channel
export function getOnlineTimeMap(query) {
  return request({
    url: 'panel/onlineTimeMap',
    method: 'get',
    params: query
  })
}