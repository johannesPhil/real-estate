import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import isEmail from "validator/lib/isEmail";
import { errorHandler } from "../helpers/errorHandler";
import isLength from "validator/lib/isLength";
import User from "../models/User";
import { localUpload } from "../helpers/fileUpload";

export async function validateUserData(req, res, next) {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			throw "Please fill all fields";
		}
		if (!isEmail(email)) {
			throw "Please use a valid email address";
		}

		if (!isLength(password, { min: 6 })) {
			throw "Password length should be minimum of 6 characters";
		}

		const duplicate = await User.findOne({ email });
		if (duplicate) {
			throw `User with email ${email} already exists`;
		}
		return next();
	} catch (error) {
		errorHandler(error, res);
	}
}

export async function validateCredentials(req, res, next) {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			throw "Please all fields";
		}
		if (!isEmail(email)) {
			throw "Invalid mail address";
		}

		return next();
	} catch (error) {
		errorHandler(error, res);
	}
}

export async function validateProperty(req, res, next) {
	try {
		const {
			title,
			description,
			type,
			location,
			room,
			bathroom,
			toilet,
			size,
			parking,
		} = req.body;
		const images = req.files;
		const imageFormats = ["image/png", "image/jpeg", "image/jpg"];
		const residence = ["self-contained", "flat", "house"];
		const space = ["land", "commercial", "event venue"];

		if (residence.includes(type) && (!room || !bathroom || !toilet)) {
			throw `${type} property must have room, bath and toilet specified`;
		}

		if (space.includes(type) && !size) {
			throw `${type} property must have size specified`;
		}
		if (!title || !description || !type || !location) {
			throw "Fill all property description fields";
		}
		if (images.some((image) => imageFormats.indexOf(image.mimetype) < 0)) {
			throw "Unsupported file format detected in the upload";
		}

		if (!images.some((image) => image.fieldname === "thumbnail")) {
			throw "Add THUMBNAIL for property";
		}

		if (!images.some((image) => image.fieldname === "pictures")) {
			throw "Upload at least one PICTURE for the property";
		}

		return next();
	} catch (error) {
		errorHandler(error, res);
	}
}
