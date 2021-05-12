const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.static(__dirname + "/../client/dist"));

app.get("/data.csv", (req, res) => {
  res.sendFile(__dirname + '/data.csv');
})

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
