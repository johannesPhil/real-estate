import Property from "../../../models/Property";
import nextConnect from "next-connect";
import { verifyToken } from "../../../middlewares/jwt";
import { errorHandler } from "../../../helpers/errorHandler";
import dbConnection from "../../../helpers/dbConnection";
import {
	deleteProperty,
	editProperty,
	fetchProperty,
} from "../../../controllers/PropertyController";
import multer from "multer";

const propertyIdHandler = nextConnect();

propertyIdHandler
	.use(verifyToken)
	.get(fetchProperty)
	.put(multer().any(), editProperty)
	.delete(deleteProperty);

export default propertyIdHandler;
export const config = {
	api: {
		bodyParser: false,
	},
};
