"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Parasailing } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface ParasailingCardsProps {
  tripId: string;
  parasailing: Parasailing;
}

export default function ParasailingCards({
  tripId,
  parasailing,
}: ParasailingCardsProps) {
  const router = useRouter();
  return (
    <div className="container flex h-[40rem] w-[40rem] flex-col gap-2 rounded-md bg-stone-300 p-5">
      <div className="flex h-full w-full flex-col items-center">
        <h3 className="text-center text-xl font-bold">{parasailing.name}</h3>
        <h3 className="text-center text-xl font-bold">
          {parasailing.subtitle}
        </h3>
      </div>
      <div className="flex justify-center">
        <Image
          src={parasailing.imageUrls[0]}
          alt="parasailing"
          height={300}
          width={300}
          className="rounded-lg"
        />
      </div>
      <div className="flex h-full w-full flex-col gap-5 p-4">
        <h3 className="text-center text-xl font-bold">{parasailing.address}</h3>
        <div className="flex h-full flex-col justify-end">
          <Button
            onClick={() => {
              router.push(`/parasailing/${parasailing.id}?tripId=${tripId}`);
            }}
          >
            Book Parasailing Service
          </Button>
        </div>
      </div>
    </div>
  );
}
