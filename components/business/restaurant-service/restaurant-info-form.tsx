"use client";

import { useState } from "react";
import { TripLocation } from "@prisma/client";
import { SelectContent } from "@radix-ui/react-select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useRestaurant } from "./restaurant-provider";

interface RestaurantInfoFormProps {
  setPage: (page: number) => void;
  setProgress: (progress: number) => void;
}

export default function RestaurantInfoForm({
  setPage,
  setProgress,
}: RestaurantInfoFormProps) {
  const restaurantContext = useRestaurant();
  const [isNameEmpty, setIsNameEmpty] = useState(true);
  const [isDescriptionEmpty, setIsDescriptionEmpty] = useState(true);
  const [isLocationEmpty, setIsLocationEmpty] = useState(true);
  const [isAddressEmpty, setIsAddressEmpty] = useState(true);

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">What is the name of your restaurant?</h2>
        <Input
          className="w-[10rem]"
          type="text"
          onChange={(e) => {
            restaurantContext?.setName(e.target.value);
            e.target.value === ""
              ? setIsNameEmpty(true)
              : setIsNameEmpty(false);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">{"Add a slogan. (Optional)"}</h2>
        <Input
          className="w-[10rem]"
          type="text"
          onChange={(e) => {
            restaurantContext?.setSlogan(e.target.value);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Briefly describe your restaurant.</h2>
        <Input
          className="w-[10rem]"
          type="text"
          onChange={(e) => {
            restaurantContext?.setDescription(e.target.value);
            e.target.value === ""
              ? setIsDescriptionEmpty(true)
              : setIsDescriptionEmpty(false);
          }}
        />
      </div>
      <div className="flex w-[40rem] items-center gap-5">
        <h2 className="text-xl">Where is your restaurant located?</h2>
        <div>
          <Select
            onValueChange={(value) => {
              restaurantContext?.setLocation(
                TripLocation[value as keyof typeof TripLocation]
              );
              setIsLocationEmpty(false);
            }}
          >
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={TripLocation.Bandarban}>
                  Bandarban
                </SelectItem>
                <SelectItem value={TripLocation.Coxsbazar}>
                  Cox&apos;s Bazar
                </SelectItem>
                <SelectItem value={TripLocation.Sunamganj}>
                  Sunamganj
                </SelectItem>
                <SelectItem value={TripLocation.Sylhet}>Sylhet</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Provide the address.</h2>
        <Input
          className="w-[10rem]"
          type="text"
          onChange={(e) => {
            restaurantContext?.setAddress(e.target.value);
            e.target.value === ""
              ? setIsAddressEmpty(true)
              : setIsAddressEmpty(false);
          }}
        />
      </div>
      <div className="flex justify-end py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() => {
            setPage(1);
            setProgress(50);
          }}
          disabled={
            isNameEmpty ||
            isDescriptionEmpty ||
            isLocationEmpty ||
            isAddressEmpty
          }
        >
          Next
        </Button>
      </div>
    </section>
  );
}
