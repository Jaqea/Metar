import mongoose from "../db/db";
var Schema = mongoose.Schema;

const userSchema = new Schema({
  account: Number,
  nickName: String,
  email: String,
  imageUrl: String,
  last_login: String,
  last_register: String,
  download: Number,
  sex: String,
  signature: String,
  password: String,
  type: String,
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
