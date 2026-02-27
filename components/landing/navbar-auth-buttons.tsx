"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useNavTransparent } from "@/hooks/use-nav-transparent"

export function NavbarAuthButtons() {
  const ref = useRef<HTMLDivElement>(null)
  const isTransparent = useNavTransparent(ref)

  return (
    <div ref={ref} className="flex items-center gap-4">
      <Button
        variant="ghost"
        asChild
        className={isTransparent ? "text-white bg-accent hover:bg-white/10" : ""}
      >
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
    </div>
  )
}
