export interface PromoData {
  valid: boolean;
  discountType: "percentage" | "flat";
  value: number;
}

export interface PromoState {
  promo: PromoData | null;
  loading: boolean;
  error: string | null;
  successMessage: string | null;

  validatePromo: (code: string) => Promise<PromoData | null>;
  clearPromo: () => void;
}