'use client'

import { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX } from 'lucide-react'
import { Skeleton } from '@/shadcn/ui/skeleton'

interface VideoProps {
    posterHref: string
    videoHref: string
    description: string
}

export function Video({ posterHref, videoHref, description }: VideoProps) {
    const videoRef = useRef<HTMLVideoElement>(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isMuted, setIsMuted] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    // Simpler approach to handle loading state
    useEffect(() => {
        const videoElement = videoRef.current
        if (!videoElement) return

        // Force hide skeleton after a reasonable timeout (3 seconds)
        const timeoutId = setTimeout(() => {
            setIsLoading(false)
        }, 3000)

        // Function that will be called when video is ready
        const handleVideoReady = () => {
            setIsLoading(false)
            clearTimeout(timeoutId) // Clear timeout if video loads before timeout
        }

        // Try multiple events to ensure we catch when video is ready
        videoElement.addEventListener('loadeddata', handleVideoReady)
        videoElement.addEventListener('canplay', handleVideoReady)
        videoElement.addEventListener('playing', handleVideoReady)

        // Check if already loaded
        if (videoElement.readyState >= 2) {
            // HAVE_CURRENT_DATA or higher
            handleVideoReady()
        }

        return () => {
            clearTimeout(timeoutId)
            videoElement.removeEventListener('loadeddata', handleVideoReady)
            videoElement.removeEventListener('canplay', handleVideoReady)
            videoElement.removeEventListener('playing', handleVideoReady)
        }
    }, [])

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause()
            } else {
                videoRef.current.play().catch((error) => {
                    console.error('Error playing video:', error)
                })
            }
            setIsPlaying(!isPlaying)
        }
    }

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted
            setIsMuted(!isMuted)
        }
    }

    return (
        <div className="relative h-fit overflow-hidden rounded-xl bg-black md:w-1/3">
            {/* Video element - always visible */}
            <video
                ref={videoRef}
                className="h-auto w-full object-cover"
                loop
                poster={posterHref}
                preload="metadata"
            >
                <source src={videoHref} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Skeleton overlay only while loading */}
            {isLoading && (
                <div className="absolute inset-0 z-10">
                    <Skeleton className="h-full w-full" />
                </div>
            )}

            {/* Overlay with gradient */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Content overlay */}
            <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
                <p className="text-sm text-gray-300">{description}</p>
            </div>

            {/* Video controls */}
            <div className="absolute top-4 right-4 flex gap-2">
                <button
                    onClick={togglePlay}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                >
                    {isPlaying ? (
                        <Pause className="h-4 w-4" />
                    ) : (
                        <Play className="h-4 w-4" />
                    )}
                </button>
                <button
                    onClick={toggleMute}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition hover:bg-black/70"
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                >
                    {isMuted ? (
                        <VolumeX className="h-4 w-4" />
                    ) : (
                        <Volume2 className="h-4 w-4" />
                    )}
                </button>
            </div>
        </div>
    )
}
