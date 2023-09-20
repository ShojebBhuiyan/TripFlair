import SignInForm from "@/components/signin-form"

export default function SigninPage() {
  return (
    <section className="h-screen bg-bike bg-cover bg-no-repeat">
      <div className="flex h-full items-center justify-end">
        <SignInForm />
      </div>
    </section>
  )
}
