import nextConnect from "next-connect";
import { validateProperty } from "../../../middlewares/validation";

const propertyRouteHandler = nextConnect();
propertyRouteHandler.use(validateProperty);

propertyRouteHandler.post();
