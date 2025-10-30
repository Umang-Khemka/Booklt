import mongoose from "mongoose";
import dotenv from "dotenv";
import Promo from "../models/promo.model.js";

dotenv.config({path: "../../.env"});

const promoData = [
  {
    code: "WELCOME10",
    discountType: "percentage",
    value: 10,
    expiryDate: new Date("2025-12-31"),
  },
  {
    code: "FLAT200",
    discountType: "flat",
    value: 200,
    expiryDate: new Date("2025-11-30"),
  },
  {
    code: "FESTIVE25",
    discountType: "percentage",
    value: 25,
    expiryDate: new Date("2025-12-15"),
  },
];

const seedPromos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // optional: remove old promo codes first
    await Promo.deleteMany({});
    console.log("🗑️ Old promos cleared");

    // insert new promo codes
    await Promo.insertMany(promoData);
    console.log("🎉 Promo codes inserted successfully!");

    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting promo codes:", error);
    process.exit(1);
  }
};

seedPromos();
