// server.js
const jsonServer = require('json-server');
const path = require('path');
var multer  = require('multer');

// Define destination and filename
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'public/uploads'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
})

var upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 1000000
  },
  fileFilter: function (req, file, cb) {
    const fileType = /jpeg|jpg|png/;

    const extName = fileType.test(path.extname(file.originalname).toLowerCase())

    const mimeType = fileType.test(file.mimetype)

    if(extName && mimeType) {
      return cb(null, true)
    } else {
      cb('Error: Images Only!')
    }
  }
 }).single('logo');

const server = jsonServer.create();

server.post('/uploadImage', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(422).json(err)
    } else {
     if (req.file == undefined) {
       res.status(422).json({error: 'No file selected'})
     } else {
       res.json({file: req.file.filename})
     }
    }
  })
})
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
// server.use(upload.any());
server.use('/api', router)
server.listen(3000, () => {
  console.log('JSON Server is running on port 3000')
})