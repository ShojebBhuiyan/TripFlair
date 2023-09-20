import { Button } from "../ui/button"

export default function HeroSection() {
  return (
    <section className="flex h-screen flex-col items-center justify-center gap-6 bg-landing bg-cover bg-no-repeat">
      <h1 className="text-7xl font-bold text-white">Not All Who Wander</h1>
      <h1 className="text-7xl font-bold text-white">Are Lost </h1>
      <Button className="bg-transparent text-xl text-white backdrop-blur-sm hover:border hover:border-white hover:bg-transparent">
        Get Started
      </Button>
    </section>
  )
}
