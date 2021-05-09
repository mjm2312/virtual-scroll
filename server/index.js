const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();
app.use(bodyParser.json());
app.use(express.static(__dirname + "/../client/dist"));

app.get("/", (req, res) => {
  //res.status(200).json("Server is working!");
  res.json("in the / route")
});

app.get("/data.csv", (req, res) => {
  res.sendFile(__dirname + '/data.csv');
})

app.get("/test", (req, res) => {
  //res.status(200).json("Server is working!");
  
  console.log('form hit test route ')
  //res.json("in the test route")
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
