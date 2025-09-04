import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import userSampleSchema from "../models/user.sample.schema";
await mongoose.connect(
  "mongodb+srv://sk0812198:Sulli1406@cluster0.dutwydy.mongodb.net/task?retryWrites=true&w=majority&appName=Cluster0"
);

// Generate a random Task document


