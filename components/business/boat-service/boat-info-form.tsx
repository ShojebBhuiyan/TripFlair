"use client";

import { useState } from "react";
import { TripLocation } from "@prisma/client";

import { Button } from "@/components/ui/button";
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

import { useBoat } from "./boat-provider";

interface BoatInfoFormProps {
  setPage: (page: number) => void;
  setProgress: (progress: number) => void;
}

export default function BoatInfoForm({
  setPage,
  setProgress,
}: BoatInfoFormProps) {
  const boatContext = useBoat();
  const [isTitleEmpty, setIsTitleEmpty] = useState(true);
  const [isOverviewEmpty, setIsOverviewEmpty] = useState(true);
  const [isLocationEmpty, setIsLocationEmpty] = useState(true);
  const [isAddressEmpty, setIsAddressEmpty] = useState(true);
  const [isMapLinkEmpty, setIsMapLinkEmpty] = useState(true);
  const [isPerksEmpty, setIsPerksEmpty] = useState(true);
  const [perks, setPerks] = useState<string[]>([]);
  const [temporaryPerk, setTemporaryPerk] = useState<string>("");

  return (
    <section className="flex flex-col gap-10 py-10">
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">What is the name of your boat?</h2>
        <Textarea
          onChange={(e) => {
            boatContext?.setTitle(e.target.value);
            e.target.value === ""
              ? setIsTitleEmpty(true)
              : setIsTitleEmpty(false);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">{"Add an overview of your boat:"}</h2>
        <Textarea
          onChange={(e) => {
            boatContext?.setOverview(e.target.value);
            e.target.value === ""
              ? setIsOverviewEmpty(true)
              : setIsOverviewEmpty(false);
          }}
        />
      </div>
      <div className="flex w-[40rem] items-center gap-5">
        <h2 className="text-xl">Where is your boat located?</h2>
        <div>
          <Select
            onValueChange={(value) => {
              boatContext?.setLocation(
                TripLocation[value as keyof typeof TripLocation]
              );
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
        <h2 className="text-xl">Enter your address:</h2>
        <Textarea
          onChange={(e) => {
            boatContext?.setAddress(e.target.value);
            e.target.value === ""
              ? setIsAddressEmpty(true)
              : setIsAddressEmpty(false);
          }}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-1 items-center gap-5">
        <h2 className="text-xl">Enter the Google Map link of your location:</h2>
        <Textarea
          onChange={(e) => {
            boatContext?.setMapLink(e.target.value);
            e.target.value === ""
              ? setIsMapLinkEmpty(true)
              : setIsMapLinkEmpty(false);
          }}
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
            <Textarea
              value={temporaryPerk}
              className="w-[20rem]"
              placeholder="Perk name"
              onChange={(e) => {
                setTemporaryPerk(e.target.value);
              }}
            />
          </div>
          <Button
            className="mt-5 rounded-[0.625rem] bg-[#00A651] text-black"
            onClick={() => {
              if (temporaryPerk?.length! > 0) {
                setPerks([...perks, temporaryPerk!]);
                boatContext.setPerks([...perks, temporaryPerk!]);
              }
              setTemporaryPerk("");

              setIsPerksEmpty(false);
            }}
          >
            Add Perk
          </Button>
        </div>
      </div>

      <div className="flex justify-end py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() => {
            setPage(1);
            setProgress(50);
          }}
          disabled={
            isTitleEmpty ||
            isOverviewEmpty ||
            isLocationEmpty ||
            isAddressEmpty ||
            isMapLinkEmpty ||
            isPerksEmpty
          }
        >
          Next
        </Button>
      </div>
    </section>
  );
}
