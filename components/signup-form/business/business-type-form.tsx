import { addSpacesToPascalCase } from "@/utils/pascal-to-spaced";
import { BusinessType } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface BusinessTypeFormProps {
  setBusinessType: (businessType: BusinessType) => void;
  setPage: (page: number) => void;
}

export default function BusinessTypeForm({
  setBusinessType,
  setPage,
}: BusinessTypeFormProps) {
  return (
    <div>
      <h1 className="text-4xl">What kind of business do you have? </h1>
      <RadioGroup
        onValueChange={(value) => {
          setBusinessType(BusinessType[value as keyof typeof BusinessType]);
        }}
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
      <div className="self-end py-10"></div>
    </div>
  );
}
