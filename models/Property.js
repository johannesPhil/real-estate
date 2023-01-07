import mongoose from "mongoose";

const residence = ["self-contained", "flat", "house"];
const space = ["land", "commercial", "event venue"];

function isRequired(type) {
	if (type == "residence") {
		return residence.includes(this.type);
	}
	if (type == "space") {
		return space.includes(this.type);
	}
}

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
		type: { Number },
		required: [isRequired("residence"), "Number of rooms required"],
	},
	bathroom: {
		type: { Number },
		required: [isRequired("residence"), "Number of bathrooms required"],
	},
	toilet: {
		type: { Number },
		required: [isRequired("residence"), "Number of toilets required"],
	},
	parking: Number,
	size: {
		type: { String },
		required: [isRequired("space"), "Space size required"],
	},
});

const Property = mongoose.model("Property", PropertySchema);

module.exports = mongoose.models.Property || Property;
