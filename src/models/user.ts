import mongoose, { Document, Schema, model } from "mongoose";

export interface IUser extends Document<IUser> {
  type: string;
  email?: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema({
  type: { type: String, required: true },
  email: {
    type: String,
    required() {
      return (this as IUser).type === "registered";
    },
  },
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || model<IUser>("User", userSchema);
export default User;
