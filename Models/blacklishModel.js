const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
  token: String,
});

const blacklistModel = mongoose.model("Blacklist", blacklistSchema);

module.exports = {
  blacklistModel,
};
