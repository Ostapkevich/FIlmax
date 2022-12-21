/*jshint esversion: 8 */
const { Router } = require("express");
const routСabinet = Router();
const mysql = require("mysql2/promise");
const {CreateConnectionParams}=require('../public/js/createParams');
routСabinet.get("/cabinet", async (req, res) => {
  try {
    let idUser = req.session.idUser;
    const connection = await mysql.createConnection(new CreateConnectionParams());
      const [rows] =
      await connection.query(`SELECT userseans.seat AS S, DATE_FORMAT(seans.seans, '%d %m %Y') AS H, TIME_FORMAT(seans.seans, '%H:%i') AS T, film.filmname
    FROM userseans
    JOIN seans ON userseans.idRasp=seans.idRasp
    JOIN film ON seans.idFm=film.idFilm
    WHERE userseans.idUser=${idUser}
    ORDER BY seans.seans desc;`);
    connection.end();
    res.render("сabinet", {
      title: "Ваш кабінет",
      abinet: true,
      cont: rows,
      idUser: idUser,
      nick: req.session.Nick,
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
routСabinet.post("/userfeedback", async (req, res) => {
  try {
      const connection = await mysql.createConnection(new CreateConnectionParams());
    const {feedback, date} =  req.body;
    let str=`INSERT userfeedback(Feedback, ftime, idUser) VALUES ('${feedback}', '${date}', ${req.session.idUser});`;
    const [rows] = await connection.query(str);
    connection.end();
    if (rows.affectedRows ===1) {
      res.send("1");
    } 
   } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routСabinet;
