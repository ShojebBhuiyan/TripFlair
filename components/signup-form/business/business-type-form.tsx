"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addHyphensToPascalCase,
  addSpacesToPascalCase,
} from "@/utils/string-manipulators";
import { BusinessType } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function BusinessTypeForm() {
  const [businessType, setBusinessType] = useState<string | undefined>();
  const router = useRouter();
  return (
    <div className="py-10">
      <h1 className="text-4xl">What kind of business do you have? </h1>
      <RadioGroup
        onValueChange={(value) => {
          setBusinessType(value);
        }}
        className="flex flex-col gap-2 pt-10"
      >
        {Object.keys(BusinessType).map((business) => (
          <div key={business} className="flex items-center space-x-2">
            <RadioGroupItem
              value={BusinessType[business as keyof typeof BusinessType]}
              id={business}
            />
            <Label className="text-xl" htmlFor={business}>
              {addSpacesToPascalCase(business)}
            </Label>
          </div>
        ))}
      </RadioGroup>
      <div className="self-end py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() =>
            router.push(
              `/business-signup/${addHyphensToPascalCase(
                businessType?.toString()!
              )}`
            )
          }
          disabled={!businessType}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
