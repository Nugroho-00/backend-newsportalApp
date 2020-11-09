const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'assets/uploads')
  },
  filename: (req, file, cb) => {
    const { id } = req.params
    const ext = file.originalname.split('.')[file.originalname.split('.').length - 1]
    const filename = new Date().getTime().toString().concat(id).concat('.').concat(ext)
    cb(null, filename)
  }
})

module.exports = multer({storage}).single('picture')