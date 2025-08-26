"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { ShoppingCart, User, Search, Menu } from "lucide-react"
import ThemeToggle from "./ThemeToggle"
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50 backdrop-blur-md bg-background/80">
      <div className="container">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-foreground tracking-tight">
            MANELY
          </Link>

          {/* Navigation - Men's Grooming Categories */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/skincare" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              SKINCARE
            </Link>
            <Link href="/beard" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              BEARD CARE
            </Link>
            <Link href="/hair" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              HAIR CARE
            </Link>
            <Link href="/body" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              BODY
            </Link>
            <Link href="/grooming-kits" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              KITS
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Search */}
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>

            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Cart */}
            <Link href="/cart" className="relative p-2 hover:bg-secondary rounded-lg transition-colors">
              <ShoppingCart className="h-5 w-5 text-muted-foreground" />
              <span className="absolute -top-1 -right-1 bg-foreground text-background text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px] font-medium">
                0
              </span>
            </Link>

            {/* User Account */}
            {status === "loading" ? (
              <div className="h-8 w-8 bg-muted rounded-full animate-pulse"></div>
            ) : session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 hover:bg-secondary rounded-lg transition-colors">
                  <User className="h-5 w-5 text-muted-foreground" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg py-1 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link href="/profile" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                    Profile
                  </Link>
                  <Link href="/orders" className="block px-4 py-2 text-sm text-foreground hover:bg-secondary transition-colors">
                    Orders
                  </Link>
                  <hr className="my-1 border-border" />
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
              >
                SIGN IN
              </button>
            )}

            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
