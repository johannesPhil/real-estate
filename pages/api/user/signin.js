import nextConnect from "next-connect";
import { signInUser } from "../../../controllers/UserController";
import { validateCredentials } from "../../../middlewares/validation";

const AuthHandler = nextConnect();
AuthHandler.use(validateCredentials);

AuthHandler.post(signInUser);

export default AuthHandler;
