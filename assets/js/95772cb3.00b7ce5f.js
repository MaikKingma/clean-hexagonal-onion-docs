"use strict";(self.webpackChunkgraphql_docs=self.webpackChunkgraphql_docs||[]).push([[48],{3905:function(e,r,t){t.d(r,{Zo:function(){return s},kt:function(){return f}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function i(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var c=n.createContext({}),u=function(e){var r=n.useContext(c),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},s=function(e){var r=u(e.components);return n.createElement(c.Provider,{value:r},e.children)},p={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},d=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),d=u(t),f=a,h=d["".concat(c,".").concat(f)]||d[f]||p[f]||o;return t?n.createElement(h,l(l({ref:r},s),{},{components:t})):n.createElement(h,l({ref:r},s))}));function f(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=d;var i={};for(var c in r)hasOwnProperty.call(r,c)&&(i[c]=r[c]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var u=2;u<o;u++)l[u]=t[u];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}d.displayName="MDXCreateElement"},1336:function(e,r,t){t.r(r),t.d(r,{assets:function(){return s},contentTitle:function(){return c},default:function(){return f},frontMatter:function(){return i},metadata:function(){return u},toc:function(){return p}});var n=t(7462),a=t(3366),o=(t(7294),t(3905)),l=["components"],i={sidebar_position:1},c="Create a resolver",u={unversionedId:"tutorial-query/create-a-resolver",id:"tutorial-query/create-a-resolver",title:"Create a resolver",description:"In the previous step we already added our GraphQL schema file.",source:"@site/docs/tutorial-query/create-a-resolver.md",sourceDirName:"tutorial-query",slug:"/tutorial-query/create-a-resolver",permalink:"/docs/tutorial-query/create-a-resolver",draft:!1,editUrl:"https://github.com/codecentricnl/flutter_basic_workshop/tree/master/docs/docs/tutorial-query/create-a-resolver.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"1 - Query",permalink:"/docs/category/1---query"},next:{title:"Create a resolver (Result)",permalink:"/docs/tutorial-query/create-a-resolver-result"}},s={},p=[],d={toc:p};function f(e){var r=e.components,i=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},d,i,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"create-a-resolver"},"Create a resolver"),(0,o.kt)("p",null,"In the previous step we already added our GraphQL schema file."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql"},"type Query {\n    helloWorld: String!\n}\n")),(0,o.kt)("p",null,"It defines that we have a Query, called helloWorld, and it returns a String.\nHowever, if we invoke the Query via our GraphiQL client, we are getting an error.\nThat error tells us that you should never get null as a result according to\nthe graph note the exclamation behind the string.\nHowever, it still is null. Let's create a resolver that resolves that issue."),(0,o.kt)("p",null,"in your src directory ",(0,o.kt)("inlineCode",{parentName:"p"},"src/main/java/nl/codecentric/springforgraphql"),"\ncreate a new package called ",(0,o.kt)("inlineCode",{parentName:"p"},"helloworld")," and, within that package, create a ",(0,o.kt)("inlineCode",{parentName:"p"},"HelloWorldController.java")),(0,o.kt)("p",null,"To make the query work we need three things:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Annotate the class with a ",(0,o.kt)("inlineCode",{parentName:"li"},"@Controller")," annotation."),(0,o.kt)("li",{parentName:"ol"},"A method that resembles the same name you have in the schema.graphqls, in our case helloWorld. And return a String"),(0,o.kt)("li",{parentName:"ol"},"Annotate that method as a ",(0,o.kt)("inlineCode",{parentName:"li"},"@QueryMapping"))),(0,o.kt)("p",null,"Finally, try out your query in the GraphiQL interface\n",(0,o.kt)("img",{alt:"img.png",src:t(156).Z,width:"966",height:"203"})))}f.isMDXComponent=!0},156:function(e,r,t){r.Z=t.p+"assets/images/img-d4c7b62925d77c43ed471db96fae411a.png"}}]);