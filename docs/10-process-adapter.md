---
sidebar_position: 10
---

# The Process Adapter

We still want to publish a book. We know all available publishers from the previous section and made it available in 
our bounded context.

Assuming we have already created a manuscript as an author, we can now decide to publish that manuscript with one of 
the available publishers.

### The command
For that purpose we create the ``/commands/book/BookCommands.java`` class containing our new command API endpoint:

```http request
POST /books/{id}/commands/publish HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "publisherId": "80553ae1-2ef8-4adf-8fa8-d551684a9ea3"
}
```
The behaviour of this endpoint should comply with the following functional requirements:
* A book can only be published with a publisher that actually exits. SO, we need to validate that the chosen 
  publisher exists in the source context of publishers, the publisher service.
* We want the publishing to happen asynchronous, i.e. our command should simply return that it accepted the 
  publishing request, and it will be passed on for further processing. (Eventual Consistency).

We achieve this passing on for further processing by publishing a domain event, you can find extra reference [here]
(https://bit.ly/3Fs9Cy4).

While it looks easy at first sight, we need to invest a little more coding effort than Baeldung because we 
segregated the data entity from the actual domain aggregate.

### 1. Task: Implement the Publisher ACL adapter.
First things first: in order to validate the existence of a publisher by id, the third party publisher service from the 
previous section exposes the following endpoint:

```http request
### Get authors
GET /publishers/{id} HTTP/1.1
Host: localhost:8081
Accept: application/json
```
implement this in our ACL adapter. We need to expose some sort of interface to our later book command REST controller 
that we can inject.

> **Hint:** Consider our application & domain service pattern. Since Publishers do not have a life cycle within our 
> context, which would you choose?

### 2. Task: Implement the Book Command
implement our new book commands endpoint and for now only log the response of the getPublisherById call you 
implemented in step 1.

```http request
POST /books/{id}/commands/publish HTTP/1.1
Host: localhost:8080
Content-Type: application/json

{
  "publisherId": "6b4ca9c9-b3ae-4130-b3f8-2da873c3940e"
}
```

> **Hint:** You can always verify that you used the correct patterns by running our 
> ``eu/javaland/clean_hexagonal_onion/CleanHexagonalOnionArchitectureTest.java``.

### 3. Task: Implement the flow
We now have a publisher that we want to publish with. Next, we need to retrieve the book corresponding to the ID form 
the path parameter, check that it exists, then in step 4, register it for publishing.

Following our flow pattern, we introduce the class 
``eu/javaland/clean_hexagonal_onion/domaininteraction/publisher/PublisherFlow.java``. You may ask at this point, why 
a PublisherFlow and not a BookFLow. This is a bit of a taste question. My reasoning is that there would be no 
publishing without a publisher existing, so I chose that flow. But you could equally reason, that you can only 
publish a book that exists. So this is eventually up to the architect to decide. Both are correct.

Here is a test for some TDD:
```java
@ExtendWith(MockitoExtension.class)
class PublisherFlowTest {

    @Mock
    private PublisherAppService publisherAppService;

    @Mock
    private BookDataService bookDataService;

    @InjectMocks
    private PublisherFlow publisherFlow;

    @Test
    void publishBook_success() {
        // given
        UUID publisherId = UUID.randomUUID();
        var authorDTO = new AuthorDTO(1L, "firstName", "lastName");
        var bookDTO = new BookDTO(1L, authorDTO, "title", "description", null, false, null);
        var publisherDTO = new PublisherDTO(publisherId,
                "publisherName");
        when(publisherAppService.getPublisherById(publisherId.toString())).thenReturn(publisherDTO);
        when(bookDataService.findById(1L)).thenReturn(bookDTO);
        // when
        publisherFlow.publishBook(1L, publisherId.toString());
        // then
        ArgumentCaptor<BookDTO> argumentCaptor = ArgumentCaptor.forClass(BookDTO.class);
        verify(bookDataService, times(1)).save(argumentCaptor.capture());
        var capturedArg = argumentCaptor.getValue();
        assertThat(capturedArg.publisherId()).isEqualTo(publisherId);
        assertThat(capturedArg.isPublished()).isFalse();
    }

    @Test
    void publishBook_failure_publisherNotFound() {
        // given
        UUID publisherId = UUID.randomUUID();
        when(publisherAppService.getPublisherById(publisherId.toString())).thenThrow(
                new PublisherAppService.PublisherNotFoundException("Publisher not found!"));
        // when then
        assertThrows(PublisherAppService.PublisherNotFoundException.class, () -> publisherFlow.publishBook(1L,
                publisherId.toString()));
    }

    @Test
    void publishBook_failure_bookNotFound() {
        // given
        UUID publisherId = UUID.randomUUID();
        var publisherDTO = new PublisherDTO(publisherId,
                "publisherName");
        when(publisherAppService.getPublisherById(publisherId.toString())).thenReturn(publisherDTO);
        when(bookDataService.findById(1L)).thenThrow(new BookDataService.BookNotFoundException("Book not found!"));
        // when then
        assertThrows(BookDataService.BookNotFoundException.class, () -> publisherFlow.publishBook(1L,
                publisherId.toString()));
    }

    @Test
    void publishBook_failure_bookAlreadyInPublishing() {
        // given
        UUID publisherId = UUID.randomUUID();
        var authorDTO = new AuthorDTO(1L, "firstName", "lastName");
        var bookDTO = new BookDTO(1L, authorDTO, "title", "description", UUID.randomUUID(), false, null,
                new ArrayList<>());
        var publisherDTO = new PublisherDTO(publisherId,
                "publisherName");
        when(publisherAppService.getPublisherById(publisherId.toString())).thenReturn(publisherDTO);
        when(bookDataService.findById(1L)).thenReturn(bookDTO);
        // when
        assertThrows(PublisherFlow.BookAlreadyInPublishingException.class, () -> publisherFlow.publishBook(1L,
                publisherId.toString()));
    }
}
```

### 5. Task: Implement the domain event
We want to allow a publishing request and, since we aim for eventual consistency, the publishing of a related domain 
event, that can be consumed later on by our process adapter.
To be able to handle domain events we need a new dependency in our ``pom.xml``:
```xml
<dependency>
    <groupId>org.springframework.data</groupId>
    <artifactId>spring-data-commons</artifactId>
</dependency>
```

The challenge of this task is to actually register domain events on the domain, but then also propagate them to 
the actual JPA entity which will eventually be persisted by the Repository, which in turn will trigger the handling of 
domain events in the ``AbstractAggregateRoot.java``. If we send domain events from the domain already, we 
could encounter a chicken and egg problem, since the domain event would be sent before the JPA entity is persisted.

Here are some useful snippets. Can you place them in the correct places?
```java
    @Getter
    private final List<DomainEvent> domainEvents = new ArrayList<>();
```
Our Domain event
```java
    @Value
    public static class RequestPublishingEvent extends DomainEvent {
        Long bookId;
        UUID publisherId;
    }
    // and
    public abstract class DomainEvent {}
```

The following snippet provides us the support of handling the Domain events correctly.
```java
public class BookJPA extends AbstractAggregateRoot<BookJPA> {
    // ...
    public void registerDomainEvents(List<DomainEvent> domainEvents) {
      domainEvents.forEach(this::andEvent);
    }
}
```

In case of our domain events, we will slightly loosen our architecture rules sets and allow the process adapter to 
know about our domain events. This is because we want to be able to consume them in the process adapter. THe same 
goes for the DomainEvent.class in the data adapter. JPA needs to know about our domain events to be able to fire the 
events when the JPA entity is persisted. Here is an updated ArchUnit test:
```java
@AnalyzeClasses(packages = "eu.javaland.clean_hexagonal_onion", importOptions = {ImportOption.DoNotIncludeTests.class})
public class CleanHexagonalOnionArchitectureTest {

    @ArchTest
    static final ArchRule layer_dependencies_are_respected =
            layeredArchitecture().consideringAllDependencies()

                    .layer("command").definedBy("eu.javaland.clean_hexagonal_onion.command..")
                    .layer("query").definedBy("eu.javaland.clean_hexagonal_onion.query..")
                    .layer("data").definedBy("eu.javaland.clean_hexagonal_onion.data..")
                    .layer("acl").definedBy("eu.javaland.clean_hexagonal_onion.acl..")
                    .layer("process").definedBy("eu.javaland.clean_hexagonal_onion.process..")
                    .layer("domain interaction").definedBy("eu.javaland.clean_hexagonal_onion.domaininteraction..")
                    .layer("domain").definedBy("eu.javaland.clean_hexagonal_onion.domain..")

                    .whereLayer("command").mayNotBeAccessedByAnyLayer()
                    .whereLayer("query").mayNotBeAccessedByAnyLayer()
                    .whereLayer("data").mayNotBeAccessedByAnyLayer()
                    .whereLayer("acl").mayNotBeAccessedByAnyLayer()
                    .whereLayer("process").mayNotBeAccessedByAnyLayer()
                    .whereLayer("domain interaction").mayOnlyBeAccessedByLayers("command", "query", "data", "acl", "process")
                    .whereLayer("domain").mayOnlyBeAccessedByLayers("domain interaction")
                    // we will ignore the Domain Event dependencies from the process layer to the domain layer
                    // We are eventually trying to solve complexity, not add to it. Adding another layer to solve
                    // this would be overkill and overcomplicate things
                    .ignoreDependency(EventProcessor.class, Book.RequestPublishingEvent.class)
                    .ignoreDependency(PublishBookDelegate.class, Book.RequestPublishingEvent.class)
                    .ignoreDependency(BookJPA.class, DomainEvent.class)
            ;
}
```

> Some classes in this test are not yet implemented. We will do that in the next tasks

In the class ``Book.java`` we need to implement the method requestPublishing(id: UUID) which we previously referenced in 
task 4.
```java
    public void requestPublishing(UUID publisherId) {
        // TODO assign the publisherID to the book, in our business logic this means that the book is now in the 
        // process of being published
        // TODO create a domain event and add it to the domainEvents list
    }
```
Having done all that, the ``AbstractAggregateRoot`` will do the publishing of the domain events for us at the moment 
of object persistence. So on to the next task: we need to be able to consume these events in the process adapter.

### 6. Task: Consume the published domain event.

Create a class ``/process/EventProcessor.java``:
```java
import lombok.extern.slf4j.Slf4j;
import nl.theexperts.clean_hexagonal_onion_service.domain.book.Book;
import nl.theexperts.clean_hexagonal_onion_service.process.book.PublishBookDelegate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionalEventListener;

import static org.springframework.transaction.event.TransactionPhase.AFTER_COMMIT;

@Slf4j
@Component
public class EventProcessor {

    private final PublishBookDelegate publishBookDelegate;

    public EventProcessor(PublishBookDelegate publishBookDelegate) {
        this.publishBookDelegate = publishBookDelegate;
    }
    
    @TransactionalEventListener(phase = AFTER_COMMIT)
    public void handleEvent(Book.RequestPublishingEvent requestPublishingEvent) {
        log.info(requestPublishingEvent.toString());
        publishBookDelegate.publishBook(requestPublishingEvent);
    }
}
```
> **Hint:** TransactionalEventListener is a Spring feature that allows you to listen to events that are published within a
> transaction. This is useful for publishing events that are triggered by a command. The event is only published if
> the transaction is committed successfully. If the transaction is rolled back, the event is not published.

This implementation will allow for the domain events on a JPA entity to be processed after the transaction was 
committed.

### 7. Task: Delegate Implementation
Now try to actually implement the ``/process/book/PublishBookDelegate.java`` class.

Useful snippet:
````java
@Service
public class PublishBookDelegate {

  private final BookService bookService;
  private final PublisherService publisherService;


  public PublishBookDelegate(BookService bookService, PublisherService publisherService) {
    this.bookService = bookService;
    this.publisherService = publisherService;
  }

  @Transactional(propagation = REQUIRES_NEW)
  public void publishBook(Book.RequestPublishingEvent event) {
    // retrieve book by id from event
    
   // request the publishing of the book via the Publisher ACL layer (also see API docs below)

    // update the isbn of the book you received as a response and then store the book
  }
}
````

The API on the publisher service is defined as follows:
```http request
POST /publishers/receiveBookOffer
Host: localhost:8081
Content-Type: application/json

{
  "publisherId": "<SOME-UUID>",
  "author": "author name",
  "title": "Cool Title"
}

Returns:
{
  "isbn": "ISBN-3895b77d-ee27-40de-9b08-bf24fe2a013a"
}
```

### Validate

Let's test your implementation:

Testing the endpoint:
```java
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockserver.client.MockServerClient;
import org.mockserver.model.Header;
import org.mockserver.springtest.MockServerTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import javax.json.Json;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static org.mockserver.matchers.Times.exactly;
import static org.mockserver.model.HttpRequest.request;
import static org.mockserver.model.HttpResponse.response;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@MockServerTest
@SpringBootTest
@AutoConfigureMockMvc
class BookCommandsTest {

  private static final Long BOOK_ID = 1L;
  private static final Long AUTHOR_ID = 2L;

  @Autowired
  private MockMvc mockMvc;

  @Autowired
  private ObjectMapper objectMapper;

  @Autowired
  private EntityManager entityManager;

  private MockServerClient mockServerClient;

  @BeforeEach
  void beforeAll() {
    entityManager.createNativeQuery("DELETE FROM author where true; DELETE FROM book where true;")
            .executeUpdate();
  }

  @Test
  @Transactional
  void publishBook() throws Exception {
    // given
    UUID publisherUUID = UUID.randomUUID();
    configureMockGetPublisherById(publisherUUID.toString());
    entityManager.createNativeQuery(
                    "INSERT INTO author (id, first_name, last_name) VALUES (?,?,?)")
            .setParameter(1, AUTHOR_ID)
            .setParameter(2, "firstName")
            .setParameter(3, "lastName")
            .executeUpdate();

    entityManager.createNativeQuery(
                    "INSERT INTO book (id, title, author_id, genre, published, publisher_id, isbn) " +
                            "VALUES (?,?,?,?,?,?,?)")
            .setParameter(1, BOOK_ID)
            .setParameter(2, "title")
            .setParameter(3, AUTHOR_ID)
            .setParameter(4, "HORROR")
            .setParameter(5, false)
            .setParameter(6, null)
            .setParameter(7, null)
            .executeUpdate();

    entityManager.flush();

    var publishBookPayload = objectMapper.writeValueAsString(new PublishBookPayload(publisherUUID.toString()));
    // when
    mockMvc.perform(post(String.format("/books/%d/commands/publish", BOOK_ID))
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(publishBookPayload))
            .andExpect(status().isAccepted());
  }

  private void configureMockGetPublisherById(String publisherId) {
    var responseBody = Json.createObjectBuilder()
            .add("id", publisherId)
            .add("name", "the/experts")
            .add("taxNumber", "VAT12345")
            .add("numberOfEmployees", 30)
            .add("yearlyRevenueInMillions", 99)
            .add("amountOfBooksPublished", 20)
            .build().toString();

    mockServerClient.when(request().withMethod("GET").withPath("/publishers/" + publisherId), exactly(1)).respond(
            response()
                    .withStatusCode(200)
                    .withHeaders(new Header("Content-Type", "application/json; charset=utf-8"))
                    .withBody(responseBody)
                    .withDelay(TimeUnit.SECONDS,1)
    );
  }
}
```
Testing the event publishing:
 ``src/test/java/eu/javaland/clean_hexagonal_onion/data/book/BookJPATest.java``

> **Note:** We are wiring the actual repositories in this test scenario. We need them to handle the transactions
> correctly for us.
  
```java
import eu.javaland.clean_hexagonal_onion.data.author.AuthorJPA;
import eu.javaland.clean_hexagonal_onion.data.author.AuthorRepository;
import eu.javaland.clean_hexagonal_onion.domain.book.Book;
import eu.javaland.clean_hexagonal_onion.domaininteraction.author.AuthorDTO;
import eu.javaland.clean_hexagonal_onion.domaininteraction.book.BookDTO;
import eu.javaland.clean_hexagonal_onion.domaininteraction.book.BookDataService;
import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;
import org.springframework.transaction.event.TransactionalEventListener;

import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringJUnitConfig
@SpringBootTest
class BookJPATest {

  @MockBean
  private TestEventHandler eventHandler;

  @Autowired
  private AuthorRepository authorRepository;

  @Autowired
  private BookRepository bookRepository;

  @Autowired
  private BookDataService bookDataService;

  @Autowired
  private EntityManager entityManager;

  @BeforeEach
  void beforeAll() {
    authorRepository.deleteAll();
    bookRepository.deleteAll();
  }

  @Test
  void shouldPublishEventOnSavingAggregate() {
    var authorJPA = AuthorJPA.builder().firstName("first").lastName("last").build();
    authorRepository.save(authorJPA);
    authorJPA = authorRepository.findAll().get(0);

    UUID publisherId = UUID.randomUUID();
    AuthorDTO authorDTO = new AuthorDTO(authorJPA.getId(), authorJPA.getFirstName(),
            authorJPA.getLastName());
    var bookDTO = new BookDTO(1L, authorDTO, "Title"
            , "Horror",
            publisherId,
            false,
            null, List.of(new Book.RequestPublishingEvent(1L, publisherId)));
    // when
    bookDataService.save(bookDTO);
    // then
    ArgumentCaptor<Book.RequestPublishingEvent> argumentCaptor = ArgumentCaptor.forClass(Book.RequestPublishingEvent.class);
    verify(eventHandler, times(1)).handleEvent(argumentCaptor.capture());
  }

  interface TestEventHandler {
    @TransactionalEventListener()
    void handleEvent(Book.RequestPublishingEvent event);

  }
}
```
Testing the event processor in ``src/test/.../process/EventProcessorTest.java``:
```java
import nl.theexperts.clean_hexagonal_onion_service.domain.book.Book;
import nl.theexperts.clean_hexagonal_onion_service.process.book.PublishBookDelegate;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringJUnitConfig;

import java.util.UUID;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;

@SpringJUnitConfig
@SpringBootTest
class EventProcessorTest {

  @Mock
  private PublishBookDelegate publishBookDelegate;

  @InjectMocks
  private EventProcessor eventProcessor;

  @Test
  void shouldCallTheDelegateToActOnEvent() {
    // when
    Book.RequestPublishingEvent requestPublishingEvent = new Book.RequestPublishingEvent(1L, UUID.randomUUID());
    eventProcessor.handleEvent(requestPublishingEvent);
    // then
    verify(publishBookDelegate, times(1)).publishBook(requestPublishingEvent);
  }
}
```
Testing the delegate and ACL interaction in ``src/test/.../process/book/PublishBookDelegateTest.java``:
```java
import eu.javaland.clean_hexagonal_onion.domain.book.Book;
import eu.javaland.clean_hexagonal_onion.domaininteraction.book.BookDTO;
import eu.javaland.clean_hexagonal_onion.domaininteraction.book.BookDataService;
import eu.javaland.clean_hexagonal_onion.domaininteraction.book.BookFlow;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.mockserver.client.MockServerClient;
import org.mockserver.model.Header;
import org.mockserver.springtest.MockServerTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.json.Json;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockserver.matchers.Times.exactly;
import static org.mockserver.model.HttpRequest.request;
import static org.mockserver.model.HttpResponse.response;

@MockServerTest
@SpringBootTest
class PublishBookDelegateTest {

    private static final Long BOOK_ID = 1L;
    private static final Long AUTHOR_ID = 2L;

    @Autowired
    private BookFlow bookFlow;

    @Autowired
    private BookDataService bookDataService;

    private MockServerClient mockServerClient;

    @Autowired
    private EntityManager entityManager;

    @Test
    @Transactional
    void shouldCallThePublisherServiceAPIWithCorrectPayload() {
        PublishBookDelegate publishBookDelegate = new PublishBookDelegate(bookFlow);
        UUID publisherUUID = UUID.randomUUID();
        UUID isbnUUID = UUID.randomUUID();
        configureMockPublishersReceiveBookOffer(isbnUUID.toString());

        entityManager.createNativeQuery(
                        "INSERT INTO author (id, first_name, last_name) VALUES (?,?,?)")
                .setParameter(1, AUTHOR_ID)
                .setParameter(2, "firstName")
                .setParameter(3, "lastName")
                .executeUpdate();

        entityManager.createNativeQuery(
                        "INSERT INTO book (id, title, author_id, genre, published, publisher_id, isbn) " +
                                "VALUES (?,?,?,?,?,?,?)")
                .setParameter(1, BOOK_ID)
                .setParameter(2, "title")
                .setParameter(3, AUTHOR_ID)
                .setParameter(4, "HORROR")
                .setParameter(5, false)
                .setParameter(6, null)
                .setParameter(7, null)
                .executeUpdate();

        entityManager.flush();
        BookDTO checkBook = bookDataService.findById(BOOK_ID);
        assertThat(checkBook.published()).isFalse();
        assertThat(checkBook.isbn()).isNull();
        // when
        publishBookDelegate.publishBook(new Book.RequestPublishingEvent(BOOK_ID, publisherUUID));
        // then
        mockServerClient.verify(request()
                .withPath("/publishers/receiveBookOffer")
                .withMethod("POST")
                .withBody(Json.createObjectBuilder()
                        .add("publisherId", publisherUUID.toString())
                        .add("author", "firstName lastName")
                        .add("title", "title")
                        .build().toString()));
        BookDTO resultBook = bookDataService.findById(BOOK_ID);
        assertThat(resultBook.published()).isTrue();
        assertThat(resultBook.isbn()).isEqualTo(String.format("ISBN-%s", isbnUUID));

    }

    private void configureMockPublishersReceiveBookOffer(String uuid) {
        var responseBody = Json.createObjectBuilder()
                .add("isbn", String.format("ISBN-%s", uuid))
                .build().toString();

        mockServerClient.when(request().withMethod("POST").withPath("/publishers/receiveBookOffer"), exactly(1)).respond(
                response()
                        .withStatusCode(202)
                        .withHeaders(new Header("Content-Type", "application/json; charset=utf-8"))
                        .withBody(responseBody)
                        .withDelay(TimeUnit.SECONDS,1)
        );
    }
}
```

Give it a try!

```javascript
if (allTestsGreen == true) {
    log.info("DONE! You finished the workshop!");
else{
    log.error("Shout for help!") || (git stash && git checkout 10-process-adapter-done)
}
```
