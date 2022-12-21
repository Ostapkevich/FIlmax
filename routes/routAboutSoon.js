/*jshint esversion: 8 */

const { Router } = require("express");
const routAboutSoon = Router();
const mysql = require("mysql2/promise");
const {CreateConnectionParams}=require('../public/js/createParams');
routAboutSoon.get("/soon:idFilm", async (req, res) => {
  try {
    const connection = await mysql.createConnection(new CreateConnectionParams());
    const [rows] = await connection.query(`select idFilm,filmname, img_name, video_name, form, rik, zhanr, rezhiser, studia, kraina, trivalist, obmezhennya, opis, roli from film
    where idFilm=${req.params.idFilm};`);
     connection.end();
      res.render("aboutSoon", {
      title: "Опис",
      soon: true,
      cont: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routAboutSoon;
