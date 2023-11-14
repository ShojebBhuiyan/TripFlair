import { ParasailingPackages } from "@prisma/client";

export type ParasailingPackageType = Pick<
  ParasailingPackages,
  "description" | "price"
>;
