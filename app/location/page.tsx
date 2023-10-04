import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import LocationCard from "@/components/location-card";

import { authOptions } from "../api/auth/[...nextauth]/options";

export default async function LocationPage() {
  const session = await getServerSession(authOptions);

  // if (!session) redirect("/signin");
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-5 bg-[#D9D9D980]">
      <div className="flex flex-col justify-center">
        <h1 className="text-center text-4xl font-bold text-black">Explore</h1>
        <h1 className="text-center text-4xl font-bold text-black">
          Bangladesh!
        </h1>
      </div>
      <div className="mt-10 flex flex-col items-center gap-6">
        <h2 className="text-3xl">Where do you want to visit?</h2>
        <div className="flex w-full justify-around gap-10 pb-10">
          <LocationCard
            imageSource="/cox.jpg"
            location="Cox's Bazar"
            url="cox"
          />
          <LocationCard
            imageSource="/sylhet.jpg"
            location="Sylhet"
            url="sylhet"
          />
          <LocationCard
            imageSource="/bandarban.jpg"
            location="Bandarban"
            url="bandarban"
          />
          <LocationCard
            imageSource="/sunamganj.jpg"
            location="Sunamganj"
            url="sunamganj"
          />
        </div>
      </div>
    </section>
  );
}
