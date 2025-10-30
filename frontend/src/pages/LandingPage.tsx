"use client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useExperienceStore } from "../store/experience.store";
import ExperienceCard from "../components/ExperienceCard";
import Navbar from "../components/Navbar";

export default function ExperiencesPage() {
  const { experiences, fetchExperiences, loading, error } =
    useExperienceStore();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

  const handleViewDetails = (id: string) => {
    navigate(`/experience/${id}`);
  };

  const filteredExperiences = experiences.filter(
    (exp) =>
      exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exp.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ✅ Navbar with search handler */}
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
