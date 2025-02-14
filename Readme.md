# Todo App

This is a simple Todo application built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker
- Docker Compose

## Running the Application

### Using Docker Compose

1. Clone the repository:

   ```sh
   git clone https://github.com/zeuslcf/sip-script-todo-list-app.git
   cd sip-script-todo-list-app
   ```

2. Start the application using Docker Compose:

   ```sh
   docker-compose up --build
   ```

3. The server will be running at `http://localhost:8000`.
4. The client will be running at `http://localhost:3000`.

### Without Docker Compose

1. Clone the repository:

   ```sh
   git clone https://github.com/zeuslcf/sip-script-todo-list-app.git
   cd sip-script-todo-list-app
   ```

2. Install the dependencies on both client and server:

   ```sh
   cd server 'and' cd client
   npm install
   ```

3. Update the `.env` file in the root directory in server and add your MongoDB connection string and database name:

   ```env
   DB_CONNECTION_STRING=mongodb://HOST:PORT
   DB_NAME=DATABASE_NAME
   ```

4. Start the application server:

   ```sh
   cd server
   npm run start
   ```

5. Start the application client:

   ```sh
   cd client
   npm run start
   ```

6. The server will be running at `http://localhost:8000`.
7. The client will be running at `http://localhost:3000`.

## API Endpoints

- `GET /api` - Welcome message
- `GET /ready` - Readiness check
- `GET /api/todos` - Get all todos
- `POST /api/todo` - Create a new todo
- `PUT /api/todo/:id` - Update a todo by ID
- `DELETE /api/todo/:id` - Delete a todo by ID

## License

This project is licensed under the MIT License.
