import Image from "next/image";
import Link from "next/link";
import { TripLocation } from "@prisma/client";

import { RestaurantInfo } from "@/types/restaurant";
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

async function fetchRestaurantInfo(
  restaurantId: string
): Promise<RestaurantInfo> {
  const response = await fetch(
    `http://localhost:3000/api/business/get-restaurant-info`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ restaurantId }),
    }
  );
  const data: RestaurantInfo = await response.json();
  return data;
}

export default async function RestaurantInfoPage({
  searchParams,
  params,
}: {
  searchParams: { [tripId: string]: string };
  params: { restaurantId: string };
}) {
  const restaurant = await fetchRestaurantInfo(params.restaurantId);

  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-center text-4xl font-bold text-black">
          {restaurant.name}
        </h1>
        <h3 className="text-center text-xl font-semibold text-black">
          {restaurant.slogan}
        </h3>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Overview</h2>
        <p className="text-2xl">{restaurant?.description}</p>
      </div>
      <div className="flex gap-5 overflow-x-auto">
        {restaurant.imageUrls.map((url, index) => (
          <Image
            key={index}
            src={url}
            height={500}
            width={500}
            alt="restaurant"
          />
        ))}
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Our menu:</h2>
        <div className="flex flex-col gap-2">
          <Table>
            <TableCaption className="text-2xl">{`Restaurant Menu`}</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-2xl font-medium">
                  Item Name
                </TableHead>
                <TableHead className="text-2xl font-medium">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {restaurant.menuItems.map((menuItem, index) => (
                <TableRow key={index}>
                  <TableCell className="max-w-xs overflow-auto break-words text-2xl">
                    {menuItem.name}
                  </TableCell>
                  <TableCell className="text-2xl">{menuItem.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h2 className="text-3xl">Location</h2>
        <p className="text-xl">
          {`${restaurant.address}, ${
            restaurant.location === TripLocation.Coxsbazar
              ? "Cox's Bazar"
              : restaurant?.location
          }`}
        </p>
      </div>
      <div className="flex items-center gap-5">
        <h2 className="text-3xl">Contact Number</h2>
        <p className="text-xl">{restaurant.contactNumber}</p>
      </div>
      <div className="self-center">
        <Link
          href={`/custom-plan/restaurant-booking?location=${restaurant.location.toLowerCase()}&tripId=${
            searchParams.tripId
          }&restaurantId=${params.restaurantId}`}
        >
          <Button>Book Restaurant</Button>
        </Link>
      </div>
    </section>
  );
}
