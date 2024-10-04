import mongoose from "mongoose";

const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.Mongoose_Uri);
    console.log("successfully connected to the DB");
  } catch (error) {
    console.log("an error occured while connecting to db:", error);
  }
};

export default connectToDb;
