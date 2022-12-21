/*jshint esversion: 8 */
const mysql2 = require("mysql2/promise");
const path = require("path");
const expr = require("express");
const flash=require('connect-flash');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = expr();
app.use(expr.static(path.join(__dirname, "public")));
const session = require("express-session");
const varMiddleware = require("./middleware/variables");
const {func}=require('./public/js/helpersFunc');
const exprhbs = require("express-handlebars");
const ehbs = exprhbs.create({
  defaultLayout: "scheme", 
  extname: "hbs", 
  helpers: {seat:func}
});
app.engine("hbs", ehbs.engine); //регистрация движка ehbs для рендеринга старнц, hbsi-расширение файла который указывается в req.render('index')
app.set("view engine", "hbs"); // указываем в параметре view engine какой engine будем испоьзовать
app.set("views", "pages");
app.use(bodyParser.json());
app.use(expr.urlencoded({ extended: true }));
const MySQLStore = require("express-mysql-session")(session);
const {CreatePoolParams, CreateSessionParams}=require('./public/js/createParams');
const connection = mysql2.createPool(new CreatePoolParams());
const sessionStore = new MySQLStore({}, connection);
const sessionParams=new CreateSessionParams();
sessionParams.resave=false;
sessionParams.saveUninitialized=false;
sessionParams.store=sessionStore;
sessionParams.expiration=86400000;
app.use(session(sessionParams));
app.use(flash());
app.use(compression());
app.use(varMiddleware);
const rtNow = require("./routes/routNow.js");
app.use(rtNow);
const rtSoon = require("./routes/routSoon.js");
app.use(rtSoon);
const rtAboutNow = require("./routes/routAboutNow");
app.use(rtAboutNow);
const rtAboutSoon = require("./routes/routAboutSoon.js");
app.use(rtAboutSoon);
const rtMovie = require("./routes/routMovie.js");
app.use(rtMovie);
const rtPlaces = require("./routes/routPlaces");
app.use(rtPlaces);
const rtAuth = require("./routes/routauth");
app.use(rtAuth);
const rtFeedback=require('./routes/routVidguki.js');
app.use(rtFeedback);
const rtCabinet = require("./routes/routCabinet.js");
app.use(rtCabinet);
const rtBuyTickets=require("./routes/routBuyTickets");
app.use(rtBuyTickets);
const PORT = process.env.PORT || 3000;
function start() {
  try {
    app.listen(PORT, () => {console.log(`Server is running on port ${PORT}`);});
  } catch (e) {
    console.log(e.message);
  }
}

start();
