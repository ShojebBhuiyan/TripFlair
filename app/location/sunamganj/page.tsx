import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import CustomPlanButton from "@/components/custom-plan-button";
import GetPlanButton from "@/components/get-plan-button";
import SubLocationCard from "@/components/sublocation-card";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function SunamganjPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");
  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-bold">
          <span className="text-red-900">Explore</span>{" "}
          <span className="text-green-700">Sunamganj</span>!
        </h1>
        <p className="text-2xl">
          A scenic place full of beautiful haors, serene rivers, and culturally
          diverse monuments, Sunamganj, situated in the Sylhet division of
          north-eastern Bangladesh, is a place that travel enthusiasts will fall
          in love with.
        </p>
        <div className="flex justify-around gap-5">
          <Image
            src={"/sunam-1.png"}
            alt="sunamganj-river-boat"
            height={340}
            width={500}
          />
          <Image
            src={"/sunam-2.png"}
            alt="sunamganj-river-hill"
            height={340}
            width={500}
          />
          <Image
            src={"/sunam-3.png"}
            alt="sunamganj-tree-field"
            height={340}
            width={500}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="w-fit bg-gradient-to-r from-red-900 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent">
          Places to Visit
        </h1>
        <p className="text-2xl">
          Whether you want to go for a single day tour or take your time to
          visit the beautiful places spread around the district, we recommend
          these 4 places to be part of your next travel itinerary.
        </p>
        <div className="flex justify-around gap-5">
          <SubLocationCard
            imageSource="/tanguar-haor.png"
            location="Tanguar Haor"
            description="Tanguar haor, located in the Dharmapasha and Tahirpur upazilas of Sunamganj District in Bangladesh, is a unique wetland ecosystem of national importance and a place of  international focus."
          />
          <SubLocationCard
            imageSource="/barik-tila.png"
            location="Barik Tila"
            description="Barik Tila is a historical place in Sunamganj, Bangladesh. It is located in the Tahirpur Upazila of Sunamganj District. It is a mound of 50 feet high and 400 feet wide."
          />
          <SubLocationCard
            imageSource="/jadukata-river.png"
            location="Jadukata River"
            description="Jadukata River is a river in Bangladesh. It is a tributary of the Surma River. It is located in the Tahirpur Upazila of Sunamganj District."
          />
          <SubLocationCard
            imageSource="/surma-bridge.png"
            location="Surma Bridge"
            description="Surma Bridge is a bridge over the Surma River in Sunamganj District, Bangladesh. It is located in the Tahirpur Upazila of Sunamganj District."
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="w-fit bg-gradient-to-l from-blue-700 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent">
          Get the best Travel Experience
        </h1>
        <p className="text-2xl">
          Find out the best travel guidance, restaurants, things to do and many
          more on our website. To get the full plan click the link below.
        </p>
        <GetPlanButton />
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-2xl">
          However, for customizing your own trip plan click the next button
          below to go to the next step.
        </p>
        <div className="self-end">
          <CustomPlanButton />
        </div>
      </div>
    </section>
  );
}
