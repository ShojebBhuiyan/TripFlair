import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { cn } from "@/lib/utils"

import { Button } from "./ui/button"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex w-full gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Image src="/logo.png" width={128} height={128} alt="logo" />
      </Link>
      {items?.length ? (
        <nav className="flex w-full justify-center gap-32">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <nav className="flex items-center justify-center gap-6">
        <Button variant={"link"}>Login</Button>
      </nav>
    </div>
  )
}
