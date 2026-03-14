# Realtime Chat Application - Backend
This repository contains the backend service for a real-time chat application. It is built with Node.js, Express, and Socket.IO, providing a robust foundation for user authentication, real-time messaging, and user presence tracking.

## Features

- **User Authentication**: Secure user signup and login using JSON Web Tokens (JWT).
- **Real-time Messaging**: Instant message delivery using WebSockets via Socket.IO.
- **Image Support**: Send and receive images, which are uploaded and stored using Cloudinary.
- **Online Status**: Track and display which users are currently online.
- **Message History**: Fetch conversation history between users.
- **Seen Status**: Mark messages as "seen" to provide read receipts.
- **Profile Management**: Users can update their profile information, including their name, bio, and profile picture.
- **Protected Routes**: Middleware ensures that sensitive endpoints are accessible only to authenticated users.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Real-time Communication**: Socket.IO
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: `jsonwebtoken` for JWT and `bcryptjs` for password hashing
- **Image Storage**: Cloudinary
- **Environment Variables**: `dotenv`
- **CORS**: `cors` middleware

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (a local instance or a cloud-hosted one like MongoDB Atlas)
- A [Cloudinary](https://cloudinary.com/) account for image storage.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/rexparmar/Realtime-Chatapp-Backend.git
    cd Realtime-Chatapp-Backend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the following variables. Replace the placeholder values with your actual configuration.

    ```env
    # Server Port
    PORT=5000

    # MongoDB Connection URI
    MONGODB_URI=your_mongodb_connection_string

    # JWT Secret
    JWT_SECRET=your_jwt_secret_key

    # Cloudinary Credentials
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```

### Running the Server

-   **For development (with hot-reloading):**
    ```sh
    npm run server
    ```
    The server will start on the port specified in your `.env` file (defaults to `5000`).

-   **For production:**
    ```sh
    npm start
    ```

## API Endpoints

All endpoints are prefixed with `/api`.

### Authentication (`/auth`)

| Method | Endpoint             | Protection | Description                                |
| :----- | :------------------- | :--------- | :----------------------------------------- |
| `POST` | `/signup`            | None       | Registers a new user.                      |
| `POST` | `/login`             | None       | Logs in a user and returns a JWT.          |
| `PUT`  | `/update-profile`    | JWT        | Updates the authenticated user's profile.  |
| `GET`  | `/check`             | JWT        | Verifies the user's authentication status. |

### Messages (`/messages`)

| Method | Endpoint    | Protection | Description                                               |
| :----- | :---------- | :--------- | :-------------------------------------------------------- |
| `GET`  | `/users`    | JWT        | Gets all users for the sidebar and unseen message counts. |
| `GET`  | `/:id`      | JWT        | Gets the message history with a specific user (`:id`).    |
| `POST` | `/send/:id` | JWT        | Sends a new message to a specific user (`:id`).           |
| `PUT`  | `/mark/:id` | JWT        | Marks a specific message (`:id`) as seen.                 |

## WebSocket Events

The server uses Socket.IO to manage real-time communication.

### Connection

-   A client connects by providing their `userId` as a query parameter in the handshake.
    ```javascript
    // Example client-side connection
    const socket = io("http://localhost:5000", {
        query: {
            userId: "user_id_from_auth"
        }
    });
    ```

### Server-emitted Events

-   `getOnlineUsers`: Broadcasts an array of online user IDs to all connected clients whenever a user connects or disconnects.
-   `newMessage`: Emits a new message object to the recipient's socket when a message is sent.

### Client-emitted Events

-   `disconnect`: Automatically handled by Socket.IO when a user disconnects. The server listens for this to update the list of online users.
