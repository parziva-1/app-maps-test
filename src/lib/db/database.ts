import mongoose from "mongoose";
import { Location, User } from "../../models";
import { IUser } from "../../models/user";

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

export const getDatabaseUserByEmail = async (userEmail: string) => {
  await connectToDatabase();

  try {
    const user = await User.findOne({ email: userEmail }).exec();
    return user;
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
};

export const registerNewUser = async (user: IUser) => {
  await connectToDatabase();

  try {
    const newUser = new User({
      type: "registered",
      name: user.name,
      email: user.email,
    });
    return await newUser.save();
  } catch (error) {
    console.error("Error fetching user from database:", error);
    return null;
  }
};

export const updateUserId = async (userId: string, newUserId: string) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: { _id: newUserId } },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error(`User with userId ${userId} not found`);
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating userId:", error);
    throw error;
  }
};

export const updateLocationsForUser = async (
  userId: string,
  newUserId: string
) => {
  try {
    const result = await Location.updateMany(
      { userId: userId },
      { $set: { userId: newUserId } }
    );

    console.log(
      `${result.matchedCount} of ${result.modifiedCount} locations updated for userId: ${userId}`
    );

    return result;
  } catch (error) {
    console.error("Error updating addresses:", error);
    throw error;
  }
};
