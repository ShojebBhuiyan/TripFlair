"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { HotelRoom } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
  totalSeats: z.number(),
  estimatedBudget: z.number(),
});

interface BookingFormProps {
  restaurantId: string;
  tripId: string;
  setPage: (page: number) => void;
}

export default function BookingForm({
  restaurantId,
  tripId,
  setPage,
}: BookingFormProps) {
  const [totalSeats, setTotalSeats] = useState(0);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
  });

  const session = useSession();

  async function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    const researvation = await fetch(
      "/api/traveller/trips/reserve-restaurant",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.data?.user?.id,
          restaurantId,
          tripId,
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          reservationDateTime: values.reservationDateTime,
          totalSeats: values.totalSeats,
          estimatedBudget: values.estimatedBudget,
        }),
      }
    ).then(() => {
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
                Fill up this form to confirm reservation!
              </h1>
            </div>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input
                      className="w-60"
                      type="text"
                      placeholder="first name"
                      {...field}
                    />
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
                    <Input
                      className="w-60"
                      type="text"
                      placeholder="last name"
                      {...field}
                    />
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
                    <Input
                      className="w-60"
                      type="tel"
                      placeholder="0123456789"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-60">
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
            </div>
            <div className="w-60">
              <FormField
                control={form.control}
                name="totalSeats"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Seats</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue("totalSeats", parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-60">
              <FormField
                control={form.control}
                name="estimatedBudget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Estimated Budget (BDT)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) => {
                          form.setValue(
                            "estimatedBudget",
                            parseInt(e.target.value)
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
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
