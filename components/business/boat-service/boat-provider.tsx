"use client";

import { createContext, useContext, useState } from "react";
import { TripLocation } from "@prisma/client";

interface BoatContextType {
  title: string | undefined;
  setTitle: (title: string) => void;
  overview: string | undefined;
  setOverview: (overview: string) => void;
  location: TripLocation | undefined;
  setLocation: (location: TripLocation) => void;
  address: string | undefined;
  setAddress: (address: string) => void;
  mapLink: string | undefined;
  setMapLink: (mapLink: string) => void;
  perks: string[] | undefined;
  setPerks: (perks: string[]) => void;
}

const BoatContext = createContext<BoatContextType | undefined>(undefined);

export default function BoatProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [title, setTitle] = useState<string | undefined>();
  const [overview, setOverview] = useState<string | undefined>();
  const [location, setLocation] = useState<TripLocation | undefined>();
  const [address, setAddress] = useState<string | undefined>();
  const [mapLink, setMapLink] = useState<string | undefined>();
  const [perks, setPerks] = useState<string[] | undefined>();

  const context = {
    title,
    setTitle,
    overview,
    setOverview,
    location,
    setLocation,
    address,
    setAddress,
    mapLink,
    setMapLink,
    perks,
    setPerks,
  };

  return (
    <BoatContext.Provider value={context}>{children}</BoatContext.Provider>
  );
}

export function useBoat() {
  const context = useContext(BoatContext);
  if (context === undefined) {
    throw new Error("useBoat must be used within a BoatProvider");
  }
  return context;
}
