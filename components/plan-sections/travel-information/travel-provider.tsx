"use client";

import { createContext, useContext, useState } from "react";
import { PresentLocation, TravelMode, TripLocation } from "@prisma/client";

interface TravelContextType {
  tripId: string;
  setTripId: (tripId: string) => void;
  tripLocation: TripLocation | undefined;
  setTripLocation: (tripLocation: TripLocation) => void;
  presentLocation: PresentLocation | undefined;
  setPresentLocation: (presentLocation: PresentLocation) => void;
  travelMode: TravelMode | undefined;
  setTravelMode: (travelMode: TravelMode) => void;
  page: number;
  setPage: (page: number) => void;
}

const TravelContext = createContext<TravelContextType | undefined>(undefined);

export default function TravelProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tripId, setTripId] = useState<string>("");
  const [tripLocation, setTripLocation] = useState<TripLocation | undefined>();
  const [presentLocation, setPresentLocation] = useState<
    PresentLocation | undefined
  >();
  const [travelMode, setTravelMode] = useState<TravelMode | undefined>();
  const [page, setPage] = useState<number>(0);

  return (
    <TravelContext.Provider
      value={{
        tripId,
        setTripId,
        tripLocation,
        setTripLocation,
        presentLocation,
        setPresentLocation,
        travelMode,
        setTravelMode,
        page,
        setPage,
      }}
    >
      {children}
    </TravelContext.Provider>
  );
}

export function useTravel() {
  const context = useContext(TravelContext);
  if (context === undefined) {
    throw new Error("useTravel must be used within a TravelProvider");
  }
  return context;
}
