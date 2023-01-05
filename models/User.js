import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Please specify a name"],
	},
	email: {
		type: String,
		required: [true, "Specify a mail address"],
	},
	password: {
		type: String,
		required: [true, "Password is required"],
	},
	type: {
		type: String,
		enum: ["Admin", "Agent", "Client"],
		require: [true, "User type is required"],
	},
});

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
