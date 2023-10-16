"use client";

import { createContext, useContext, useState } from "react";

interface RestaurentContextType {}

const RestaurantContext = createContext<RestaurentContextType | undefined>(
  undefined
);

export default function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = {};

  return (
    <RestaurantContext.Provider value={context}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);

  return context;
}
