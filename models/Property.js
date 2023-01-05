import { Schema, model } from "mongoose";

const PropertySchema = new Schema({
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
		enum: [
			"self-contained",
			"flat",
			"house",
			"land",
			"commercial",
			"event venue",
		],
		required: [true, "Property type required"],
	},
	location: {
		type: String,
		required: [true, "Property adress required"],
	},
	rooms: Number,
	bathrooms: Number,
	toilets: Numbers,
	parking: Number,
});

const Property = model("Property", PropertySchema);

export default Property;
