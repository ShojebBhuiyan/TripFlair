"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileType } from "@prisma/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useToast } from "../ui/use-toast";

const signupFormSchema = z
  .object({
    name: z.string().min(1, "Name can't be empty!"),
    email: z.string().email(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one letter, one number, and one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface SignUpFormProps {
  profileType: ProfileType;
  setPage: (page: number) => void;
}

export default function SignUpForm({ profileType, setPage }: SignUpFormProps) {
  const form = useForm<z.infer<typeof signupFormSchema>>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof signupFormSchema>) {
    console.log(values);
    await fetch("/api/search-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
      }),
    }).then(async (res) => {
      if (res.status === 200) {
        toast({
          variant: "warning",
          description: "This email is already in use.",
        });
      } else {
        await fetch("/api/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
            profileType: profileType,
          }),
        }).then((res) => {
          if (res.status === 200) {
            toast({
              description: "You have successfully signed up!",
            });
            router.push(
              profileType === ProfileType.Traveller ? "/location" : "/business"
            );
          } else {
            toast({
              variant: "destructive",
              title: "Uh oh!",
              description: "Something went wrong. Please try again.",
            });
          }
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full w-1/2 bg-[#D9D9D980]/50"
      >
        <div className="flex h-full flex-col items-center justify-center space-y-2">
          <div className="mb-5 flex justify-center">
            <h1 className="text-4xl font-bold text-black">{`Sign Up as a ${profileType}`}</h1>
          </div>
          <div className="flex w-[30rem] flex-col items-center gap-4 rounded-[1.875rem] bg-[#D9D9D980]/25 p-20">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="your name"
                      {...field}
                      className="bg-[#D9D9D980]/35 rounded-[1.875rem] border border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="youremail@xyz.com"
                      {...field}
                      className="bg-[#D9D9D980]/35 rounded-[1.875rem] border border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="your password"
                      {...field}
                      className="bg-[#D9D9D980]/35 rounded-[1.875rem] border border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="confirm your password"
                      {...field}
                      className="bg-[#D9D9D980]/35 rounded-[1.875rem] border border-black"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-center gap-5">
              <Button
                className="mt-5 justify-center rounded-[0.625rem] bg-[#00A651] text-black"
                onClick={() => {
                  setPage(0);
                }}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="mt-5 justify-center rounded-[0.625rem] bg-[#00A651] text-black"
              >
                Submit
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <h3 className="text-lg">Already have an account?</h3>
            <Link href={"/signin"} className="text-xl text-black underline">
              Sign In
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
}
