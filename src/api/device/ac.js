import request from '@/utils/request'

// 查询ac列表
export function getACList(query) {
  return request({
    url: '/ac/list',
    method: 'get',
    params: query
  })
}

// 删除ac
export function delOperlog(operId) {
  return request({
    url: '/log/operlog/' + operId,
    method: 'delete'
  })
}

// 重启
export function deviceRestart(data) {
  console.log(data);
  return request({
    url: '/ac/deviceRestart',
    method: 'post',
    data:data
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