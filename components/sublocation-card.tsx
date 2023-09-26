import Image from "next/image";
import Link from "next/link";

interface SubLocationCardProps {
  location: string;
  description: string;
  imageSource: string;
  url: string;
}

export default function SubLocationCard({
  location,
  description,
  imageSource,
  url,
}: SubLocationCardProps) {
  return (
    <div className="container flex h-[450px] w-[360px] flex-col gap-2 rounded-md bg-stone-300 p-5">
      <Link href={"/location/" + url}>
        <Image
          src={imageSource}
          alt="location"
          height={215}
          width={325}
          className="rounded-lg"
        />
        <h3 className="text-center text-xl font-bold">{location}</h3>
        <p>{description}</p>
      </Link>
    </div>
  );
}
