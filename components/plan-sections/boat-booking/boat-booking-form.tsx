"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { BoatBookingInfo } from "@/types/entertainment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { Input } from "../../ui/input";

const bookingFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  reservationDateTime: z.string(),
  tripDay: z.string(),
  totalBoats: z.number(),
});

interface BookingFormProps {
  boatBookingInfo: BoatBookingInfo;
  tripId: string;
  setPage: (page: number) => void;
}

export default function BookingForm({
  boatBookingInfo,
  tripId,
  setPage,
}: BookingFormProps) {
  const [totalBoats, setTotalBoats] = useState(0);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      tripDay: "1",
    },
  });

  const session = useSession();

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    const booking = await fetch("/api/traveller/trips/book-boat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.data?.user?.id,
        boatId: boatBookingInfo.id,
        tripId,
        firstName: values.firstName,
        lastName: values.lastName,
        phoneNumber: values.phoneNumber,
        reservationDateTime: values.reservationDateTime,
        totalBoats: values.totalBoats,
        totalCost: boatBookingInfo.price * totalBoats,
        tripDay: Number(values.tripDay),
      }),
    }).then(() => {
      setPage(1);
    });
  }

  return (
    <section className="container py-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <div className="mb-5 flex justify-center">
              <h1 className="text-4xl font-bold text-black">
                Fill up this form to confirm booking!
              </h1>
            </div>
            <div className="w-60">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="first name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="last name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" placeholder="0123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tripDay"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trip Day</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={"1"}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Array(boatBookingInfo.totalTripDays)
                            .fill(null)
                            .map((_, index) => (
                              <SelectItem key={index} value={`${index + 1}`}>
                                {`Day ${index + 1}`}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="reservationDateTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reservation Date and Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="totalBoats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Boats</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue("totalBoats", parseInt(e.target.value));
                          setTotalBoats(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <h3 className="text-2xl">
              {`Your total booking cost: ${boatBookingInfo.price * totalBoats}`}
            </h3>
            <Button
              type="submit"
              className="mt-5 justify-center rounded-[0.625rem] bg-[#00A651] text-black"
            >
              Confirm
            </Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
