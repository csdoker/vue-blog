(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-003440f1"],{"230c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"article-container"},[n("article",{staticClass:"article-content",class:{show:t.toolbar.opened}},[n("div",{staticClass:"article-inner"},[n("header",{staticClass:"article-header"},[n("div",{staticClass:"article-header-inner"},[n("h1",{staticClass:"article-title"},[t._v(t._s(t.article.name))]),n("div",{staticClass:"article-date"},[n("i",{staticClass:"date-icon iconfont icon-calendar"}),n("span",{staticClass:"date-time"},[t._v(t._s(t.article.date))])])])]),n("div",{staticClass:"article-entry"},[n("div",{staticClass:"article-data"},[n("marked-content",{attrs:{content:t.article.content}})],1)]),n("div",{staticClass:"article-info"},[n("div",{staticClass:"article-tag"},[n("i",{staticClass:"tag-icon iconfont icon-tag-fill"}),t._l(t.article.tags,(function(e){return n("div",{key:e.id,staticClass:"tag-item",style:"background-color: #"+e.color+";border-right-color: #"+e.color,on:{click:function(n){return n.stopPropagation(),t.handleClickTag(e.name)}}},[t._v(" "+t._s(e.name)+" ")])}))],2),n("div",{staticClass:"article-share"})])])]),n("nav",{staticClass:"article-nav",class:[t.previousArticle.name?"":"start",t.nextArticle.name?"":"end"]},[t.nextArticle.name?n("router-link",{staticClass:"nav-link",attrs:{tag:"a",to:{name:"Article",params:{name:t.nextArticle.name}}}},[n("i",{staticClass:"link-icon iconfont icon-arrowleft"}),n("span",{staticClass:"link-name"},[t._v(t._s(t.nextArticle.name))])]):t._e(),t.previousArticle.name?n("router-link",{staticClass:"nav-link",attrs:{tag:"a",to:{name:"Article",params:{name:t.previousArticle.name}}}},[n("span",{staticClass:"link-name"},[t._v(t._s(t.previousArticle.name))]),n("i",{staticClass:"link-icon iconfont icon-arrowright"})]):t._e()],1)])},i=[],r=(n("a4d3"),n("4de4"),n("d81d"),n("4e82"),n("b0c0"),n("e439"),n("dbb4"),n("b64b"),n("159b"),n("ade3")),c=n("2423"),s=n("2f62"),o=n("58ee"),l=n("2ef0"),u=n.n(l);function d(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,a)}return n}function p(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?d(Object(n),!0).forEach((function(e){Object(r["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):d(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var f={name:"Article",components:{MarkedContent:o["a"]},data:function(){return{}},watch:{$route:{handler:"getData",immediate:!0}},computed:p({},Object(s["c"])({toolbar:function(t){return t.app.toolbar},article:function(t){return t.app.article},blogEntries:function(t){return t.app.blogEntries},previousArticle:function(t){return t.app.previousArticle},nextArticle:function(t){return t.app.nextArticle}})),methods:p({getData:function(){var t=this;Object(c["d"])().then((function(e){t.setBlogEntries(e.sort((function(t,e){return e.id-t.id})));var n=u.a.cloneDeep(t.blogEntries),a=n.filter((function(e){return e.name===t.$route.params.name}))[0];t.setPreviousArticle(1===a.id?{}:n.filter((function(t){return t.id===a.id-1}))[0]),t.setNextArticle(a.id===n.length?{}:n.filter((function(t){return t.id===a.id+1}))[0]),Object(c["b"])(a.id).then((function(e){a.content=e.body,a.tags=e.labels.map((function(t){return{name:t.name,color:t.color,id:t.id}})),t.setArticle(a)}))}))},handleClickTag:function(t){this.openToolbar(),this.setKeyword("#".concat(t))}},Object(s["b"])({openToolbar:"OPEN_TOOLBAR",setKeyword:"SET_KEYWORD",setArticle:"SET_ARTICLE",setPreviousArticle:"SET_PREVIOUS_ARTICLE",setNextArticle:"SET_NEXT_ARTICLE",setBlogEntries:"SET_BLOGENTRIES"}))},b=f,m=(n("40d4"),n("2877")),v=Object(m["a"])(b,a,i,!1,null,"2caf0e28",null);e["default"]=v.exports},"40d4":function(t,e,n){"use strict";var a=n("55ee"),i=n.n(a);i.a},"55ee":function(t,e,n){}}]);