import type { Experience } from "../types/experience";

interface ExperienceCardProps {
  experience: Experience;
  onViewDetails: (id: string) => void;
}

export default function ExperienceCard({ experience, onViewDetails }: ExperienceCardProps) {
  return (
    <div
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 cursor-pointer group flex flex-col"
      onClick={() => onViewDetails(experience._id)}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={experience.image?.url || "/placeholder.jpg"}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-gray-800 leading-snug mb-1">
          {experience.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">
          {experience.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <p className="text-base font-bold text-gray-900">
            From ₹{experience.price}
          </p>
          <span className="text-xs bg-gray-100 px-2 py-1 rounded-lg text-gray-700 font-medium">
            {experience.location}
          </span>
        </div>

        <button
          className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2.5 rounded-lg transition-all duration-300 hover:scale-[1.02]"
          onClick={(e) => {
            e.stopPropagation();
            onViewDetails(experience._id);
          }}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

