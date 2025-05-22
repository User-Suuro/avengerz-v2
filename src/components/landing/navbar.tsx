"use client"

import Link from "next/link"
import * as React from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { User2Icon, Menu } from "lucide-react"

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
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader  } from "@/shadcn/ui/sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shadcn/ui/accordion"
import { groupedItems } from "@/lib/dummy"

export function Navbar() {
  return (
    <nav className="flex flex-col">
      <div className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12">
              <Image src="/assets/branding/logo.jpg" alt="Logo" fill className="rounded-full object-cover" />
            </div>
            <div className="ml-2 sm:ml-4 text-lg sm:text-xl font-semibold">Avengerz</div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList className="gap-4">
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#">Blogs</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/#">Appointments</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop Login */}
          <div className="hidden md:flex items-center gap-4">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>
                <User2Icon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <Button size="sm" className="px-3 py-1 h-9">
              Log-in
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-4">
            <Avatar className="h-8 w-8">
              <AvatarImage />
              <AvatarFallback>
                <User2Icon className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>

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
                  <div className="flex flex-col space-y-4 mb-8">
                    <Link href="/#" className="text-lg font-medium py-2">
                      Home
                    </Link>
                    <Link href="/#" className="text-lg font-medium py-2">
                      Blogs
                    </Link>
                    <Link href="/#" className="text-lg font-medium py-2">
                      Appointments
                    </Link>
                    <Button className="mt-4">Log-in</Button>
                  </div>

                  <Separator className="my-4" />

                  <div className="flex-1 overflow-auto">
                    <Accordion type="single" collapsible className="w-full">
                      {Object.entries(groupedItems).map(([category, items]) => (
                        <AccordionItem key={category} value={category}>
                          <AccordionTrigger className="text-base font-medium">{category}</AccordionTrigger>
                          <AccordionContent>
                            <div className="flex flex-col space-y-2 pl-2">
                              {items.map((item) => (
                                <Link key={item.id} href={item.href} className="py-2 text-sm hover:underline">
                                  <div className="font-medium">{item.title}</div>
                                  <p className="text-muted-foreground text-xs mt-1">{item.description}</p>
                                </Link>
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
        </div>
      </div>

     {/* Desktop Categories Menu - Fixed */}
      <div className="hidden md:flex items-center justify-center py-2 ">
        <NavigationMenu>
          <NavigationMenuList>
            {Object.entries(groupedItems).map(([category, items], index) => (
              <NavigationMenuItem key={category}>
                <NavigationMenuTrigger>{category}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[400px] lg:w-[500px] p-4">
                    <div className="grid gap-3 md:grid-cols-2">
                      {items.map((item) => (
                        <NavigationMenuLink key={item.id} asChild>
                          <Link
                            href={item.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                          >
                            <div className="text-sm font-medium leading-none">{item.title}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground mt-1">
                              {item.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {/* Separator after the last item */}
            <li className="flex items-center justify-center px-2">
              <Separator orientation="vertical" className="h-4" />
            </li>
          </NavigationMenuList>
          <NavigationMenuViewport />
        </NavigationMenu>
      </div>
    </nav>
  )
}

