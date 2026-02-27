import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { UserMenu } from "./user-menu"
import { NavbarClient } from "./navbar-client"
import { NavbarShell } from "./navbar-shell"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

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
    <NavbarShell>
      {(isTransparent) => (
        <>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/" className="flex items-center">
                  <Image src="/logo.png" alt="Vende Tu Leasing" width={120} height={40} className="h-10 w-auto" />
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex md:items-center md:gap-6">
                <Link
                  href="/properties"
                  className={`text-sm font-medium transition-colors ${
                    isTransparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-accent"
                  }`}
                >
                  Propiedades
                </Link>
                <Link
                  href="/benefits"
                  className={`text-sm font-medium transition-colors ${
                    isTransparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-accent"
                  }`}
                >
                  Tu Beneficio
                </Link>
                <Link
                  href="/services"
                  className={`text-sm font-medium transition-colors ${
                    isTransparent ? "text-white/90 hover:text-white" : "text-foreground hover:text-accent"
                  }`}
                >
                  Servicios
                </Link>

                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger
                        className={`text-sm font-medium ${isTransparent ? "text-white/90 hover:text-white" : ""}`}
                      >
                        Simulador de Credito
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[250px] gap-3 p-4">
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/credit-simulator"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Simulador</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Calcula tu credito
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          <li>
                            <NavigationMenuLink asChild>
                              <Link
                                href="/credit-simulator/banks"
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                              >
                                <div className="text-sm font-medium leading-none">Bancos</div>
                                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                  Leasing habitacional
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </div>

              <div className="hidden md:flex md:items-center md:gap-4">
                {user ? (
                  <>
                    <Button
                      asChild
                      className={
                        isTransparent
                          ? "bg-accent hover:bg-accent/90 text-white"
                          : "bg-accent hover:bg-accent/90 text-white"
                      }
                    >
                      <Link href="/dashboard/properties/new">Publicar Propiedad</Link>
                    </Button>
                    <UserMenu user={user} profile={profile} isTransparent={isTransparent} />
                  </>
                ) : (
                  <>
                    <Button variant="ghost" asChild className={isTransparent ? "text-white bg-accent hover:bg-white/10" : ""}>
                      <Link href="/auth/login">Iniciar Sesion</Link>
                    </Button>
                    <Button
                      asChild
                      className={
                        isTransparent
                          ? "bg-white/10 hover:bg-white/20 text-white border border-white/20"
                          : "bg-[#ff8414] hover:bg-accent/90 text-white"
                      }
                    >
                      <Link href="/auth/sign-up">Registrarse</Link>
                    </Button>
                  </>
                )}
              </div>

              <NavbarClient user={user} profile={profile} isTransparent={isTransparent} />
            </div>
          </div>
        </>
      )}
    </NavbarShell>
  )
}
