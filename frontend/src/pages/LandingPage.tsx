import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperienceStore } from "../store/experience.store";
import ExperienceCard from "../components/ExperienceCard";
import Navbar from "../components/Navbar";

export default function ExperiencesPage() {
  const store = useExperienceStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // ✅ Destructure with defaults
  const experiences = store.experiences ?? [];
  const loading = store.loading;
  const error = store.error;
  const fetchExperiences = store.fetchExperiences;

  useEffect(() => {
    fetchExperiences();
  }, []); // ✅ Empty deps

  const handleViewDetails = (id: string) => {
    navigate(`/experience/${id}`);
  };

  // ✅ Triple safety check
  const filteredExperiences = (Array.isArray(experiences) ? experiences : []).filter(
    (exp) =>
      exp?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp?.location?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onSearch={(query) => setSearchQuery(query)} />

      <div className="py-12 px-6 bg-gray-50">
        {loading ? (
          <p className="text-center text-gray-500">Loading experiences...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredExperiences.length === 0 ? (
          <p className="text-center text-gray-500">No experiences found.</p>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {filteredExperiences.map((exp) => (
              <ExperienceCard
                key={exp._id}
                experience={exp}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}