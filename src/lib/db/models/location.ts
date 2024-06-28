import mongoose, { Document, Schema, model } from "mongoose";

export interface ILocation extends Document {
  userId: Schema.Types.ObjectId;
  formatted_address: string;
  geometry: {
    viewport: {
      _id?: string;
      east: number;
      north: number;
      south: number;
      west: number;
    };
    createdAt: Date;
    updatedAt: Date;
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
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

const Location =
  mongoose.models.Location || model<ILocation>("Location", addressSchema);
export default Location;
