import dbConnection from "../helpers/dbConnection";
import { errorHandler } from "../helpers/errorHandler";
import Property from "../models/Property";
import { createImage } from "../helpers/parseImage";

export const addProperty = async (req, res) => {
	await dbConnection();

	let thumbnailURL;
	let picturesURL = [];
	const { title, description, type, location, room, bathroom, toilet } =
		req.body;

	const thumbnailFile = req.files.filter(
		(image) => image.fieldname === "thumbnail"
	);
	const pictureFiles = req.files.filter(
		(image) => image.fieldname === "pictures"
	);

	thumbnailURL = await createImage(thumbnailFile[0], "Chinedu/thumbnails");

	for (const picture of pictureFiles) {
		let image = await createImage(picture, "Chinedu/pictures");
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

		return res.json({ status: "success", data: savedProperty });
	} catch (error) {
		errorHandler(error, res);
	}
};

export const fetchProperties = async (req, res) => {
	const properties = await Property.find({});
	return res.json(properties);
};

export const fetchProperty = async (req, res) => {
	const {
		query: { id },
	} = req;
	Property.findById(id, (err, property) => {
		if (property) {
			return res.json(property);
		} else {
			errorHandler(err, res);
		}
	});
};

export const editProperty = async (req, res) => {
	const {
		query: { id },
		body,
		files,
	} = req;

	let newThumbnailURL;
	let picturesURL = [];

	let propertyMatch = await Property.findById(id);
	if (files.length) {
		const newThumbnail = files.filter(
			(file) => file.fieldname === "thumbnail"
		);

		if (newThumbnail.length) {
			newThumbnailURL = await createImage(
				newThumbnail[0],
				"Chinedu/thumbnails"
			);
			propertyMatch.thumbnail = newThumbnailURL.url;
		}

		const newPictures = files.filter(
			(file) => file.fieldname === "pictures"
		);

		if (newPictures.length) {
			for (const picture of newPictures) {
				let image = await createImage(picture, "Chinedu/pictures");
				picturesURL.push(image.url);
			}
			propertyMatch.pictures = picturesURL;
		}
	}
	for (const [key, value] of Object.entries(body)) {
		propertyMatch[key] = value;
	}

	try {
		let editResult = await propertyMatch.save();

		if (!editResult) {
			throw "Something went wrong. Try again";
		}

		return res.json({ status: "success", data: editResult });
	} catch (error) {
		errorHandler(error, res);
	}
};

export const deleteProperty = async (req, res) => {
	const {
		query: { id },
	} = req;

	try {
		const deleteResult = await Property.deleteOne({ _id: id });
		if (!deleteResult) {
			throw "Something went wrong. Try again";
		}
		return res.json({ status: "success", deleteResult });
	} catch (error) {
		errorHandler(error, res);
	}
};
