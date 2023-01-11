import nextConnect from "next-connect";
import { addProperty } from "../../../controllers/PropertyController";
import { validateProperty } from "../../../middlewares/validation";
import multer from "multer";
import localUpload, {
	memUpload,
	picturesUpload,
	thumbnailUpload,
} from "../../../helpers/fileUpload";

export const config = {
	api: {
		bodyParser: false,
	},
};

const propertyRouteHandler = nextConnect();
propertyRouteHandler.use(
	multer().any(),
	// thumbnailUpload.single("thumbnail"),
	// picturesUpload.array("pictures"),
	validateProperty
);

propertyRouteHandler.post(addProperty);

export default propertyRouteHandler;
