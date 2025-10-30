import mongoose from "mongoose";
import Booking from "../models/booking.model.js";
import Experience from "../models/experience.model.js";

// ✅ Create Booking
export const createBooking = async (req, res) => {
  try {
    const { experienceId, date, time, promoCode, totalPrice, numSeats = 1 } = req.body;
    const userId = req.user._id;

    const experience = await Experience.findById(experienceId);
    if (!experience) return res.status(404).json({ message: "Experience not found" });

    // 🧩 Count total seats already booked for this slot
    const existingBookings = await Booking.aggregate([
      {
        $match: { experience: new mongoose.Types.ObjectId(experienceId), date, time },
      },
      {
        $group: {
          _id: null,
          totalSeats: { $sum: "$numSeats" },
        },
      },
    ]);

    const totalSeatsBooked = existingBookings[0]?.totalSeats || 0;

    if (totalSeatsBooked + numSeats > 10) {
      return res.status(400).json({
        message: `Only ${10 - totalSeatsBooked} seats left for this time slot.`,
      });
    }

    // ✅ Create booking
    const booking = await Booking.create({
      user: userId,
      experience: experienceId,
      date,
      time,
      totalPrice,
      promoCode,
      numSeats,
      status: "confirmed",
    });

    experience.bookings.push(booking._id);
    await experience.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
      remainingSlots: 10 - (totalSeatsBooked + numSeats),
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ message: "Error creating booking", error: error.message });
  }
};

// ✅ Get availability (for specific date)
export const getAvailability = async (req, res) => {
  try {
    const { experienceId, date } = req.params;
    if (!date) return res.status(400).json({ message: "Date is required" });

    // 🧩 Group by time and sum numSeats, not just count bookings
    const bookings = await Booking.aggregate([
      {
        $match: {
          experience: new mongoose.Types.ObjectId(experienceId),
          date,
        },
      },
      {
        $group: {
          _id: "$time",
          totalSeats: { $sum: "$numSeats" },
        },
      },
    ]);

    const availability = {};
    bookings.forEach((b) => {
      availability[b._id] = Math.max(0, 10 - b.totalSeats);
    });

    res.json({ availability });
  } catch (error) {
    console.error("Error fetching availability:", error);
    res.status(500).json({ message: "Error fetching availability" });
  }
};
