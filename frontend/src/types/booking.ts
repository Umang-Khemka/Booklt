export interface Booking {
  _id: string;
  user: string;
  experience: string;
  date: string;
  time: string;
  totalPrice: number;
  promoCode?: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BookingInput {
  experienceId: string;
  date: string;
  time: string;
  promoCode?: string;
  totalPrice: number;
  numSeats: number;
}

export interface AvailabilityResponse {
  availability: Record<string, number>; // e.g. { "10:00 AM": 7, "11:00 AM": 3 }
}

export interface BookingState {
  booking: Booking | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
  remainingSlots: number | null;

 createBooking: (
    data: BookingInput
  ) => Promise<{ message: string; booking: Booking; remainingSlots: number } | null>;

  getAvailability: (
    experienceId: string,
    date: string
  ) => Promise<Record<string, number>>;
}
