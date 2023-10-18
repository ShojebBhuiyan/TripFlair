"use client";

import { useState } from "react";
import { usePlan } from "@/providers/plan-provider";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

const bookingFormSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phoneNumber: z.string(),
  checkInDate: z.string(),
  checkOutDate: z.string(),
  totalRoom: z.number(),
});

export default function BookingForm() {
  const planContext = usePlan();
  const [totalRoom, setTotalRoom] = useState(0);

  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
  });

  function onSubmit(values: z.infer<typeof bookingFormSchema>) {
    planContext?.setCheckInDate(values.checkInDate);
    planContext?.setCheckOutDate(values.checkOutDate);
    planContext?.setHotelCost(
      values.totalRoom * planContext.bookedRoom?.price!
    );
    planContext?.setPlanPage(6);
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
            <div className="w-60">
              <FormField
                control={form.control}
                name="checkInDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Checkin Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="w-60">
              <FormField
                control={form.control}
                name="checkOutDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Checkout Date</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="totalRoom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Total Room</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => {
                        form.setValue("totalRoom", parseInt(e.target.value));
                        setTotalRoom(parseInt(e.target.value));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <h3 className="text-2xl">
              {`Your total booking cost: ${
                planContext?.bookedRoom?.price! * totalRoom
              }`}
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
