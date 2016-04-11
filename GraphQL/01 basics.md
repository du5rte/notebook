# GraphQL - Basics

Resources:
- [GraphQL](http://graphql.org/)
- [Learn graphQL](https://learngraphql.com/basics/introduction)
- [GrapgiQL Sandbox](https://sandbox.learngraphql.com/)
- [Star Wars API GraphiQL](http://graphql-swapi.parseapp.com)
- [Awesome list of GraphQL & Relay](https://github.com/chentsulin/awesome-graphql)
- [graphqlhub Medium](https://medium.com/the-graphqlhub)
- [MyNameIsNodeJs GraphQL](https://www.youtube.com/watch?v=Ws5RTLfLIWY)

# GraphQL
Makes better data communication performance and developer experience. Typical REST APIs make clients highly dependable and couple with the server. GraphQL Give the client a lot more power, ability to varies queries, edge cases all in a single trip

Rest query returns whole person info
```
http://swapi.co/api/people/3/
```

GraphQl query returns only what we ask for
```
http://graphql-swapi.parseapp.com/?query={person(personID: 3) {name}}
```


Very useful for more complex data queries
```
query {
  person(personID: 3) {
    name,
    homeworld {
      name,
      filmConnection {
        edges {
          node {
            title
          }
        }
      }
    }
  }
}
```
result
```json
{
  "data": {
    "person": {
      "name": "R2-D2",
      "homeworld": {
        "name": "Naboo",
        "filmConnection": {
          "edges": [
            {
              "node": {
                "title": "Return of the Jedi"
              }
            },
            {
              "node": {
                "title": "The Phantom Menace"
              }
            },
            {
              "node": {
                "title": "Attack of the Clones"
              }
            },
            {
              "node": {
                "title": "Revenge of the Sith"
              }
            }
          ]
        }
      }
    }
  }
}
```

Doing something as complex would look something like so. Hitting the `server` with multiple `requests` which the server would `respond` back will `whole` data models when we might only need a few keys of data.
```js
let query = function () {
  let result = {}

  // person name
  // request http://swapi.co/api/people/3/
  let person = await fetch('http://swapi.co/api/people/3/')
  result.name = person.name

  // person homeworld
  // request http://swapi.co/api/planets/8/
  let homeworld = await fetch(person.homeworld)
  result.homeworld = homeworld.name

  // homeworld filmConnection
  // request http://swapi.co/api/films/3
  // request http://swapi.co/api/films/4
  // request http://swapi.co/api/films/5
  // request http://swapi.co/api/films/6
  result.filmConnection = []
  homeworld.films.forEach(async (url) => {
    let film = await fetch(url)

    result.filmConnection.push({
      title: film.title
    })
  })

  return results
}
```  
