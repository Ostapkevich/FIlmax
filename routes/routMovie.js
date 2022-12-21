/*jshint esversion: 8 */

const { Router } = require("express");
const routMovie = Router();

routMovie.get("/movie:video_name", (req, res) => {
  try {
    res.render("movie", {
      video:req.params.video_name,
      layout: null,
    });
  } catch (error) {
    res.status(500).json({
      message: " Server error: " + error.message,
    });
  }
});
module.exports = routMovie;
