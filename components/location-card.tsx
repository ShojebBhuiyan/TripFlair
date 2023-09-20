import Image from "next/image";
import Link from "next/link";

interface LocationCardProps {
  location: string;
  imageSource: string;
  url: string;
}

export default function LocationCard({
  location,
  imageSource,
  url,
}: LocationCardProps) {
  return (
    <Link
      href={"/location/" + url}
      className="relative h-[32.5rem] w-[20.6875rem]"
    >
      <Image
        src={imageSource}
        alt="location"
        layout="fill"
        className="rounded-lg"
      />
      <div className="absolute left-0 top-0 flex h-full w-full justify-center p-4 text-white">
        <h3 className="text-xl font-bold">{location}</h3>
      </div>
    </Link>
  );
}
