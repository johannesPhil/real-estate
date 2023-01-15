import nextConnect from "next-connect";
import {
	addProperty,
	fetchProperties,
} from "../../../controllers/PropertyController";
import { validateProperty } from "../../../middlewares/validation";
import multer from "multer";
import localUpload, {
	memUpload,
	picturesUpload,
	thumbnailUpload,
} from "../../../helpers/fileUpload";
import { verifyToken } from "../../../middlewares/jwt";

export const config = {
	api: {
		bodyParser: false,
	},
};

const propertyRouteHandler = nextConnect();
propertyRouteHandler.use(verifyToken);

propertyRouteHandler.post(multer().any(), validateProperty, addProperty);

propertyRouteHandler.get(fetchProperties);

export default propertyRouteHandler;
