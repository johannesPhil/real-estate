import mongoose from "mongoose";

const residence = ["self-contained", "flat", "house"];
const space = ["land", "commercial", "event_venue"];

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
	room: Number,
	bathroom: Number,
	toilet: Number,
	parking: Number,
	size: String,
});

PropertySchema.path("room").required(function () {
	return residence.indexOf(this.type) > -1;
});

PropertySchema.path("toilet").required(function () {
	return residence.indexOf(this.type) > -1;
});

PropertySchema.path("bathroom").required(function () {
	return residence.indexOf(this.type) > -1;
});

PropertySchema.path("size").required(function () {
	return space.indexOf(this.type) > -1;
});

module.exports =
	mongoose.models.Property || mongoose.model("Property", PropertySchema);
