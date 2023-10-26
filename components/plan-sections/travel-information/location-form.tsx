"use client";

import { useState } from "react";
import { PresentLocation } from "@prisma/client";

import { Location } from "@/types/plan";

import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";
import { useTravel } from "./travel-provider";

export default function LocationForm() {
  const locationKeys = Object.keys(PresentLocation);
  const travelContext = useTravel();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <section className="flex flex-col gap-4 py-10">
      <h1 className="text-4xl">What is your present location?</h1>
      <RadioGroup
        onValueChange={(value) => {
          // console.log("value: " + value);
          travelContext?.setPresentLocation(
            PresentLocation[value as keyof typeof PresentLocation]
          );
          console.log(travelContext.presentLocation);

          setIsSelected(true);
        }}
      >
        {locationKeys.map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <RadioGroupItem
              value={PresentLocation[key as keyof typeof PresentLocation]}
              id={key}
            />
            <Label className="text-xl" htmlFor={key}>
              {key}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="self-end py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() => travelContext?.setPage(1)}
          disabled={!isSelected}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
