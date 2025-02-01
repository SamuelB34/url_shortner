import dotenv from "dotenv"
import app from "./app"
import * as path from "path"

dotenv.config({ path: path.join(__dirname, ".env") })
require('dotenv').config();

const port = process.env.PORT || 3000
const host = process.env.SERVER_HOST ?? "0.0.0.0"


app.listen(port, () => {
	console.log(`🚀🚀🚀 Server running at ${host}:${port} 🚀🚀🚀`)
})
