import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/common";
// 查询企业列表
export function getEnterpriseList(data) {
  return request({
    url: '/enterprise/list',
    method: 'post',
    data: data
  })
}
// 查询企业详细
export function getEnterprise(query) {
  return request({
    url: '/enterprise/view?enterpriseuuid=' + parseStrEmpty(query),
    // url: '/enterprise/view',
    method: 'get',
    // params: query
  })
}
// 新增企业
export function createEnterprise(data) {
  return request({
    url: '/enterprise/create',
    method: 'post',
    data: data
  })
}
// 编辑企业详细
export function updateEnterprise(data) {
  return request({
    url: '/enterprise/update',
    method: 'post',
    data: data
  })
}
// 删除企业
export function deleteEnterprise(data) {
  return request({
    url: '/enterprise/delete?enterpriseuuid=' + parseStrEmpty(data),
    method: 'delete'
  })
}
// 查询站点列表
export function getSiteList(data) {
  return request({
    url: '/site/list?siteuuid=' + parseStrEmpty(data),
    method: 'get'
  })
}
// 查询站点详细
export function getSite(data) {
  return request({
    url: '/site/view?siteuuid=' + parseStrEmpty(data),
    method: 'get'
  })
}
// 新增站点
export function createSite(data) {
  return request({
    url: '/site/create',
    method: 'post',
    data: data
  })
}
// 编辑站点详细
export function updateSite(data) {
  return request({
    url: '/site/update',
    method: 'post',
    data: data
  })
}
// 删除站点
export function deleteSite(data) {
  return request({
    url: '/site/delete?enterpriseuuid=' + parseStrEmpty(data),
    method: 'delete'
  })
}