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

const locationSchema = new Schema(
  {
    lo: Number,
    hi: Number,
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

const viewportSchema = new Schema(
  {
    east: Number,
    north: Number,
    south: Number,
    west: Number,
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

const geometrySchema = new Schema(
  {
    location: locationSchema,
    viewport: viewportSchema,
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

const addressSchema = new Schema(
  {
    formatted_address: String,
    geometry: geometrySchema,
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

interface ILocation extends Document {
  formatted_address: string;
  geometry: {
    location: { lo: number; hi: number };
    viewport: {
      east: number;
      north: number;
      south: number;
      west: number;
    };
  };
  name: string;
}

export const Location = model<ILocation>("Location", addressSchema);
