import Image from "next/image";
import Link from "next/link";
import { HorseRiding, TripLocation } from "@prisma/client";

import { Button } from "@/components/ui/button";

async function fetchHorseInfo(boatId: string): Promise<HorseRiding> {
  const res = await fetch("http://localhost:3000/api/business/get-horse-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boatId: boatId }),
  });
  const data: HorseRiding = await res.json();
  console.log(data);
  return data;
}

export default async function BoatInfoPage({
  searchParams,
  params,
}: {
  params: { horseRidingId: string };
  searchParams: { tripId: string };
}) {
  const horse = await fetchHorseInfo(params.horseRidingId);

  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-4xl font-bold text-black">
          {horse.name}
        </h1>
        <h2 className="text-3xl">Overview</h2>
        <h3 className="text-xl font-semibold text-black">{horse.overview}</h3>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl">Location</h2>
          <p className="text-xl">
            {`${horse.address}, ${
              horse.location === TripLocation.Coxsbazar
                ? "Cox's Bazar"
                : horse?.location
            }`}
          </p>
        </div>
        <h2 className="text-3xl">Perks</h2>
        <div className="flex gap-5 overflow-x-auto">
          {horse.imageUrls.map((url, index) => (
            <Image key={index} src={url} height={500} width={500} alt="boat" />
          ))}
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-3xl">Price</h2>
          <p className="text-xl">{horse.price} BDT</p>
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-3xl">Contact Number</h2>
          <p className="text-xl">{horse.contactNumber}</p>
        </div>
      </div>
      <div className="self-center">
        <Link
          href={`/custom-plan/horse-booking?location=${horse.location.toLowerCase()}&tripId=${
            searchParams.tripId
          }&horseRidingId=${params.horseRidingId}`}
        >
          <Button>Book Horse</Button>
        </Link>
      </div>
    </section>
  );
}
