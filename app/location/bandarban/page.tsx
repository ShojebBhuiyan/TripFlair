import Image from "next/image";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import CustomPlanButton from "@/components/custom-plan-button";
import GetPlanButton from "@/components/get-plan-button";
import SubLocationCard from "@/components/sublocation-card";
import { authOptions } from "@/app/api/auth/[...nextauth]/options";

export default async function BandarbanPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/signin");
  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-bold">
          <span className="text-red-900">Explore</span>{" "}
          <span className="text-green-700">Bandarban</span>!
        </h1>
        <p className="text-2xl">
          Located in the southwestern part of the country, and part of the
          storied Chittagong Hill Tracts, the Bandarban district holds enough
          magic to do the trick. Find out the best places to see and the
          craziest things to do in Bandarban.
        </p>
        <div className="flex justify-around gap-5">
          <Image
            src={"/bandarban-1.png"}
            alt="bandarban-waterfall"
            height={340}
            width={500}
          />
          <Image
            src={"/bandarban-2.png"}
            alt="bandarban-waterfall-2"
            height={340}
            width={500}
          />
          <Image
            src={"/bandarban-3.png"}
            alt="bandarban-temple"
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
            imageSource="/keokradong.png"
            location="Keokradong"
            description="Keokradong is a peak located in Bandarban, Bangladesh, with an elevation of 986 metres. Some sources claim it as the highest point of Bangladesh. "
          />
          <SubLocationCard
            imageSource="/nilachal.png"
            location="Nilachal"
            description="Watch the sunset and sunrise from the hill. A surreal experience that you can cherish lifetime."
          />
          <SubLocationCard
            imageSource="/buddha-dhatu-jati.png"
            location="Buddha Dhatu Jati"
            description="The largest Theravada Buddhist temple in Bangladesh and has the second-largest Buddha statue in the country."
          />
          <SubLocationCard
            imageSource="/nafakhum.png"
            location="Nafa-khum"
            description="Nafa-khum is a waterfall in Bangladesh on the Remaikree River, a tributary of the Sangu River. It is among the largest waterfalls in the country by volume of water falling."
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
