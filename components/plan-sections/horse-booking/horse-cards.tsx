"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { HorseRiding } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface HorseCardsProps {
  tripId: string;
  horse: HorseRiding;
}

export default function HorseCards({ tripId, horse }: HorseCardsProps) {
  const router = useRouter();
  return (
    <div className="container flex h-[40rem] w-[40rem] flex-col gap-2 rounded-md bg-stone-300 p-5">
      <div className="flex h-full w-full flex-col items-center">
        <h3 className="text-center text-xl font-bold">{horse.name}</h3>
      </div>
      <div className="flex justify-center">
        <Image
          src={horse.imageUrls[0]}
          alt="horse"
          height={300}
          width={300}
          className="rounded-lg"
        />
      </div>
      <div className="flex h-full w-full flex-col gap-5 p-4">
        <div className="flex h-full flex-col justify-end">
          <Button
            onClick={() => {
              router.push(`/horse-riding/${horse.id}?tripId=${tripId}`);
            }}
          >
            See Details
          </Button>
        </div>
      </div>
    </div>
  );
}
