"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { v4 } from "uuid";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { useBoat } from "./boat-provider";

interface BoatFinalFormProps {
  setPage: (page: number) => void;
  setProgress: (progress: number) => void;
}

export default function BoatFinalForm({
  setPage,
  setProgress,
}: BoatFinalFormProps) {
  const session = useSession();

  const boatContext = useBoat();
  const [price, setPrice] = useState<number>(0);
  const [contactNumber, setContactNumber] = useState<string>("");

  const [checkInPolicy, setCheckInPolicy] = useState<string>("");
  const [bookingPolicy, setBookingPolicy] = useState<string>("");
  const [isCheckInPolicyEmpty, setIsCheckInPolicyEmpty] = useState(true);
  const [isBookingPolicyEmpty, setIsBookingPolicyEmpty] = useState(true);

  const [selectedImages, setSelectedImages] = useState<FileList | null>();
  const [previewImagePaths, setPreviewImagePaths] = useState<string[]>([]);

  const [isPriceEmpty, setIsPriceEmpty] = useState(true);

  const [isContactNumberEmpty, setIsContactNumberEmpty] = useState(true);

  async function onNextClick(id: string) {
    const formData = new FormData();
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append(`image-${i}`, selectedImages[i]);
      }
    }
    formData.append("length", selectedImages?.length.toString()!);
    formData.append("mode", "boat");
    formData.append("id", id);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const imageUrls: { pathStrings: string[] } = await response.json();

    const boatService = await fetch("/api/business/modify/boat", {
      method: "POST",
      body: JSON.stringify({
        userId: session.data?.user?.id,
        boatId: id,
        title: boatContext?.title,
        overview: boatContext?.overview,
        location: boatContext?.location,
        address: boatContext?.address,
        mapLink: boatContext?.mapLink,
        perks: boatContext?.perks,
        price,
        checkInPolicy,
        bookingPolicy,
        contactNumber,
        imageUrls: imageUrls.pathStrings,
      }),
    });
  }

  return (
    <section className="flex flex-col gap-10 py-10">
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
        <h2 className="text-xl">Enter your check-in policy:</h2>
        <Textarea
          onChange={(e) => {
            setCheckInPolicy(e.target.value);
            e.target.value === ""
              ? setIsCheckInPolicyEmpty(true)
              : setIsCheckInPolicyEmpty(false);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Enter your booking policy:</h2>
        <Textarea
          onChange={(e) => {
            setBookingPolicy(e.target.value);
            e.target.value === ""
              ? setIsBookingPolicyEmpty(true)
              : setIsBookingPolicyEmpty(false);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Enter your contact number:</h2>
        <Input
          type="tel"
          onChange={(e) => {
            setContactNumber(e.target.value);
            e.target.value === ""
              ? setIsContactNumberEmpty(true)
              : setIsContactNumberEmpty(false);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Add pictures of your boat:</h2>
        {previewImagePaths.length > 0 && (
          <div className="flex gap-5 overflow-x-auto">
            {previewImagePaths.map((previewImagePath, index) => (
              <Image
                key={index}
                src={previewImagePath}
                alt={`restaurant-image-${index}`}
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

      <div className="flex justify-between py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() => {
            setPage(0);
            setProgress(0);
          }}
        >
          Back
        </Button>
        <Button
          disabled={
            isPriceEmpty ||
            isCheckInPolicyEmpty ||
            isBookingPolicyEmpty ||
            isContactNumberEmpty ||
            selectedImages?.length === 0
          }
          className="w-[5rem] text-lg"
          onClick={() => {
            const id = v4();
            onNextClick(id);
            setPage(2);
            setProgress(100);
          }}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
