"use strict";(self.webpackChunkclean_hexagonal_onion_docs=self.webpackChunkclean_hexagonal_onion_docs||[]).push([[893],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return m}});var a=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},u=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},p="mdxType",d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},h=a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=c(n),h=r,m=p["".concat(s,".").concat(h)]||p[h]||d[h]||o;return n?a.createElement(m,i(i({ref:t},u),{},{components:n})):a.createElement(m,i({ref:t},u))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=h;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l[p]="string"==typeof e?e:r,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,n)}h.displayName="MDXCreateElement"},1508:function(e,t,n){n.r(t),n.d(t,{assets:function(){return s},contentTitle:function(){return i},default:function(){return d},frontMatter:function(){return o},metadata:function(){return l},toc:function(){return c}});var a=n(3117),r=(n(7294),n(3905));const o={sidebar_position:5},i="5: Persist the Author data to the DB",l={unversionedId:"persist-author-data",id:"persist-author-data",title:"5: Persist the Author data to the DB",description:'For this step you will need to create classes and an interface in the data source section of the "clean hexagonal',source:"@site/docs/5-persist-author-data.md",sourceDirName:".",slug:"/persist-author-data",permalink:"/clean-hexagonal-onion-docs/docs/persist-author-data",draft:!1,editUrl:"https://github.com/MaikKingma/clean-hexagonal-onion-docs/docs/5-persist-author-data.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"4: Create the register Author command",permalink:"/clean-hexagonal-onion-docs/docs/create-author-command"},next:{title:"6: Query Authors",permalink:"/clean-hexagonal-onion-docs/docs/query-author"}},s={},c=[{value:"Liquibase",id:"liquibase",level:3},{value:"Persistence with JPA",id:"persistence-with-jpa",level:3},{value:"JPA entity",id:"jpa-entity",level:4},{value:"JPA repository",id:"jpa-repository",level:4},{value:"JPA to domain Mapper",id:"jpa-to-domain-mapper",level:4},{value:"Updating the AuthorServiceImpl.java",id:"updating-the-authorserviceimpljava",level:4},{value:"Validation",id:"validation",level:3}],u={toc:c},p="wrapper";function d(e){let{components:t,...n}=e;return(0,r.kt)(p,(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("h1",{id:"5-persist-the-author-data-to-the-db"},"5: Persist the Author data to the DB"),(0,r.kt)("p",null,'For this step you will need to create classes and an interface in the data source section of the "clean hexagonal\nonion". Also, we need to create a DB migration script with liquibase to enable the JPA for our Author entity'),(0,r.kt)("h3",{id:"liquibase"},"Liquibase"),(0,r.kt)("p",null,"Uncomment the liquibase dependency in ",(0,r.kt)("inlineCode",{parentName:"p"},"./pom.xml")," "),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>org.liquibase</groupId>\n    <artifactId>liquibase-core</artifactId>\n    <version>3.10.3</version>\n</dependency>\n")),(0,r.kt)("p",null,"and add these lines to ",(0,r.kt)("inlineCode",{parentName:"p"},"src/main/resources/application.properties")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-yaml"},"# DB Migration\nspring.liquibase.change-log=classpath:db/db.changelog-master.xml\n")),(0,r.kt)("p",null,"create the file ",(0,r.kt)("inlineCode",{parentName:"p"},"src/main/resources/db/db.changelog-master.xml")," with content"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0" encoding="UTF-8"?>\n<databaseChangeLog\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"\n        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">\n    <include file="changelog/01_create_author_seq.xml" relativeToChangelogFile="true"/>\n    <include file="changelog/02_create_author_table.xml" relativeToChangelogFile="true"/>\n</databaseChangeLog>\n')),(0,r.kt)("p",null,"create the file ",(0,r.kt)("inlineCode",{parentName:"p"},"src/main/resources/db/changelog/01_create_author_seq.xml")," with content"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0" encoding="UTF-8"?>\n<databaseChangeLog\n        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.6.xsd">\n\n    <changeSet id="01-create-author-sequence" author="Maik Kingma">\n        <comment>Create Author sequence</comment>\n        <createSequence sequenceName="author_seq" minValue="10001"/>\n    </changeSet>\n</databaseChangeLog>\n')),(0,r.kt)("p",null,"create file src/main/resources/db/changelog/02_create_author_table.xml with content"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},'<?xml version="1.0" encoding="UTF-8"?>\n<databaseChangeLog\n        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"\n        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"\n        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.6.xsd">\n\n    <changeSet id="01-create-author-table" author="Maik Kingma">\n        <comment>Create author table</comment>\n\n        <createTable tableName="author">\n            <column name="id" type="bigint">\n                <constraints primaryKey="true" primaryKeyName="author_id_pk" nullable="false"/>\n            </column>\n            <column name="first_name" type="text">\n                <constraints nullable="false"/>\n            </column>\n            <column name="last_name" type="text">\n                <constraints nullable="false"/>\n            </column>\n        </createTable>\n    </changeSet>\n</databaseChangeLog>\n')),(0,r.kt)("h3",{id:"persistence-with-jpa"},"Persistence with JPA"),(0,r.kt)("p",null,'Following the clear segregation of duties in our "clean hexagonal onion", we need to create a number of classes to\nachieve persistence. This can seem overkill at first, but remember, DDD is not for small POCs or start up projects.\nIt is designed to solve complexity for bigger projects, and so is our "clean hexagonal onion". We value simplicity,\nclarity and maintainability over cleverness and complexity.'),(0,r.kt)("p",null,"We will need to create a JPA entity for our Author, a mapper class that maps from domain to JPA, and an actual JPA\nrepository interface that links our entity to the DB."),(0,r.kt)("h4",{id:"jpa-entity"},"JPA entity"),(0,r.kt)("p",null,"create a class ",(0,r.kt)("inlineCode",{parentName:"p"},"/data/AuthorJPA.java")," annotated with"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'@Entity\n@Builder\n@NoArgsConstructor()\n@AllArgsConstructor\n@Table(name = "author")\n')),(0,r.kt)("p",null,"Fill this class with the same fields as the Author.java class. By adding this JPA class, which is independent of\nthe domain aggregate, we keep the domain only loosely coupled to the domain core. Usually, what we often see in Spring\napplications is that the domain aggregate is the data entity and domain entity/aggregate at the same time."),(0,r.kt)("p",null,"Having created that class, we now need to teach our AuthorJPA data model where to get the id from in the DB. We have\nalready created the liquibase script that generates an author_seq for us.\nWe annotate our id field with the following:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'@Id\n@GeneratedValue(strategy = SEQUENCE, generator = "author_seq_gen")\n@SequenceGenerator(name = "author_seq_gen", sequenceName = "author_seq", allocationSize = 1)\n')),(0,r.kt)("h4",{id:"jpa-repository"},"JPA repository"),(0,r.kt)("p",null,"create an interface ",(0,r.kt)("inlineCode",{parentName:"p"},"/data/AuthorRepository.java")," that extends ",(0,r.kt)("inlineCode",{parentName:"p"},"JPARepository<AuthorJPA, Long>")," and annotate\nthe interface with ",(0,r.kt)("inlineCode",{parentName:"p"},"@Repository")),(0,r.kt)("h4",{id:"jpa-to-domain-mapper"},"JPA to domain Mapper"),(0,r.kt)("p",null,"Since we want to decouple our data model from the actual domain model, we need to teach our application how to map between\ndomain and data model. There are fancy libraries for this such as ",(0,r.kt)("a",{parentName:"p",href:"https://mapstruct.org/"},"mapstruct")," but let us code\nit ourselves for now."),(0,r.kt)("p",null,"Create a class ",(0,r.kt)("inlineCode",{parentName:"p"},"/data/AuthorMapper.java")," with a method that maps all fields of Author.class to the\ncorresponding fields of AuthorJPA.class and returns the instance of it.\nMethod signature:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},"public static AuthorJPA mapToJPA(Author author)\n")),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"Hint: You may need to add some getters. And you can make use of the builder pattern.")),(0,r.kt)("h4",{id:"updating-the-authorserviceimpljava"},"Updating the AuthorServiceImpl.java"),(0,r.kt)("p",null,"In the previous task we only added a log statement to the ",(0,r.kt)("inlineCode",{parentName:"p"},"AuthorServiceImpl.registerAuthor")," implementation.\nInject the AuthorRepository into the AuthorServiceImpl and update the function in such a way that the Author is persisted to the DB."),(0,r.kt)("h3",{id:"validation"},"Validation"),(0,r.kt)("p",null,"Let's test your implementation. Update the AuthorCommandsIntegrationTest.java and replace the previously added\n",(0,r.kt)("inlineCode",{parentName:"p"},"register()")," test\nwith the following Test:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-java"},'    @BeforeEach\n    void beforeAll() {\n        authorRepository.deleteAll();\n    }\n\n    @Test\n    void registerAndGet() throws Exception {\n        //given\n        var registerAuthorPayloadJson = objectMapper.writeValueAsString(new RegisterAuthorPayload("firstName", "lastName"));\n        var expected = AuthorJPA.builder().firstName("firstName").lastName("lastName").build();\n        //when\n        mockMvc.perform(post("/authors/commands/register")\n                        .contentType(MediaType.APPLICATION_JSON)\n                        .content(registerAuthorPayloadJson))\n                .andExpect(status().isAccepted());\n        authorRepository.flush();\n        // then\n        assertThat(authorRepository.findAll().size()).isEqualTo(1);\n        assertThat(authorRepository.findAll().get(0)).usingRecursiveComparison().ignoringFields("id").isEqualTo(expected);\n    }\n')),(0,r.kt)("p",null,"To not affect our runtime DB with changes from our unit tests, we need to complete two steps before running this test\nsuite:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"update the ",(0,r.kt)("inlineCode",{parentName:"li"},"pom.xml")," with the following dependency:")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-xml"},"<dependency>\n    <groupId>com.h2database</groupId>\n    <artifactId>h2</artifactId>\n    <scope>test</scope>\n</dependency>\n")),(0,r.kt)("ol",{start:2},(0,r.kt)("li",{parentName:"ol"},"add the test config file ",(0,r.kt)("inlineCode",{parentName:"li"},"src/test/resources/application.properties")," with content")),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-properties"},"# DataSource\nspring.datasource.driver-class-name=org.h2.Driver\nspring.datasource.url=jdbc:h2:mem:db;DB_CLOSE_DELAY=-1\nspring.datasource.username=sa\nspring.datasource.password=sa\n\n# DB Migration\nspring.liquibase.change-log=classpath:db/db.changelog-master.xml\n")),(0,r.kt)("p",null,"Now we can finally run the test. Well done!"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre",className:"language-javascript"},'if (allTestsGreen == true) {\n    log.info("DONE! Let\'s move on to the next topic: Querying our Domain.")}\nelse{\n    log.error("Shout for help!") || (git stash && git checkout 5-persist-author-data-done)\n}\n')))}d.isMDXComponent=!0}}]);