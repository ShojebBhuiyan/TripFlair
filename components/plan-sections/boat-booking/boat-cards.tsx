"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { BoatService } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface BoatCardsProps {
  tripId: string;
  boat: BoatService;
}

export default function RestaurantCards({ tripId, boat }: BoatCardsProps) {
  const router = useRouter();
  return (
    <div className="container flex h-[40rem] w-[40rem] flex-col gap-2 rounded-md bg-stone-300 p-5">
      <div className="flex h-full w-full flex-col items-center">
        <h3 className="text-center text-xl font-bold">{boat.name}</h3>
        <h3 className="text-center text-xl font-bold">{boat.overview}</h3>
      </div>
      <div className="flex justify-center">
        <Image
          src={boat.imageUrls[0]}
          alt="boat"
          height={300}
          width={300}
          className="rounded-lg"
        />
      </div>
      <div className="flex h-full w-full flex-col gap-5 p-4">
        <h3 className="text-center text-xl font-bold">{boat.address}</h3>
        <div className="flex h-full flex-col justify-end">
          <Button
            onClick={() => {
              router.push(`/boat-service/${boat.id}?tripId=${tripId}`);
            }}
          >
            Book Boat
          </Button>
        </div>
      </div>
    </div>
  );
}
