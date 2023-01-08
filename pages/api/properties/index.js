import nextConnect from "next-connect";
import { addProperty } from "../../../controllers/PropertyController";
import { validateProperty } from "../../../middlewares/validation";

const propertyRouteHandler = nextConnect();
propertyRouteHandler.use(validateProperty);

propertyRouteHandler.post(addProperty);

export default propertyRouteHandler;
