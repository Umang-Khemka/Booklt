import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      filename: String,
    },
    price: {
      type: Number,
      required: true,
    },
    // Link all bookings (reference)
    bookings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
      },
    ],
  },
  { timestamps: true }
);

const Experience = mongoose.model("Experience", experienceSchema);
export default Experience;