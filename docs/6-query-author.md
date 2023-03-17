---
sidebar_position: 6
---

# Query Authors

**_What goes up must come down!_**

or in our case

**_What goes into the DB must come out!_**

### OPTIONAL: Run the app on localhost
By the way, if you run your docker compose file and start the Spring app you can also test your API at runtime manually.
Got to ``http/AuthorCommands.http`` and run the request against your localhost:8080.

(in case you don't have it, as it is part of my part of prepared *-done branches)
```http request
### Register an author
POST /authors/commands/register HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "firstName": "PLACE_YOUR_FIRST_NAME",
  "lastName": "PLACE_YOUR_LAST_NAME"
}
```

### Implement the Query endpoint
We want to make our authors readable via our REST API. For that purpose we introduce

```http request
### Get authors
GET /authors HTTP/1.1
Host: localhost:8080
Accept: application/json
```
This chapter will be a bit less guided in terms of code snippets. Let's see how far you get!
* You need to create a GET mapping in a new file ``/query/AuthorQueries.java`` in our query section of the clean 
  hexagonal onion. Remember, that we also need to decouple the query layer from our domain core. Hence, we introduce 
  the following view model that our query will return:

```java
public record AuthorView (Long id, String name) {
  public AuthorView(Author author) {
    this(author.getId(), author.getFullName());
  }
}
```

* Update the ``AuthorService.java`` (and in turn also the ``AuthorServiceImpl.java``)
* Update the ``AuthorMapper.java`` because we now need to map from data model to domain model. (add Builders and 
  Getters where necessary)

> **Hint 1:** The annotation ``@Builder(builderMethodName = "restore")`` might come in quite useful in the Author.class

> **Hint 2:** You may want to try TDD to complete this one :-)

### Validate

Let's test your implementation:

```java
@SpringBootTest
@AutoConfigureMockMvc
class AuthorQueriesTest {

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private EntityManager entityManager;

  @BeforeEach
  void beforeAll() {
    entityManager.createNativeQuery("DELETE FROM author WHERE true;").executeUpdate();
  }

  @Test
  @Transactional
  void getAll() throws Exception {
    // given
    var authorJPA = AuthorJPA.builder().firstName("firstName").lastName("lastName").build();
    entityManager.persist(authorJPA);
    entityManager.flush();
    AuthorView expected = new AuthorView(Author.createAuthor("firstName", "lastName"));
    // when then
    MvcResult result = mockMvc.perform(get("/authors")
                    .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isOk())
            .andReturn();

    var resultingAuthorViews = objectMapper.readValue(
            result.getResponse().getContentAsString(), new TypeReference<List<AuthorView>>() { });
    assertThat(resultingAuthorViews)
            .usingRecursiveFieldByFieldElementComparatorIgnoringFields("id")
            .containsExactly(expected);
  }
}
```

```javascript
if (allTestsGreen == true) {
    log.info("DONE! Let's move on to the next topic: Separate the Domain Interaction Layer")}
else{
    log.error("Shout for help!") || (git stash && git checkout 6-query-author-done)
}
```
