"use client";
import { useEffect, useState } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

// Add export const dynamic = 'force-dynamic' to disable static generation
export const dynamic = 'force-dynamic';

export default function EventsPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchParams = useSearchParams();
    
    // Get both artist and tag filters
    const artistName = searchParams?.get('artist');
    const tagName = searchParams?.get('tag');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch("https://qevent-backend.labs.crio.do/events", {
                    // Add cache: 'no-store' to disable caching
                    cache: 'no-store'
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();

                // Transform the data and apply filters
                let filteredEvents = data.map(event => ({
                    ...event,
                    tags: Array.isArray(event.tags) ? event.tags : []
                }));

                // Filter by artist if artist parameter is present
                if (artistName) {
                    const decodedArtistName = decodeURIComponent(artistName).toLowerCase();
                    filteredEvents = filteredEvents.filter(event => 
                        event.artist && event.artist.toLowerCase() === decodedArtistName
                    );
                }

                // Filter by tag if tag parameter is present
                if (tagName) {
                    const decodedTagName = decodeURIComponent(tagName).toLowerCase();
                    filteredEvents = filteredEvents.filter(event => 
                        event.tags && event.tags.some(tag => 
                            tag.toLowerCase() === decodedTagName
                        )
                    );
                }

                setEvents(filteredEvents);
            } catch (err) {
                console.error("Fetch error:", err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, [artistName, tagName]);

    if (loading) {
        return (
            <div className="container mx-auto p-8 text-center">
                <div className="text-2xl">Loading events...</div>
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

    // Determine the page title based on filters
    const getPageTitle = () => {
        if (tagName) {
            return `Events tagged with "${decodeURIComponent(tagName)}"`;
        }
        if (artistName) {
            return `Events by ${decodeURIComponent(artistName)}`;
        }
        return 'All Events';
    };

    // Determine the empty state message
    const getEmptyMessage = () => {
        if (tagName) {
            return `No events found with tag "${decodeURIComponent(tagName)}"`;
        }
        if (artistName) {
            return `No events found for ${decodeURIComponent(artistName)}`;
        }
        return 'No events available';
    };

    return (
        <div className="container mx-auto p-8">
            <h1 className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-8">
                {getPageTitle()}
            </h1>
            {events.length === 0 ? (
                <div className="text-center text-gray-600 text-xl mt-8">
                    {getEmptyMessage()}
                </div>
            ) : (
                <div className="flex flex-wrap justify-center gap-6">
                    {events.map((event, index) => (
                        <EventCard 
                            key={event.id || index} 
                            eventData={event} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}