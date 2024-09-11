const { Schema, mongoose } = require("mongoose");

const UserShema = new Schema(
  {
    username: { type: String, require: true, min: 3, max: 15, unique: true },
    password: { type: String, require: true },
    email: {
      type: String,
      require: true,
      unique: true,
      // validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
      },
    },
  }
);

module.exports = mongoose.model("User", UserShema);
