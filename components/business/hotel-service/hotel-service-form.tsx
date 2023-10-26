"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripLocation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { HotelRoomType } from "@/types/hotel";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

interface HotelServiceFormProps {
  setPage: (page: number) => void;
  setProgress: (progress: number) => void;
}

const hotelRoomFormSchema = z.object({
  type: z.string(),
  price: z.number().min(1),
});

export default function HotelServiceForm({
  setPage,
  setProgress,
}: HotelServiceFormProps) {
  const session = useSession();

  const [name, setName] = useState<string | undefined>();
  const [slogan, setSlogan] = useState<string | undefined>();
  const [location, setLocation] = useState<TripLocation | undefined>();
  const [selectedImages, setSelectedImages] = useState<FileList | null>();
  const [previewImagePaths, setPreviewImagePaths] = useState<string[]>([]);
  const [address, setAddress] = useState<string | undefined>();
  const [overview, setOverview] = useState<string | undefined>();
  const [hotelRooms, setHotelRooms] = useState<HotelRoomType[]>([]);
  const [contactNumber, setContactNumber] = useState<string | undefined>();
  const [perks, setPerks] = useState<string[]>([]);
  const [checkInTime, setCheckInTime] = useState<string | undefined>();
  const [checkOutTime, setCheckOutTime] = useState<string | undefined>();
  const [isLocationEmpty, setIsLocationEmpty] = useState(true);
  const [temporaryPerk, setTemporaryPerk] = useState<string | undefined>();

  const form = useForm<z.infer<typeof hotelRoomFormSchema>>({
    resolver: zodResolver(hotelRoomFormSchema),
    defaultValues: {
      type: "",
      price: 0,
    },
  });

  function onRoomAddSubmit(values: z.infer<typeof hotelRoomFormSchema>) {
    const hotelRoom = {
      type: values.type,
      price: values.price,
    };
    setHotelRooms([...hotelRooms, hotelRoom]);
  }
  async function onNextClick(id: string) {
    const formData = new FormData();
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append(`image-${i}`, selectedImages[i]);
      }
    }
    formData.append("length", selectedImages?.length.toString()!);
    formData.append("mode", "hotel");
    formData.append("id", id);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const imageUrls: { pathStrings: string[] } = await response.json();

    const hotelService = await fetch("/api/business/modify/hotel", {
      method: "POST",
      body: JSON.stringify({
        userId: session.data?.user?.id,
        hotelId: id,
        name,
        slogan,
        location,
        address,
        overview,
        imageUrls: imageUrls.pathStrings,
        perks,
        hotelRooms,
        contactNumber,
        checkInTime,
        checkOutTime,
      }),
    });
  }

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">What is the name of your hotel?</h2>
        <Input
          className="w-full"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">{"Add a slogan. (Optional)"}</h2>
        <Input
          className="w-full"
          type="text"
          onChange={(e) => setSlogan(e.target.value)}
        />
      </div>
      <div className="flex w-[40rem] items-center justify-between gap-5">
        <h2 className="text-xl">Where is your hotel located?</h2>
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
        <h2 className="text-xl">
          Add info about your address and provide Google Maps link:
        </h2>
        <Input
          className="w-full"
          type="text"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Add pictures of your hotel:</h2>
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
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Add a brief overview about your hotel:</h2>
        <Textarea
          className="w-full"
          onChange={(e) => setOverview(e.target.value)}
        />
      </div>
      <div className="flex w-[40rem] flex-col gap-4">
        <h2 className="text-xl">What perks do you provide?</h2>

        {perks.length > 0 && (
          <Table>
            <TableCaption>Perks</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-medium">Perks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {perks.map((perk) => (
                <TableRow>
                  <TableCell className="text-md">{perk}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <div className="flex items-center gap-5">
          <div className="flex flex-col gap-3">
            <Label>Perk Name</Label>
            <Input
              value={temporaryPerk}
              type="text"
              className="w-[20rem]"
              placeholder="Perk name"
              onChange={(e) => setTemporaryPerk(e.target.value)}
            />
          </div>
          <Button
            className="mt-5 rounded-[0.625rem] bg-[#00A651] text-black"
            onClick={() => {
              if (temporaryPerk?.length! > 0)
                setPerks([...perks, temporaryPerk!]);
              setTemporaryPerk("");
            }}
          >
            Add Perk
          </Button>
        </div>
      </div>
      <div className="flex w-[40rem] flex-col gap-4">
        <h2 className="text-xl">Add your hotel rooms:</h2>
        {hotelRooms.length > 0 && (
          <Table>
            <TableCaption>Hotel Rooms</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-medium">Room Type</TableHead>
                <TableHead className="text-lg font-medium">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotelRooms.map((hotelRoom) => (
                <TableRow>
                  <TableCell className="text-md">{hotelRoom.type}</TableCell>
                  <TableCell className="text-md">{hotelRoom.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onRoomAddSubmit)}>
            <div className="flex items-center gap-5">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Type</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="w-[20rem]"
                        placeholder="Room Type"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Room Price</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        className="w-[10rem]"
                        {...field}
                        onChange={(e) => {
                          form.setValue("price", parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="mt-5 rounded-[0.625rem] bg-[#00A651] text-black"
              >
                Add Room
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">What is your check-in time?</h2>
        <Input
          className="w-full"
          type="time"
          onChange={(e) => setCheckInTime(e.target.value)}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">What is your check-out time?</h2>
        <Input
          className="w-full"
          type="time"
          onChange={(e) => setCheckOutTime(e.target.value)}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">What is your contact number?</h2>
        <Input
          className="w-full"
          type="tel"
          onChange={(e) => setContactNumber(e.target.value)}
        />
      </div>
      <div className="flex justify-end">
        <Button
          disabled={
            !name ||
            !location ||
            !address ||
            !overview ||
            !selectedImages ||
            !contactNumber ||
            !checkInTime ||
            !checkOutTime ||
            isLocationEmpty ||
            perks.length === 0 ||
            hotelRooms.length === 0
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
