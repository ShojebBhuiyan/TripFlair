import { Parasailing, ParasailingPackages } from "@prisma/client";

export type ParasailingPackageType = Pick<
  ParasailingPackages,
  "description" | "price"
>;

export type ParasailingInfo = Parasailing & {
  parasailingPackages: ParasailingPackages[];
};

export type ParasailingBookingInfo = ParasailingInfo & {
  totalTripDays: number;
};
