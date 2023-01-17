import { upload } from "./cloudinary";
import DataURIParser from "datauri/parser";

const parser = new DataURIParser();

export const createImage = async (image, folder) => {
	let imageExtension = image.mimetype.split("/")[1];
	const base64Img = parser.format(imageExtension, image.buffer);
	const response = await upload(base64Img.content, folder);
	return response;
};
