import mongoose from "mongoose";

const connectDb = handler => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    return handler(req, res)
  }
  await mongoose.connect("mongodb+srv://angad:Angad1234@cluster0.5xl6h.mongodb.net/testDB?retryWrites=true&w=majority")
  return handler(req, res)
}

export default connectDb;