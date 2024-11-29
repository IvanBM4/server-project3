const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      minlength: [6, "Email must have at least 6 characters"]
    },
    password: {
      type: String,
      required: [true, 'Password is required.']
    },
    username: {
      type: String,
      required: [true, "Username is required."],
      minlength: [3, "Username must have at least 3 characters"]
    }
  },
  {
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;
