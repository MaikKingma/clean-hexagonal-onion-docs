"use strict";(self.webpackChunkclean_hexagonal_onion_docs=self.webpackChunkclean_hexagonal_onion_docs||[]).push([[846],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},u=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),u=c(n),h=o,m=u["".concat(l,".").concat(h)]||u[h]||d[h]||a;return n?r.createElement(m,i(i({ref:t},p),{},{components:n})):r.createElement(m,i({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=u;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:o,i[1]=s;for(var c=2;c<a;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}u.displayName="MDXCreateElement"},8655:function(e,t,n){n.r(t),n.d(t,{assets:function(){return p},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return d}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],s={sidebar_position:9},l="The Anti-Corruption-Layer Adapter (ACL)",c={unversionedId:"acl-adapter",id:"acl-adapter",title:"The Anti-Corruption-Layer Adapter (ACL)",description:"We now want to publish a book. But in order to do so we need to know which publishers are even available to do so.",source:"@site/docs/9-acl-adapter.md",sourceDirName:".",slug:"/acl-adapter",permalink:"/clean-hexagonal-onion-docs/docs/acl-adapter",draft:!1,editUrl:"https://github.com/MaikKingma/clean-hexagonal-onion-docs/docs/9-acl-adapter.md",tags:[],version:"current",sidebarPosition:9,frontMatter:{sidebar_position:9},sidebar:"tutorialSidebar",previous:{title:"Do it yourself",permalink:"/clean-hexagonal-onion-docs/docs/do-it-yourself"},next:{title:"The Process Adapter",permalink:"/clean-hexagonal-onion-docs/docs/process-adapter"}},p={},d=[{value:"The &quot;third party&quot; service",id:"the-third-party-service",level:3},{value:"Implementation",id:"implementation",level:3},{value:"Validate",id:"validate",level:3}],u={toc:d};function h(e){var t=e.components,n=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"the-anti-corruption-layer-adapter-acl"},"The Anti-Corruption-Layer Adapter (ACL)"),(0,a.kt)("p",null,"We now want to publish a book. But in order to do so we need to know which publishers are even available to do so.\nWe will assume for the sake of the exercise that we need to retrieve that information from an external system."),(0,a.kt)("h3",{id:"the-third-party-service"},'The "third party" service'),(0,a.kt)("p",null,"Please check out the project ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/MaikKingma/publisher-service"},"https://github.com/MaikKingma/publisher-service"),".\nIt is another Spring service you will be able to retrieve the Publisher data from via the following API call:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-http",metastring:"request",request:!0},"### Get authors\nGET /publishers HTTP/1.1\nHost: localhost:8081\nAccept: application/json\n")),(0,a.kt)("h3",{id:"implementation"},"Implementation"),(0,a.kt)("p",null,"In order to protect our domain from corruption and limit the service coupling to lose coupling only we introduce a\nwrapping API endpoint of our own in our clean-hexagonal-onion-service as follows:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-http",metastring:"request",request:!0},"### Get authors\nGET /publishers HTTP/1.1\nHost: localhost:8080\nAccept: application/json\n")),(0,a.kt)("p",null,"This endpoint should return a list of views of a publisher as we expect it in our bounded context. It might be that\nthe publisher server actually returns a lot of fields their view of a publisher that we do not need at all."),(0,a.kt)("p",null,"Hence, implement our new API endpoint in such a way that we receive the response body in the following format:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "id": "55699ecc-42dc-42cf-8290-1207655140e2",\n    "name": "the/experts"\n  },\n  {\n    "id": "5e659183-411c-42af-8bed-2225a2165c59",\n    "name": "Heise"\n  },\n  {\n    "id": "8fb2e701-b086-415c-bf16-1b3096d355df",\n    "name": "PubIT"\n  },\n  {\n    "id": "42121f98-4013-42fe-8285-8fe25a783ac9",\n    "name": "AwesomeBooks.nl"\n  }\n]\n')),(0,a.kt)("p",null,"We have created a Query adapter in section 6. If you want more hints.... you need to create a class\n",(0,a.kt)("inlineCode",{parentName:"p"},"/query/publisher/PublisherQuery.java")," which contains a GetMapping for ",(0,a.kt)("inlineCode",{parentName:"p"},"/publishers"),". Inject the\n",(0,a.kt)("inlineCode",{parentName:"p"},"PublisherService.java")," and call the method to retrieve all publishers via the ACL adapter."),(0,a.kt)("p",null,"Additionally, we will need to introduce the ",(0,a.kt)("inlineCode",{parentName:"p"},"Publisher.java"),". As described in the domain model it will be a\nvalue object as it will have no lifecycle of its own within our domain (the id on the view model might be misleading,\nin the sense that DDD states that VOs have no ID. That ID however is only a technical identifier of another bounded\ncontext for us. It is not an ID in our context)."),(0,a.kt)("p",null,"The data we populate the response with will come from the Publisher service API.\nFor that you will need to introduce a new domain service ",(0,a.kt)("inlineCode",{parentName:"p"},"/domain/publisher/PublisherService.java"),".\nSince we are implementing an interface contract with another service we add the implementation for that service in\nthe acl adapter layer, ",(0,a.kt)("inlineCode",{parentName:"p"},"/acl/publisher/PublisherServiceImpl.java"),"."),(0,a.kt)("p",null,"For the REST call execution you may want to consider this code snippet:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},"new RestTemplate().getForObject(uri, PublisherDTO[].class);\n")),(0,a.kt)("p",null,"Give it a try! If you are stuck feel free to ask questions! And don't forget to run the PublisherService."),(0,a.kt)("h3",{id:"validate"},"Validate"),(0,a.kt)("p",null,"Let's test your implementation:"),(0,a.kt)("p",null,"please add this line to the ",(0,a.kt)("inlineCode",{parentName:"p"},"src/test/resources/application.properties")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-properties"},"# Publisher service\npublisher.service.host: http://localhost:${mockServerPort}\n")),(0,a.kt)("p",null,"and also add these dependencies (we need no test scope on the last two as we will use them in runtime code later on)"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.mock-server</groupId>\n    <artifactId>mockserver-spring-test-listener-no-dependencies</artifactId>\n    <version>5.13.2</version>\n    <scope>test</scope>\n</dependency>\n<dependency>\n    <groupId>javax.json</groupId>\n    <artifactId>javax.json-api</artifactId>\n    <version>1.1.4</version>\n</dependency>\n<dependency>\n    <groupId>org.glassfish</groupId>\n    <artifactId>javax.json</artifactId>\n    <version>1.1.4</version>\n</dependency>\n")),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-java"},'import com.fasterxml.jackson.core.type.TypeReference;\nimport com.fasterxml.jackson.databind.ObjectMapper;\nimport nl.theexperts.clean_hexagonal_onion_service.domain.publisher.Publisher;\nimport org.junit.jupiter.api.Test;\nimport org.mockserver.client.MockServerClient;\nimport org.mockserver.model.Header;\nimport org.mockserver.springtest.MockServerTest;\nimport org.springframework.beans.factory.annotation.Autowired;\nimport org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;\nimport org.springframework.boot.test.context.SpringBootTest;\nimport org.springframework.http.MediaType;\nimport org.springframework.test.web.servlet.MockMvc;\nimport org.springframework.test.web.servlet.MvcResult;\n\nimport javax.json.Json;\nimport java.util.List;\nimport java.util.UUID;\nimport java.util.concurrent.TimeUnit;\n\nimport static org.assertj.core.api.Assertions.assertThat;\nimport static org.mockserver.matchers.Times.exactly;\nimport static org.mockserver.model.HttpRequest.request;\nimport static org.mockserver.model.HttpResponse.response;\nimport static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;\nimport static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;\n\n@MockServerTest\n@SpringBootTest\n@AutoConfigureMockMvc\nclass PublisherQueryTest {\n\n    @Autowired\n    private MockMvc mockMvc;\n\n    @Autowired\n    private ObjectMapper objectMapper;\n\n    private MockServerClient mockServerClient;\n\n    @Test\n    void shouldGetAllPublishers() throws Exception {\n        configureMockGetAllPublishers();\n\n        var expectedPublisher1 = Publisher.builder()\n                .id(UUID.fromString("55699ecc-42dc-42cf-8290-1207655140e2"))\n                .name("the/experts")\n                .build();\n        var expectedPublisher2 =\n                Publisher.builder()\n                        .id(UUID.fromString("5e659183-411c-42af-8bed-2225a2165c59"))\n                        .name("Heise")\n                        .build();\n        var expectedPublisher3 =\n                Publisher.builder()\n                        .id(UUID.fromString("8fb2e701-b086-415c-bf16-1b3096d355df"))\n                        .name("PubIT")\n                        .build();\n\n        // when\n        MvcResult result = mockMvc.perform(get("/publishers").accept(MediaType.APPLICATION_JSON))\n                .andExpect(status().isOk())\n                .andReturn();\n        // then\n        var resultingBookViews = objectMapper.readValue(\n                result.getResponse().getContentAsString(), new TypeReference<List<Publisher>>() {\n                });\n        assertThat(resultingBookViews).hasSize(3);\n        assertThat(resultingBookViews).usingRecursiveFieldByFieldElementComparator()\n                .containsExactlyInAnyOrder(expectedPublisher1, expectedPublisher2, expectedPublisher3);\n    }\n\n    private void configureMockGetAllPublishers() {\n        var responseBody = Json.createArrayBuilder()\n                .add(Json.createObjectBuilder()\n                        .add("id", "55699ecc-42dc-42cf-8290-1207655140e2")\n                        .add("name", "the/experts")\n                        .add("taxNumber", "VAT12345")\n                        .add("numberOfEmployees", 30)\n                        .add("yearlyRevenueInMillions", 99)\n                        .add("amountOfBooksPublished", 20)\n                        .build())\n                .add(Json.createObjectBuilder()\n                        .add("id", "5e659183-411c-42af-8bed-2225a2165c59")\n                        .add("name", "Heise")\n                        .add("taxNumber", "VAT32723")\n                        .add("numberOfEmployees", 3333)\n                        .add("yearlyRevenueInMillions", 432)\n                        .add("amountOfBooksPublished", 453)\n                        .build())\n                .add(Json.createObjectBuilder()\n                        .add("id", "8fb2e701-b086-415c-bf16-1b3096d355df")\n                        .add("name", "PubIT")\n                        .add("taxNumber", "VAT4242111")\n                        .add("numberOfEmployees", 56)\n                        .add("yearlyRevenueInMillions", 21)\n                        .add("amountOfBooksPublished", 4)\n                        .build())\n                .build().toString();\n\n        mockServerClient.when(request().withMethod("GET").withPath("/publishers"), exactly(1)).respond(\n                response()\n                        .withStatusCode(200)\n                        .withHeaders(new Header("Content-Type", "application/json; charset=utf-8"))\n                        .withBody(responseBody)\n                        .withDelay(TimeUnit.SECONDS, 1)\n        );\n    }\n}\n')),(0,a.kt)("p",null,"Give it a try!"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-javascript"},'if (allTestsGreen == true) {\n    log.info("DONE! Let\'s move on to the next topic: The ACL adapter")}\nelse{\n    log.error("Shout for help!") || (git stash && git checkout 8-acl-adapter-done)\n}\n')))}h.isMDXComponent=!0}}]);