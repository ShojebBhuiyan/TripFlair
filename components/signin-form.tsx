"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "./ui/button"
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { useToast } from "./ui/use-toast"

const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export default function SignInForm() {
  const form = useForm<z.infer<typeof signinFormSchema>>({
    resolver: zodResolver(signinFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const { toast } = useToast()
  const router = useRouter()

  async function onSubmit(values: z.infer<typeof signinFormSchema>) {
    console.log(values)
    // try {
    //   const result = await signIn("credentials", {
    //     ...values,
    //     redirect: false,
    //   });
    //   if (result?.error) {
    //     toast({
    //       variant: "destructive",
    //       description: "Invalid credentials",
    //     });
    //   } else {
    //     toast({
    //       variant: "default",
    //       description: "Login successful!",
    //     });
    //     router.replace("/guided-form");
    //   }
    // } catch (error) {
    //   console.log(error);
    //   toast({
    //     variant: "destructive",
    //     description: "Something went wrong",
    //   });
    // }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-full w-1/2 bg-[#D9D9D980]/50"
      >
        <div className="flex h-full flex-col items-center justify-center space-y-2">
          <div className="mb-5 flex justify-center">
            <h1 className="text-4xl font-bold text-black">Sign In</h1>
          </div>
          <div className="flex w-[30rem] flex-col items-center gap-4 rounded-[1.875rem] bg-[#D9D9D980]/25 p-20">
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
            <Button
              type="submit"
              className="mt-5 justify-center rounded-[0.625rem] bg-[#00A651] text-black"
            >
              Submit
            </Button>
          </div>
          <div className="flex gap-2">
            <h3 className="text-lg">Don&apos; have an account?</h3>
            <Link href={"/signup"} className="text-xl text-black underline">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </Form>
  )
}
