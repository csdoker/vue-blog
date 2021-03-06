import request from '@/utils/request'

export function getArticle (number) {
  return request({
    url: `https://api.github.com/repos/csdoker/blog-server/issues/${number}`,
    method: 'get'
  })
}

export function getArticles (page = 1, per_page = 5) {
  return request(
    {
      url: 'https://api.github.com/repos/csdoker/blog-server/issues',
      method: 'get',
      params: {
        page,
        per_page
      }
    }
  )
}

export function getAllArticles () {
  return request(
    {
      url: 'https://api.github.com/repos/csdoker/blog-server/issues',
      method: 'get'
    }
  )
}

export function getBlogEntries () {
  return request({
    url: 'https://raw.githubusercontent.com/csdoker/blog-server/master/data/blogs.json',
    method: 'get'
  })
}
