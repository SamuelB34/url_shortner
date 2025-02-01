# URL Shortener Project

This is a simple URL shortening service built with TypeScript, Express, and Node.js. The application allows users to shorten URLs and redirect to the original URLs using short IDs. The service now uses MongoDB for persistent storage of shortened URLs.

## Features

- Shortens long URLs and provides a short link.
- Redirects to the original URL using the short ID.
- Uses MongoDB for persistent storage of shortened URLs.
- In-memory fallback storage for URLs when MongoDB is unavailable.

## Tech Stack

- **Node.js**: JavaScript runtime to build the server-side application.
- **Express**: Web framework for handling HTTP requests and responses.
- **TypeScript**: A typed superset of JavaScript for building the application with static types.
- **Nanoid**: A library to generate unique, URL-friendly IDs for shortened URLs.
- **MongoDB**: NoSQL database to store the shortened URLs.
- **Mongoose**: ODM (Object Data Modeling) library to interact with MongoDB.
- **Body-parser**: Middleware to parse incoming request bodies.
- **CORS**: Middleware for enabling cross-origin resource sharing.
- **dotenv**: Loads environment variables from a `.env` file.

## Project Structure

```bash
samuelb34-url_shortner/
├── package.json
├── tsconfig.json
└── src/
    ├── app.ts
    ├── server.ts
    ├── controllers/
    │   ├── base.controller.ts
    │   └── url/
    │       └── url.controller.ts
    ├── middlewares/
    │   └── validations.ts
    ├── models/
    │   └── url.model.ts         # New MongoDB model for URLs
    └── routes/
        ├── index.ts
        └── url.routes.ts
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)
- MongoDB (running locally or on a cloud service like Atlas)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/yourusername/url_shortner.git
    ```

2. Install dependencies:

    ```bash
    cd url_shortner
    npm install
    ```

3. Create a `.env` file in the root directory with the following content:

    ```makefile
    SERVER_HOST=localhost
    PORT=3000
    DB_URI=mongodb://localhost:27017/Shortened_Urls  # MongoDB connection URI
    ```

### Running the Application

You can start the application in development mode using:

```bash
npm run dev
```

## API Endpoints

### 1. Create a Shortened URL
- **URL**: `/`
- **Method**: `POST`
- **Body**:
    ```json
    {
      "url": "https://www.example.com"
    }
    ```
- **Response**:
    ```json
    {
      "msg": "Success",
      "data": {
        "short_id": "localhost:3000/shortId"
      }
    }
    ```

### 2. Redirect to Original URL
- **URL**: `/:id`
- **Method**: `GET`
- **Response**: Redirects to the original URL.

## MongoDB Model: URL

The `Url` model in MongoDB stores the shortened URLs and their corresponding original URLs. It includes:

- **short**: The shortened URL ID.
- **url**: The original URL.

Here is the `Url` model:

```typescript
import mongoose, { Schema, model } from "mongoose";

export interface UrlType {
  short: string;
  url: string;
}

const urlSchema = new Schema<UrlType>({
  short: { type: String, required: true },
  url: { type: String, required: true },
});

const Url = model<UrlType>("Url", urlSchema);

export default Url;
```

### Example of URL storage:

- **short**: `shortId`
- **url**: `https://www.example.com`

## Folder Structure

- **controllers/**: Contains the logic for handling API requests.
    - `base.controller.ts`: Base controller with helper methods for sending responses.
    - `url.controller.ts`: Controller for handling URL shortening and redirection.

- **middlewares/**: Contains middleware functions like URL validation and protocol addition.
    - `validations.ts`: Functions for validating and modifying URLs.

- **models/**: Contains the MongoDB model for storing URLs.
    - `url.model.ts`: Schema for the shortened URLs in MongoDB.

- **routes/**: Defines the routes for the application.
    - `url.routes.ts`: Routes related to URL shortening and redirection.

## TypeScript Configuration

The TypeScript configuration is set up to support decorators and ES module interoperability. Make sure to use `ts-node-dev` for running TypeScript files directly.

```json
{
  "compilerOptions": {
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "target": "es5",
    "module": "commonjs",
    "outDir": "./dist",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": false,
    "sourceMap": true,
    "typeRoots": [
      "src/custom_typings"
    ]
  },
  "include": ["src/**/*.ts"],
  "files": ["src/custom_typings/express.d.ts"]
}
```

---

### Key Updates:
1. **MongoDB Integration**: The project now uses MongoDB to store the shortened URLs persistently.
2. **New `url.model.ts`**: A Mongoose schema for the shortened URLs (`short` and `url`).
3. **Database Connection**: A `connect()` function that establishes a connection to MongoDB (via Mongoose).

This setup allows you to use MongoDB for saving and retrieving shortened URLs, offering better scalability and persistence compared to the previous in-memory solution.