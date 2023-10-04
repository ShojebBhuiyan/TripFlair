"use client";

import { useState } from "react";
import { usePlan } from "@/providers/plan-provider";

import { Location } from "@/types/plan";

import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function LocationForm() {
  const locationKeys = Object.keys(Location);
  const planContext = usePlan();
  const [isSelected, setIsSelected] = useState(false);

  return (
    <section className="flex flex-col gap-4 py-10">
      <h1 className="text-4xl">What is your present location?</h1>
      <RadioGroup
        onValueChange={(value) => {
          planContext?.setLocation(value);
          setIsSelected(true);
        }}
      >
        {locationKeys.map((key) => (
          <div key={key} className="flex items-center space-x-2">
            <RadioGroupItem
              value={Location[key as keyof typeof Location]}
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
          onClick={() => planContext?.setPlanPage(1)}
          disabled={!isSelected}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
