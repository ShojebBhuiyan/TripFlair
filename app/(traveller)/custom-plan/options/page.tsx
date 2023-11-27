import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function OptionsPage({
  searchParams,
}: {
  searchParams: {
    location: string;
    tripId: string;
  };
}) {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center gap-5">
      <div className="mt-6 rounded-lg px-[10vw] py-[10vh] text-center">
        <p className="mb-4 text-3xl">What would you like to reserve?</p>
        <div className="flex justify-center gap-10">
          <Button className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white">
            <Link
              href={`/hotel?tripId=${
                searchParams.tripId
              }&location=${searchParams.location?.toLowerCase()}`}
            >
              Book a Hotel
            </Link>
          </Button>
          <Button className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white">
            <Link
              href={`/restaurant?tripId=${
                searchParams.tripId
              }&location=${searchParams.location?.toLowerCase()}`}
            >
              Pick a Restaurant
            </Link>
          </Button>
          <Button className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white">
            <Link
              href={`/entertainment?tripId=${
                searchParams.tripId
              }&location=${searchParams.location?.toLowerCase()}`}
            >
              Pick an Entertainment
            </Link>
          </Button>
        </div>
        <div className="flex justify-center">
          <Button className="mt-5 w-[12rem] rounded-[0.625rem] bg-[#00A651] text-white">
            <Link href={`/traveller-dashboard`}>Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
