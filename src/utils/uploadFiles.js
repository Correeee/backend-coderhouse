import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'documents')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()} - ${file.originalname}`)
    }
})


const upload = multer({ storage: storage }).single('file');

const uploadFile = (req, res) => {
    return new Promise((resolve, reject) => {
        upload(req, res, (err) => {
            if (err) {
                return reject(err);
            }
            const filename = req.file.filename;
            const filePath = `D:/Proyectos - Visual Studio Code/Backend/documents/${filename}`;
            resolve(filePath);
        });
    });
};

export default uploadFile