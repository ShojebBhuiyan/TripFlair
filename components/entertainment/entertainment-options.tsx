"use client";

import Link from "next/link";

import { Button } from "../ui/button";

interface EntertainmentCardProps {
  tripId: string;
  location: string;
}

export default function EntertainmentOptions({
  tripId,
  location,
}: EntertainmentCardProps) {
  return (
    <div className="flex items-center justify-center gap-20">
      <Link href={`/boat-service?location=${location}&tripId=${tripId}`}>
        <Button>Boat Rides</Button>
      </Link>
      <Link href={`/horse-riding?location=${location}&tripId=${tripId}`}>
        <Button>Horse Riding</Button>
      </Link>
      <Link href={`/parasailing?location=${location}&tripId=${tripId}`}>
        <Button>Parasailing</Button>
      </Link>
    </div>
  );
}
