import routes from "./routes"
import express from "express"
import bodyParser from "body-parser"
const cors = require("cors")

const app = express()


/**
 * Configures CORS (Cross-Origin Resource Sharing).
 * This allows requests from any origin, indicated by '*' (all URLs).
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 */
app.use(cors({ origin: "*" }));

/**
 * Configures BodyParser to process requests with JSON bodies.
 * Limits the request body size to 20 MB.
 *
 * @param {object} options - Configuration options for bodyParser.
 * @param {string} options.limit - Sets the limit for the request body size (20 MB in this case).
 *
 * @see https://www.npmjs.com/package/body-parser
 */
app.use(
	bodyParser.json({
		limit: "20mb", // Limits the request body size
	})
);

// Registers the application's routes. Routes defined in 'routes.ts' will be handled at the root path ('/').
app.use("/", routes);

// Exports the app for use in other modules (e.g., to start the server in another file)
export default app;