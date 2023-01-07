import { sign } from "jsonwebtoken";
import { compare } from "bcrypt";
import isEmail from "validator/lib/isEmail";
import { errorHandler } from "../helpers/errorHandler";
import isLength from "validator/lib/isLength";
import User from "../models/User";

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
	const { title, description, type, location, thumbnail, pictures } =
		req.body;
}
