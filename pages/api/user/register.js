import { validateUserData } from "../../../middlewares/validation";

import nextConnect from "next-connect";
import { registerUser } from "../../../controllers/UserController";

const routeHandler = nextConnect();
routeHandler.use(validateUserData);

routeHandler.post(registerUser);
export default routeHandler;
