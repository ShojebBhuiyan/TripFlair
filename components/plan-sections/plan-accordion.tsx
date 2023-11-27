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
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

interface PlanAccordionProps {
  tripPlan: TripPlanType;
  totalTripDays: number;
}

export default function PlanAccordion({
  tripPlan,
  totalTripDays,
}: PlanAccordionProps) {
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
              {`Estimated Cost: ${tripPlan?.travelInformation?.totalCost} BDT`}
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
                {`Total hotel charges: ${tripPlan?.hotelBooking?.cost} BDT`}
              </h1>
            </div>
          ) : tripPlan.confirmed ? (
            <h1 className="text-2xl">No Hotel Information</h1>
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
      <AccordionItem value="restaurant">
        <AccordionTrigger className="text-4xl">
          Restaurant Information
        </AccordionTrigger>
        <AccordionContent>
          {tripPlan.restaurantBooking ? (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">
                {`Restaurant name: ${tripPlan?.restaurantBooking.restaurant.name}`}
              </h1>
              <h1 className="text-2xl">
                {`Restaurant address: ${tripPlan?.restaurantBooking.restaurant.address}`}
              </h1>
              <h1 className="text-2xl">
                {`Hotel Contact Number: ${tripPlan?.restaurantBooking.restaurant.contactNumber}`}
              </h1>
              <h1 className="text-2xl">
                {`Number of seats: ${tripPlan?.restaurantBooking.totalSeat}`}
              </h1>
              <h1 className="text-2xl">
                {`Estimated budget: ${tripPlan?.restaurantBooking.estimatedBudget} BDT`}
              </h1>
            </div>
          ) : tripPlan.confirmed ? (
            <h1 className="text-2xl">No Restaurant Information</h1>
          ) : (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">No Restaurant Information</h1>
              <Link
                className="self-center"
                href={`/restaurant?location=${tripPlan.tripLocation.toLowerCase()}&tripId=${
                  tripPlan.id
                }`}
              >
                <Button variant={"link"} className="text-2xl">
                  Book a Restaurant
                </Button>
              </Link>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="itinerary">
        <AccordionTrigger className="text-4xl">Itinerary</AccordionTrigger>
        <AccordionContent>
          {tripPlan.boatServiceBooking?.length! ||
          tripPlan.parasailingBooking?.length! ||
          tripPlan.horseRidingBooking?.length! ? (
            <Tabs defaultValue="day-1" className="w-full">
              <TabsList className="flex w-full justify-center gap-5">
                {Array(totalTripDays)
                  .fill(0)
                  .map((_, index) => (
                    <TabsTrigger
                      key={index}
                      value={`day-${index + 1}`}
                      className="text-2xl"
                    >
                      Day {index + 1}
                    </TabsTrigger>
                  ))}
              </TabsList>
              {Array(totalTripDays)
                .fill(0)
                .map((_, index) => (
                  <TabsContent value={`day-${index + 1}`}>
                    {tripPlan.parasailingBooking?.map(
                      (parasailingBookingInfo) => (
                        <div className="flex flex-col gap-4">
                          {parasailingBookingInfo.tripDay === index + 1 ? (
                            <div className="flex flex-col gap-4">
                              <div className="flex justify-between">
                                <h1 className="text-3xl">Parasailing</h1>
                                <h1 className="text-3xl">{`${parasailingBookingInfo.reservationDateTime}`}</h1>
                              </div>
                              <Separator />
                              <h1 className="text-2xl">
                                {`Name: ${parasailingBookingInfo.parasailing.name}`}
                              </h1>
                              <h1 className="text-2xl">
                                {`Location: ${parasailingBookingInfo.parasailing.address}, ${parasailingBookingInfo.parasailing.location}`}
                              </h1>
                              <h1 className="text-2xl">
                                {`Cost: ${parasailingBookingInfo.cost}`}
                              </h1>
                              <h1 className="text-2xl">
                                {`Contact Number: ${parasailingBookingInfo.parasailing.contactNumber}`}
                              </h1>
                              <Separator />
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      )
                    )}
                    {tripPlan.boatServiceBooking?.map((boatService) => (
                      <div className="flex flex-col gap-4">
                        {boatService.tripDay === index + 1 ? (
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                              <h1 className="text-3xl">Boat Trip</h1>
                              <h1 className="text-3xl">{`${boatService.dateTime}`}</h1>
                            </div>
                            <Separator />
                            <h1 className="text-2xl">
                              {`Boat Name: ${boatService.boatService.name}`}
                            </h1>
                            <h1 className="text-2xl">
                              {`Location: ${boatService.boatService.address}, ${boatService.boatService.location}`}
                            </h1>
                            <h1 className="text-2xl">
                              {`Cost: ${boatService.totalCost}`}
                            </h1>
                            <h1 className="text-2xl">
                              {`Contact Number: ${boatService.boatService.contactNumber}`}
                            </h1>
                            <Separator />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                    {tripPlan.horseRidingBooking?.map((horseRiding) => (
                      <div className="flex flex-col gap-4">
                        {horseRiding.tripDay === index + 1 ? (
                          <div className="flex flex-col gap-4">
                            <div className="flex justify-between">
                              <h1 className="text-3xl">Horse Riding</h1>
                              <h1 className="text-3xl">{`${horseRiding.dateTime}`}</h1>
                            </div>
                            <Separator />
                            <h1 className="text-2xl">
                              {`Horse Riding Service Name: ${horseRiding.horseRiding.name}`}
                            </h1>
                            <h1 className="text-2xl">
                              {`Location: ${horseRiding.horseRiding.address}, ${horseRiding.horseRiding.location}`}
                            </h1>
                            <h1 className="text-2xl">
                              {`Horse Cost: ${horseRiding.cost}`}
                            </h1>
                            <h1 className="text-2xl">
                              {`Contact Number: ${horseRiding.horseRiding.contactNumber}`}
                            </h1>
                            <Separator />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    ))}
                    <div className="mt-5 flex items-center justify-center">
                      <Link
                        className="self-center"
                        href={`/entertainment?tripId=${
                          tripPlan.id
                        }&location=${tripPlan.tripLocation.toLowerCase()}`}
                      >
                        <Button variant={"link"} className="text-2xl">
                          Choose local entertainments
                        </Button>
                      </Link>
                    </div>
                  </TabsContent>
                ))}
            </Tabs>
          ) : tripPlan.confirmed ? (
            <h1 className="text-2xl">No Itinerary Information</h1>
          ) : (
            <div className="flex flex-col gap-4">
              <h1 className="text-2xl">No Itinerary Planned</h1>
              <Link
                className="self-center"
                href={`/entertainment?tripId=${
                  tripPlan.id
                }&location=${tripPlan.tripLocation.toLowerCase()}`}
              >
                <Button variant={"link"} className="text-2xl">
                  Choose local entertainments
                </Button>
              </Link>
            </div>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
