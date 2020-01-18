import request from '@/utils/request'

export function getArticle (params) {
  return request({
    url: '/api/post',
    method: 'get',
    params
  })
}

export function getArticles (page = 1) {
  return request(
    {
      url: 'https://api.github.com/repos/csdoker/blog-server/issues',
      method: 'get',
      params: {
        page,
        per_page: 5
      }
    }
  )
}
