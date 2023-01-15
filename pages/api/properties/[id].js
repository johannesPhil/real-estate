import Property from "../../../models/Property";
import nextConnect from "next-connect";
import { verifyToken } from "../../../middlewares/jwt";
import { errorHandler } from "../../../helpers/errorHandler";
import dbConnection from "../../../helpers/dbConnection";

const propertyIdHandler = nextConnect();

propertyIdHandler.get(verifyToken, async (req, res) => {
	await dbConnection();
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
});

export default propertyIdHandler;
