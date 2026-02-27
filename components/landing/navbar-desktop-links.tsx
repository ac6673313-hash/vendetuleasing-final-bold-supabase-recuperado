"use client"

import { useRef } from "react"
import Link from "next/link"
import { useNavTransparent } from "@/hooks/use-nav-transparent"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function NavbarDesktopLinks() {
  const ref = useRef<HTMLDivElement>(null)
  const isTransparent = useNavTransparent(ref)

  return (
    <div ref={ref} className="hidden md:flex md:items-center md:gap-6">
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
  )
}
