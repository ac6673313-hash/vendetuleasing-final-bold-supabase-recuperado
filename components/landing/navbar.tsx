import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { UserMenu } from "./user-menu"
import { NavbarClient } from "./navbar-client"
import { NavbarDesktopLinks } from "./navbar-desktop-links"
import { NavbarAuthButtons } from "./navbar-auth-buttons"

export async function Navbar() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  let profile = null
  if (user) {
    const { data } = await supabase.from("profiles").select("*").eq("id", user.id).single()
    profile = data
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Vende Tu Leasing" width={120} height={40} className="h-10 w-auto" />
          </Link>
        </div>

        <NavbarDesktopLinks />

        <div className="hidden md:flex md:items-center md:gap-4">
          {user ? (
            <>
              <Button asChild className="bg-accent hover:bg-accent/90 text-white">
                <Link href="/dashboard/properties/new">Publicar Propiedad</Link>
              </Button>
              <UserMenu user={user} profile={profile} />
            </>
          ) : (
            <NavbarAuthButtons />
          )}
        </div>

        <NavbarClient user={user} profile={profile} />
      </div>
    </div>
  )
}
