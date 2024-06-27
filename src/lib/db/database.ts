import mongoose, { Document, Schema, model } from "mongoose";

let isConnected = false;
export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (isConnected) {
    console.log("DB connected already");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI ?? "");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};

export interface ILocation extends Document {
  userId: Schema.Types.ObjectId;
  formatted_address: string;
  geometry: {
    viewport: {
      east: number;
      north: number;
      south: number;
      west: number;
    };
  };
  name: string;
}

const addressSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    formatted_address: String,
    geometry: {
      viewport: {
        east: Number,
        north: Number,
        south: Number,
        west: Number,
      },
    },
    name: String,
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret._id;
        delete ret.__v;
        return ret;
      },
    },
  }
);

interface IUser extends Document<IUser> {
  type: string;
  email: string;
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

export const User = mongoose.model<IUser>("User", userSchema);

export const Location = model<ILocation>("Location", addressSchema);
