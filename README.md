Movie Microservice API. In this project, authenticated users can add movies. If the user has a standard account can only add up to 5 movies a month. 
An authorized user can view the list of all movies added by themselves, details about the movie or delete it. When adding a new film to the list, movie details are coming from OMDB.  
 
I created this project's structure as a collection of two services: Authentication and Movies. Netguru had provided an Authentication service.

The project is dockerized, with CI in GitHub Action. Documentation made with Swagger. 

The technology used in this project was: Typescript, Node.js, Express.js, zod, jwt, typegoose and MongoDB.  Tests written in Mocha.

To run this api locally,  set environment variablue OMDB_KEY in dokcer-compose.yml in movies service get key  from omdb. Then run in console docker-compose up -d.   
To get generate new OMDB API KEY, go to https://www.omdbapi.com/apikey.aspx and request free key by giving your email address. 

Swagger docs availiable on localhost:3001/docs

