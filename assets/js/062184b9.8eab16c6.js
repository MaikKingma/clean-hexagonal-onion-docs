"use strict";(self.webpackChunkclean_hexagonal_onion_docs=self.webpackChunkclean_hexagonal_onion_docs||[]).push([[914],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var o=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,o,a=function(e,t){if(null==e)return{};var n,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)n=r[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=o.createContext({}),l=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=l(e.components);return o.createElement(s.Provider,{value:t},e.children)},h="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,s=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),h=l(n),d=a,m=h["".concat(s,".").concat(d)]||h[d]||p[d]||r;return n?o.createElement(m,i(i({ref:t},u),{},{components:n})):o.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=d;var c={};for(var s in t)hasOwnProperty.call(t,s)&&(c[s]=t[s]);c.originalType=e,c[h]="string"==typeof e?e:a,i[1]=c;for(var l=2;l<r;l++)i[l]=n[l];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2991:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return p},frontMatter:function(){return r},metadata:function(){return c},toc:function(){return l}});var o=n(3117),a=(n(7294),n(3905));const r={sidebar_position:4},i="Create the register Author command",c={unversionedId:"create-author-command",id:"create-author-command",title:"Create the register Author command",description:"For this step you will need to create classes and an interface in two different packages in our project.",source:"@site/docs/4-create-author-command.md",sourceDirName:".",slug:"/create-author-command",permalink:"/clean-hexagonal-onion-docs/docs/create-author-command",draft:!1,editUrl:"https://github.com/MaikKingma/clean-hexagonal-onion-docs/docs/4-create-author-command.md",tags:[],version:"current",sidebarPosition:4,frontMatter:{sidebar_position:4},sidebar:"tutorialSidebar",previous:{title:"Getting to know the domain",permalink:"/clean-hexagonal-onion-docs/docs/getting-to-know-the-domain"},next:{title:"Persist the Author data to the DB",permalink:"/clean-hexagonal-onion-docs/docs/persist-author-data"}},s={},l=[{value:"Command",id:"command",level:3},{value:"Domain Core",id:"domain-core",level:3},{value:"The data port",id:"the-data-port",level:3},{value:"The Data Layer",id:"the-data-layer",level:3},{value:"Validation",id:"validation",level:3},{value:"OPTIONAL: Run the app on localhost",id:"optional-run-the-app-on-localhost",level:3}],u={toc:l},h="wrapper";function p(e){let{components:t,...r}=e;return(0,a.kt)(h,(0,o.Z)({},u,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"create-the-register-author-command"},"Create the register Author command"),(0,a.kt)("p",null,"For this step you will need to create classes and an interface in two different packages in our project."),(0,a.kt)("h3",{id:"command"},"Command"),(0,a.kt)("p",null,"We need to create a REST endpoint that allows us to register Authors."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-http",metastring:"request",request:!0},'### Register an author\nPOST /authors/commands/register HTTP/1.1\nHost: localhost:8080\nContent-Type: application/json\n\n{\n  "firstName": "PLACE_YOUR_FIRST_NAME",\n  "lastName": "PLACE_YOUR_LAST_NAME"\n}\n')),(0,a.kt)("p",null,"This endpoint should create an Author from the given Data Transfer Object (DTO) (or payload) and call the register\nfunction of an author on the domain interaction layer service. The standard response should be empty with status code 202."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"Tip:")," You can add the above snippet in a file ",(0,a.kt)("inlineCode",{parentName:"p"},"./http/AuthorCommands.http")," which allows you to execute the\nrequest from inside your IDE (if supported, IntelliJ does).")),(0,a.kt)("h3",{id:"domain-core"},"Domain Core"),(0,a.kt)("p",null,"According to the domain model we need to create the class ",(0,a.kt)("inlineCode",{parentName:"p"},"/domain/author/Author.java")," in our domain package. To\nkeep control of the creation of our aggregates we make the all args constructor private and instead create a\nfactory method ",(0,a.kt)("inlineCode",{parentName:"p"},"public static Author createAuthor(String fristName, String lastName)"),". Only our factory method will\naccess the private all args constructor. That way we can keep control of the creation of Authors at all times outside our domain package.\nFor now that is all we need. No getters, no setters or builders needed for now. In case you are asking yourself:\n",(0,a.kt)("em",{parentName:"p"},"And what about the id?")," Rest assured! We will solve this one later. It remains ",(0,a.kt)("em",{parentName:"p"},"null")," for now."),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"author.png",src:n(2650).Z,width:"398",height:"238"})),(0,a.kt)("h3",{id:"the-data-port"},"The data port"),(0,a.kt)("p",null,"In order to be able to interact with our domain, we need to define a port (interface) called\n",(0,a.kt)("inlineCode",{parentName:"p"},"/domain_interaction/author/AuthorService.java")," in our domain package. The required members can be found in the\ndomain model. Afterwards, we inject this into our ",(0,a.kt)("inlineCode",{parentName:"p"},"AuthorCommands.java"),"class in the constructor\n(you could autowire it but let's stick to constructor injection)."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},(0,a.kt)("strong",{parentName:"p"},"Nice to know:")," this complies with the SOLID principle of 'dependency inversion'. Good for us :)")),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"author-service.png",src:n(9495).Z,width:"264",height:"133"})),(0,a.kt)("h3",{id:"the-data-layer"},"The Data Layer"),(0,a.kt)("p",null,"No injection without at least one Spring Bean implementing the interface. After having injected the interace, at\nleast INtelliJ will show a warning or error that it requires at least one implementation.In\n",(0,a.kt)("inlineCode",{parentName:"p"},"/data/author/AuthorServiceImpl.java")," we implement ",(0,a.kt)("inlineCode",{parentName:"p"},"/domain/author/AuthorService.java")," and annotate it with the ",(0,a.kt)("inlineCode",{parentName:"p"},"@Service")," annotation from Spring.\nFor now, simply add a log statement of your choice to the implementation of the method ",(0,a.kt)("inlineCode",{parentName:"p"},"void registerAuthor(Author author)"),"."),(0,a.kt)("h3",{id:"validation"},"Validation"),(0,a.kt)("p",null,"Let's test our code. Feel free to write your own test. Alternatively, copy and paste this test class into your project\nand run it. All should be green :-)."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},'@SpringBootTest\n@AutoConfigureMockMvc\nclass AuthorCommandsTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @Autowired\n    private ObjectMapper objectMapper;\n\n    @Test\n    void register() throws Exception {\n        //given\n        var registerAuthorPayloadJson = objectMapper.writeValueAsString(new RegisterAuthorPayload("firstName", "lastName"));\n\n        //when //then\n        mockMvc.perform(post("/authors/commands/register")\n                        .contentType(MediaType.APPLICATION_JSON)\n                        .content(registerAuthorPayloadJson))\n                .andExpect(status().isAccepted());\n    }\n}\n')),(0,a.kt)("h3",{id:"optional-run-the-app-on-localhost"},"OPTIONAL: Run the app on localhost"),(0,a.kt)("p",null,"By the way, if you run the docker compose file ",(0,a.kt)("inlineCode",{parentName:"p"},"./docker-compose.yml")," and start the Spring app you can also test your\nAPI at runtime manually.\nGot to ",(0,a.kt)("inlineCode",{parentName:"p"},"http/AuthorCommands.http")," and run the request against your localhost:8080."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'if (allTestsGreen == true) {\n    log.info("DONE! Let\'s move on to the next topic: **Persisting Data**.")}\nelse{\n    log.error("Shout for help!") || (git stash && git checkout 4-create-author-command-done)\n}\n')))}p.isMDXComponent=!0},9495:function(e,t){t.Z="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAACFCAYAAACnr2ZNAAAWjElEQVR4Xu2dechVxR+HjRaiqL/SgiRKzMKwxRAUW6QQWxATKTQyJUHStFLJLTX3NVOyMNdwQc0stcWFtFzRNE3NLbc018osKyu3zo9nYM5v7njO3d579S6fB+Z975mZM3OWmc98Z845M5WCGP7777+gevXqwbBhw/wgUUGqVKkSHD582PyePHly0KFDh4Swo0ePBocOHQqqVasWVK1aNahZs2Zw3XXXBbt37zauRo0aYfw+ffoEI0eONPfrySefNPuzD3Hef/99E+err74KGjZsGNSuXdvEeeONN4z/kiVLzDbxK1WqFAwfPtz4jxs3zuRHWuzTqVMn49+5c2cTjzAcae7cudOEwdChQ4P69euH26L4qeR7WBYsWGAKw6ZNm/wgcZGg0iMk58+f94NiOXbsWHD69OkEvyNHjpi0zp07FzRv3jxYvXp1QviYMWPMvXY5deqUcZnQqFGjYPbs2b63KGJiBaJjx47BQw895HuLIqRNmzZGALBEunfvboTCZcKECRcIRKZs377dWBy+OIniJrJU2O7F4MGD/SBRpJw9e9bc1yhyIRCiNIksFbZ7sXHjRj9IlCASCBFHZKmge6HBpvJBAiHiuKBU2O7FgAED/CBRIvz2228J23EC4ccT5ccFpcJ2L9avX+8HiRLgiSeeCGrVqpXgx2PN9u3bJ/jxiJRy8O233yb4i/LiAoGge1G3bl3fW5QIo0aNMhX/2WefDf14L+Lhhx8OtxEF4tx4442hnyhPLhCIO++8M+jbt6/vLUoEug3XXHONEYDWrVsbP1cgEAcbjpiI8iZBINauXWsKBm/eidIFQeA+X3XVVUYErED88MMP5g3Jyy67zIiExiBEgkDwqu1tt93meokSBCFAIKy79957jbvjjjuCK664wgjHK6+84u8mypAEgeC9fGt2itKmVatWRgxcobj88svD34iIEKFAHD9+3JiX9gMfUdrYgUjrrFjwv0WLFn50UaaEAvHRRx+ZvqdajvKBl+FckbBOjzaFJRQI+pwNGjRww0SJw2C0Lw56g1a4hALBIJUeb5YfN998c4JAzJ07148iyhgjEJs3bzaFQ483yw/GnOz4A2IhhIsRiLfffju49dZb/TBRJlx77bVGIDRALXyMQDRr1iyrx5t//fVX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"},2650:function(e,t,n){t.Z=n.p+"assets/images/author-5797e71e48cb4f0e201376c3fb1b64ef.png"}}]);