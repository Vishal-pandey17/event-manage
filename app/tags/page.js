"use client";

import { useEffect, useState } from "react";
import Tag from "@/components/Tag";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("https://qevent-backend.labs.crio.do/tags");
        if (!response.ok) {
          throw new Error("Failed to fetch tags");
        }
        const data = await response.json();
        console.log("API Response:", data); // Let's see the data structure
        
        // Extract tag names from the objects
        const tagNames = data.map(tag => tag.name);
        setTags(tagNames);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="text-2xl">Loading tags...</div>
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
        Event Tags
      </h1>
      
      {tags.length === 0 ? (
        <div className="text-center text-gray-600 text-xl mt-8">
          No tags available
        </div>
      ) : (
        <div className="flex flex-wrap gap-4 justify-center">
          {tags.map((tag, index) => (
            <Tag key={`${tag}-${index}`} text={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
