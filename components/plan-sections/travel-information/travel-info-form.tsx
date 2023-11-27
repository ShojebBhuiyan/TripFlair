import { zodResolver } from "@hookform/resolvers/zod";
import { TripPlan } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { useTravel } from "./travel-provider";

const travelInfoFormSchema = z.object({
  numberOfTravellers: z.number(),
  startDate: z.string(),
  returnDate: z.string(),
  totalCost: z.number(),
});

export default function TravelInfoForm() {
  const travelContext = useTravel();
  const session = useSession();

  const form = useForm<z.infer<typeof travelInfoFormSchema>>({
    resolver: zodResolver(travelInfoFormSchema),
  });

  async function onSubmit(values: z.infer<typeof travelInfoFormSchema>) {
    await fetch("/api/traveller/trips/create-travel-info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: session.data?.user?.id,
        presentLocation: travelContext?.presentLocation,
        tripLocation: travelContext?.tripLocation,
        travelMode: travelContext?.travelMode,
        numberOfTravellers: values.numberOfTravellers,
        startDate: values.startDate,
        returnDate: values.returnDate,
        totalCost: values.totalCost,
      }),
      // });
    }).then(async (res) => {
      const data: TripPlan = await res.json();
      console.log(data);
      travelContext.setTripId(data.id);
      travelContext?.setPage(3);
    });
  }

  return (
    <section className="flex flex-col gap-4 py-10">
      <h1 className="text-4xl">Please fill up your travel info</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="numberOfTravellers"
            render={({ field }) => (
              <FormItem className="grid w-[40rem] grid-cols-2 items-center">
                <FormLabel>Number of Travellers:</FormLabel>
                <FormControl>
                  <Input
                    className="w-[10rem]"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      form.setValue(
                        "numberOfTravellers",
                        parseInt(e.target.value)
                      );
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="startDate"
            render={({ field }) => (
              <FormItem className="grid w-[40rem] grid-cols-2 items-center">
                <FormLabel>Date and time of departure:</FormLabel>
                <FormControl>
                  <Input
                    className="w-[10rem]"
                    type="datetime-local"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="returnDate"
            render={({ field }) => (
              <FormItem className="grid w-[40rem] grid-cols-2 items-center">
                <FormLabel>Date and time of return: </FormLabel>
                <FormControl>
                  <Input
                    className="w-[10rem]"
                    type="datetime-local"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="totalCost"
            render={({ field }) => (
              <FormItem className="grid w-[40rem] grid-cols-2 items-center">
                <FormLabel>Estimated cost: </FormLabel>
                <FormControl>
                  <Input
                    className="w-[10rem]"
                    type="number"
                    {...field}
                    onChange={(e) => {
                      form.setValue("totalCost", parseInt(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between py-10">
            <Button
              className="w-[5rem] text-lg"
              onClick={() => travelContext?.setPage(1)}
            >
              Back
            </Button>
            <Button className="w-[5rem] text-lg">Submit</Button>
          </div>
        </form>
      </Form>
    </section>
  );
}
