"use client";

import Image from "next/image";
import { usePlan } from "@/providers/plan-provider";
import { HotelService } from "@prisma/client";

import { Button } from "../ui/button";

interface HotelCardsProps {
  hotel: HotelService;
}

export default function HotelCards({ hotel }: HotelCardsProps) {
  const planContext = usePlan();
  return (
    <div className="container flex h-[40rem] w-[40rem] flex-col gap-2 rounded-md bg-stone-300 p-5">
      <div className="flex h-full w-full justify-center">
        <h3 className="text-center text-xl font-bold">{hotel.name}</h3>
      </div>
      <Image
        src={hotel.imageUrls[0]}
        alt="hotel"
        height={640}
        width={640}
        className="rounded-lg"
      />
      <div className="flex h-full w-full flex-col gap-5 p-4 text-white">
        <div className="flex flex-col gap-2">
          {hotel.perks.map((perk) => (
            <p className="text-lg">{perk}</p>
          ))}
        </div>
        <div className="flex h-full flex-col justify-end">
          <Button
            onClick={() => {
              planContext?.setBookedHotel(hotel);
              planContext?.setPlanPage(4);
            }}
          >
            Book Hotel
          </Button>
        </div>
      </div>
    </div>
  );
}
