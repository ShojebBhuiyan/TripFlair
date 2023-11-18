"use client";

import { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { v4 } from "uuid";
import { z } from "zod";

import { MenuItem } from "@/types/restaurant";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

import { useRestaurant } from "./restaurant-provider";

interface RestaurantMenuFormProps {
  setPage: (page: number) => void;
  setProgress: (progress: number) => void;
}

const menuFormSchema = z.object({
  name: z.string(),
  price: z.number().min(1),
});

export default function RestaurantMenuForm({
  setPage,
  setProgress,
}: RestaurantMenuFormProps) {
  const session = useSession();

  const restaurantContext = useRestaurant();
  const [selectedImages, setSelectedImages] = useState<FileList | null>();
  const [previewImagePaths, setPreviewImagePaths] = useState<string[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [isContactNumberEmpty, setIsContactNumberEmpty] = useState(true);

  const form = useForm<z.infer<typeof menuFormSchema>>({
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      name: "",
      price: 0,
    },
  });

  function onMenuAddSubmit(values: z.infer<typeof menuFormSchema>) {
    const menuItem = {
      name: values.name,
      price: values.price,
    };
    setMenuItems([...menuItems, menuItem]);
  }

  async function onNextClick(id: string) {
    const formData = new FormData();
    if (selectedImages) {
      for (let i = 0; i < selectedImages.length; i++) {
        formData.append(`image-${i}`, selectedImages[i]);
      }
    }
    formData.append("length", selectedImages?.length.toString()!);
    formData.append("mode", "restaurant");
    formData.append("id", id);

    const response = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    const imageUrls: { pathStrings: string[] } = await response.json();

    const restaurantService = await fetch("/api/business/modify/restaurant", {
      method: "POST",
      body: JSON.stringify({
        userId: session.data?.user?.id,
        restaurantId: id,
        name: restaurantContext?.name,
        slogan: restaurantContext?.slogan,
        description: restaurantContext?.description,
        location: restaurantContext?.location,
        address: restaurantContext?.address,
        imageUrls: imageUrls.pathStrings,
        menuItems: menuItems,
        contactNumber: restaurantContext?.contactNumber,
      }),
    });
  }

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Add pictures of your restaurant or menu:</h2>
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
      <div className="flex w-[40rem] flex-col gap-4">
        <h2 className="text-xl">Add your menu items:</h2>
        {menuItems.length > 0 && (
          <Table>
            <TableCaption>Your menu</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="text-lg font-medium">Item</TableHead>
                <TableHead className="text-lg font-medium">
                  Price (BDT)
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {menuItems.map((menuItem) => (
                <TableRow>
                  <TableCell className="text-md">{menuItem.name}</TableCell>
                  <TableCell className="text-md">{menuItem.price}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onMenuAddSubmit)}>
            <div className="flex w-full items-center justify-between gap-5">
              <div className="flex items-start gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Item Name</FormLabel>
                      <FormControl>
                        <Textarea
                          className="w-[20rem]"
                          placeholder="Item Name"
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
                      <FormLabel>Item Price (BDT)</FormLabel>
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
                Add Item
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Enter your contact number:</h2>
        <Input
          type="tel"
          onChange={(e) => {
            const contactNumber = e.target.value;
            if (contactNumber.length === 0) setIsContactNumberEmpty(true);
            else setIsContactNumberEmpty(false);
            restaurantContext?.setContactNumber(contactNumber);
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
            menuItems.length === 0 ||
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
