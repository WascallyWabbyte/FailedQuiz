const express = require('express');
const logger = require('morgan');
const path = require('path');
const postsRouter = require("./routes/posts");
const cookieParser = require('cookie-parser');

const app = express();

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(logger('dev'));

app.use(express.urlencoded( { extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.use( (req, res, next) => {
  const username = req.cookies.username;
  res.locals.username = '';
  if(username){
    res.locals.username = username;
    console.log(`Users username is ${username}`);
  }
  next();
});

app.get('/', (req, res) => {
  res.send("HEY TRY ADDING /signin at the end of the url");
});

app.post("/signin", (req, res) => {
  console.log(req.body);
  res.cookie("username", req.body.username);
  res.redirect("./posts/cluck");
});

app.get('/signin', (req, res) => {
  res.render('signin');
});

app.use("/posts", postsRouter);

const PORT = 4545;
const DOMAIN = "localhost";
app.listen(PORT, DOMAIN, () => {
  console.log(`Server listening on http://${DOMAIN}:${PORT}`)
});
