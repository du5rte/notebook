# Elastic Search - Basics

References:
- [MongoDB - How to Perform Fuzzy-Matching with Mongo Connector and Elastic Search](https://www.mongodb.com/blog/post/how-to-perform-fuzzy-matching-with-mongo-connector)
- [YouTube - Setting Up a Search Box to Your Website or Application with Elasticsearch](https://www.youtube.com/watch?v=CF4vmzYF7Kc&t=567s)
- [Elasticsearch - Getting Started](https://www.elastic.co/webinars/getting-started-elasticsearch)
- [Udemy - Elasticsearch 6 and Elastic Stack - In Depth and Hands On!](https://www.udemy.com/elasticsearch-6-and-elastic-stack-in-depth-and-hands-on)
- [Medium - Indexing MongoDB with ElasticSearch](https://medium.com/@xoor/indexing-mongodb-with-elasticsearch-2c428b676343)

## Install
Much easier to just run as docker images, both [elasticsearch](https://hub.docker.com/_/elasticsearch) and [kibana](https://hub.docker.com/_/kibana) have official images on docker hub.

```sh
# download elasticsearch and kibana images
docker pull elasticsearch:7.0.1
docker pull kibana:7.0.1

# create a network so different services can connect to the same network
docker network create elasticnetwork

# run elasticsearch
docker run -d --name elasticsearch --net elasticnetwork -p 9200:9200 -p 9300:9300 -e "discovery.type=single-node" elasticsearch:7.0.1

# run kibana
docker run -d --name kibana --net elasticnetwork -p 5601:5601 kibana:tag
```
Kibana can be accessed by browser via http://localhost:5601

## RESTful API
Elasticsearch works via HTTP requests and JSON data. Any language or tool that an handle HTTP can use Elasticsearch.

### Search (GET)
```sh
curl \
    -H 'Content-Type: application/json' \
    -XGET 'localhost:9200/shakespeare/_search?pretty' \
    -d '{
        "query": {
            "match_phrase": {
                "text_entry": "to be or not to be"
            }
        }
    }'
```

### Insert (PUT)
```sh
curl \
    -H 'Content-Type: application/json' \
    # Insert the `movie` type document with ID `109487` in `movies`
    -XPUT 'localhost:9200/movies/movie/109487' \
    -d '{
        "genre": ["IMAX", "Sci-Fi"],
        "title": "Interstellar",
        "year": 2024
    }'
```

## Client API’s
Most languages have specialised Elasticsearch libraries to make it even easier

## Analytic Tools
Web-based graphic IU’s such as Kibana let you interact with your indices and explore them without writing code.

## Documents
Documents are the things you're searching for. They can be more than text - any structured JSON data works. Every document has a unique ID, and a type.

## Types
A type defines the schema and mapping shared by documents that represent the same sort of thing. (A log entry, an encyclopedia article, etc). *Elasticsearch is moving towards eliminating the concept of types. In Elasticsearch 6, only one type is allowed per index.*

## Indices
An index powers search into all documents within a collection of types. They contain inverted indices that let you search across everything within them at once.

### Inverted Index
What is an inverted index? At a basic level it maps things you're searching looking to the document that those things live within.

Document 1:
```
Space: the final frontier. These are the voyages...
```
Document 2:
```
He's bad, he's number one. He's the space cowboy with the laser gun!
```


| Terms    | Doc 1 | Doc 2 |
|----------|-------|-------|
| space    | X     | X     |
| the      | X     | X     |
| final    | X     |       |
| frontier | X     |       |
| he       |       | X     |
| bad      |       | X     |


## Relevance (TF-IDF)
Term Frequency * Inverse Document Frequency
Term Frequency is how often a term appears in a given document
Document Frequency is how often a term appears in all documents
Term Frequency / Document Frequency measures the relevance of a term in a document

```
e.g. an article about “space” will use the term often but probably will not appears in all other documents

7 / 20 = 0.35

e.g. on the other side “the” will be a term used very often but all will appear a lot in all other documents 

10 / 340 = 0.007462686567
```

## Mapping
Mapping is a schema definition, elasticsearch has reasonable defaults but sometimes you need to customize them.

set a mapping
```sh
curl \
    -H 'Content-Type: application/json' \
    # Insert the mapping  type of `movie in `movies`
    -XPUT 'localhost:9200/movies' \
    -d '{
      "mappings": {
        "properties": {
          # specify the year time as a date and not just a string
          "year": { "type": "date" }
        }
      }
    }'
```

retrieve a mapping

```sh
curl \
    -H 'Content-Type: application/json' \
    -XGET 'localhost:9200/movies/_mapping/movie?pretty'
```

## Fields
### Field Types
text, keyword, byte, short, integer, long, float, double, boolean
```json
"properties": {
  "user_id": {
    "type": "long"
  }
}
```

### Field Index
Do you want this field to be queryable? true / false
```json
"properties": {
  "genre": {
    "index": "false"
  }
}
```

### Field Analyzer
Define your tokenizer and token filter. Standard / whitespace / simple / english etc.
```json
"properties": {
  "description": {
    "analyzer": "english"
  }
}
```

## Analyzers
For full text search it might have different rules for examples plurals 

### Using analysers
Sometimes fields should be exact-match, use **keyword** mapping type to suppress analyses (exact match only), use **text** type to allow analysing. Search on analysed fields will return anything remotely relevant, depending on the analyser, result will be case-insensitive, stemmed, stop-words removed, synonyms applied, etc. Searches with multiple terms need not match them all.

### Standard
Splits on word boundaries, removes punctuation, lowercases. good choice if language is unknown

### Simple
Splits on anything that isn't a letter, and lowercases

### Whitespace
Splits on whitespace but doesn't lowercase

### language
Accounts for language specific stop-words and stemming

### Character filters
remove HTML encoding, e.g. convert `&` to `and`

### Tokenizer
split strings on whitespace / punctuation / non-leters

### Token Filtering
lowercasing, stemming (box, boxes, boxing), synonyms (big, large, giant), stop-words (the, and, with)

## Importing

### Single
```sh
curl \
    -H 'Content-Type: application/json' \
    -XPUT 'localhost:9200/movies/movie/109487' \
    -d '{
      "id": "109487",
      "title": "Interstellar",
      "year": 2014,
      "genre": ["Sci-Fi", "IMAX"] 
    }'
```

### Multiple
The bulk route allows to insert multiple documents at once, it accepts a format of json separated by line break, the first line defines the index the second the data.
```sh
curl \
    -H 'Content-Type: application/json' \
    -XPUT 'localhost:9200/_bulk' \
    --data-binary @movies.json
```
```json
{ "create": { "_index": "movies", "_type": "movie", "_id": "135569" } }
{ "id": "135569", "title": "Star Trek Beyond", "year": 2016, "genre": ["Action, Adventure", "Sci-Fi"] }
{ "create": { "_index": "movies", "_type": "movie", "_id": "122886" } }
{ "id": "122886", "title": "Star Trek Episode VII - The Force Awakens", "year": 2015, "genre": ["Action, Adventure", "Fantasy", "Sci-Fi", "IMAX"] }
{ "create": { "_index": "movies", "_type": "movie", "_id": "109487" } }
{ "id": "109487", "title": "Interstellar", "year": 2014, "genre": ["Sci-Fi", "IMAX"] }
{ "create": { "_index": "movies", "_type": "movie", "_id": "58559" } }
{ "id": "58559", "title": "The Dark Knight", "year": 2008, "genre": ["Action", "Crime", "Drame", "IMAX"] }
{ "create": { "_index": "movies", "_type": "movie", "_id": "1924" } }
{ "id": "1924", "title": "Plan 9 from Outer Sapce", "year": 2008, "genre": ["Horror", "Sci-Fi"] }
```

## Updating
Elasticsearch records are immutable meaning when we say update in reality we're creating a new version of the document, on it's own time it will clean up old records

When we first query the document we will see `version: 1`
```sh
curl \
    -H 'Content-Type: application/json' \
    -XGET 'localhost:9200/movies/_doc/109487?pretty' \
```
```json
{
  "_index" : "movies",
  "_type" : "movie",
  "_id" : "109487",
  "_version" : 1, <----------
  "_seq_no" : 2,
  "_primary_term" : 1,
  "found" : true,
  "_source" : {
    "id" : "109487",
    "title" : "Interstellar",
    "year" : 2014,
    "genre" : [
      "Sci-Fi",
      "IMAX"
    ]
  }
}
```
We only want to update the title version of this document
```sh
curl \
    -H 'Content-Type: application/json' \
    -XPOST 'localhost:9200/movies/_doc/109487' \
    -d '{
      "doc": {
        "title": "Interstellar"
      }
    }'
```

The second time we query the document version will be bumped to `version: 2`
```json
{
  "_index": "movies",
  "_type": "movie",
  "_id": "109487",
  "_version": 2, <---------
  "result": "updated",
  "_shards": {
    "total": 2,
    "successful": 1,
    "failed": 0
  },
  "_seq_no": 5,
  "_primary_term": 1
}
```

## Delete

### Delete One
```sh
curl \
    -H 'Content-Type: application/json' \
    -XDELETE 'localhost:9200/movies/_doc/109487' \
```

### Delete Index,
A index can't be re-mapped after it's set, to re-mapped it we need to blow the whole index.
```sh
curl \
    -H 'Content-Type: application/json' \
    -XDELETE 'localhost:9200/movies' \
```
Now we can set a new mapping, on `genre`  we only want exact matches
```sh
curl \
    -H 'Content-Type: application/json' \
    -XPUT 'localhost:9200/movies' \
    -d '{
      "mappings": {
        "properties": {
          "id": { "type": "integer" },
          "year": { "type": "date" },
          "genre": { "type": "keyword" },
          "title": { "type": "text", "analyzer": "english" }
        }
      }
    }'
```

## Relational Data

### Normalized Data
Minimizes storage space, makes it easy to change shared attributes (e.g. `title`), but queries two queries, and storage is cheap.

Look up rating
```
Rating { 
  userID
  movieID
  rating
}
```

Look up title
```
Rating { 
  userID
  movieID
  rating
}
```



### Denormalized Data
Titles are duplicated, but only query

Look up rating
```
Rating { 
  userID
  movieID
  title <----
  rating
}
```

### Parent / Child Relationships

Star Wars (Parent)
- A New Hope (Child)
- Empire Strikes Back (Child)
- Return of the Jedi (Child)
- The Force Awakens (Child)


join field

```
curl \
    -H 'Content-Type: application/json' \
    -XPUT 'localhost:9200/series' \
    -d '{
      "mappings": {
        "properties": {
          "film_to_franchise": {
            "type": "join",
            "relations": {
              "franchise": "film"
            }
          }
        }
      }
    }'
```




```json
{ "create" : { "_index" : "series", "_id" : "1", "routing" : 1} }
{ "id": "1", "film_to_franchise": {"name": "franchise"}, "title" : "Star Wars" }
{ "create" : { "_index" : "series", "_id" : "260", "routing" : 1} }
{ "id": "260", "film_to_franchise": {"name": "film", "parent": "1"}, "title" : "Star Wars: Episode IV - A New Hope", "year":"1977" , "genre":["Action", "Adventure", "Sci-Fi"] }

...
```

Parent
```
{ "id": "1", film_to_franchise": {"name": "franchise"} }
```

Child
```
{ "id": "260", film_to_franchise": {"name": "franchise", "parent": "1"} }
```

search children of a parent
```
GET series/_search
{
  "query": {
    "has_parent": {
      "parent_type": "franchise",
      "query": {
        "match": {
          "title": "Star Wars"
        }
      }
    }
  }
}
```
search parent of a child
```
GET series/_search
{
  "query": {
    "has_child": {
      "type": "film",
      "query": {
        "match": {
          "title": "The Force Awakens"
        }
      }
    }
  }
}
```

## Searching

### Query Lite
[URI Search](https://www.elastic.co/guide/en/elasticsearch/reference/current/search-uri-request.html)
```
movies/_search?q=title:star
```
```
movies/_search?q=+year:>2010+title:trek
```