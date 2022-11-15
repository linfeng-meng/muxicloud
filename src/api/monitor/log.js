import request from '@/utils/request'

// 查询操作日志列表
export function operlogList(query) {
  return request({
    url: '/log/operlogList',
    method: 'get',
    params: query
  })
}

// 删除操作日志
export function delOperlog(operId) {
  return request({
    url: '/log/operlog/' + operId,
    method: 'delete'
  })
}

// 清空操作日志
export function cleanOperlog() {
  return request({
    url: '/log/operlog/clean',
    method: 'delete'
  })
}

// 查询设备日志列表
export function devicelogList(query) {
  return request({
    url: '/log/devicelogList',
    method: 'get',
    params: query
  })
}

// 删除设备日志
export function delDevicelog(operId) {
  return request({
    url: '/log/devicelog/' + operId,
    method: 'delete'
  })
}

// 清空设备日志
export function cleanDevicelog() {
  return request({
    url: '/log/devicelog/clean',
    method: 'delete'
  })
}

// 查询终端日志列表
export function termlogList(query) {
  return request({
    url: '/log/termlogList',
    method: 'get',
    params: query
  })
}

// 删除终端日志
export function delTermlog(operId) {
  return request({
    url: '/log/termlog/' + operId,
    method: 'delete'
  })
}

// 清空终端日志
export function cleanTermlog() {
  return request({
    url: '/log/termlog/clean',
    method: 'delete'
  })
}
