/*jshint esversion:8 */
const { Router } = require("express");
const routAuth = Router();
const mysql = require("mysql2/promise");
const {CreateConnectionParams}=require('../public/js/createParams');
routAuth.get("/auth", async (req, res) => {
  try {
    res.render("login", {
      title: "Опис",
      auth: true,
      error:req.flash('error')
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
routAuth.get("/logout", async (req, res) => {
  try {
    req.session.destroy(() => {
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
routAuth.post("/login", async (req, res) => {
  try {
    res.set("Content-Type", "text/plain");
    const {email, password } = req.body;
    const connection = await mysql.createConnection(new CreateConnectionParams());
    const user = await connection.query(
      `SELECT idUser, Nick, mail FROM user WHERE mail='${email}' AND Password= '${password}'`
    );
    connection.end();

    if (user[0].length == 0) {
      req.flash('error','Невірний Email або пароль.');
      res.redirect('/auth');
    } else {
      req.session.isAuthenticated = true;
      req.session.mail = email;
      req.session.idUser = user[0][0].idUser;
      req.session.Nick = user[0][0].Nick;
      req.session.save(() => {
      res.redirect('/');
      });
    }
  } catch (error) {
    res.status(500).send(" Server error: " + error.message);
  }
});
routAuth.post("/registr", async (req, res) => {
  try {
    res.set("Content-Type", "text/plain");
    const { login, email, password } = req.body;
    const connection = await mysql.createConnection(new CreateConnectionParams());
    const user = await connection.query(
      `INSERT IGNORE INTO user (Nick, mail, Password) VALUES ('${login}', '${email}', '${password}')`
    );
    connection.end();
     if (user[0].insertId == 0) {
      req.flash('error','Користувач із зазначеною електронною поштою вже існує. Спрбуйте ще раз.');
      res.redirect('/auth#registr');
    } else {
      req.session.isAuthenticated = true;
      req.session.mail = email;
      req.session.idUser = user[0].insertId;
      req.session.Nick = login;
      req.session.save(() => {
      res.redirect('/');
      });
    }
  } catch (error) {
    res.status(500).send(" Server error: " + error.message);
  }
});
module.exports = routAuth;
