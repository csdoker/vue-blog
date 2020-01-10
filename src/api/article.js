import request from '@/utils/request'

export function getArticle (params) {
  return request({
    url: '/api/post',
    method: 'get',
    params
  })
}
