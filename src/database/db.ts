import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const DB_URI = process.env.DB_URI || "mongodb://localhost:27017/shortened_urls";

const connect = (): void => {
	// Connect to the MongoDB database
	mongoose.connect(DB_URI, {} as mongoose.ConnectOptions); // No need for deprecated options

	const db = mongoose.connection;

	db.on("error", () => console.log("Connection error 💥💥💥"));
	db.once("open", function () {
		console.log("Connected to the database! ✅✅✅");
	});
};

export default { connect };
