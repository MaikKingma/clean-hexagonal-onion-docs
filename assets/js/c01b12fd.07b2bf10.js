"use strict";(self.webpackChunkgraphql_docs=self.webpackChunkgraphql_docs||[]).push([[150],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return h}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function s(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=r.createContext({}),c=function(e){var t=r.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return r.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),d=c(n),h=a,g=d["".concat(l,".").concat(h)]||d[h]||p[h]||o;return n?r.createElement(g,i(i({ref:t},u),{},{components:n})):r.createElement(g,i({ref:t},u))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},2976:function(e,t,n){n.r(t),n.d(t,{assets:function(){return u},contentTitle:function(){return l},default:function(){return h},frontMatter:function(){return s},metadata:function(){return c},toc:function(){return p}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],s={sidebar_position:1},l="Testing GraphQL applications",c={unversionedId:"tutorial-testing/first-test",id:"tutorial-testing/first-test",title:"Testing GraphQL applications",description:"Add the spring-graphql-test to your pom.xml (if it's not already there)",source:"@site/docs/tutorial-testing/first-test.md",sourceDirName:"tutorial-testing",slug:"/tutorial-testing/first-test",permalink:"/graphql-docs/docs/tutorial-testing/first-test",draft:!1,editUrl:"https://github.com/codecentricnl/flutter_basic_workshop/tree/master/docs/docs/tutorial-testing/first-test.md",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"3 - Testing",permalink:"/graphql-docs/docs/category/3---testing"},next:{title:"Solution",permalink:"/graphql-docs/docs/tutorial-testing/test-solution"}},u={},p=[{value:"We believe you learn best by doing.",id:"we-believe-you-learn-best-by-doing",level:2},{value:"We&#39;ve written some tests. Can you fix them?",id:"weve-written-some-tests-can-you-fix-them",level:3}],d={toc:p};function h(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"testing-graphql-applications"},"Testing GraphQL applications"),(0,o.kt)("p",null,"Add the spring-graphql-test to your pom.xml (if it's not already there)"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-xml"}," <dependency>\n    <groupId>org.springframework.graphql</groupId>\n    <artifactId>spring-graphql-test</artifactId>\n    <scope>test</scope>\n</dependency>\n")),(0,o.kt)("p",null,"To not have to create multiline queries in your test we can write queries in graphql files\nand use those in our tests.",(0,o.kt)("br",{parentName:"p"}),"\n","Create a file that resembles a query you want to execute."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-graphql",metastring:'title="src/test/resources/graphql-test/movies.graphql"',title:'"src/test/resources/graphql-test/movies.graphql"'},"query {\n    movies {\n        imdbId\n        title\n        releaseDate\n    }\n}\n")),(0,o.kt)("p",null,"Also create a test class for you MovieController"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java",metastring:'title="src/test/java/nl.codecentric.springforgraphql.movies/MovieControllerTest.java"',title:'"src/test/java/nl.codecentric.springforgraphql.movies/MovieControllerTest.java"'},'@SpringBootTest \n@AutoConfigureGraphQlTester //This instantiates the GraphQL tester to be autowired\nclass MovieControllerTest {\n    @Autowired\n    private GraphQlTester graphQlTester;\n\n    @Test\n    void shouldFetchMovies() {\n        this.graphQlTester\n                .documentName("movies") //The graphQlTester will look for a file named movies.graphql created in the previous step\n                .execute()\n                .path("data.movies.[*]")\n                .entityList(Movie.class)\n                .hasSize(3)\n                .containsExactly(\n                        new Movie("tt0111161", "The Shawshank Redemption", LocalDate.of(1994, 10, 14)),\n                        new Movie("tt0068646", "The Godfather", LocalDate.of(1972, 3, 24)),\n                        new Movie("tt0468569", "The Dark Knight", LocalDate.of(2018, 7, 18))\n                );\n    }\n}\n')),(0,o.kt)("h2",{id:"we-believe-you-learn-best-by-doing"},"We believe you learn best by doing."),(0,o.kt)("h3",{id:"weve-written-some-tests-can-you-fix-them"},"We've written some tests. Can you fix them?"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-java",metastring:'title="src/test/java/nl.codecentric.springforgraphql.CountryControllerTest.java"',title:'"src/test/java/nl.codecentric.springforgraphql.CountryControllerTest.java"'},'@SpringBootTest\n@AutoConfigureGraphQlTester\n@TestMethodOrder(MethodOrderer.OrderAnnotation.class)\nclass CountryControllerTest {\n    @Autowired\n    private GraphQlTester graphQlTester;\n\n    @Test\n    @Order(1)\n    void itShouldGetAllCountries() {\n        this.graphQlTester\n                .documentName("countries")\n                .execute()\n                .path("data.countries.[*]")\n                .entityList(Country.class)\n                .hasSize(3)\n                .containsExactly(\n                        new Country("Netherlands", "NL"),\n                        new Country("Germany", "DE"),\n                        new Country("United States", "US")\n                );\n    }\n\n    @Test\n    void itShouldGetCountryByName() {\n        this.graphQlTester\n                .documentName("country-by-abbreviation")\n                .variable("abbreviation", "NL")\n                .execute()\n                .path("data.getCountry")\n                .entity(Country.class)\n                .isEqualTo(new Country("Netherlands", "NL"));\n    }\n\n    @Test\n    void itShouldHaveAnErrorWhenCountryCannotBeFound() {\n        this.graphQlTester\n                .documentName("country-by-abbreviation")\n                .variable("abbreviation", "XX")\n                .execute()\n                .errors()\n                .satisfy(errors -> {\n                     assert errors.size() == 1;\n                });\n    }\n\n    @Test\n    void itShouldUppercaseAbbreviation() {\n        // The solution of this can be implemented in several ways.\n        // Validate with one of us if you implemented correctly.\n        this.graphQlTester\n                .documentName("create-country")\n                .variable("name", "France")\n                .variable("abbreviation", "fr")\n                .execute()\n                .path("data.createCountry.abbreviation")\n                .entity(String.class)\n                .isEqualTo("FR");\n    }\n}\n')))}h.isMDXComponent=!0}}]);