import mongoose from "mongoose";

export const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
  },
  password: {
    type: String,
    require: [true, "Please add a password"],
  },
},{
    timestamps: true,
});

const User = mongoose.model('User', userSchema)
export default User
