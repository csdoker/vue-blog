import { getArticles, getBlogEntries, getArticle, getAllArticles } from '@/api/article'

const state = {
  toolbar: {
    opened: false,
    keyword: '',
    tabs: [false, false]
  },
  perHomeCount: 5,
  perArchiveCount: 10,
  // blogEntries: [],
  totalCount: 0,
  articles: [],
  archives: [],
  article: {},
  allTags: [],
  previousArticle: {},
  nextArticle: {}
}

function getPagerCount (totalCount, perCount) {
  let pagerCount = 0
  if (totalCount % perCount === 0) {
    pagerCount = totalCount / perCount
  } else {
    pagerCount = (totalCount - totalCount % perCount) / perCount + 1
  }
  return pagerCount
}

const getters = {
  pagerHomeCount: state => {
    return getPagerCount(state.totalCount, state.perHomeCount)
  },
  pagerArchiveCount: state => {
    return getPagerCount(state.totalCount, state.perArchiveCount)
  }
}

const mutations = {
  OPEN_TOOLBAR: state => {
    state.toolbar.opened = true
    state.toolbar.tabs = [true, false]
  },
  CLOSE_TOOLBAR: state => {
    state.toolbar.opened = false
  },
  TOGGLE_TABS: (state, index) => {
    state.toolbar.tabs = [false, false]
    state.toolbar.tabs[index] = true
  },
  SET_KEYWORD: (state, keyword) => {
    state.toolbar.keyword = keyword
  },
  // SET_BLOGENTRIES: (state, blogEntries) => {
  //   state.blogEntries = blogEntries
  // },
  SET_ARTICLES: (state, articles) => {
    state.articles = articles
  },
  SET_ARCHIVES: (state, archives) => {
    state.archives = archives
  },
  SET_ALL_TAGS: (state, allTags) => {
    state.allTags = allTags
  },
  SET_ARTICLE: (state, article) => {
    state.article = article
  },
  SET_PREVIOUS_ARTICLE: (state, article) => {
    state.previousArticle = article
  },
  SET_NEXT_ARTICLE: (state, article) => {
    state.nextArticle = article
  },
  SET_TOTAL_COUNT: (state, totalCount) => {
    state.totalCount = totalCount
  }
}

const actions = {
  getBlogEntries ({ commit }) {
    return new Promise((resolve, reject) => {
      getBlogEntries().then(response => {
        const data = response.sort((a, b) => b.id - a.id)
        commit('SET_TOTAL_COUNT', data.length)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getArticles ({ commit }, params) {
    const { page, perPage, blogEntries } = params
    return new Promise((resolve, reject) => {
      getArticles(page, perPage).then(response => {
        const data = response
        const start = (page - 1) * perPage
        const end = start + perPage
        const articles = blogEntries.slice(start, end)
        resolve({ result: data, articles })
      }).catch(error => {
        reject(error)
      })
    })
  },
  getArticle ({ commit }, id) {
    return new Promise((resolve, reject) => {
      getArticle(id).then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  getAllArticles ({ commit }) {
    return new Promise((resolve, reject) => {
      getAllArticles().then(response => {
        const data = response
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
