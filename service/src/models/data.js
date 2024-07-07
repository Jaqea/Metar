import mongoose from "../db/db";
var Schema = mongoose.Schema;

const dataSchema = new Schema({
  name: String,
  size: String,
  type: String,
  introduction: String,
  content: String,
  time: String,
  download: Number,
  author: String,
  url: String,
});

const dataModel = mongoose.model("Data", dataSchema);

export default dataModel;
