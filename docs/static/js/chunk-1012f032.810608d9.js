(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1012f032"],{"230c":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"article-container"},[i("article",{staticClass:"article-content",class:{show:t.toolbar.opened}},[i("div",{staticClass:"article-inner"},[i("header",{staticClass:"article-header"},[i("div",{staticClass:"article-header-inner"},[i("h1",{staticClass:"article-title"},[t._v(t._s(t.article.name))]),i("div",{staticClass:"article-date"},[i("i",{staticClass:"date-icon iconfont icon-calendar"}),i("span",{staticClass:"date-time"},[t._v(t._s(t.article.date))])])])]),i("div",{staticClass:"article-entry"},[i("div",{staticClass:"article-data"},[i("marked-content",{attrs:{content:t.article.content}})],1)]),i("div",{staticClass:"article-info"},[i("div",{staticClass:"article-tag"},[i("i",{staticClass:"tag-icon iconfont icon-tag-fill"}),t._l(t.article.tags,(function(e){return i("div",{key:e.id,staticClass:"tag-item",style:"background-color: #"+e.color+";border-right-color: #"+e.color,on:{click:function(i){return i.stopPropagation(),t.handleClickTag(e.name)}}},[t._v(" "+t._s(e.name)+" ")])}))],2),i("div",{staticClass:"article-share"})])])]),i("nav",{staticClass:"article-nav",class:[t.previousArticle.name?"":"start",t.nextArticle.name?"":"end"]},[t.nextArticle.name?i("router-link",{staticClass:"nav-link",attrs:{tag:"a",to:{name:"Article",params:{name:t.nextArticle.name}}}},[i("i",{staticClass:"link-icon iconfont icon-arrowleft"}),i("span",{staticClass:"link-name"},[t._v(t._s(t.nextArticle.name))])]):t._e(),t.previousArticle.name?i("router-link",{staticClass:"nav-link",attrs:{tag:"a",to:{name:"Article",params:{name:t.previousArticle.name}}}},[i("span",{staticClass:"link-name"},[t._v(t._s(t.previousArticle.name))]),i("i",{staticClass:"link-icon iconfont icon-arrowright"})]):t._e()],1)])},n=[],r=(i("a4d3"),i("4de4"),i("d81d"),i("b0c0"),i("e439"),i("dbb4"),i("b64b"),i("159b"),i("ade3")),c=i("2423"),s=i("2f62"),o=i("58ee");function l(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function u(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?l(Object(i),!0).forEach((function(e){Object(r["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var d={name:"Article",components:{MarkedContent:o["a"]},data:function(){return{}},watch:{$route:{handler:"getData",immediate:!0}},computed:u({},Object(s["c"])({toolbar:function(t){return t.app.toolbar},article:function(t){return t.app.article},blogEntries:function(t){return t.app.blogEntries},previousArticle:function(t){return t.app.previousArticle},nextArticle:function(t){return t.app.nextArticle}})),methods:u({getData:function(){var t=this,e=this.blogEntries.filter((function(e){return e.name===t.$route.params.name}))[0];this.setPreviousArticle(1===e.id?{}:this.blogEntries.filter((function(t){return t.id===e.id-1}))[0]),this.setNextArticle(e.id===this.blogEntries.length?{}:this.blogEntries.filter((function(t){return t.id===e.id+1}))[0]),Object(c["a"])(e.id).then((function(i){e.content=i.body,e.tags=i.labels.map((function(t){return{name:t.name,color:t.color,id:t.id}})),t.setArticle(e)}))},handleClickTag:function(t){this.openToolbar(),this.setKeyword("#".concat(t))}},Object(s["b"])({openToolbar:"OPEN_TOOLBAR",setKeyword:"SET_KEYWORD",setArticle:"SET_ARTICLE",setPreviousArticle:"SET_PREVIOUS_ARTICLE",setNextArticle:"SET_NEXT_ARTICLE"}))},p=d,f=(i("c42d"),i("2877")),b=Object(f["a"])(p,a,n,!1,null,"825d658c",null);e["default"]=b.exports},"478c":function(t,e,i){},c42d:function(t,e,i){"use strict";var a=i("478c"),n=i.n(a);n.a}}]);