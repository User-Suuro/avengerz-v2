// import { redirect } from 'next/navigation';
// import { getCurrentUser } from '@/lib/auth';

import Image from "next/image";
import type React from 'react'

import { Button } from '@/shadcn/ui/button'
import { ChevronRight, Icon, Star } from 'lucide-react'
import { groupedItems, type ServiceItemType, categoryDescriptions} from '@/lib/dummy'
import AboutPage from '@/components/landing/about'

import Marquee3D from '@/components/landing/marquee'
import { BentoCard, BentoGrid } from '@/shadcn/magicui/bento-grid'
import { Marquee } from '@/shadcn/magicui/marquee'

// data -> content conversion

function bentoData(data: ServiceItemType[]) {
    return data.map((element) => {
        const duration = 5 * element.images.length
        return {
            name: element.title,
            description: element.description,
            href: element.href,
            className: 'col-span-3 lg:col-span-1',
            background: (
                <Marquee
                    pauseOnHover
                    style={
                        { '--duration': `${duration}s` } as React.CSSProperties
                    }
                    className="absolute top-10 [mask-image:linear-gradient(to_top,transparent_40%,#000_100%)]"
                >
                    {element.images.map((f, idx) => (
                        <Image
                            key={idx}
                            src={`/assets/services/${element.folder}/${f}`}
                            alt={`Image ${idx}`}
                            width={256}
                            height={400}
                            className="rounded-sm"
                        />
                    ))}
                </Marquee>
            ),
            cta: 'Browse ',
        }
    })
}

export default function Root() {

  // TODO: handle user session

   /*
    const user = await getCurrentUser();

    if (!user) {
        redirect('/login'); // or wherever your auth page is
    }
    */

  return (
        <div className="container mx-auto px-24">
            {/*-- Hero --*/}
            <div className="min-h-[calc(100dvh-133px)] flex">
                <div className="container mx-auto flex flex-col-reverse items-center gap-8 lg:flex-row ">
                    {/* Text and Button Section */}
                    <div className="relative flex w-full items-center md:flex-1">
                        <div className="text-center lg:text-left">
                            <h1 className="text-2xl leading-snug font-bold tracking-tight sm:text-3xl md:text-4xl">
                                We are here to fulfill your Artistic Needs
                            </h1>
                            <div className="mt-4">
                                <Button className="w-fit cursor-pointer px-4">
                                    See More
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    </div>
                    {/* Marquee3D Section (Stacks below on small screens) */}
                    <div className="w-full lg:flex-1">
                        <Marquee3D />
                    </div>
                </div>
            </div>

            {/*-- Offered Services --*/}
            <div className="container mx-auto mt-16 mb-8 border-y">
                {Object.entries(groupedItems).map(([category, items]) => (
                    <div
                        key={category}
                        className="mb-12 flex flex-col justify-center"
                    >
                        <h2 className="mt-8 mb-2 text-2xl font-bold">
                            {category}
                        </h2>
                        {/* Display the category description */}
                        <p className="text-muted-foreground mb-6">
                            {categoryDescriptions[category]}
                        </p>
                        <BentoGrid>
                            {bentoData(items).map((feature, featureIdx) => (
                                <BentoCard key={featureIdx} {...feature}  />
                            ))}
                        </BentoGrid>
                    </div>
                ))}
            </div>

            {/*-- About -- */}
            <div>
                <AboutPage />
            </div>

            {/*-- Tarp Showcase --*/}
            <div>
                <Image
                    src="/assets/branding/bg.jpg"
                    alt="Background"
                    width={1920}
                    height={720}
                    className="brightness-50"
                />
            </div>
        </div>
    )
}
