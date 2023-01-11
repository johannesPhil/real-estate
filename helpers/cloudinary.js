import cloudinary from "cloudinary";

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (file, folder) => {
	return new Promise((resolve) => {
		cloudinary.uploader.upload(
			file,
			(result) => {
				resolve({
					url: result.url,
				});
			},
			{ folder }
		);
	});
};
