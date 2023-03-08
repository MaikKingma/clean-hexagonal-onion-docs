---
sidebar_position: 5
---

# Persist the Author data to the DB
For this step you will need to create classes and an interface in the data source section of the "clean hexagonal 
onion". Also, we need to create a DB migration script with liquibase to enable the JPA for our Author entity

### Liquibase
Uncomment the liquibase dependency in ``./pom.xml`` 

```xml
<dependency>
    <groupId>org.liquibase</groupId>
    <artifactId>liquibase-core</artifactId>
    <version>3.10.3</version>
</dependency>
```

and add these lines to ``src/main/resources/application.properties``

```yaml
# DB Migration
spring.liquibase.change-log=classpath:db/db.changelog-master.xml
```
create the file ``src/main/resources/db/db.changelog-master.xml`` with content

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-latest.xsd">
    <include file="changelog/01_create_author_seq.xml" relativeToChangelogFile="true"/>
    <include file="changelog/02_create_author_table.xml" relativeToChangelogFile="true"/>
</databaseChangeLog>
```

create the file ``src/main/resources/db/changelog/01_create_author_seq.xml`` with content

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.6.xsd">

    <changeSet id="01-create-author-sequence" author="Maik Kingma">
        <comment>Create Author sequence</comment>
        <createSequence sequenceName="author_seq" minValue="10001"/>
    </changeSet>
</databaseChangeLog>
```

create file src/main/resources/db/changelog/02_create_author_table.xml with content

```xml
<?xml version="1.0" encoding="UTF-8"?>
<databaseChangeLog
        xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-3.6.xsd">

    <changeSet id="01-create-author-table" author="Maik Kingma">
        <comment>Create author table</comment>

        <createTable tableName="author">
            <column name="id" type="bigint">
                <constraints primaryKey="true" primaryKeyName="author_id_pk" nullable="false"/>
            </column>
            <column name="first_name" type="text">
                <constraints nullable="false"/>
            </column>
            <column name="last_name" type="text">
                <constraints nullable="false"/>
            </column>
        </createTable>
    </changeSet>
</databaseChangeLog>
```

### Persistence with JPA
Following the clear segregation of duties in our "clean hexagonal onion", we need to create a number of classes to 
achieve persistence. This can seem overkill at first, but remember, DDD is not for small POCs or start up projects. 
It is designed to solve complexity for bigger projects, and so is our "clean hexagonal onion". We value simplicity,
clarity and maintainability over cleverness and complexity.

We will need to create a JPA entity for our Author, a mapper class that maps from domain to JPA, and an actual JPA 
repository interface that links our entity to the DB.

#### JPA entity
create a class ``/data/AuthorJPA.java`` annotated with

```java
@Entity
@Builder
@NoArgsConstructor()
@AllArgsConstructor
@Table(name = "author")
```
Fill this class with the same fields as the Author.java class. By adding this JPA class, which is independent of 
the domain aggregate, we keep the domain only loosely coupled to the domain core. Usually, what we often see in Spring 
applications is that the domain aggregate is the data entity and domain entity/aggregate at the same time.

Having created that class, we now need to teach our AuthorJPA data model where to get the id from in the DB. We have 
already created the liquibase script that generates an author_seq for us.
We annotate our id field with the following:
```java
@Id
@GeneratedValue(strategy = SEQUENCE, generator = "author_seq_gen")
@SequenceGenerator(name = "author_seq_gen", sequenceName = "author_seq", allocationSize = 1)
```

#### JPA repository
create an interface ``/data/AuthorRepository.java`` that extends ``JPARepository<AuthorJPA, Long>`` and annotate 
the interface with ``@Repository``

#### JPA to domain Mapper
Since we want to decouple our data model from the actual domain model, we need to teach our application how to map between 
domain and data model. There are fancy libraries for this such as [mapstruct](https://mapstruct.org/) but let us code 
it ourselves for now.

Create a class ``/data/AuthorMapper.java`` with a method that maps all fields of Author.class to the 
corresponding fields of AuthorJPA.class and returns the instance of it.
Method signature:
```java
public static AuthorJPA mapToJPA(Author author)
```

> Hint: You may need to add some getters. And you can make use of the builder pattern.

#### Updating the AuthorServiceImpl.java
In the previous task we only added a log statement to the ``AuthorServiceImpl.registerAuthor`` implementation.
Inject the AuthorRepository into the AuthorServiceImpl and update the function in such a way that the Author is persisted to the DB.


### Validation
Let's test your implementation. Update the AuthorCommandsTest.java and replace the previously added ``register()`` test 
with the following Test:

```java
    @BeforeEach
    void beforeAll() {
        authorRepository.deleteAll();
    }

    @Test
    void registerAndGet() throws Exception {
        //given
        var registerAuthorDTOJson = objectMapper.writeValueAsString(new RegisterAuthorDTO("firstName", "lastName"));
        var expected = AuthorJPA.builder().firstName("firstName").lastName("lastName").build();
        //when
        mockMvc.perform(post("/authors/commands/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(registerAuthorDTOJson))
                .andExpect(status().isAccepted());
        authorRepository.flush();
        // then
        assertThat(authorRepository.findAll().size()).isEqualTo(1);
        assertThat(authorRepository.findAll().get(0)).usingRecursiveComparison().ignoringFields("id").isEqualTo(expected);
    }
```

To not affect our runtime DB with changes from our unit tests, we need to complete two steps before running this test 
suite:

1. update the ``pom.xml`` with the following dependency:
```xml
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>test</scope>
</dependency>
```
2. add the test config file ``src/test/resources/application.properties`` with content
```properties
# DataSource
spring.datasource.driver-class-name=org.h2.Driver
spring.datasource.url=jdbc:h2:mem:db;DB_CLOSE_DELAY=-1
spring.datasource.username=sa
spring.datasource.password=sa

# DB Migration
spring.liquibase.change-log=classpath:db/db.changelog-master.xml
```

Now we can finally run the test. Well done!

```javascript
if (allTestsGreen == true) {
    log.info("DONE! Let's move on to the next topic: Querying our Domain.")}
else{
    log.error("Shout for help!") || (git stash && git checkout 5-persist-author-data-done)
}
```







