const state = {
  toolbar: {
    opened: false,
    keyword: '',
    tabs: [false, false]
  },
  blogEntries: [],
  articles: [],
  article: {},
  previousArticle: {},
  nextArticle: {}
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
  SET_BLOGENTRIES: (state, blogEntries) => {
    state.blogEntries = blogEntries
  },
  SET_ARTICLES: (state, articles) => {
    state.articles = articles
  },
  SET_ARTICLE: (state, article) => {
    state.article = article
  },
  SET_PREVIOUS_ARTICLE: (state, article) => {
    state.previousArticle = article
  },
  SET_NEXT_ARTICLE: (state, article) => {
    state.nextArticle = article
  }
}

export default {
  state,
  mutations
}
