# MovieRecommender Server
The backend is a REST API running on a Node/Express server.

## Getting Started
The server can run on either a PostgreSQL database, or a local DynamoDB installation.
Only configure one of the two options.

1. Follow the directions under _Setting up Postgres_ to configure a Postgres database, or
   alternatively follow _Setting up DynamoDB_ to configure the app to connect to a local
   Dynamo installation.
1. Run `npm install` from the `/server` directory to get set up.
1. Run the following to start the server, which binds to `http://localhost:3001`:
   ```
   MOVIEDB_KEY=<api_key> DB=<database_type> npm start
   ```
   - `api_key` is a key required to communicate with the Movie DB, which Movie Recommender
   uses to get movie details. Get a key [here](https://www.themoviedb.org/documentation/api).
   
   - `database_type` is either `postgres` or `dynamo`, depending on the database you chose.
   Default is `postgres`.

### Setting up Postgres
1. Install Postgres on your machine. On a Mac, run:
    ```
    brew update
    brew install postgresql
    ```
1. Start the Postgres server. For Macs, the command is:
   ```
   brew services start postgresql
   ```
1. From the `/server` directory, run `script/db_init` to get the `MovieRecommender`
   database set up. This script creates the database and empty tables, so it only needs to be run once.

### Setting up DynamoDB
1. Follow the instructions [here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html)
   to download the DynamoDB executable.
1. Run the following from the DynamoDB directory to start it up:
   ```
   java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
   ```
