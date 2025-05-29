"use client";

import { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";

export default function ArtistsPage() {
    const [artists, setArtists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtists = async () => {
            try {
                const response = await fetch("https://qevent-backend.labs.crio.do/artists");
                if (!response.ok) {
                  throw new Error("Failed to fetch artists");
                }
                const data = await response.json();
                console.log("API Response:", data); // For debugging
                setArtists(data);
              } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
              } finally {
                setLoading(false);
              }
            };
        
            fetchArtists();
          }, []);

    if (loading) {
        return (
            <div className="container mx-auto p-8 text-center">
              <div className="text-2xl">Loading artists...</div>
            </div>
          ); 
    }

    if (error) {
        return (
          <div className="container mx-auto p-8 text-center">
            <div className="text-2xl text-red-500">Error: {error}</div>
          </div>
        );
      }


  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-8">
        Featured Artists
      </h1>
      <div className="flex flex-wrap justify-center gap-8">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artistData={artist} />
        ))}
      </div>
    </div>
  );
}
