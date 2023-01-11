import multer from "multer";

export const thumbnailUpload = multer({
	storage: multer.diskStorage({
		destination: "../public/uploads/thumbnail",
	}),
});

export const picturesUpload = multer({
	storage: multer.diskStorage({
		destination: "../public/uploads/pictures",
	}),
});

export const memUpload = multer({
	storage: multer.memoryStorage(),
});
