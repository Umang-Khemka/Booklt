import Promo from "../models/promo.model.js";

export const validatePromo = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "Promo code required" });

    const promo = await Promo.findOne({ code: code.toUpperCase() });
    if (!promo) return res.status(404).json({ message: "Invalid promo code" });

    if (promo.expiryDate < new Date()) {
      return res.status(400).json({ message: "Promo code expired" });
    }

    res.json({
      valid: true,
      discountType: promo.discountType,
      value: promo.value,
    });
  } catch (error) {
    res.status(500).json({ message: "Error validating promo code", error: error.message });
  }
};
