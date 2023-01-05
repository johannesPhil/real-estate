import mongoose from "mongoose";

const MONGO_URI =
	!process.env.NODE_ENV || process.env.NODE_ENV === "development"
		? process.env.MONGO_URI_LOCAL
		: process.env.MONGO_URI_PROD;

let cached = global.mongoose;

if (!cached) {
	cached = global.mongoose = { conn: null, promise: null };
}

const dbConnection = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		mongoose.set("strictQuery", true);
		cached.promise = await mongoose
			.connect(MONGO_URI, {
				useNewUrlParser: true,
			})
			.then((mongoose) => mongoose)
			.catch((err) => console.error("Connection failed: ", err));
	}

	cached.conn = cached.promise;
	return cached.conn;
};

export default dbConnection;
