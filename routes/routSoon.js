/*jshint esversion: 8 */

const { Router } = require("express");
const routSoon = Router();
const mysql = require("mysql2/promise");
const {CreateConnectionParams}=require('../public/js/createParams');
routSoon.get("/soon", async (req, res) => {
  try {
    const connection = await mysql.createConnection(new CreateConnectionParams());
    const [rows] = await connection.query("CALL scoro_u_prokati()");
    connection.end();
      res.render("soon", {
      title: "Скоро у прокаті",
      soon: true,
      cont: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = routSoon;
