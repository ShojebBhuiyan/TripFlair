"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { TripLocation } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { ParasailingPackageType } from "@/types/parasailing";
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

interface ParasailingSuccessFormProps {
  setPage: (page: number) => void;
  setProgress: (progress: number) => void;
}

const parasailingPackageFormSchema = z.object({
  description: z.string(),
  price: z.number().min(1),
});

export default function ParasailingInfoForm({
  setPage,
  setProgress,
}: ParasailingSuccessFormProps) {
  const [name, setName] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [overview, setOverview] = useState("");
  const [location, setLocation] = useState<TripLocation>();
  const [isLocationEmpty, setIsLocationEmpty] = useState(true);
  const [address, setAddress] = useState("");
  const [mapLink, setMapLink] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [selectedImages, setSelectedImages] = useState<FileList | null>();
  const [previewImagePaths, setPreviewImagePaths] = useState<string[]>([]);
  const [packages, setPackages] = useState<ParasailingPackageType[]>([]);

  const session = useSession();

  const form = useForm<z.infer<typeof parasailingPackageFormSchema>>({
    resolver: zodResolver(parasailingPackageFormSchema),
    defaultValues: {
      description: "",
      price: 0,
    },
  });

  function onPackageAddSubmit(
    values: z.infer<typeof parasailingPackageFormSchema>
  ) {
    const _package = {
      description: values.description,
      price: values.price,
    };
    setPackages([...packages, _package]);
  }

  async function onNextClick(id: string) {
    const formData = new FormData();
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append(`image-${i}`, selectedImages[i]);
      }
    }
    formData.append("length", selectedImages?.length.toString()!);
    formData.append("mode", "parasailing");
    formData.append("id", id);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const imageUrls: { pathStrings: string[] } = await response.json();

    const parasailing = await fetch("/api/business/modify/parasailing", {
      method: "POST",
      body: JSON.stringify({
        userId: session.data?.user?.id,
        parasailingId: id,
        name,
        subtitle,
        overview,
        location,
        address,
        mapLink,
        imageUrls: imageUrls.pathStrings,
        packages,
        contactNumber,
      }),
    });
  }

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">What is the name of your parasailing point?</h2>
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
        <h2 className="text-xl">Where is your parasailing point located?</h2>
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
        <h2 className="text-xl">Add pictures of your parasailing point:</h2>
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
      <div className="flex w-[41rem] flex-col gap-4">
        <h2 className="text-xl">Add your packages:</h2>
        {packages.length > 0 && (
          <Table>
            <TableCaption>Your packages</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-medium">Item</TableHead>
                <TableHead className="text-lg font-medium">
                  Price (BDT)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packages.map((_package) => (
                <TableRow>
                  <TableCell className="text-md max-w-xs overflow-auto break-words">
                    {_package.description}
                  </TableCell>
                  <TableCell className="text-md">{_package.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onPackageAddSubmit)}>
            <div className="flex items-center gap-5">
              <div className="flex items-start gap-5">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          className="w-[20rem]"
                          placeholder="Description"
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
                      <FormLabel>Price (BDT)</FormLabel>
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
              </div>

              <Button
                type="submit"
                className="mt-5 rounded-[0.625rem] bg-[#00A651] text-black"
              >
                Add Package
              </Button>
            </div>
          </form>
        </Form>
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
            packages.length === 0 ||
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
