const multer = require('multer')
const { v4 } = require('uuid')

const mimeTypes = {
    "image/png" : "png",
    "image/jpg" : "jpg",
    "image/jpeg" : "jpeg",
 }
 
 
 const fileStore = multer.diskStorage({
    destination: (req , file , cb) => {
        cb(null, 'public')
    },
    filename: (req ,file , cb) => {
        const imageExt = mimeTypes[file.mimetype]
        cb(null ,`${v4()}.${imageExt}`)
    }
 })

 module.exports = multer({storage : fileStore}).single("picture")