import Image from "next/image";
import Link from "next/link";
import { TripLocation } from "@prisma/client";

import { ParasailingInfo } from "@/types/parasailing";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

async function fetchParasailingInfo(
  parasailingId: string
): Promise<ParasailingInfo> {
  const response = await fetch(
    `http://localhost:3000/api/business/get-parasailing-info`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ parasailingId }),
    }
  );
  const data: ParasailingInfo = await response.json();
  return data;
}

export default async function RestaurantInfoPage({
  searchParams,
  params,
}: {
  searchParams: { [tripId: string]: string };
  params: { parasailingId: string };
}) {
  const parasailing = await fetchParasailingInfo(params.parasailingId);

  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-4xl font-bold text-black">
          {parasailing.name}
        </h1>
        <h3 className="text-center text-2xl text-black">
          {parasailing.subtitle}
        </h3>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Overview</h2>
        <p className="text-2xl">{parasailing?.overview}</p>
      </div>
      <div className="flex gap-5 overflow-x-auto">
        {parasailing.imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            height={500}
            width={500}
            alt="parasailing"
          />
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Our packages:</h2>
        <div className="flex flex-col gap-2">
          <Table>
            <TableCaption className="text-2xl">{`Parasailing Packages`}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-3xl font-medium">
                  Package Name
                </TableHead>
                <TableHead className="text-3xl font-medium">
                  Price (BDT)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {parasailing.parasailingPackages.map((_package, index) => (
                <TableRow key={index}>
                  <TableCell className="max-w-xs overflow-auto break-words text-2xl">
                    {_package.description}
                  </TableCell>
                  <TableCell className="text-2xl">{_package.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Location</h2>
        <p className="text-2xl">
          {`${parasailing.address}, ${
            parasailing.location === TripLocation.Coxsbazar
              ? "Cox's Bazar"
              : parasailing?.location
          }`}
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Google Map Link</h2>
        <p className="text-2xl">{parasailing?.mapLink}</p>
      </div>
      <div className="flex items-center gap-5">
        <h2 className="text-3xl">Contact Number</h2>
        <p className="text-2xl">{parasailing.contactNumber}</p>
      </div>
      <div className="self-center">
        <Link
          href={`/custom-plan/parasailing-booking?location=${parasailing.location.toLowerCase()}&tripId=${
            searchParams.tripId
          }&parasailingId=${params.parasailingId}`}
        >
          <Button>Book a Package</Button>
        </Link>
      </div>
    </section>
  );
}
