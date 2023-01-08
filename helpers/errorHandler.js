class ErrorHandler extends Error {
	constructor(statusCode, title, message) {
		super();
		this.status = statusCode;
		this.title = title;
		this.message = message;
		this.type = this.constructor.name;
	}
}

export class RegistrationError extends ErrorHandler {}
export class AuthError extends ErrorHandler {}

export const errorHandler = (error, res) => {
	if (typeof error === "string") {
		return res.status(400).json({ message: error });
	}
	return res.status(error.code).json(error);
};
