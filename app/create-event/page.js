"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is not authenticated, redirect to events page
    if (status === "unauthenticated") {
      router.push('/events');
    }
  }, [status, router]);

  // Show loading state while checking authentication
  if (status === "loading") {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  // Only render the page content if user is authenticated
  if (!session) {
    return null;
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold bg-gradient-to-br from-orange-400 to-teal-600 bg-clip-text text-transparent mb-8">
        Create New Event
      </h1>
      {/* Add your event creation form here */}
      <div className="text-xl">
        Event creation form will be implemented here
      </div>
    </div>
  );
} 