"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { TripLocation } from "@prisma/client";

import { HotelInformation } from "@/types/hotel";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function fetchHotelInfo(hotelId: string) {
  const res = await fetch("/api/business/get-hotel-info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ hotelId }),
  });
  const data: HotelInformation = await res.json();
  return data;
}

export default function HotelInfoPage({
  searchParams,
  params,
}: {
  searchParams: { [tripId: string]: string };
  params: { hotelId: string };
}) {
  const [hotel, setHotel] = useState<HotelInformation | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchHotel = async () => {
      const data = await fetchHotelInfo(params.hotelId);
      setHotel(data);
      setIsLoading(false);
    };
    fetchHotel();
  }, []);

  const router = useRouter();

  console.log(searchParams);
  console.log(params);

  return (
    <>
      {!isLoading && hotel ? (
        <section className="container flex flex-col gap-20 py-10">
          <div className="flex flex-col gap-5">
            <h1 className="text-center text-4xl font-bold text-black">
              {hotel.name}
            </h1>
            <h3 className="text-center text-2xl font-semibold text-black">
              {hotel.slogan}
            </h3>
          </div>
          <div className="flex gap-5 overflow-x-auto">
            {hotel.imageUrls.map((url, index) => (
              <Image
                key={index}
                src={url}
                height={500}
                width={500}
                alt="hotel"
              />
            ))}
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl">Overview</h2>
            <p className="text-2xl">{hotel?.overview}</p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl">Location</h2>
            <p className="text-2xl">
              {`${hotel.address}, ${
                hotel.location === TripLocation.Coxsbazar
                  ? "Cox's Bazar"
                  : hotel?.location
              }`}
            </p>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl">We offer:</h2>
            <div className="flex flex-col gap-2">
              {hotel.perks.map((perk) => (
                <p className="text-2xl">{perk}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <h2 className="text-3xl">Our rooms:</h2>
            <div className="flex flex-col gap-2">
              <Table>
                <TableCaption className="text-2xl">{`Hotel Rooms (Click to Book)`}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-3xl font-medium">
                      Room Type
                    </TableHead>
                    <TableHead className="text-3xl font-medium">
                      Price (BDT)
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {hotel.hotelRooms.map((hotelRoom) => (
                    <TableRow
                      onClick={() => {
                        router.push(
                          `/custom-plan/hotel-booking?tripId=${
                            searchParams.tripId
                          }&hotelId=${params.hotelId}&hotelRoomId=${
                            hotelRoom.id
                          }&location=${hotel.location.toLowerCase()}`
                        );
                      }}
                    >
                      <TableCell className="max-w-xs overflow-auto break-words text-2xl">
                        {hotelRoom.type}
                      </TableCell>
                      <TableCell className="text-2xl">
                        {hotelRoom.price}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <div className="flex items-center gap-5">
            <h2 className="text-3xl">Check-In Time</h2>
            <p className="text-2xl">{hotel.checkInTime}</p>
          </div>
          <div className="flex items-center gap-5">
            <h2 className="text-3xl">Check-Out Time</h2>
            <p className="text-2xl">{hotel.checkOutTime}</p>
          </div>
          <div className="flex items-center gap-5">
            <h2 className="text-3xl">Contact Number</h2>
            <p className="text-2xl">{hotel.contactNumber}</p>
          </div>
        </section>
      ) : (
        <>Loading...</>
      )}
    </>
  );
}
