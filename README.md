# Bookworm Haven (server)

## Prerequisites

This project has the following dependencies:
- [Loopback 3](https://loopback.io/doc/en/lb3/Installation.html)
- [Up to Node.js v12.x](https://nodejs.org/dist/latest-erbium/)
- PostgreSQL database with the following data models:
  - book
    ```json
    {
        "title": String,
        "publisher": String,
        "year": Number,
        "authorId": String
    }
    ```
  - author
    ```json
    {
        "name": String,
        "biography": String
    }
    ```
  - A one-to-many mapping between authors and books, such that each author can have multiple books.

## Getting Started

1. Set the environment variables defined in `.env.example`
2. Copy the client build into `/client`
3. Build the docker image: `docker build -t bookworm_haven .`
4. Start the container: `docker run -p <port>:<port> --env-file=.env bookworm_haven`
