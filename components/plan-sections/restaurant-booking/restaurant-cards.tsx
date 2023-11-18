"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { RestaurantService } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface RestaurantCardsProps {
  tripId: string;
  restaurant: RestaurantService;
}

export default function RestaurantCards({
  tripId,
  restaurant,
}: RestaurantCardsProps) {
  const router = useRouter();
  return (
    <div className="container flex h-[40rem] w-[40rem] flex-col gap-2 rounded-md bg-stone-300 p-5">
      <div className="flex h-full w-full flex-col items-center">
        <h3 className="text-center text-xl font-bold">{restaurant.name}</h3>
        <h3 className="text-center text-xl font-bold">{restaurant.slogan}</h3>
      </div>
      <div className="flex justify-center">
        <Image
          src={restaurant.imageUrls[0]}
          alt="hotel"
          height={300}
          width={300}
          className="rounded-lg"
        />
      </div>
      <div className="flex h-full w-full flex-col gap-5 p-4">
        <div className="flex h-full flex-col justify-end">
          <Button
            onClick={() => {
              router.push(`/restaurant/${restaurant.id}?tripId=${tripId}`);
            }}
          >
            See Details
          </Button>
        </div>
      </div>
    </div>
  );
}
