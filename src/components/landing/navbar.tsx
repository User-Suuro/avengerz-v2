import Link from 'next/link'
import * as React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { User2Icon } from 'lucide-react'

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuContent,
    NavigationMenuTrigger,
} from '@/shadcn/ui/navigation-menu'
import { Button } from '@/shadcn/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/shadcn/ui/avatar'
import { Separator } from '@/shadcn/ui/separator'
import { groupedItems } from '@/lib/dummy'

export function Navbar() {
    return (
        <nav className="flex flex-col">
            <div className="border-b">
                <div className="container mx-auto flex h-16 items-center justify-around">
                    <div className="flex items-center">
                        <div className="relative h-12 w-12">
                            <Image
                                src="/assets/branding/logo.jpg"
                                alt="Logo"
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <div className="ml-4 text-xl font-semibold">
                            Avengerz
                        </div>
                    </div>

                    {/*-- Navigations --*/}
                    <div>
                        <NavigationMenu>
                            <NavigationMenuList className="gap-4">
                                {/*-- Home --*/}
                                <NavigationMenuItem>
                                    <Link href="/#" passHref>
                                        <NavigationMenuLink>
                                            Home
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                {/*-- Services --*/}
                                <NavigationMenuItem>
                                    <Link href="/#"  passHref>
                                        <NavigationMenuLink>
                                            Blogs
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>

                                <NavigationMenuItem>
                                    <Link href="/#"  passHref>
                                        <NavigationMenuLink>
                                            Appointments
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>

                    {/*-- Log-in --*/}
                    <div className="flex items-center gap-4">
                        <Avatar>
                            <AvatarImage />
                            <AvatarFallback>
                                <User2Icon />
                            </AvatarFallback>
                        </Avatar>
                        <Button>Log-in</Button>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center py-4">
                <NavigationMenu>
                    <NavigationMenuList className="items-center">
                        {Object.entries(groupedItems).map(
                            ([category, items]) => (
                                <NavigationMenuItem key={category}>
                                    <NavigationMenuTrigger>
                                        {/*}
                                        <Link
                                            href={
                                                items.length > 0
                                                    ? items[0].href
                                                    : '#'
                                            }
                                            legacyBehavior
                                            passHref
                                        >
                                            <NavigationMenuLink>
                                                {category}
                                            </NavigationMenuLink>
                                        </Link>
                                        {*/}

                                        {category}
                                    </NavigationMenuTrigger>

                                    {/*-- Content --*/}
                                    <NavigationMenuContent>
                                        <ul className="md:w-[300px] lg:w-[400px]">
                                            <div className="flex flex-col gap-3 p-4">
                                                {items.map((item) => (
                                                    <div
                                                        key={item.id}
                                                        className="flex"
                                                    >
                                                        <ListItem
                                                            href={item.href}
                                                            title={item.title}
                                                        >
                                                            <span>
                                                                {
                                                                    item.description
                                                                }
                                                            </span>
                                                        </ListItem>
                                                    </div>
                                                ))}
                                            </div>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            )
                        )}

                        <div className="flex h-4 w-4 items-center justify-center">
                            <Separator orientation="vertical" />
                        </div>
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </nav>
    )
}

const ListItem = React.forwardRef<
    React.ElementRef<'a'>,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        'hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm leading-none font-medium">
                        {title}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})

ListItem.displayName = 'ListItem'
