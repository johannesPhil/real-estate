import User from "../models/User";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dbConnection from "../helpers/dbConnection";
import { errorHandler, RegistrationError } from "../helpers/errorHandler";

export const registerUser = async (req, res) => {
	console.log(req.body);
	await dbConnection();
	let registeredUser, token;
	let { name, email, password } = req.body;
	const saltRounds = 8;
	hash(password, saltRounds, async (err, hash) => {
		if (hash) {
			password = hash;
			let createdUser = new User({ name, email, password });

			try {
				registeredUser = await createdUser.save();
				if (!registeredUser) {
					throw new RegistrationError(
						500,
						"Registration Error",
						"Something went wrong"
					);
				}
			} catch (error) {
				errorHandler(error, res);
			}
			try {
				token = sign(
					{ id: registeredUser.id, email: registeredUser.email },
					process.env.JWT_SECRET,
					{ expiresIn: "1d" }
				);
				if (!token) {
					throw new RegistrationError(
						500,
						"Registration Error",
						"Something went wrong"
					);
				}
			} catch (error) {
				errorHandler(error, res);
			}

			return res.json({
				message: "Registration successful",
				data: {
					name: registeredUser.name,
					email: registeredUser.email,
					token,
				},
			});
		} else {
			// console.log(err);
			throw new RegistrationError(
				500,
				"Hashing error",
				"Something went wrong. Please try again"
			);
		}
	});
};

export const signInUser = async (req, res) => {};
