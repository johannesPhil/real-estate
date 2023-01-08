import mongoose from "mongoose";

const residence = ["self-contained", "flat", "house"];
const space = ["land", "commercial", "event venue"];

const PropertySchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "Property title required"],
	},
	description: {
		type: String,
		required: [true, "Property description required"],
	},
	type: {
		type: String,
		enum: [...residence, ...space],
		required: [true, "Property type required"],
	},
	location: {
		type: String,
		required: [true, "Property address required"],
	},
	thumbnail: {
		type: String,
		required: [true, "Thumbnail for property required"],
	},
	pictures: {
		type: [String],
		required: [true, "Upload pictures for the property"],
	},
	room: {
		type: Number,
		required: [isFieldRequired, "Number of bathrooms required"],
	},
	bathroom: {
		type: Number,
		required: [isRequired, "Number of bathrooms required"],
	},
	toilet: {
		type: Number,
		required: [isRequired, "Number of toilets required"],
	},
	parking: Number,
	size: {
		type: String,
		required: [isRequired, "Space size required"],
	},
});

function isFieldRequired() {
	switch ((type = this.type)) {
		case residence.includes(type):
			return true;
		case space.includes(type):
			return true;
		default:
			return false;
	}
}

module.exports =
	mongoose.models.Property || mongoose.model("Property", PropertySchema);
