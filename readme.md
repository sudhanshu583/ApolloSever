1. What is graphQl ?

GraphQL is a query language for your API, and a server-side runtime for executing queries by using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

A GraphQL service is created by defining types and fields on those types, then providing functions for each field on each type. For example, a GraphQL service that tells us who the logged in user is (me) as well as that user's name might look something like this:

type Query {
  me: User
}
 
type User {
  id: ID
  name: String
}
Along with functions for each field on each type:

function Query_me(request) {
  return request.auth.user;
}
 
function User_name(user) {
  return user.getName();
}
Once a GraphQL service is running (typically at a URL on a web service), it can receive GraphQL queries to validate and execute. A received query is first checked to ensure it only refers to the types and fields defined, then runs the provided functions to produce a result.

2. Difference between GraphQL and Rest.

Over the past decade, REST has become the standard (yet a fuzzy one) for designing web APIs. It offers some great ideas, such as stateless servers and structured access to resources. However, REST APIs have shown to be too inflexible to keep up with the rapidly changing requirements of the clients that access them.

GraphQL was developed to cope with the need for more flexibility and efficiency! It solves many of the shortcomings and inefficiencies that developers experience when interacting with REST APIs.

Data Fetching with REST vs GraphQL
With a REST API, you would typically gather the data by accessing multiple endpoints.

In GraphQL on the other hand, you’d simply send a single query to the GraphQL server that includes the concrete data requirements. The server then responds with a JSON object where these requirements are fulfilled.

No more Over- and Underfetching
One of the most common problems with REST is that of over- and underfetching. This happens because the only way for a client to download data is by hitting endpoints that return fixed data structures. It’s very difficult to design the API in a way that it’s able to provide clients with their exact data needs.

“Think in graphs, not endpoints.” Lessons From 4 Years of GraphQL by Lee Byron, GraphQL Co-Inventor.

Overfetching: Downloading superfluous data
Overfetching means that a client downloads more information than is actually required in the app. Imagine for example a screen that needs to display a list of users only with their names. In a REST API, this app would usually hit the /users endpoint and receive a JSON array with user data. This response however might contain more info about the users that are returned, e.g. their birthdays or addresses - information that is useless for the client because it only needs to display the users’ names.


3. Write down about Schema and Resolvers.

The GraphQL schema is at the center of every GraphQL server. It defines the server's API, allowing clients to know which operations can be performed by the server. The schema is written using the GraphQL schema language (also called schema definition language, SDL). With it, you can define object types and fields to represent data that can be retrieved from the API as well as root types that define the group of operations that the API allows.

const typeDefs = `
  type Book {
    id: Int!
    title: String!
    pages: Int
    chapters: Int
  }

  type Query {
    books: [Book!]
    book(id: Int!): Book
  }
`;

Our API is able to run two query operations: one to retrieve an array of books and another to retrieve a book based on its id. The next step for us is to define how these queries get resolved so that the right fields are returned to the client.

The way to do this is by defining a resolver function for every field in the schema. Remember that I mentioned that GraphQL has an execution algorithm? The implementation of this execution algorithm is what transforms the query from the client into actual result, by moving through every field in the schema, and executing their “resolver” function to determine its result.


const books = [{
  id: 1,
  title: "Fullstack tutorial for GraphQL",
  pages: 356
}, {
  id: 2,
  title: "Introductory tutorial to GraphQL",
  chapters: 10
}, {
  id: 3,
  title: "GraphQL Schema Design for the Enterprise",
  pages: 550,
  chapters: 25
}];

const resolvers = {
  Query: {
    books: function(root, args, context, info) {
      return books;
    },
    book: (root, args, context, info) => books.find(e => e.id === args.id)
  },
  Book: {
    id: parent => parent.id,
    title: parent => parent.title,
    pages: parent => parent.pages,
    chapters: parent => parent.chapters
  }
};

Setting Up The Server

const server = new GraphQLServer({
  typeDefs,
  resolvers
});

server.start(() => console.log(`Server is running on http://localhost:4000`));