"use client";

import { useEffect, useState } from "react";
import Tag from "@/components/Tag";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const { eventId } = params;

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await fetch(`https://qevent-backend.labs.crio.do/events/${eventId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="text-2xl">Loading event details...</div>
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

  if (!event) {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="text-2xl text-red-500">Event not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Event Image */}
        <div className="relative h-96 w-full">
          <img
            src={event.image || "https://picsum.photos/800/400"}
            alt={event.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Event Details */}
        <div className="p-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(event.tags || []).map((tag, index) => (
              <Tag key={`${tag}-${index}`} text={tag} />
            ))}
          </div>

          {/* Title and Basic Info */}
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent">
            {event.name}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Date:</span>{" "}
                {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Time:</span> {event.time}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Location:</span> {event.location}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Artist:</span> {event.artist}
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Price:</span>{" "}
                {event.price > 0 ? `$${event.price.toLocaleString()}` : "FREE"}
              </p>
            </div>
          </div>

          {/* Description */}
          {event.description && (
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">About the Event</h2>
              <p className="text-gray-700 leading-relaxed">{event.description}</p>
            </div>
          )}

          {/* Book Now Button */}
          <button className="w-full md:w-auto bg-gradient-to-r from-orange-400 to-teal-600 text-white px-8 py-3 rounded-md font-bold hover:opacity-90 transition-opacity">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}