import Image from "next/image";

import CustomPlanButton from "@/components/custom-plan-button";
import GetPlanButton from "@/components/get-plan-button";
import SubLocationCard from "@/components/sublocation-card";

export default function SylhetPage() {
  return (
    <section className="container flex flex-col gap-20 py-10">
      <div className="flex flex-col gap-5">
        <h1 className="text-6xl font-bold">
          <span className="text-red-900">Explore</span>{" "}
          <span className="text-green-700">Sylhet</span>!
        </h1>
        <p className="text-2xl">
          Nestled in the picturesque Surma Valley amidst scenic tea plantations
          and lush green tropical rain forests, Sylhet is a prime attraction for
          all tourists visiting Bangladesh. This is a prominent Islamic
          spiritual center and home to numerous Sufi shrines.
        </p>
        <div className="flex justify-around gap-5">
          <Image
            src={"/sylhet-1.png"}
            alt="sylhet-tea-garden"
            height={340}
            width={500}
          />
          <Image
            src={"/sylhet-2.png"}
            alt="sylhet-bridge"
            height={340}
            width={500}
          />
          <Image
            src={"/sylhet-3.png"}
            alt="sylhet-hill"
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
            imageSource="/ratargul.png"
            location="Ratargul Swamp Forest"
            description="Ratargul Swamp Forest is a freshwater swamp forest located in Gowain River, Fatehpur Union, Gowainghat, Sylhet, Bangladesh. Ratargul was once thought to be the only swamp forest in Bangladesh."
          />
          <SubLocationCard
            imageSource="/bisanakandi.png"
            location="Bisanakandi"
            description="Bisanakandi is situated at Bangladesh-India border in Sylhet. It is a landscape beauty among gardens and hills."
          />
          <SubLocationCard
            imageSource="/jadukata-river.png"
            location="Jadukata River"
            description="A blue river and the water is so clear that you can see the river bed in the shallow areas. The river gets wider in rains. In winter miles of white sandy banks give a different look and tell a different story."
          />
          <SubLocationCard
            imageSource="/khadim-nagar.png"
            location="Khadim Nagar National Park"
            description="Khadim Nagar National Park is a major national park and nature reserve in Bangladesh.A place to hide yourself from the city hustle and delve deeper into the nature,"
          />
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <h1 className="w-fit bg-gradient-to-l from-blue-700 to-yellow-400 bg-clip-text text-6xl font-bold text-transparent">
          Get the best Travel Experience
        </h1>
        <p className="text-2xl">
          Find out the best travel guidance, restaurants, things to do and many
          more on our website.
        </p>
      </div>
      <div className="flex flex-col gap-5">
        <p className="text-2xl">
          To customize your own trip plan click the next button below to go to
          the next step.
        </p>
        <div className="self-end">
          <CustomPlanButton location="sylhet" />
        </div>
      </div>
    </section>
  );
}
