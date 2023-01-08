import User from "../models/User";
import { hash, compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import dbConnection from "../helpers/dbConnection";
import { errorHandler, RegistrationError } from "../helpers/errorHandler";

export const registerUser = async (req, res) => {
	await dbConnection();
	let registeredUser, token;
	let { name, email, password } = req.body;
	const saltRounds = 8;
	hash(password, saltRounds, async (err, hash) => {
		if (err) {
			console.log(err);
			throw "Something went wrong";
		}
		if (hash) {
			password = hash;
			let createdUser = new User({ name, email, password });

			try {
				registeredUser = await createdUser.save();
				if (!registeredUser) {
					throw "Something went wrong";
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
					throw "Something went wrong";
				}
			} catch (error) {
				errorHandler(error, res);
			}

			return res.json({
				status: "success",
				data: {
					name: registeredUser.name,
					email: registeredUser.email,
					token,
				},
			});
		} else {
			// console.log(err);
			throw "Something went wrong. Please try again";
		}
	});
};

export const signInUser = async (req, res) => {
	try {
		await dbConnection();
		const { email, password } = req.body;

		let user = await User.findOne({ email });
		if (!user || user == null) {
			throw "Wrong email, password combination";
		}
		let passwordMatch = await compare(password, user.password);

		if (!passwordMatch) {
			throw "Wrong email, password combination";
		}
		let token = sign(
			{ id: user.id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: "1d" }
		);

		if (!token) {
			return res.status(500).json({ message: "SOmething went wrong" });
		}

		return res.status(200).json({
			status: "success",
			data: { name: user.name, email: user.email, token },
		});
	} catch (error) {
		errorHandler(error, res);
	}
};
