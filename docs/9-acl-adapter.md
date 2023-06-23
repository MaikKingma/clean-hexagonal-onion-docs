---
sidebar_position: 9
---

# 9: The Anti-Corruption-Layer Adapter (ACL)

We now want to publish an author's book. In order to do so, we need to know which publishers are even available to 
do so. We will assume for the sake of the exercise that we need to retrieve that information from an external system 
outside our bounded context.

### The "third-party" service
Please check out the [publisher-service](https://github.com/MaikKingma/publisher-service).
It is another Spring service you will be able to retrieve the Publisher data from. The API specs are as follows:

```http request
### Get authors
GET /publishers HTTP/1.1
Host: localhost:8081
Accept: application/json
```
### Implementation
In order to protect our domain core from (data) corruption (and our application in general) and limit the service 
coupling to lose coupling only, we introduce a wrapping Rest controller of our own in our service 
as follows:

```http request
### Get authors
GET /publishers HTTP/1.1
Host: localhost:8080
Accept: application/json
```

This endpoint should return a list of views of a publisher as we expect it in our bounded context. It might be that 
the publisher server actually returns a lot of fields their view of a publisher that we do not need at all.

Hence, implement our new API endpoint in such a way that we receive the response body in the following format:

```json
[
  {
    "id": "55699ecc-42dc-42cf-8290-1207655140e2",
    "name": "the/experts."
  },
  {
    "id": "5e659183-411c-42af-8bed-2225a2165c59",
    "name": "Heise"
  },
  {
    "id": "8fb2e701-b086-415c-bf16-1b3096d355df",
    "name": "PubIT"
  },
  {
    "id": "42121f98-4013-42fe-8285-8fe25a783ac9",
    "name": "AwesomeBooks.nl"
  }
]
```
We have already created a Query adapter once in section 6. If you want more hints.... you need to create a class 
``/query/publisher/PublisherQuery.java`` which contains a GetMapping for ``/publishers``. Inject the 
``PublisherAppService.java`` and call the method to retrieve all publishers via the ACL adapter.

Additionally, we will need to introduce the ``Publisher.java``. As described in the domain model it will be a 
value object as it will have no lifecycle of its own within our domain (the id on the view model might be misleading,
in the sense that DDD states that value objects have no ID. That ID however is only a technical identifier of another 
bounded context for us. It is not an ID in our context and the publisher has no further life cycle or state of its 
own in our system).

The data we populate the response with will come from the Publisher-service API.
As mentioned before, you will need to introduce a new application service 
``/domaininteraction/publisher/PublisherAppService.java``. We add the implementation for that service in the ACL
adapter layer, ``/acl/publisher/PublisherAppServiceImpl.java``.

> **Hint:** For the REST call execution you may want to consider this code snippet:
```java
new RestTemplate().getForObject(uri, PublisherDTO[].class);
```

Give it a try! If you are stuck feel free to ask questions! And don't forget to run the PublisherService.

### Validate

Let's test your implementation:

please add this line to the ``src/test/resources/application.properties``

```properties
# Publisher service
publisher.service.host: http://localhost:${mockServerPort}
```
and also add these dependencies (we need no test scope on the last two as we will use them in runtime code later on)

```xml
<dependency>
    <groupId>org.mock-server</groupId>
    <artifactId>mockserver-spring-test-listener-no-dependencies</artifactId>
    <version>5.13.2</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>javax.json</groupId>
    <artifactId>javax.json-api</artifactId>
    <version>1.1.4</version>
</dependency>
<dependency>
    <groupId>org.glassfish</groupId>
    <artifactId>javax.json</artifactId>
    <version>1.1.4</version>
</dependency>
```

```java
package nl.maikkingma.clean_hexagonal_onion.query.publisher;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import nl.maikkingma.clean_hexagonal_onion.domaininteraction.publisher.PublisherDTO;
import org.junit.jupiter.api.Test;
import org.mockserver.client.MockServerClient;
import org.mockserver.model.Header;
import org.mockserver.springtest.MockServerTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import javax.json.Json;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockserver.matchers.Times.exactly;
import static org.mockserver.model.HttpRequest.request;
import static org.mockserver.model.HttpResponse.response;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@MockServerTest
@SpringBootTest
@AutoConfigureMockMvc
class PublisherQueryTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    private MockServerClient mockServerClient;

    @Test
    void shouldGetAllPublishers() throws Exception {
        configureMockGetAllPublishers();

        var expectedPublisher1 =
                new PublisherDTO(UUID.fromString("55699ecc-42dc-42cf-8290-1207655140e2"), "the/experts");
        var expectedPublisher2 =
                new PublisherDTO(UUID.fromString("5e659183-411c-42af-8bed-2225a2165c59"), "Heise");
        var expectedPublisher3 =
                new PublisherDTO(UUID.fromString("8fb2e701-b086-415c-bf16-1b3096d355df"), "PubIT");

        // when
        MvcResult result = mockMvc.perform(get("/publishers").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn();
        // then
        var publisherList = objectMapper.readValue(
                result.getResponse().getContentAsString(), new TypeReference<List<PublisherDTO>>() {
                });
        assertThat(publisherList).hasSize(3);
        assertThat(publisherList).usingRecursiveFieldByFieldElementComparator()
                .containsExactlyInAnyOrder(expectedPublisher1, expectedPublisher2, expectedPublisher3);
    }

    private void configureMockGetAllPublishers() {
        var responseBody = Json.createArrayBuilder()
                .add(Json.createObjectBuilder()
                        .add("id", "55699ecc-42dc-42cf-8290-1207655140e2")
                        .add("name", "the/experts")
                        .add("taxNumber", "VAT12345")
                        .add("numberOfEmployees", 30)
                        .add("yearlyRevenueInMillions", 99)
                        .add("amountOfBooksPublished", 20)
                        .build())
                .add(Json.createObjectBuilder()
                        .add("id", "5e659183-411c-42af-8bed-2225a2165c59")
                        .add("name", "Heise")
                        .add("taxNumber", "VAT32723")
                        .add("numberOfEmployees", 3333)
                        .add("yearlyRevenueInMillions", 432)
                        .add("amountOfBooksPublished", 453)
                        .build())
                .add(Json.createObjectBuilder()
                        .add("id", "8fb2e701-b086-415c-bf16-1b3096d355df")
                        .add("name", "PubIT")
                        .add("taxNumber", "VAT4242111")
                        .add("numberOfEmployees", 56)
                        .add("yearlyRevenueInMillions", 21)
                        .add("amountOfBooksPublished", 4)
                        .build())
                .build().toString();

        mockServerClient.when(request().withMethod("GET").withPath("/publishers"), exactly(1)).respond(
                response()
                        .withStatusCode(200)
                        .withHeaders(new Header("Content-Type", "application/json; charset=utf-8"))
                        .withBody(responseBody)
                        .withDelay(TimeUnit.SECONDS, 1)
        );
    }
}
```

> **Hint:** also, do not forget to give our ArchUnit test a run. Will it still pass?

Great job also finishing this chapter. In case you had some trouble, feel free to check out the branch below.

```javascript
if (allTestsGreen == true) {
    log.info("DONE! Let's move on to the next topic: The Process adapter")}
else{
    log.error("Shout for help!") || (git stash && git checkout 9-acl-adapter-done)
}
```
