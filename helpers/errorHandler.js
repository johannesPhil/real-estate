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
	// console.log(error);
	if (typeof error === "string") {
		return res.status(400).json({ message: error });
	}
	if (error.name == "ValidationError") {
		console.log(error.errors);
	}
	return res
		.status(500)
		.json({ error: { name: error.name, message: error.message } });
};
