"use client";

import { useState } from "react";
import { BusinessType } from "@prisma/client";

import BusinessTypeForm from "./business-type-form";

export default function BusinessFormController() {
  const [businessType, setBusinessType] = useState<BusinessType>(
    BusinessType.HotelService
  );

  console.log(businessType);
  const [page, setPage] = useState<number>(0);

  return (
    <section className="py-10">
      {page === 0 && (
        <BusinessTypeForm setBusinessType={setBusinessType} setPage={setPage} />
      )}
    </section>
  );
}
