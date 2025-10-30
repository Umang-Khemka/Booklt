import { create } from "zustand";
import type { AxiosError } from "axios";
import bookingInstance from "../api/bookingInstance";
import type { Booking, BookingState, AvailabilityResponse } from "../types/booking";

export const useBookingStore = create<BookingState>((set) => ({
  booking: null,
  loading: false,
  error: null,
  successMessage: null,
  remainingSlots: null,

  createBooking: async (data) => {
  set({ loading: true, error: null, successMessage: null });
  try {
    const res = await bookingInstance.post<{
      message: string;
      booking: Booking;
      remainingSlots: number;
    }>("/", data);

    set({
      booking: res.data.booking,
      successMessage: res.data.message || "Booking successful",
      remainingSlots: res.data.remainingSlots,
      loading: false,
    });

    return res.data;
  } catch (err: any) {
    const message =
      (err as AxiosError<{ message?: string }>).response?.data?.message ||
      "Failed to create booking";
    set({ error: message, loading: false });

    return null;
  }
},


  getAvailability: async (experienceId, date) => {
    set({ loading: true, error: null });
    try {
      const res = await bookingInstance.get<AvailabilityResponse>(
        `/availability/${experienceId}/${date}`
      );
      set({ loading: false });
      return res.data.availability;
    } catch (err: any) {
      const message =
        (err as AxiosError<{ message?: string }>).response?.data?.message ||
        "Failed to fetch availability";
      set({ error: message, loading: false });
      return {};
    }
  },
}));
