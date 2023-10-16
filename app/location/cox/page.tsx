import Image from "next/image";

import CustomPlanButton from "@/components/custom-plan-button";
import GetPlanButton from "@/components/get-plan-button";
import SubLocationCard from "@/components/sublocation-card";

export default function CoxsBazarPage() {
  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-bold">
          <span className="text-red-900">Explore</span>{" "}
          <span className="text-green-700">Cox&apos; Bazar</span>!
        </h1>
        <p className="text-2xl">
          The longest natural sandy sea beach, Cox&apos;s Bazar is also known
          for its scenic beauty. There are many tourist attractions like The
          Himchori, Kutubdia Lighthouse, Safari park etc located in Cox&apos;s
          Bazar. Tourists can enjoy their time by traveling the longest marine
          drive, enojoy sea food and many more.
        </p>
        <div className="flex justify-around gap-5">
          <Image
            src={"/cox-1.png"}
            alt="cox-sea-palm-boat"
            height={340}
            width={500}
          />
          <Image
            src={"/cox-2.png"}
            alt="cox-road-sea"
            height={340}
            width={500}
          />
          <Image
            src={"/cox-3.png"}
            alt="cox-sea-tree"
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
            imageSource="/cox-seabeach.png"
            location="Sea Beach"
            description="Cox’s Bazar sea beach is the largest sea beach in the world and one of the best tourist attraction place."
          />
          <SubLocationCard
            imageSource="/dulahazara-safari-park.png"
            location="Dulahazara Safari Park"
            description="Dulahazra Safari Park is one of Bangladesh’s most unique destinations in Cox's Bazar . A place where threatened and endangered animals from all over the world is kept and safeguarded."
          />
          <SubLocationCard
            imageSource="/himchori.png"
            location="Himchori"
            description="Himchori, the only cold water waterfall in Bangladesh, is a place of natural beauty and tourist attraction."
          />
          <SubLocationCard
            imageSource="/100ft-buddha.png"
            location="100-ft. Buddha"
            description="The 100 Feet Buddha is a golden coloured reclining statue is located at the Vimukti Bibeshan Bhabna Kendra temple in Ramu."
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
          <CustomPlanButton location="coxs-bazar" />
        </div>
      </div>
    </section>
  );
}
