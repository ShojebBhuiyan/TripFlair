import { BoatService, HorseRiding, Parasailing } from "@prisma/client";

export type EntertainmentType = {
  boatService: BoatService[];
  horseRiding: HorseRiding[];
  parasailing: Parasailing[];
};

export type BoatBookingInfo = BoatService & {
  totalTripDays: number;
};

export type HorseBookingInfo = HorseRiding & {
  totalTripDays: number;
};
