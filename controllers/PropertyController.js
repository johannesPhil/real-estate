import dbConnection from "../helpers/dbConnection";
import { errorHandler } from "../helpers/errorHandler";
import Property from "../models/Property";
import { upload } from "../helpers/cloudinary";

import DataURIParser from "datauri/parser";

const parser = new DataURIParser();

export const addProperty = async (req, res) => {
	await dbConnection();

	let thumbnailURL;
	let picturesURL = [];
	const { title, description, type, location, room, bathroom, toilet } =
		req.body;

	const createImage = async (image, folder) => {
		let imageExtension = image.mimetype.split("/")[1];
		const base64Img = parser.format(imageExtension, image.buffer);
		const response = await upload(base64Img.content, folder);
		return response;
	};

	const thumbnailFile = req.files.filter(
		(image) => image.fieldname === "thumbnail"
	);
	const pictureFiles = req.files.filter(
		(image) => image.fieldname === "pictures"
	);

	thumbnailURL = await createImage(thumbnailFile[0], "Chinedu/thumbnails");

	for (const picture of pictureFiles) {
		let image = await createImage(picture, "Chinedu/pictures");
		console.log(image.url);
		picturesURL.push(image.url);
	}

	let newProperty = new Property({
		...req.body,
		thumbnail: thumbnailURL.url,
		pictures: picturesURL,
	});
	// console.log(newProperty);
	try {
		let savedProperty = await newProperty.save();
		if (!savedProperty) {
			throw "Something went wrong";
		}

		console.log(savedProperty);
		return res.json({ status: "success", data: savedProperty });
	} catch (error) {
		errorHandler(error, res);
	}
};

export const fetchProperties = async (req, res) => {
	const properties = await Property.find({});
	return res.json(properties);
};
