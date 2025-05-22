'use client'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/shadcn/ui/accordion'
import { Card } from '@/shadcn/ui/card'
import { Skeleton } from '@/shadcn/ui/skeleton'
import { Video } from './video'
import { useState } from 'react'
import { PhoneCallIcon, MailIcon, FacebookIcon } from 'lucide-react'

export default function AboutPage() {
    const [isLoading, setIsLoading] = useState(true)

    // Function to handle iframe load
    const handleIframeLoad = () => {
        setIsLoading(false)
    }

    return (
        <div className="  mx-auto flex h-auto max-w-6xl flex-col gap-6 p-6 md:flex-row">
            <Video
                posterHref="/assets/branding/store_front_1.jpg"
                videoHref="/assets/branding/promotion_vid.mp4"
                description="Best moments should have best highlights! ✨ Here at Avengerz Printing Services, we want your events, business, or memories to shine with artistic needs. 🎉 Book now with our listed services. 🙌"
            />

            {/* Right collapsible content */}
            <div className="md:w-2/3">
                <Card className="p-4">
                    <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="When was established">
                            <AccordionTrigger className="text-lg font-semibold">
                                When was Avengerz Printing Services established?
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    Avengerz Printing Services became official
                                    business recently (February, 2025). However,
                                    we have been in this industry for more than
                                    20 years and to expand with new great skills
                                    to serve more is the greatest satisfaction
                                    and brings joy to our years of service.
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="What services we offer">
                            <AccordionTrigger className="text-lg font-semibold">
                                What services we offer?
                            </AccordionTrigger>
                            <AccordionContent>
                                <p>
                                    We offer primarily offer Taurpaulin
                                    Printing, Styro Sign (e.g. Birthday,
                                    Nuptial, Christening, Backdraft, etc.),
                                    T-shirt Printing, Silkscreen or
                                    Photographic, DTF, Panaflex, and
                                    Invitations. You can you also make custom
                                    requests for us to talk about to make your
                                    imagination come true!
                                </p>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="Where are we located?">
                            <AccordionTrigger className="text-lg font-semibold">
                                Where do we operate and located?
                            </AccordionTrigger>
                            <AccordionContent>
                                <p className="mb-8">
                                    We are located at Stall #13 of Justo Lukban
                                    St, Daet, 4600 Camarines Norte, Philippines.
                                    You can also visit us personally to avail
                                    our services.
                                </p>
                                <div>
                                    <div className="relative h-[400px]">
                                        {/* Skeleton Loader */}
                                        {isLoading && (
                                            <div className="absolute top-0 left-0 h-full w-full">
                                                <Skeleton className="h-full w-full" />
                                            </div>
                                        )}
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d483.67167965467877!2d122.95453486927532!3d14.114122655417287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3398afe5acf5541b%3A0x29957afd4b606882!2sTiangge%20202%20Space%20Rental!5e0!3m2!1sen!2sph!4v1743572563824!5m2!1sen!2sph"
                                            width="100%"
                                            height="100%"
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            onLoad={handleIframeLoad} // This triggers when iframe finishes loading
                                            className="rounded-sm"
                                        ></iframe>
                                    </div>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="Contact Information">
                            <AccordionTrigger className="text-lg font-semibold">
                                Contact Information
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="flex flex-col gap-4">
                                    <p className="flex items-center gap-4">
                                        <PhoneCallIcon size={16} />
                                        +63 963-393-4468 (TNT)
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <PhoneCallIcon size={16} />
                                        +63 952-563-9446 (TM)
                                    </p>

                                    <p className="flex items-center gap-4">
                                        <MailIcon size={16} />
                                        avengerzprint2025@gmail.com
                                    </p>
                                    <p className="flex items-center gap-4">
                                        <FacebookIcon size={16} />
                                        <a
                                            href="https://www.facebook.com/profile.php?id=61571503116965"
                                            className="hover:bg-accent underline"
                                        >
                                            Avengerz Printing Services
                                        </a>
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </Card>
            </div>
        </div>
    )
}
