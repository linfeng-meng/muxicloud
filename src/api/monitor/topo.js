import request from '@/utils/request'

export function getMonitorData() {
  return request({
    url: '/monitor/getMonitorData',
    method: 'get'
  })
}
export function getAllSite() {
  return request({
    url: '/monitor/getAllSite',
    method: 'get'
  })
}