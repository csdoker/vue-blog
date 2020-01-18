const state = {
  toolbar: {
    opened: false,
    keyword: '',
    tabs: [false, false]
  },
  articles: []
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
  SET_ARTICLES: (state, articles) => {
    state.articles = articles
  }
}

export default {
  state,
  mutations
}
