import multer from "multer"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // This folder exists in this project and holds files only until Cloudinary uploads them.
        cb(null, './src/public/temp');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random()*1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);

    }
})
export const upload = multer({ storage: storage });
