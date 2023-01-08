import dbConnection from "../helpers/dbConnection";
import { errorHandler } from "../helpers/errorHandler";
import Property from "../models/Property";

export const addProperty = async (req, res) => {
	await dbConnection();
	try {
		let newProperty = new Property(req.body);
		let dbProperty = await newProperty.save();

		if (!dbProperty) {
			throw "Could not save property. Please try again";
		}
		return res.status(200).json({ status: "success", data: dbProperty });
	} catch (error) {
		errorHandler(error, res);
	}
};
