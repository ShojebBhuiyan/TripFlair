import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

import { siteConfig } from "@/config/site"

import { Button } from "./ui/button"

export function SiteFooter() {
  return (
    <footer className="bg-[#0D1E4C] py-10">
      <div className="container flex w-full justify-around text-white">
        <div className="flex flex-col gap-2">
          <Link href={"/legal"}>Legal Information</Link>
          <Link href={"/about"}>About Us</Link>
          <Link href={"/terms"}>Terms and Conditions</Link>
          <Link href={"/tutorial"}>How TripFlair works</Link>
        </div>
        <div className="flex flex-col gap-2">
          <Link href={"/help"}>Help</Link>
          <Link href={"/business"}>TripFlair for Business</Link>
          <Link href={"/affiliate"}>Become an Affiliate</Link>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex justify-center gap-2">
            <Button className="rounded-full border border-primary bg-inherit">
              <Instagram />
            </Button>
            <Button className="rounded-full border border-primary bg-inherit">
              <Facebook />
            </Button>
            <Button className="rounded-full border border-primary bg-inherit">
              <Twitter />
            </Button>
          </div>
          <div className="flex w-[30rem] flex-col gap-2">
            <h2 className="text-3xl">
              Get exclusive inspiration for your next stay. Subscribe to our
              newsletter.
            </h2>
          </div>
          <div className="flex justify-end">
            <Button className="bg-[#227DE9]">Subscribe</Button>
          </div>
          <div className="w-[30rem]">
            <h3 className="text-lg">
              TripFlair N.V., MIST 5 – 7, 40221 Dhaka, Bangladesh Copyright 2023
              TripFlair | All rights reserved.
            </h3>
          </div>
        </div>
      </div>
    </footer>
  )
}
