"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import type { User } from "@supabase/supabase-js"
import { MobileNav } from "./mobile-nav"
import { useNavTransparent } from "@/hooks/use-nav-transparent"

interface NavbarClientProps {
  user: User | null
  profile: {
    full_name?: string
    avatar_url?: string
  } | null
}

export function NavbarClient({ user, profile }: NavbarClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const isTransparent = useNavTransparent(ref)

  return (
    <>
      {/* Mobile menu button */}
      <div ref={ref} className="flex md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={isTransparent ? "text-white hover:bg-white/10" : ""}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <MobileNav user={user} profile={profile} onClose={() => setIsMenuOpen(false)} />}
    </>
  )
}
