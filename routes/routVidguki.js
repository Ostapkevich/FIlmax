/*jshint esversion: 8 */
const { Router } = require("express");
const routFeedback = Router();
const mysql = require("mysql2/promise");
const {CreateConnectionParams}=require('../public/js/createParams');
routFeedback.get("/feedback", async (req, res) => {
  try {
     const connection = await mysql.createConnection(new CreateConnectionParams());
    const [rows] = await connection.query(`CALL feedback()`);
    connection.end();
    res.render("vidguki", {
      title: "Відгуки",
      vidguki: true,
      cont: rows[0]
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routFeedback;
