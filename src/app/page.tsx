import Image from "next/image"
import type React from "react"

import { Button } from "@/shadcn/ui/button"
import { ChevronRight } from "lucide-react"
import { groupedItems, type ServiceItemType, categoryDescriptions } from "@/lib/dummy"
import AboutPage from "@/components/landing/about"

import Marquee3D from "@/components/landing/marquee"
import { BentoCard, BentoGrid } from "@/shadcn/magicui/bento-grid"
import { Marquee } from "@/shadcn/magicui/marquee"

// data -> content conversion
function bentoData(data: ServiceItemType[]) {
  return data.map((element) => {
    const duration = 5 * element.images.length
    return {
      name: element.title,
      description: element.description,
      href: element.href,
      className: "col-span-6 md:col-span-3 lg:col-span-1",
      background: (
        <Marquee
          pauseOnHover
          style={{ "--duration": `${duration}s` } as React.CSSProperties}
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
      cta: "Browse ",
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
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24">
      {/*-- Hero --*/}
      <div className="min-h-[calc(100dvh-133px)] flex">
        <div className="container mx-auto flex flex-col items-center gap-8 lg:flex-row sm:py-16">
          {/* Text and Button Section */}
          <div className="relative flex w-full items-center md:flex-1 ">
            <div className="text-center lg:text-left mx-auto">
              <h1 className="text-xl leading-snug font-bold tracking-tight sm:text-3xl lg:text-4xl ">
                We are here to fulfill your Artistic Needs
              </h1>
              <div className="mt-4">
                <Button className="w-fit cursor-pointer px-4">
                  See More
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </div>
          </div>
          {/* Marquee3D Section (Stacks below on small screens) */}
          <div className="w-full md:flex-1 mx-auto">
            <Marquee3D />
          </div>
        </div>
      </div>

      {/*-- Offered Services --*/}
      <div className=" mx-auto mt-8 sm:mt-12 lg:mt-16 mb-8 border-y">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="mb-8 sm:mb-12 flex flex-col justify-center">
            <h2 className="mt-6 sm:mt-8 mb-2 text-xl sm:text-2xl font-bold">{category}</h2>
            {/* Display the category description */}
            <p className="text-muted-foreground mb-4 sm:mb-6 text-sm sm:text-base">{categoryDescriptions[category]}</p>
            <BentoGrid className="grid-cols-3">
              {bentoData(items).map((feature, featureIdx) => (
                <BentoCard key={featureIdx} {...feature} />
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
      <div className="my-8">
        <div className="relative w-full overflow-hidden rounded-lg">
          <Image
            src="/assets/branding/bg.jpg"
            alt="Background"
            width={1920}
            height={720}
            className="brightness-50 w-full h-auto"
          />
        </div>
      </div>
    </div>
  )
}
