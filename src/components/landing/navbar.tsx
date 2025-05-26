"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { User2Icon, Menu } from "lucide-react"
import { signOut, useSession } from "next-auth/react"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/shadcn/ui/navigation-menu"
import { Button } from "@/shadcn/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/shadcn/ui/avatar"
import { Separator } from "@/shadcn/ui/separator"
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/shadcn/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion"
import { groupedItems } from "@/lib/dummy"

// Navigation functions hook
const useNavigation = () => {
  const router = useRouter()

  const goToHome = () => {
    router.push("/")
  }
  const goToLogin = () => {
    router.push("/auth/signin")
  }  
  const goToReviews = () => {
    router.push("/reviews")
  }

  const goToCategory = (href: string) => {
    router.push(href)
  }

  return {
    goToHome,
    goToReviews,
    goToLogin,
  }
}

// Main navigation items with their corresponding functions
const mainNavItems = [
  { label: "Home", action: "goToHome" },
  { label: "Reviews", action: "goToReviews"}
] as const

// Reusable Avatar Component
const UserAvatar = ({ size = "default" }: { size?: "default" | "small" }) => {
  const { data: session } = useSession()
  
  return (
    <Avatar className={size === "small" ? "h-8 w-8" : ""}>
      <AvatarImage src={session?.user?.image || ""} />
      <AvatarFallback>
        <User2Icon className="h-4 w-4" />
      </AvatarFallback>
    </Avatar>
  )
}

// Logo and Brand Component
const Logo = () => (
  <div className="flex items-center">
    <div className="relative h-10 w-10 sm:h-12 sm:w-12">
      <Image 
        src="/assets/branding/logo.jpg" 
        alt="Logo" 
        fill 
        className="rounded-full object-cover" 
      />
    </div>
    <div className="ml-2 sm:ml-4 text-lg sm:text-xl font-semibold">
      Avengerz
    </div>
  </div>
)

// Desktop Navigation Menu
const DesktopNavigation = () => {
  const navigation = useNavigation()
  
  return (
    <div className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          {mainNavItems.map((item) => (
            <NavigationMenuItem key={item.label}>
              <NavigationMenuLink asChild>
                <button 
                  onClick={() => navigation[item.action]()}
                  className="cursor-pointer hover:text-accent-foreground transition-colors"
                >
                  {item.label}
                </button>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

// Desktop Login Section
const DesktopLogin = () => {
  const { goToLogin } = useNavigation()
  const { data: session } = useSession()
  
  return (
    <div className="hidden md:flex items-center gap-4">
      <UserAvatar />
      {session ? (
        <Button size="sm" className="px-3 py-1 h-9 cursor-pointer" onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button size="sm" className="px-3 py-1 h-9 cursor-pointer" onClick={goToLogin}>
          Log-in
        </Button>
      )}
    </div>
  )
}

// Mobile Navigation Sheet
const MobileNavigation = () => {
  const navigation = useNavigation()
  const { data: session } = useSession()
  
  return (
    <div className="flex md:hidden items-center gap-4">
      <UserAvatar size="small" />
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[80vw] sm:w-[350px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full py-6">
            {/* Main Navigation Links */}
            <div className="flex flex-col space-y-4 mb-8">
              {mainNavItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => navigation[item.action]()}
                  className="text-lg font-medium py-2 text-left hover:text-accent-foreground transition-colors"
                >
                  {item.label}
                </button>
              ))}
              {session ? (
                <Button className="mt-4" onClick={() => signOut()}>
                  Logout
                </Button>
              ) : (
                <Button className="mt-4" onClick={navigation.goToLogin}>
                  Log-in
                </Button>
              )}
            </div>

            <Separator className="my-4" />

            {/* Categories Accordion */}
            <div className="flex-1 overflow-auto">
              <Accordion type="single" collapsible className="w-full">
                {Object.entries(groupedItems).map(([category, items]) => (
                  <AccordionItem key={category} value={category}>
                    <AccordionTrigger className="text-base font-medium">
                      {category}
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2 pl-2">
                        {items.map((item) => (
                          <button
                            key={item.id}
                            className="py-2 text-sm hover:underline text-left"
                          >
                            <div className="font-medium">{item.title}</div>
                            <p className="text-muted-foreground text-xs mt-1">
                              {item.description}
                            </p>
                          </button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

// Desktop Categories Menu
const DesktopCategoriesMenu = () => {

  return (
    <div className="hidden md:flex items-center justify-center py-2">
      <NavigationMenu>
        <NavigationMenuList>
          {Object.entries(groupedItems).map(([category, items]) => (
            <NavigationMenuItem key={category}>
              <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-[400px] lg:w-[500px] p-4">
                  <div className="grid gap-3 md:grid-cols-2">
                    {items.map((item) => (
                      <NavigationMenuLink key={item.id} asChild>
                        <button
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-left w-full"
                        >
                          <div className="text-sm font-medium leading-none">
                            {item.title}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                            {item.description}
                          </p>
                        </button>
                      </NavigationMenuLink>
                    ))}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ))}
          <li className="flex items-center justify-center px-2">
            <Separator orientation="vertical" className="h-4" />
          </li>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>
    </div>
  )
}

// Main Navbar Component
export function Navbar() {
  return (
    <nav className="flex flex-col">
      {/* Top Navigation Bar */}
      <div className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Logo />
          <DesktopNavigation />
          <DesktopLogin />
          <MobileNavigation />
        </div>
      </div>

      {/* Desktop Categories Menu */}
      <DesktopCategoriesMenu />
    </nav>
  )
}