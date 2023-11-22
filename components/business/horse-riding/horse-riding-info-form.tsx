"use client";

import { useState } from "react";
import Image from "next/image";
import { TripLocation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface HorseRidingInfoFormProps {
  setPage: (page: number) => void;
  setProgress: (progress: number) => void;
}

export default function ParasailingInfoForm({
  setPage,
  setProgress,
}: HorseRidingInfoFormProps) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [overview, setOverview] = useState("");
  const [location, setLocation] = useState<TripLocation>();
  const [price, setPrice] = useState<number>(0);
  const [isPriceEmpty, setIsPriceEmpty] = useState(true);
  const [isLocationEmpty, setIsLocationEmpty] = useState(true);
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedImages, setSelectedImages] = useState<FileList | null>();
  const [previewImagePaths, setPreviewImagePaths] = useState<string[]>([]);

  const session = useSession();

  async function onNextClick(id: string) {
    const formData = new FormData();
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append(`image-${i}`, selectedImages[i]);
      }
    }
    formData.append("length", selectedImages?.length.toString()!);
    formData.append("mode", "horse-riding");
    formData.append("id", id);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const imageUrls: { pathStrings: string[] } = await response.json();

    const horseRiding = await fetch("/api/business/modify/horse-riding", {
      method: "POST",
      body: JSON.stringify({
        userId: session.data?.user?.id,
        horseRidingId: id,
        name,
        subtitle,
        overview,
        location,
        address,
        mapLink,
        price,
        imageUrls: imageUrls.pathStrings,
        contactNumber,
      }),
    });
  }

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">
          What is the name of your horse riding service?
        </h2>
        <Textarea onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Insert your subtitle.</h2>
        <Textarea onChange={(e) => setSubtitle(e.target.value)} />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Insert your overview.</h2>
        <Textarea onChange={(e) => setOverview(e.target.value)} />
      </div>
      <div className="flex w-[40rem] items-center justify-between gap-5">
        <h2 className="text-xl">Where is your horse riding service located?</h2>
        <div>
          <Select
            onValueChange={(value) => {
              setLocation(TripLocation[value as keyof typeof TripLocation]);
              setIsLocationEmpty(false);
            }}
          >
            <SelectTrigger className="w-[10rem]">
              <SelectValue placeholder="Select a location" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={TripLocation.Bandarban}>
                  Bandarban
                </SelectItem>
                <SelectItem value={TripLocation.Coxsbazar}>
                  Cox&apos;s Bazar
                </SelectItem>
                <SelectItem value={TripLocation.Sunamganj}>
                  Sunamganj
                </SelectItem>
                <SelectItem value={TripLocation.Sylhet}>Sylhet</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Insert your address.</h2>
        <Textarea onChange={(e) => setAddress(e.target.value)} />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Insert your Google Map link.</h2>
        <Textarea onChange={(e) => setMapLink(e.target.value)} />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Add pictures of your horses:</h2>
        {previewImagePaths.length > 0 && (
          <div className="flex gap-5 overflow-x-auto">
            {previewImagePaths.map((previewImagePath, index) => (
              <Image
                key={index}
                src={previewImagePath}
                alt={`horse-image-${index}`}
                width={400}
                height={400}
              />
            ))}
          </div>
        )}
        <Input
          className="w-fit"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const images = e.target.files;

            if (images && images.item.length > 0) {
              setSelectedImages(images);
              console.log("Selected: ", images.length);
              let imageUrls: string[] = [];
              for (let i = 0; i < images.length; i++) {
                imageUrls.push(URL.createObjectURL(images[i]));
              }

              setPreviewImagePaths(imageUrls);
            }
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Enter your price:</h2>
        <div className="flex items-center gap-5">
          <Input
            type="number"
            onChange={(e) => {
              setPrice(parseInt(e.target.value));
              e.target.value === ""
                ? setIsPriceEmpty(true)
                : setIsPriceEmpty(false);
            }}
          />
          <h2 className="text-xl">BDT</h2>
        </div>
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Insert your contact number.</h2>
        <Input type="tel" onChange={(e) => setContactNumber(e.target.value)} />
      </div>
      <div className="flex justify-end">
        <Button
          disabled={
            !name ||
            !subtitle ||
            !location ||
            !address ||
            !overview ||
            !selectedImages ||
            !contactNumber ||
            isLocationEmpty ||
            isPriceEmpty ||
            !mapLink
          }
          className="w-[5rem] text-lg"
          onClick={() => {
            const id = v4();
            onNextClick(id);
            setPage(1);
            setProgress(100);
          }}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
