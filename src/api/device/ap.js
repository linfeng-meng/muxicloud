import request from '@/utils/request'
import { parseStrEmpty } from "@/utils/common";

// 查询cap列表
export function getCAPList(query) {
  return request({
    url: '/cap/list',
    method: 'get',
    params: query
  })
}