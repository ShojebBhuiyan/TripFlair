"use client";

import Link from "next/link";

import { TripPlanType } from "@/types/trip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "../ui/button";

interface PlanAccordionProps {
  tripPlan: TripPlanType;
}

export default function PlanAccordion({ tripPlan }: PlanAccordionProps) {
  console.log("Inside", tripPlan);
  return (
    <Accordion type="multiple">
      <AccordionItem value="travel-information">
        <AccordionTrigger className="text-4xl">
          Travel Information
        </AccordionTrigger>
        <AccordionContent>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl">
              {`Date of Departure: ${tripPlan?.travelInformation?.startDate}`}
            </h1>
            <h1 className="text-2xl">
              {`Date of Returning: ${tripPlan?.travelInformation?.returnDate}`}
            </h1>
            <h1 className="text-2xl">
              {`Travelling from: ${tripPlan?.travelInformation?.presentLocation}`}
            </h1>
            <h1 className="text-2xl">
              {`Travelling by: ${tripPlan?.travelInformation?.travelMode}`}
            </h1>
            <h1 className="text-2xl">
              {`Number of Travellers: ${tripPlan?.travelInformation?.numberOfTravellers}`}
            </h1>
            <h1 className="text-2xl">
              {`Travel Cost: ${tripPlan?.travelInformation?.totalCost}`}
            </h1>
          </div>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="hotel-information">
        <AccordionTrigger className="text-4xl">
          Hotel Information
        </AccordionTrigger>
        <AccordionContent>
          {tripPlan.hotelBooking ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">
                {`Hotel Name: ${tripPlan?.hotelBooking?.hotelService.name}`}
              </h1>
              <h1 className="text-2xl">
                {`Hotel Address: ${tripPlan?.hotelBooking?.hotelService.address}`}
              </h1>
              <h1 className="text-2xl">
                {`Hotel Contact Number: ${tripPlan?.hotelBooking?.hotelService.contactNumber}`}
              </h1>
              <h1 className="text-2xl">
                {`Check-In Time: ${tripPlan?.hotelBooking?.hotelService.checkInTime}, ${tripPlan.hotelBooking.checkinDate}`}
              </h1>
              <h1 className="text-2xl">
                {`Check-Out Time: ${tripPlan?.hotelBooking?.hotelService.checkOutTime}, ${tripPlan.hotelBooking.checkoutDate}`}
              </h1>
              <h1 className="text-2xl">
                {`Number of Rooms: ${tripPlan?.hotelBooking?.totalRoom}`}
              </h1>
              <h1 className="text-2xl">
                {`Total hotel charges: ${tripPlan?.hotelBooking?.cost}`}
              </h1>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">No Hotel Information</h1>
              <Link
                className="self-center"
                href={`/hotel?location=${tripPlan.tripLocation.toLowerCase()}&tripId=${
                  tripPlan.id
                }`}
              >
                <Button variant={"link"} className="text-2xl">
                  Book a Hotel
                </Button>
              </Link>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
