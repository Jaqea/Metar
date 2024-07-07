import mongoose from "../db/db";
var Schema = mongoose.Schema;

const announceSchema = new Schema({
  title: String,
  last_upload: String,
  watchers: Number,
  introduction: String,
  content: String,
  author: String,
});

const announceModel = mongoose.model("announce", announceSchema);

export default announceModel;
