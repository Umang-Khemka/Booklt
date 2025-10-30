import { create } from "zustand";
import promoInstance from "../api/promoInstance";
import type { PromoData, PromoState } from "../types/promo";

export const usePromoStore = create<PromoState>((set) => ({
  promo: null,
  loading: false,
  error: null,
  successMessage: null,

  validatePromo: async (code) => {
    set({ loading: true, error: null, successMessage: null });

    try {
      const res = await promoInstance.post<PromoData>("/validate", { code });
      set({
        promo: res.data,
        successMessage: "Promo code applied successfully!",
        loading: false,
      });
      return res.data;
    } catch (err: any) {
      const message =
        err.response?.data?.message || "Failed to validate promo code";
      set({ error: message, loading: false });
      return null;
    }
  },

  clearPromo: () => set({ promo: null, error: null, successMessage: null }),
}));
