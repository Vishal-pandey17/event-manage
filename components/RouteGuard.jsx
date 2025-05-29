"use client";

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function RouteGuard({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/events');
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="container mx-auto p-8 text-center">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return children;
} 