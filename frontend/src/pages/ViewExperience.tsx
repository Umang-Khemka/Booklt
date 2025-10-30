"use client";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useExperienceStore } from "../store/experience.store";
import { useBookingStore } from "../store/booking.store";

export default function ViewExperience() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { selectedExperience, fetchExperienceById, loading, error } = useExperienceStore();
  const {
    getAvailability,
    loading: bookingLoading,
    error: bookingError,
  } = useBookingStore();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [availability, setAvailability] = useState<Record<string, number>>({});

  const generateNextFiveDays = () => {
    const dates = [];
    for (let i = 0; i < 5; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      dates.push(date.toISOString().split("T")[0]);
    }
    return dates;
  };
  const availableDates = generateNextFiveDays();

  useEffect(() => {
    if (id) fetchExperienceById(id);
  }, [id]);

  useEffect(() => {
    const fetchAvailability = async () => {
      if (id && selectedDate) {
        const data = await getAvailability(id, selectedDate);
        setAvailability(data || {});
      }
    };
    fetchAvailability();
  }, [id, selectedDate]);

  const handleConfirmBooking = () => {
  if (!selectedDate || !selectedTime) {
    return;
  }

  const price = selectedExperience?.price ?? 0;
  const total = Math.round(price * quantity + price * quantity * 0.05);

  navigate(
    `/checkout/${id}?date=${selectedDate}&time=${selectedTime}&qty=${quantity}&total=${total}`
  );
};


  if (loading || !selectedExperience)
    return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  const price = selectedExperience?.price ?? 0;
  const totalPrice = price * quantity;

  const timeSlots = ["07:00 am", "09:00 am", "11:00 am", "01:00 pm"];
  const remainingForSelected =
    selectedTime && availability ? availability[selectedTime] ?? 10 : 10;

  const handleIncreaseQty = () => {
    setQuantity((q) => Math.min(q + 1, remainingForSelected));
  };

  return (
  <div className="bg-gray-50 min-h-screen">
    <Navbar />
    <div className="max-w-6xl mx-auto mt-8 flex flex-col md:flex-row gap-10 px-6 pb-12">
      {/* ---------- LEFT SIDE ---------- */}
      <div className="flex-1">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden shadow-md border border-gray-200">
          <img
            src={selectedExperience.image?.url || "/placeholder.jpg"}
            alt={selectedExperience.title}
            className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Title & Description */}
        <h2 className="text-2xl font-bold mt-6 text-gray-800">
          {selectedExperience.title}
        </h2>
        <p className="text-gray-700 mt-3 leading-relaxed">
          {selectedExperience.description}
        </p>

        {/* ✅ Date Selection */}
        <h3 className="mt-8 font-semibold text-lg text-gray-800">Choose Date</h3>
        <div className="flex gap-3 mt-3 flex-wrap">
          {availableDates.map((date) => {
            const d = new Date(date);
            const label = d.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
            });

            return (
              <button
                key={date}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                  setQuantity(1);
                }}
                className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
                  selectedDate === date
                    ? "bg-yellow-400 text-white border-yellow-500"
                    : "border-gray-300 text-gray-700 hover:bg-yellow-50"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ✅ Time Selection */}
        <h3 className="mt-8 font-semibold text-lg text-gray-800">Choose Time</h3>
        <div className="flex flex-wrap gap-3 mt-3">
          {timeSlots.map((time) => {
            const remaining = availability?.[time] ?? 10;
            const isFull = remaining <= 0;
            const isLow = remaining <= 3 && remaining > 0;

            return (
              <div key={time} className="relative">
                <button
                  onClick={() => {
                    if (!isFull) {
                      setSelectedTime(time);
                      setQuantity(1);
                    }
                  }}
                  disabled={isFull}
                  className={`px-4 py-2 rounded-lg border text-sm transition-all ${
                    isFull
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300"
                      : selectedTime === time
                      ? "bg-yellow-400 text-white border-yellow-500"
                      : "border-gray-300 text-gray-700 hover:bg-yellow-50"
                  }`}
                >
                  {time}
                </button>
                {isLow && !isFull && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Only {remaining} left
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* ✅ About Section */}
        <h3 className="mt-8 font-semibold text-lg text-gray-800">About</h3>
        <p className="bg-gray-100 p-4 rounded-lg text-gray-600 mt-2 leading-relaxed">
          Scenic routes, trained guides, and safety briefing. Minimum age 10.
        </p>
      </div>

      {/* ---------- RIGHT SIDE ---------- */}
      <div className="w-full md:w-80 bg-white shadow-md border rounded-2xl p-5 h-fit sticky top-24">
        <div className="flex justify-between text-gray-600 mb-3">
          <span>Starts at</span>
          <span className="font-medium text-gray-800">₹{price}</span>
        </div>

        {/* Quantity Controls */}
        <div className="flex justify-between items-center mb-3">
          <span>Quantity</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded-md"
              disabled={quantity <= 1}
            >
              -
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={handleIncreaseQty}
              className="px-3 py-1 border rounded-md"
              disabled={quantity >= remainingForSelected}
            >
              +
            </button>
          </div>
        </div>

        {/* Price Summary */}
        <div className="flex justify-between text-gray-600 mb-1">
          <span>Subtotal</span>
          <span>₹{price}</span>
        </div>
        <div className="flex justify-between text-gray-600 mb-3">
          <span>Taxes</span>
          <span>₹{Math.round(totalPrice * 0.05)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-lg">
          <span>Total</span>
          <span>₹{Math.round(totalPrice + totalPrice * 0.05)}</span>
        </div>

        {/* Confirm Button */}
        <button
          disabled={!selectedDate || !selectedTime || bookingLoading}
          onClick={handleConfirmBooking}
          className={`w-full mt-5 py-2.5 rounded-md font-medium transition-all ${
            !selectedDate || !selectedTime
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-yellow-400 hover:bg-yellow-500 text-white"
          }`}
        >
          {bookingLoading ? "Booking..." : "Confirm Booking"}
        </button>

        {bookingError && <p className="text-red-500 mt-2">{bookingError}</p>}
      </div>
    </div>
  </div>
);

}
