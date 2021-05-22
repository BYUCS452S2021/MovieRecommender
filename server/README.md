# MovieRecommender Server
The backend is a REST API running on a Node/Express server.
The server connects to a Postgres database.

## Getting Started
1. Follow the directions under _Setting up Postgres_ to configure a database.
1. Run `npm install` from the `/server` directory to get set up.
1. Run the server with `npm start`, which binds to `http://localhost:3001`.

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

