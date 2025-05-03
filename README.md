# Blog API

A simple RESTful API built with Node.js for managing blog posts — supports user authentication, CRUD operations on posts, etc.

## Base URL
`https://your-domain.com/api`

## Authentication
Uses JWT token for protected routes.
Include token in cookies:

### POST /api/register
Registers a new user.

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

### POST /api/login
Logs in a user.

Body:
{
  "email": "user@example.com",
  "password": "password123"
}

### GET /api/posts
Get all blog posts.
(Requires Auth)

### GET /api/posts/:id
Get a single blog post by ID.
(Requires Auth)

### POST /api/posts
Create a new blog post.

Body:
{
  "title": "My First Blog",
  "content": "This is the content..."
}
(Requires Auth)

### PUT /api/posts/:id
Update a blog post.
(Requires Auth)

### DELETE /api/posts/:id
Delete a blog post.
(Requires Auth)

## steps need to run

clone repository

install the necessary dependency --> # npm install

change the env variables in config/config.js

start the server ---> npm run test
