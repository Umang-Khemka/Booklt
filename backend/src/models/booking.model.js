import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    date: {
      type: String, // e.g. "2025-10-28"
      required: true,
    },
    time: {
      type: String, // e.g. "10:00 AM - 11:00 AM"
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    promoCode: {
      type: String,
    },
    status: {
      type: String,
      enum: ["confirmed", "cancelled"],
      default: "confirmed",
    },
    numSeats: {
      type: Number,
      default: 1, // 🧩 New field for how many people in a booking
      min: 1,
    },
  },
  { timestamps: true }
);


const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
