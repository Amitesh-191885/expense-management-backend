import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        newFileName = Date.now()+"_"+file.originalname;
      
      cb(null, newFileName)
    }
  })
  
export const upload = multer({ 
    storage, 
})