import mongoose from "../db/db";
var Schema = mongoose.Schema;

const userDataSchema = new Schema({
  email: String,
  name: String,
  size: String,
  type: String,
  introduction: String,
  content: String,
  last_upload: String,
  download: Number,
  author: String,
  last_download: String,
  url: String,
});

const userDataModel = mongoose.model("userData", userDataSchema);

export default userDataModel;
