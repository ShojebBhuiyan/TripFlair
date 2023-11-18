import { getServerSession } from "next-auth";

import { BusinessResultsType } from "@/types/business";
import { Separator } from "@/components/ui/separator";
import RegisterBusinessButton from "@/components/business/register-business-button";

import { authOptions } from "../../api/auth/[...nextauth]/options";

async function getBusinessData(email: string): Promise<BusinessResultsType> {
  const res = await fetch(
    "http://localhost:3000/api/business/get-all-business",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({
        email,
      }),
    }
  );

  const data: BusinessResultsType = await res.json();

  return data;
}

export default async function BusinessDashboardPage() {
  const session = await getServerSession(authOptions);
  console.log(session);
  const businesses = await getBusinessData(session?.user?.email!);
  const businessesAvailable =
    businesses.boatService.length > 0 ||
    businesses.hotelService.length > 0 ||
    businesses.restaurantService.length > 0 ||
    businesses.horseRiding.length > 0 ||
    businesses.parasailing.length > 0;

  console.log(businesses);
  return (
    <div className="container flex flex-col gap-5 py-10">
      <div className="flex flex-col items-center gap-5">
        <h1 className="text-4xl">Business Dashboard</h1>
        <p className="text-3xl">Welcome {session?.user?.name}</p>
      </div>

      {businessesAvailable ? (
        <>
          {businesses.boatService.length > 0 && (
            <div>
              <h2 className="text-4xl">Boat Services</h2>
              <Separator className="my-5" />
              <div className="flex flex-col gap-5">
                {businesses?.boatService.map((boatService, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-around gap-5"
                  >
                    <h2 className="text-2xl">{boatService.name}</h2>
                    <p>{boatService.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {businesses.hotelService.length > 0 && (
            <div>
              <h2 className="text-4xl">Hotel Services</h2>
              <Separator className="my-5" />
              <div className="flex flex-col gap-5">
                {businesses.hotelService.map((hotelService, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-around gap-5"
                  >
                    <h2 className="text-2xl">{hotelService.name}</h2>
                    <p>{hotelService.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {businesses.restaurantService.length > 0 && (
            <div>
              <h2 className="text-4xl">Restaurant Services</h2>
              <Separator className="my-5" />

              <div className="flex flex-col gap-5">
                {businesses.restaurantService.map(
                  (restaurantService, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-around gap-5"
                    >
                      <h2 className="text-2xl">{restaurantService.name}</h2>
                      <p>{restaurantService.location}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
          {businesses.horseRiding.length > 0 && (
            <div>
              <h2 className="text-4xl">Horse Riding Services</h2>
              <Separator className="my-5" />

              <div className="flex flex-col gap-5">
                {businesses.horseRiding.map((horseRiding, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-around gap-5"
                  >
                    <h2 className="text-2xl">{horseRiding.name}</h2>
                    <p>{horseRiding.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          {businesses.parasailing.length > 0 && (
            <div>
              <h2 className="text-4xl">Parasailing Services</h2>
              <Separator className="my-5" />

              <div className="flex flex-col gap-5">
                {businesses.parasailing.map((parasailing, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-around gap-5"
                  >
                    <h2 className="text-2xl">{parasailing.name}</h2>
                    <p>{parasailing.location}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <RegisterBusinessButton />
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-5 py-10">
          <h2 className="text-4xl">No business registered!</h2>
          <RegisterBusinessButton />
        </div>
      )}
    </div>
  );
}
