import Experience from "../models/experience.model.js";

export const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find({}).select("-__v");
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching experiences",
      error: error.message,
    });
  }
};

export const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id)
      .populate("bookings", "date time status") 
      .select("-__v");

    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }

    res.status(200).json(experience);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching experience",
      error: error.message,
    });
  }
};
