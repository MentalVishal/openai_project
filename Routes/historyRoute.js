const express = require("express");
const { historyModel } = require("../Models/historyModel");
const HistoryRoute = express.Router();

HistoryRoute.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const data = await historyModel.find({ userID: id });

    res.status(200).send(data);
  } catch (err) {
    res.status(400).send({ msg: err.message });
  }
});

module.exports = { HistoryRoute };
