"use client";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useBookingStore } from "../store/booking.store";
import { usePromoStore } from "../store/promo.store";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createBooking, loading } = useBookingStore();
  const { validatePromo, promo, error, clearPromo, successMessage } =
    usePromoStore();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const date = query.get("date");
  const time = query.get("time");
  const qty = Number(query.get("qty")) || 1;
  const totalFromQuery = Number(query.get("total")) || 0;

  const subtotal = Math.round(totalFromQuery / 1.05);
  const tax = Math.round(totalFromQuery - subtotal);
  const bookingFee = 49;

  const [form, setForm] = useState({ name: "", email: "", promo: "" });
  const [checked, setChecked] = useState(false);
  const [discount, setDiscount] = useState(0);

  const handlePromo = async () => {
    if (!form.promo.trim()) return toast.error("Please enter a promo code");

    const result = await validatePromo(form.promo.trim().toUpperCase());
    if (!result) {
      setDiscount(0);
      toast.error(error || "Invalid promo code");
      return;
    }

    if (result.discountType === "percentage") {
      const discountValue = Math.round((totalFromQuery * result.value) / 100);
      setDiscount(discountValue);
    } else if (result.discountType === "flat") {
      setDiscount(result.value);
    }

    toast.success(successMessage || "Promo applied!");
  };

  const handleConfirm = async () => {
    if (!checked) return alert("Please accept terms and policy");
    if (!id || !date || !time) {
      toast.error("Booking details are missing. Please go back and select again.");
      return;
    }

    const finalTotal = totalFromQuery + bookingFee - discount;

    try {
      const res = await createBooking({
        experienceId: id!,
        date,
        time,
        numSeats: qty,
        totalPrice: finalTotal,
        promoCode: form.promo.trim() || undefined,
      });

      const bookingId = res?.booking?._id || "UNKNOWN";
      toast.success(" Booking Confirmed!");
      clearPromo();
      navigate(`/booking-confirmed?ref=${bookingId}`);
    } catch (error) {
      console.error(error);
      toast.error(" Booking failed. Please try again.");
    }
  };

  const finalTotal = totalFromQuery + bookingFee - discount;

  return (
  <div className="bg-gray-50 min-h-screen">
    <Navbar />

    <div className="max-w-6xl mx-auto mt-10 flex flex-col md:flex-row gap-10 px-6 pb-16">
      {/* ---------- LEFT: Form ---------- */}
      <div className="flex-1 bg-white shadow-md p-6 rounded-2xl border border-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Checkout</h2>

        {/* Full Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="John Doe"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="john@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* ✅ Promo Input Section */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Promo Code
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Enter promo code"
              value={form.promo}
              onChange={(e) => setForm({ ...form, promo: e.target.value })}
              className="flex-1 p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              onClick={handlePromo}
              className="bg-black text-white px-5 py-2.5 rounded-lg hover:bg-gray-900 transition-all"
            >
              Apply
            </button>
          </div>
        </div>

        {/* ✅ Show Applied Promo */}
        {promo && (
          <div className="bg-green-50 text-green-700 text-sm p-2 rounded-md mb-3">
            ✅ Applied: {form.promo.trim().toUpperCase()} —{" "}
            {promo.discountType === "percentage"
              ? `${promo.value}% off`
              : `₹${promo.value} off`}
          </div>
        )}

        {/* ✅ Available Promos */}
        <div className="text-xs text-gray-500 mb-5">
          Available Promos:{" "}
          <b>WELCOME10</b> (10% off), <b>FLAT200</b> (₹200 off),{" "}
          <b>FESTIVE25</b> (25% off)
        </div>

        {/* Terms */}
        <div className="flex items-start gap-2 text-sm mt-2">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="mt-1"
          />
          <span className="text-gray-600">
            I agree to the{" "}
            <a href="#" className="text-yellow-500 underline">
              terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-yellow-500 underline">
              safety policy
            </a>
            .
          </span>
        </div>
      </div>

      {/* ---------- RIGHT: Summary ---------- */}
      <div className="w-full md:w-80 bg-white shadow-md border border-gray-100 p-6 rounded-2xl h-fit sticky top-24">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Summary</h3>

        <div className="space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium">Date:</span> {date}
          </p>
          <p>
            <span className="font-medium">Time:</span> {time}
          </p>
          <p>
            <span className="font-medium">Quantity:</span> {qty}
          </p>
        </div>

        <hr className="my-4" />

        {/* Breakdown */}
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>₹{tax}</span>
          </div>
          <div className="flex justify-between">
            <span>Online Booking Fee</span>
            <span>₹{bookingFee}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount</span>
              <span>-₹{discount}</span>
            </div>
          )}
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-semibold text-lg text-gray-900">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full mt-6 py-2.5 rounded-lg font-medium text-white bg-yellow-400 hover:bg-yellow-500 transition-all"
        >
          {loading ? "Processing..." : "Pay & Confirm"}
        </button>
      </div>
    </div>
  </div>
);
}
