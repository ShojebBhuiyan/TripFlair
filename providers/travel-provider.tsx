"use client";

import { createContext, useContext, useState } from "react";
import {
  HotelRoom,
  HotelService,
  PresentLocation,
  TravelMode,
  TripLocation,
} from "@prisma/client";

interface PlanContextType {
  presentLocation: PresentLocation | undefined;
  setPresentLocation: (presentLocation: PresentLocation) => void;
  travelMode: TravelMode | undefined;
  setTravelMode: (travelMode: TravelMode) => void;
  startDate: Date;
  numberOfTravellers: number;
  setNumberOfTravellers: (numberOfTravellers: number) => void;
  setStartDate: (startDate: Date) => void;
  startTime: Date;
  setStartTime: (startTime: Date) => void;
  returnDate: Date;
  setReturnDate: (returnDate: Date) => void;
  returnTime: Date;
  setReturnTime: (returnTime: Date) => void;
  totalCost: number;
  setTotalCost: (totalCost: number) => void;
  planPage: number;
  setPlanPage: (planPage: number) => void;
  tripLocation: TripLocation | undefined;
  setTripLocation: (tripLocation: TripLocation) => void;
  bookedHotel: HotelService | undefined;
  setBookedHotel: (bookedHotel: HotelService) => void;
  bookedRoom: HotelRoom | undefined;
  setBookedRoom: (bookedRoom: HotelRoom) => void;
  checkInDate: string;
  setCheckInDate: (checkInDate: string) => void;
  checkOutDate: string;
  setCheckOutDate: (checkOutDate: string) => void;
  hotelCost: number;
  setHotelCost: (hotelCost: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export default function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [presentLocation, setPresentLocation] = useState<
    PresentLocation | undefined
  >();
  const [travelMode, setTravelMode] = useState<TravelMode | undefined>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [returnTime, setReturnTime] = useState<Date>(new Date());
  const [numberOfTravellers, setNumberOfTravellers] = useState<number>(1);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [planPage, setPlanPage] = useState<number>(0);
  const [tripLocation, setTripLocation] = useState<TripLocation | undefined>();
  const [bookedHotel, setBookedHotel] = useState<HotelService | undefined>();
  const [bookedRoom, setBookedRoom] = useState<HotelRoom | undefined>();
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [hotelCost, setHotelCost] = useState<number>(0);

  const context = {
    hotelCost,
    setHotelCost,
    checkInDate,
    setCheckInDate,
    checkOutDate,
    setCheckOutDate,
    bookedRoom,
    setBookedRoom,
    bookedHotel,
    setBookedHotel,
    tripLocation,
    setTripLocation,
    presentLocation,
    setPresentLocation,
    travelMode,
    setTravelMode,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    returnDate,
    setReturnDate,
    returnTime,
    setReturnTime,
    numberOfTravellers,
    setNumberOfTravellers,
    totalCost,
    setTotalCost,
    planPage,
    setPlanPage,
  };

  return (
    <PlanContext.Provider value={context}>{children}</PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  return context;
}
