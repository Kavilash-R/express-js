const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 4000; // process.env.PORT will be used when we host this website
const logEvents = require("./middleware/logEvents");

app.use((req, res, next) => {
  logEvents(`${req.method}\t ${req.headers.origin}\t ${req.url}\t ${req.path}`);
  next(); //  here we are mentioning next() , if this isnt mentioned then the flow of program will stuck in this method
});

app.use(express.urlencoded({ extended: false })); // this is a built in middleware ( it is used for accepting data from frontend example: submitting a form details)
app.use(express.json()); // used to acccept or handle json files from frontend
app.use(express.static(path.join(__dirname, "./frontend"))); // this will give access to the css files or any files inside it

app.get("^/$|/index(.html)?", (req, res) => {
  // (.html)? => this is that in url client can only write the name index , they dont need to mention .html it is automatically written
  // res.send("hello bois");
  res.sendFile(path.join(__dirname, "index.html")); // here __dirname is directory name for example in this project the directory name is EXPRESS
});
app.get("^/$|/newPage(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "newPage.html"));
});

//if the name of the file changed and client searchs for the old file name this code will execute to the changed page automatically
app.get("^/$|/oldPage(.html)?", (req, res) => {
  res.redirect(301, "newPage.html");
});

//if client searches for a page which is not presented will get this 404 page
app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, () => console.log(`server is running on ${PORT}`));
