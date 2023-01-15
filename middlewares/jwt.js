import { verify } from "jsonwebtoken";
import { errorHandler } from "../helpers/errorHandler";
export const verifyToken = (req, res, next) => {
	const {
		headers: { authorization },
	} = req;
	if (authorization) {
		verify(
			authorization.split(" ")[1],
			process.env.JWT_SECRET,
			(err, decoded) => {
				if (err) {
					errorHandler(err, res);
				} else {
					return next();
				}
			}
		);
	}
};
