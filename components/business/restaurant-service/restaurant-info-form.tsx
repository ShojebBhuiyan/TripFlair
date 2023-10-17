"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

  return (
    <section className="flex flex-col gap-4 py-10">
      <div className="grid w-[40rem] grid-cols-1 items-center">
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
      <div className="grid w-[40rem] grid-cols-1 items-center">
        <h2 className="text-xl">{"Add a slogan. (Optional)"}</h2>
        <Input
          className="w-[10rem]"
          type="text"
          onChange={(e) => {
            restaurantContext?.setSlogan(e.target.value);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center">
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

      <div className="flex justify-end py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() => {
            setPage(1);
            setProgress(33.33);
          }}
          disabled={isNameEmpty || isDescriptionEmpty}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
