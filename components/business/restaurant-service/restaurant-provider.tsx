"use client";

import { createContext, useContext, useState } from "react";
import { TripLocation } from "@prisma/client";

interface RestaurantContextType {
  name: string | undefined;
  setName: (name: string) => void;
  slogan: string | undefined;
  setSlogan: (slogan: string) => void;
  description: string | undefined;
  setDescription: (description: string) => void;
  location: TripLocation | undefined;
  setLocation: (location: TripLocation) => void;
  imageUrls: string[];
  setImageUrls: (imageUrls: string[]) => void;
  menuItems: { item: string; price: number }[];
  setMenuItems: (menuItems: { item: string; price: number }[]) => void;
  contactNumber: string | undefined;
  setContactNumber: (contactNumber: string) => void;
}

const RestaurantContext = createContext<RestaurantContextType | undefined>(
  undefined
);

export default function PlanProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState<string | undefined>();
  const [slogan, setSlogan] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [location, setLocation] = useState<TripLocation | undefined>();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<{ item: string; price: number }[]>(
    []
  );
  const [contactNumber, setContactNumber] = useState<string | undefined>();

  const context = {
    name,
    setName,
    slogan,
    setSlogan,
    description,
    setDescription,
    location,
    setLocation,
    imageUrls,
    setImageUrls,
    menuItems,
    setMenuItems,
    contactNumber,
    setContactNumber,
  };

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
