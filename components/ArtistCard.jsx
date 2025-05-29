"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const ArtistCard = ({ artistData }) => {
  const [imageError, setImageError] = useState(false);
  const defaultImage = "https://picsum.photos/200/200";
  const router = useRouter();

  const handleViewEvents = () => {
    const encodedArtistName = encodeURIComponent(artistData.name);
    router.push(`/events?artist=${encodedArtistName}`);
  };

  return (
    <div className="hover-inverse group w-full sm:w-[45%] lg:w-[30%] xl:w-[23%] h-fit flex flex-col items-center transform transition-transform duration-400 hover:scale-105 hover:bg-gradient-to-r hover:from-orange-200 hover:to-white text-dark border-slate-400 border rounded-lg p-6">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <img
            className="w-full h-full object-cover rounded-full shadow-lg group-hover:filter-none"
            src={imageError ? defaultImage : (artistData.image || defaultImage)}
            alt={`${artistData.name || 'Artist'}`}
            onError={() => setImageError(true)}
          />
        </div>
        
        <h2 className="text-2xl font-bold mb-2">
          {artistData.name || "Unknown Artist"}
        </h2>
        
        <p className="text-gray-600 mb-2">
          {artistData.location || "Location not specified"}
        </p>
        
        <p className="text-gray-700 mb-6 line-clamp-3">
          {artistData.description || "No description available"}
        </p>

        <div className="flex flex-col gap-2">
          <button 
            onClick={handleViewEvents}
            className="w-full bg-gradient-to-r from-orange-400 to-teal-600 text-white px-6 py-2 rounded-md font-medium hover:opacity-80 transition-opacity"
          >
            View Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistCard;
