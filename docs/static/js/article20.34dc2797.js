(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["article20"],{b4f6:function(s,a,r){"use strict";r.r(a);var t=function(){var s=this,a=s.$createElement;s._self._c;return s._m(0)},n=[function(){var s=this,a=s.$createElement,r=s._self._c||a;return r("section",[r("h2",[s._v("第七章：函数表达式")]),r("p",[s._v("通过一个非标准的name属性可以访问到给函数指定的名字：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 只在 Firefox、Safari、Chrome 和 Opera 有效")]),s._v("\nalert(functionName.name); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('// "functionName"')]),s._v("\n")])]),r("p",[s._v("函数声明提升：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[s._v("sayHi();\n"),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("sayHi")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    alert("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Hi!"')]),s._v(");\n}\n\nsayHi(); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//错误：函数还不存在")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" sayHi = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\nalert("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Hi!"')]),s._v(");\n};\n")])]),r("h3",[s._v("递归")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("factorial")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("num")]),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (num <= "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("){\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(";\n    } "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" num * factorial(num"),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-1")]),s._v(");\n    }\n}\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" anotherFactorial = factorial;\nfactorial = "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("null")]),s._v(";\nalert(anotherFactorial("),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("4")]),s._v(")); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//出错！")]),s._v("\n\n"),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// arguments.callee是一个指向正在执行的函数的指针（非严格模式下有效）")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("factorial")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("num")]),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (num <= "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("){\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(";\n    } "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" num * "),r("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("arguments")]),s._v(".callee(num"),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-1")]),s._v(");\n    }\n}\n\n"),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 严格模式下也有用")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" factorial = ("),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("f")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("num")]),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (num <= "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v("){\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(";\n    } "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" num * f(num"),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-1")]),s._v(");\n    }\n});\n")])]),r("h3",[s._v("闭包")]),r("p",[s._v("闭包是指有权访问另一个函数作用域中的变量的函数：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("createComparisonFunction")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("propertyName")]),s._v(") ")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("object1, object2")]),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" value1 = object1[propertyName];\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" value2 = object2[propertyName];\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (value1 < value2){\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("-1")]),s._v(";\n        } "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" (value1 > value2){\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("1")]),s._v(";\n        } "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("else")]),s._v(" {\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v(";\n        }\n    };\n}\n\n"),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//创建函数")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" compareNames = createComparisonFunction("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"name"')]),s._v(");\n"),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//调用函数")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" result = compareNames({ "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("name")]),s._v(": "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Nicholas"')]),s._v(" }, { "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("name")]),s._v(": "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Greg"')]),s._v(" });\n"),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//解除对匿名函数的引用（以便释放内存）")]),s._v("\ncompareNames = "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("null")]),s._v(";\n")])]),r("p",[s._v("createComparisonFunction()函数在执行完毕后，其活动对象不会被销毁，直到匿名函数被销毁后，createComparisonFunction()的活动对象才会被销毁。")]),r("h4",[s._v("闭包与变量")]),r("p",[s._v("闭包所保存的是整个变量对象，所以闭包只能取得包含函数中任何变量的最后一个值：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("createFunctions")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" result = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Array")]),s._v("();\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" i="),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v("; i++){\n        result[i] = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n            "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 每个函数都引用着保存变量 i 的同一个变量对象")]),s._v("\n            "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 所以在每个函数内部 i 的值都是 10")]),s._v("\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" i;\n        };\n    }\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" result;\n}\n")])]),r("p",[s._v("可以通过创建另一个匿名函数强制让闭包的行为符合预期：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("createFunctions")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" result = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Array")]),s._v("();\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" i="),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v("; i++){\n        result[i] = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("num")]),s._v(")")]),s._v("{\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n                "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" num;\n            };\n        }(i);\n    }\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" result;\n}\n")])]),r("h4",[s._v("关于this对象")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" name = "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"The Window"')]),s._v(";\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" object = {\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("name")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"My Object"')]),s._v(",\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("getNameFunc")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n            "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 内部函数搜索this和arguments只搜索到活动对象为止")]),s._v("\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".name;\n        };\n    }\n};\nalert(object.getNameFunc()()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"The Window"（在非严格模式下）')]),s._v("\n\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" name = "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"The Window"')]),s._v(";\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" object = {\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("name")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"My Object"')]),s._v(",\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("getNameFunc")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 把外部作用域中的this对象保存在一个闭包能够访问到的变量里")]),s._v("\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" that = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(";\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" that.name;\n        };\n    }\n};\nalert(object.getNameFunc()()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"My Object"')]),s._v("\n\n"),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 特殊情况下，this的值可能会意外地改变")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" name = "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"The Window"')]),s._v(";\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" object = {\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("name")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"My Object"')]),s._v(",\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("getName")]),s._v(": "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".name;\n    }\n};\nobject.getName(); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"My Object"')]),s._v("\n(object.getName)(); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"My Object"')]),s._v("\n(object.getName = object.getName)(); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"The Window"，在非严格模式下')]),s._v("\n")])]),r("h4",[s._v("内存泄漏")]),r("p",[s._v("如果闭包的作用域链中保存着一个HTML元素，那么就意味着该元素将无法被销毁：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("assignHandler")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" element = "),r("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("document")]),s._v(".getElementById("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"someElement"')]),s._v(");\n    element.onclick = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        alert(element.id);\n    };\n}\n")])]),r("p",[s._v("即使闭包不直接引用element，包含函数的活动对象中也仍然会保存一个引用。因此，有必要把element变量设置为null：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("assignHandler")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" element = "),r("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("document")]),s._v(".getElementById("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"someElement"')]),s._v(");\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" id = element.id;\n    element.onclick = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        alert(id);\n    };\n    element = "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("null")]),s._v(";\n}\n")])]),r("h3",[s._v("模仿块级作用域")]),r("p",[s._v("在块语句中定义的变量，实际上是在包含函数中而非语句中创建的：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("outputNumbers")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("count")]),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" i="),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < count; i++){\n        alert(i);\n    }\n    alert(i); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//计数")]),s._v("\n}\n")])]),r("p",[s._v("在JavaScrip中，变量i是定义在ouputNumbers()的活动对象中的，因此从它有定义开始，就可以在函数内部随处访问它。匿名函数可以用来模仿块级作用域并避免这个问题：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[s._v("("),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n"),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//这里是块级作用域")]),s._v("\n})();\n\n"),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("outputNumbers")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("count")]),s._v(")")]),s._v("{\n    ("),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("for")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" i="),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("0")]),s._v("; i < count; i++){\n            alert(i);\n        }\n    })();\n    alert(i); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//导致一个错误！")]),s._v("\n}\n")])]),r("h3",[s._v("私有变量")]),r("p",[s._v("私有变量包括函数的参数、局部变量和在函数内部定义的其他函数，有权访问私有变量和私有函数的公有方法称为特权方法：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("// 在构造函数中定义特权方法")]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("MyObject")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//私有变量和私有函数")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" privateVariable = "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(";\n    "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("privateFunction")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(";\n    }\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//特权方法")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".publicMethod = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        privateVariable++;\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" privateFunction();\n    };\n}\n")])]),r("p",[s._v("利用私有和特权成员，可以隐藏那些不应该被直接修改的数据：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("Person")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("name")]),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".getName = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" name;\n    };\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("this")]),s._v(".setName = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("value")]),s._v(") ")]),s._v("{\n        name = value;\n    };\n}\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" person = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Person("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Nicholas"')]),s._v(");\nalert(person.getName()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"Nicholas"')]),s._v("\nperson.setName("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Greg"')]),s._v(");\nalert(person.getName()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"Greg"')]),s._v("\n")])]),r("p",[s._v("构造函数模式的缺点是针对每个实例都会创建同样一组新方法")]),r("h4",[s._v("静态私有变量")]),r("p",[s._v("基本模式：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[s._v("("),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//私有变量和私有函数")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" privateVariable = "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(";\n    "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("privateFunction")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(";\n    }\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//构造函数")]),s._v("\n    MyObject = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    };\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//公有/特权方法")]),s._v("\n    MyObject.prototype.publicMethod = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        privateVariable++;\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" privateFunction();\n    };\n})();\n")])]),r("p",[s._v("这个特权方法，作为一个闭包，总是保存着对包含作用域的引用：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[s._v("("),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" name = "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('""')]),s._v(";\n    Person = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("value")]),s._v(")")]),s._v("{\n        name = value;\n    };\n    Person.prototype.getName = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" name;\n    };\n    Person.prototype.setName = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("value")]),s._v(")")]),s._v("{\n        name = value;\n    };\n})();\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" person1 = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Person("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Nicholas"')]),s._v(");\nalert(person1.getName()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"Nicholas"')]),s._v("\nperson1.setName("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Greg"')]),s._v(");\nalert(person1.getName()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"Greg"')]),s._v("\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" person2 = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" Person("),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"Michael"')]),s._v(");\nalert(person1.getName()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"Michael"')]),s._v("\nalert(person2.getName()); "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v('//"Michael"')]),s._v("\n")])]),r("p",[s._v("以这种方式创建静态私有变量会因为使用原型而增进代码复用，但每个实例都没有自己的私有变量。")]),r("h4",[s._v("模块模式")]),r("p",[s._v("模块模式（module pattern）是为单例创建私有变量和特权方法，所谓单例（singleton），指的就是只有一个实例的对象：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" singleton = {\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("name")]),s._v(" : value,\n    "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("method")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(") ")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//这里是方法的代码")]),s._v("\n    }\n};\n\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" singleton = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//私有变量和私有函数")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" privateVariable = "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(";\n    "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("privateFunction")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(";\n    }\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//特权/公有方法和属性")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" {\n        "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("publicProperty")]),s._v(": "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("true")]),s._v(",\n        "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("publicMethod")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n            privateVariable++;\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" privateFunction();\n        }\n    };\n}();\n")])]),r("p",[s._v("如果必须创建一个对象并以某些数据对其进行初始化，同时还要公开一些能够访问这些私有数据的方法，那么就可以使用模块模式：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" application = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//私有变量和函数")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" components = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Array")]),s._v("();\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//初始化")]),s._v("\n    components.push("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" BaseComponent());\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//公共")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" {\n        "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("getComponentCount")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" components.length;\n        },\n        "),r("span",{pre:!0,attrs:{class:"hljs-attr"}},[s._v("registerComponent")]),s._v(" : "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("component")]),s._v(")")]),s._v("{\n            "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("typeof")]),s._v(" component == "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"object"')]),s._v("){\n                components.push(component);\n            }\n        }\n    };\n}();\n")])]),r("h4",[s._v("增强的模块模式")]),r("p",[s._v("增强的模块模式适合那些单例必须是某种类型的实例，同时还必须添加某些属性和（或）方法对其加以增强的情况：")]),r("pre",{pre:!0},[r("code",{pre:!0,attrs:{"v-pre":"",class:"language-javascript"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" singleton = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//私有变量和私有函数")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" privateVariable = "),r("span",{pre:!0,attrs:{class:"hljs-number"}},[s._v("10")]),s._v(";\n    "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-title"}},[s._v("privateFunction")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("false")]),s._v(";\n    }\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//创建对象")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" object = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" CustomType();\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//添加特权/公有属性和方法")]),s._v("\n    object.publicProperty = "),r("span",{pre:!0,attrs:{class:"hljs-literal"}},[s._v("true")]),s._v(";\n    object.publicMethod = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        privateVariable++;\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" privateFunction();\n    };\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//返回这个对象")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" object;\n}();\n\n"),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" application = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//私有变量和函数")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" components = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" "),r("span",{pre:!0,attrs:{class:"hljs-built_in"}},[s._v("Array")]),s._v("();\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//初始化")]),s._v("\n    components.push("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" BaseComponent());\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//创建 application 的一个局部副本")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("var")]),s._v(" app = "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("new")]),s._v(" BaseComponent();\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//公共接口")]),s._v("\n    app.getComponentCount = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}}),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" components.length;\n    };\n    app.registerComponent = "),r("span",{pre:!0,attrs:{class:"hljs-function"}},[r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("function")]),s._v("("),r("span",{pre:!0,attrs:{class:"hljs-params"}},[s._v("component")]),s._v(")")]),s._v("{\n        "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("if")]),s._v(" ("),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("typeof")]),s._v(" component == "),r("span",{pre:!0,attrs:{class:"hljs-string"}},[s._v('"object"')]),s._v("){\n            components.push(component);\n        }\n    };\n    "),r("span",{pre:!0,attrs:{class:"hljs-comment"}},[s._v("//返回这个副本")]),s._v("\n    "),r("span",{pre:!0,attrs:{class:"hljs-keyword"}},[s._v("return")]),s._v(" app;\n}();\n")])]),r("p",[s._v("施工ing。。。")])])}],e=r("2877"),p={},l=Object(e["a"])(p,t,n,!1,null,null,null);a["default"]=l.exports}}]);