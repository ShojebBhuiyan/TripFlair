import Image from "next/image";
import Link from "next/link";
import { BoatService, TripLocation } from "@prisma/client";

import { Button } from "@/components/ui/button";

async function fetchBoatInfo(boatId: string): Promise<BoatService> {
  const res = await fetch("http://localhost:3000/api/business/get-boat-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ boatId: boatId }),
  });
  const data: BoatService = await res.json();
  console.log(data);
  return data;
}

export default async function BoatInfoPage({
  searchParams,
  params,
}: {
  params: { boatId: string };
  searchParams: { tripId: string };
}) {
  const boat = await fetchBoatInfo(params.boatId);

  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-4xl font-bold text-black">
          {boat.name}
        </h1>
        <h2 className="text-3xl">Overview</h2>
        <h3 className="text-2xl text-black">{boat.overview}</h3>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl">Location</h2>
          <p className="text-2xl">
            {`${boat.address}, ${
              boat.location === TripLocation.Coxsbazar
                ? "Cox's Bazar"
                : boat?.location
            }`}
          </p>
        </div>
        <h2 className="text-3xl">Perks</h2>
        <div className="flex flex-col gap-5">
          {boat.perks.map((perk, index) => (
            <p key={index} className="text-2xl">
              {`${index + 1}. ${perk}`}
            </p>
          ))}
        </div>
        <div className="flex gap-5 overflow-x-auto">
          {boat.imageUrls.map((url, index) => (
            <Image key={index} src={url} height={500} width={500} alt="boat" />
          ))}
        </div>
        <div className="flex items-center gap-5">
          <h2 className="text-3xl">Price</h2>
          <p className="text-2xl">{boat.price} BDT</p>
        </div>
        <h2 className="text-3xl">Booking Policy</h2>
        <h3 className="text-2xl text-black">{boat.bookingPolicy}</h3>
        <h2 className="text-3xl">Checkin Policy</h2>
        <h3 className="text-2xl text-black">{boat.checkInPolicy}</h3>
        <div className="flex items-center gap-5">
          <h2 className="text-3xl">Contact Number</h2>
          <p className="text-2xl">{boat.contactNumber}</p>
        </div>
      </div>
      <div className="self-center">
        <Link
          href={`/custom-plan/boat-booking?location=${boat.location.toLowerCase()}&tripId=${
            searchParams.tripId
          }&boatId=${params.boatId}`}
        >
          <Button>Book Boat</Button>
        </Link>
      </div>
    </section>
  );
}
