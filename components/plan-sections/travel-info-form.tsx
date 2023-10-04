import { usePlan } from "@/providers/plan-provider";

import { Button } from "../ui/button";
import { DatePicker } from "../ui/date-picker";
import { Input } from "../ui/input";

export default function TravelInfoForm() {
  const planContext = usePlan();
  return (
    <section className="flex flex-col gap-4 py-10">
      <h1 className="text-4xl">Please fill up your travel info</h1>
      <div className="grid w-[40rem] grid-cols-2 items-center">
        <h2 className="text-xl">Number of Travellers: </h2>
        <Input
          className="w-[10rem]"
          type="number"
          onChange={(e) =>
            planContext?.setNumberOfTravellers(Number(e.target.value))
          }
        />
      </div>
      <div className="grid w-[40rem] grid-cols-2 items-center">
        <h2 className="text-xl">Date and time of departure: </h2>
        <Input
          className="w-[10rem]"
          type="datetime-local"
          onChange={(e) => planContext?.setStartDate(new Date(e.target.value))}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-2 items-center">
        <h2 className="text-xl">Date and time of return: </h2>
        <Input
          className="w-[10rem]"
          type="datetime-local"
          onChange={(e) => planContext?.setReturnDate(new Date(e.target.value))}
        />
      </div>
      <div className="grid w-[40rem] grid-cols-2 items-center">
        <h2 className="text-xl">Total travel cost: </h2>
        <Input
          className="w-[10rem]"
          type="number"
          onChange={(e) =>
            planContext?.setNumberOfTravellers(Number(e.target.value))
          }
        />
      </div>
      <div className="flex justify-between py-10">
        <Button
          className="w-[5rem] text-lg"
          onClick={() => planContext?.setPlanPage(1)}
        >
          Back
        </Button>
        <Button
          className="w-[5rem] text-lg"
          onClick={() => planContext?.setPlanPage(2)}
        >
          Next
        </Button>
      </div>
    </section>
  );
}
