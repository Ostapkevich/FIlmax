/*jshint esversion: 8 */

const { Router } = require("express");
const routNow = Router();
const mysql = require("mysql2/promise");
const {CreateConnectionParams}=require('../public/js/createParams');
routNow.get("/", async (req, res) => {
  try {
    const connection = await mysql.createConnection(new CreateConnectionParams());
    const [rows] = await connection.query("CALL zaraz_u_procati();");
    connection.end();
    rows.length = rows.length - 1;
     res.render("now", {
     title: "Зараз у прокаті",
     now: true,
     cont: rows[0]
    });
   
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routNow;
