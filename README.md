# URL Shortener Project

This is a simple URL shortening service built with TypeScript, Express, and Node.js. The application allows users to shorten URLs and redirect to the original URLs using short IDs.

## Features

- Shortens long URLs and provides a short link.
- Redirects to the original URL using the short ID.
- In-memory storage to hold the shortened URLs.

## Tech Stack

- **Node.js**: JavaScript runtime to build the server-side application.
- **Express**: Web framework for handling HTTP requests and responses.
- **TypeScript**: A typed superset of JavaScript for building the application with static types.
- **Nanoid**: A library to generate unique, URL-friendly IDs for shortened URLs.
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
    └── routes/
        ├── index.ts
        └── url.routes.ts
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (v14 or later)
- npm (v6 or later)

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

## Folder Structure

- **controllers/**: Contains the logic for handling API requests.
  - `base.controller.ts`: Base controller with helper methods for sending responses.
  - `url.controller.ts`: Controller for handling URL shortening and redirection.

- **middlewares/**: Contains middleware functions like URL validation and protocol addition.
  - `validations.ts`: Functions for validating and modifying URLs.

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

