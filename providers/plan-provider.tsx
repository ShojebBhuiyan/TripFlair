"use client";

import { createContext, useContext, useState } from "react";

interface PlanContextType {
  location: string | undefined;
  setLocation: (location: string) => void;
  travelMode: string | undefined;
  setTravelMode: (travelMode: string) => void;
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
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export default function PlanProvider({
  planLocation,
  children,
}: {
  planLocation: string | undefined;
  children: React.ReactNode;
}) {
  const [location, setLocation] = useState<string | undefined>();
  const [travelMode, setTravelMode] = useState<string | undefined>();
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [startTime, setStartTime] = useState<Date>(new Date());
  const [returnDate, setReturnDate] = useState<Date>(new Date());
  const [returnTime, setReturnTime] = useState<Date>(new Date());
  const [numberOfTravellers, setNumberOfTravellers] = useState<number>(1);
  const [totalCost, setTotalCost] = useState<number>(0);
  const [planPage, setPlanPage] = useState<number>(0);

  const context = {
    planLocation,
    location,
    setLocation,
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
