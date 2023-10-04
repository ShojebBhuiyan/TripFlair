import { useState } from "react";
import { usePlan } from "@/providers/plan-provider";

import { TravelMode } from "@/types/plan";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function TravelModeForm() {
  const transportModeKeys = Object.keys(TravelMode);
  const planContext = usePlan();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <section className="flex flex-col gap-4 py-10">
      <h1 className="text-4xl">How do you want to travel?</h1>
      <RadioGroup
        onValueChange={(value) => {
          planContext?.setTravelMode(value);
          setIsSelected(true);

          if (value === TravelMode.Bus)
            window.open("https://www.shohoz.com/", "_blank");
          else if (value === TravelMode.Train)
            window.open("https://eticket.railway.gov.bd/", "_blank");
          else if (value === TravelMode.Plane)
            window.open("https://www.biman-airlines.com/", "_blank");
        }}
      >
        {transportModeKeys.map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <RadioGroupItem
              value={TravelMode[key as keyof typeof TravelMode]}
              id={key}
            />
            <Label className="text-xl" htmlFor={key}>
              {key}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <h3 className="text-lg">
        Press next after you&apos;ve confirmed your ticket/ transport
      </h3>
      <div className="flex justify-between py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() => planContext?.setPlanPage(0)}
        >
          Back
        </Button>
        <Button
          className="w-[5rem] text-lg"
          onClick={() => planContext?.setPlanPage(2)}
          disabled={!isSelected}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
