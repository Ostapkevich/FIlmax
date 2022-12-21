/*jshint esversion:8 */

const { Router } = require("express");
const routBuyTickets = Router();
const mysql = require("mysql2");
const {CreatePoolParams}=require('../public/js/createParams');
routBuyTickets.post("/buyticket", async (req, res) => {
  try {
    res.type("text/plain");
    let setNumbers = "",
      whereNumbers = "",
      insertUserSeans = "";
    for (const i of req.body.seats) {
      setNumbers = setNumbers + "seat" + i + "=0, ";
      whereNumbers = whereNumbers + " seat" + i + "=1 AND";
      insertUserSeans =
        insertUserSeans + `(${req.session.idUser}, ${req.body.idRasp}, ${i}),`;
    }
    let strUpdate = `UPDATE seans SET ${setNumbers.slice(0,setNumbers.length - 2)} WHERE idRasp=${req.body.idRasp} AND ${whereNumbers.slice(0,whereNumbers.length - 4)};`;
    let strInsert = `INSERT INTO userseans (idUser, idRasp, seat) VALUES ${insertUserSeans.slice(0,insertUserSeans.length - 1)};`;
    const connection = mysql.createPool(new CreatePoolParams());
    connection.query(strUpdate, function (err, results, fields) {
      if (results.affectedRows) {
        connection.query(strInsert);
        res.send("1");
      } else {
        res.send("0");
      }
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routBuyTickets;
