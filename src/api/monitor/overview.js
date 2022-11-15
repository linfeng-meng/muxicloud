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
    method: 'get',

  })
}
export function getSiteInfo(query) {
  return request({
    url: '/monitor/getSiteInfo',
    method: 'get',
    params: query
  })
}