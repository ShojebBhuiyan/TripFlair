import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import HeroSection from "@/components/landing-sections/hero-section"
import ServicesSection from "@/components/landing-sections/services-section"

export default function IndexPage() {
  return (
    <section className="grid h-screen items-center gap-6 pb-8 pt-6 md:py-10">
      <HeroSection />
      <ServicesSection />
    </section>
  )
}
