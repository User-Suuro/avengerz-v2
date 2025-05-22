'use client'

import { cn } from '@/lib/utils'
import { Marquee } from '@/shadcn/magicui/marquee'
import Image from 'next/image'
import { groupedItems } from '@/lib/dummy'
import { useEffect, useState } from 'react'
import { Skeleton } from '@/shadcn/ui/skeleton'

const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)) // Get a random index
        ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
    }
    return array
}

const ReviewCard = ({ img }: { img: string }) => {
    const [isLoaded, setIsLoaded] = useState(false)
    const [hasError, setHasError] = useState(false)

    return (
        <div
            className={cn(
                'relative h-full w-36 cursor-pointer overflow-hidden rounded-xl border',
                'border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]',
                'dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]'
            )}
        >
            <div className="flex h-full w-full items-center justify-center">
                {(!isLoaded || hasError) && (
                    <Skeleton className="absolute inset-0 h-full w-full" />
                )}
                <Image
                    className={cn(
                        'h-auto w-full rounded-md object-cover',
                        !isLoaded && 'invisible',
                        hasError && 'hidden'
                    )}
                    width={128}
                    height={128}
                    alt="Image"
                    src={img || '/placeholder.svg'}
                    onLoad={() => setIsLoaded(true)}
                    onError={() => {
                        setHasError(true)
                        setIsLoaded(true) // Mark as loaded to prevent perpetual loading state
                    }}
                    unoptimized
                />
            </div>
        </div>
    )
}

export default function Marquee3D() {
    const [randomizedImages, setRandomizedImages] = useState<string[]>([])

    useEffect(() => {
        const allImages: string[] = []

        // Collect all images and shuffle them after component mounts
        Object.keys(groupedItems).forEach((key) => {
            groupedItems[key].forEach((item) => {
                // Loop through each image and combine it with the folder path
                item.images.forEach((image) => {
                    allImages.push(`/assets/services/${item.folder}/${image}`)
                })
            })
        })

        const shuffledImages = shuffleArray(allImages)

        setRandomizedImages(shuffledImages)
    }, [])

    const firstColumn = randomizedImages.slice(0, 3)
    const secondColumn = randomizedImages.slice(3, 6)
    const thirdColumn = randomizedImages.slice(6, 9)
    const fourthColumn = randomizedImages.slice(9, 12)

    return (
        <div className="relative flex h-96 w-full flex-row items-center justify-center gap-4 overflow-hidden [perspective:300px]">
            <div
                className="flex flex-row items-center gap-4"
                style={{
                    transform:
                        'translateX(-100px) translateY(0px) translateZ(-100px) rotateX(20deg) rotateY(-10deg) rotateZ(20deg)',
                }}
            >
                <Marquee pauseOnHover vertical className="[--duration:20s]">
                    {firstColumn.map((img, index) => (
                        <ReviewCard key={index} img={img} />
                    ))}
                </Marquee>
                <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:20s]"
                    vertical
                >
                    {secondColumn.map((img, index) => (
                        <ReviewCard key={index} img={img} />
                    ))}
                </Marquee>
                <Marquee
                    reverse
                    pauseOnHover
                    className="[--duration:20s]"
                    vertical
                >
                    {thirdColumn.map((img, index) => (
                        <ReviewCard key={index} img={img} />
                    ))}
                </Marquee>
                <Marquee pauseOnHover className="[--duration:20s]" vertical>
                    {fourthColumn.map((img, index) => (
                        <ReviewCard key={index} img={img} />
                    ))}
                </Marquee>
            </div>

            <div className="from-background pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b"></div>
            <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r"></div>
            <div className="from-background pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l"></div>
        </div>
    )
}
