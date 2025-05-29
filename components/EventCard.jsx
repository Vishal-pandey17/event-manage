"use client";

import Tag from "./Tag";
import Link from "next/link";
import { useState } from "react";

const EventCard = ({ eventData }) => {
  const [imageError, setImageError] = useState(false);
  const defaultImage = "https://picsum.photos/300/200";

  return (
    <div className="hover-inverse w-full sm:w-[45%] lg:w-[30%] h-fit group transform transition-transform duration-400 hover:scale-105 hover:bg-gradient-to-r hover:from-orange-200 hover:to-white text-dark border-slate-400 border rounded-md px-4 sm:px-8 py-2.5">
      <Link
        href={`/events/${eventData.id}`}
        className="rounded-md text-dark flex-shrink-0 scroll-snap-card p-4"
      >
        <div>
          <img
            className="w-full h-48 object-cover mb-3 group-hover:filter-none shadow-lg m-auto rounded-md"
            src={imageError ? defaultImage : (eventData.image || defaultImage)}
            alt={eventData.name || "Event"}
            onError={() => setImageError(true)}
          />
          <div className="flex flex-wrap gap-2 items-center">
            {(eventData.tags || []).map((tag, index) => (
              <Tag text={tag} key={`${tag}-${index}`} />
            ))}
          </div>
          <p className="mt-5 mb-4 text-gray-600">
            {eventData.date ? new Date(eventData.date).toDateString() : "Date TBA"} 
            {eventData.time ? ` | ${eventData.time}` : ""}
          </p>
          <p className="text-gray-600">{eventData.location || "Location TBA"}</p>
          <h2 className="text-2xl font-bold mt-2">{eventData.name || "Untitled Event"}</h2>
          <div className="flex justify-between items-center mt-6">
            <h3 className="text-xl text-gray-800">{eventData.artist || "Artist TBA"}</h3>
            <h3 className="text-xl font-semibold">
              {typeof eventData.price === 'number'
                ? eventData.price > 0
                  ? `$ ${eventData.price.toLocaleString()}`
                  : "FREE"
                : "Price TBA"}
            </h3>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default EventCard;