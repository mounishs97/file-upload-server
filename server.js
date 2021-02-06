const express = require("express") 
const path = require("path") 
const multer = require("multer") 
const app = express() 

var os = require('os');  

app.set('view engine', 'ejs');
app.use('/media', express.static(__dirname + '/media'));

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'download')
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now().toString()
    cb(null, uniquePrefix + '-' + file.originalname)
  }
})

var upload = multer({ storage: storage })

var networkInterfaces = os.networkInterfaces();
keys = Object.keys(networkInterfaces);
console.log("Available on:");
for(let nw of Object.keys(networkInterfaces)){
    let ip = networkInterfaces[nw];
    console.log("   http://" + ip[1]["address"] + ":8080");
}


app.get('/', function(req, res) {
    res.render('index');
});

app.post('/upload', upload.single('uploaded_file'), function (req, res) {
   console.log(req.file, req.body)
   res.status(200).json({"message": "Uploaded successfully"});
});
   
app.listen(8080,function(error) { 
    if(error) throw error 
        console.log("Ready to download your home network files......") 
}) 
