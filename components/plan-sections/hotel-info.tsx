"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePlan } from "@/providers/plan-provider";
import { HotelRoom, TripLocation } from "@prisma/client";

import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

export default function HotelInfo() {
  const [hotelRooms, setHotelRooms] = useState<HotelRoom[]>([]);
  const planContext = usePlan();
  const { bookedHotel } = planContext!;

  useEffect(() => {
    const fetchHotelRooms = async () => {
      const res = await fetch("/api/business/get-hotel-rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hotelId: bookedHotel?.id }),
      });
      const data: HotelRoom[] = await res.json();
      setHotelRooms(data);
    };
    fetchHotelRooms();
  }, []);

  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-4xl font-bold text-black">
          {bookedHotel?.name}
        </h1>
        <h3 className="text-center text-xl font-semibold text-black">
          {bookedHotel?.slogan}
        </h3>
      </div>
      <div className="flex gap-5 overflow-x-auto">
        {bookedHotel?.imageUrls.map((url, index) => (
          <Image key={index} src={url} height={500} width={500} alt="hotel" />
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Overview</h2>
        <p className="text-xl">{bookedHotel?.overview}</p>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Location</h2>
        <p className="text-xl">
          {`${bookedHotel?.address}, ${
            bookedHotel?.location === TripLocation.Coxsbazar
              ? "Cox's Bazar"
              : bookedHotel?.location
          }`}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">We offer:</h2>
        <div className="flex flex-col gap-2">
          {bookedHotel?.perks.map((perk) => (
            <p className="text-lg">{perk}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Our rooms:</h2>
        <div className="flex flex-col gap-2">
          <Table>
            <TableCaption>{`Hotel Rooms (Click to Book)`}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-medium">Room Type</TableHead>
                <TableHead className="text-lg font-medium">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotelRooms.map((hotelRoom) => (
                <TableRow
                  onClick={() => {
                    planContext?.setBookedRoom(hotelRoom);
                    planContext?.setPlanPage(5);
                  }}
                >
                  <TableCell className="text-md">{hotelRoom.type}</TableCell>
                  <TableCell className="text-md">{hotelRoom.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex items-center gap-5">
        <h2 className="text-3xl">Check-In Time</h2>
        <p className="text-xl">{bookedHotel?.checkInTime}</p>
      </div>

      <div className="flex items-center gap-5">
        <h2 className="text-3xl">Contact Number</h2>
        <p className="text-xl">{bookedHotel?.contactNumber}</p>
      </div>
    </section>
  );
}
