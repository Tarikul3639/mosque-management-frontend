"use client"

import Image from "next/image"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useRef, useState } from "react"

const SURAH = {
    nameBn: "সূরা আল-ফাতিহা",
    nameAr: "سُورَةُ الْفَاتِحَةِ",
    meaning: "উদ্বোধন",
    verses: 7,
    type: "মাক্কী",
    reciter: "মিশারি রাশিদ আল-আফাসি",
    audio: "/audio/surah-fatiha.mp3",
    image: "/images/mosque-hero.jpg",
}

const BN = "০১২৩৪৫৬৭৮৯"

function toBn(value: string | number) {
    return String(value).replace(/\d/g, (d) => BN[Number(d)])
}

function format(time: number) {
    if (isNaN(time)) return "০০:০০"
    const m = Math.floor(time / 60)
    const s = Math.floor(time % 60)
    return toBn(`${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`)
}

export function SurahFatihaPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)

    const [playing, setPlaying] = useState(false)
    const [muted, setMuted] = useState(false)
    const [current, setCurrent] = useState(0)
    const [duration, setDuration] = useState(0)

    const progress = duration ? (current / duration) * 100 : 0

    function togglePlay() {
        if (!audioRef.current) return
        if (playing) audioRef.current.pause()
        else void audioRef.current.play()
        setPlaying(!playing)
    }

    function toggleMute() {
        if (!audioRef.current) return
        audioRef.current.muted = !muted
        setMuted(!muted)
    }

    return (
        <section className="bg-muted px-3 py-12 sm:px-6 sm:py-16 md:py-20 lg:px-8">
            <div className="mx-auto max-w-7xl">
                {/* External Center-Aligned Header */}
                <div className="mb-6 text-center">
                    <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl dark:text-slate-100">
                        কুরআন তিলাওয়াত ও শ্রবণ
                    </h2>
                    <p className="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">
                        প্রতিদিন অন্তত একবার সূরা আল-ফাতিহা তিলাওয়াত শুনুন এবং এর মর্মার্থ
                        উপলব্ধি করুন
                    </p>
                </div>

                <audio
                    ref={audioRef}
                    src={SURAH.audio}
                    preload="metadata"
                    onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
                    onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
                    onEnded={() => setPlaying(false)}
                />

                <div className="overflow-hidden rounded-2xl shadow-xl">
                    {/* Background */}
                    <div className="relative">
                        <Image
                            src={SURAH.image}
                            alt={SURAH.nameBn}
                            fill
                            className="object-cover"
                        />

                        {/* <div className="absolute inset-0 bg-black/55" /> */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-black/20" />

                        {/* Content — desktop: text left + player right */}
                        <div className="relative grid gap-4 p-4 sm:p-6 md:grid-cols-[1fr_300px] md:items-center md:gap-6 md:p-7 lg:grid-cols-[1fr_560px]">
                            {/* LEFT: Info */}
                            <div>
                                <span className="inline-flex rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-2.5 py-0.5 text-[10px] font-medium text-primary-foreground backdrop-blur sm:text-xs">
                                    কুরআন তিলাওয়াত
                                </span>

                                <h2
                                    dir="rtl"
                                    className="mt-2 text-xl font-bold text-primary-foreground sm:text-2xl md:text-3xl"
                                    style={{ fontFamily: "Amiri, 'Scheherazade New', serif" }}
                                >
                                    {SURAH.nameAr}
                                </h2>

                                <h3 className="mt-0.5 text-base font-bold text-primary-foreground sm:text-lg md:text-xl">
                                    {SURAH.nameBn}
                                </h3>

                                <p className="mt-1.5 line-clamp-2 hidden text-xs leading-5 text-primary-foreground/80 sm:block">
                                    প্রতিদিন অন্তত একবার সূরা আল-ফাতিহা তিলাওয়াত করুন এবং এর অর্থ
                                    উপলব্ধি করার চেষ্টা করুন। এটি কুরআনের সবচেয়ে গুরুত্বপূর্ণ
                                    সূরা।
                                </p>

                                <div className="mt-2.5 flex flex-wrap gap-1.5">
                                    {[
                                        SURAH.type,
                                        `${toBn(SURAH.verses)} আয়াত`,
                                        SURAH.reciter,
                                    ].map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full bg-primary-foreground/10 px-2 py-0.5 text-[10px] font-medium text-primary-foreground backdrop-blur"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* RIGHT: Glassmorphism Compact Player (Fully Responsive) */}
                            <div className="w-full rounded-2xl border border-white/20 bg-white/10 p-4 shadow-2xl backdrop-blur-md sm:rounded-3xl sm:p-5 lg:rounded-l-3xl lg:rounded-r-none lg:border-r-0 lg:pr-6 dark:border-white/10 dark:bg-black/20">
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                    {/* Top/Left Row in Mobile: Play + Surah Info */}
                                    <div className="flex items-center gap-3 sm:contents">
                                        {/* Play Button */}
                                        <button
                                            onClick={togglePlay}
                                            aria-label={playing ? "বিরতি দিন" : "চালু করুন"}
                                            className="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-md transition-all hover:scale-105 hover:bg-white/30 active:scale-95 sm:size-13 md:size-14 dark:border-white/20 dark:bg-white/10"
                                        >
                                            {playing ? (
                                                <Pause
                                                    className="size-4 sm:size-5"
                                                    fill="currentColor"
                                                />
                                            ) : (
                                                <Play
                                                    className="ml-0.5 size-4 sm:size-5"
                                                    fill="currentColor"
                                                />
                                            )}
                                        </button>

                                        {/* Title & Reciter for Mobile View (Hidden on Tablet/Desktop) */}
                                        <div className="min-w-0 flex-1 sm:hidden">
                                            <h4 className="truncate text-xs font-bold text-white drop-shadow-xs">
                                                {SURAH.nameBn}
                                            </h4>
                                            <p className="truncate text-[10px] font-medium text-white/70">
                                                {SURAH.reciter}
                                            </p>
                                        </div>

                                        {/* Mute Button for Mobile View */}
                                        <button
                                            onClick={toggleMute}
                                            aria-label={muted ? "শব্দ চালু করুন" : "মিউট করুন"}
                                            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25 sm:hidden"
                                        >
                                            {muted ? (
                                                <VolumeX className="size-3.5" />
                                            ) : (
                                                <Volume2 className="size-3.5" />
                                            )}
                                        </button>
                                    </div>

                                    {/* Progress + Info */}
                                    <div className="min-w-0 flex-1">
                                        {/* Time Tracking */}
                                        <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-white/80 tabular-nums sm:mb-1">
                                            <span>{format(current)}</span>
                                            <span>{format(duration)}</span>
                                        </div>

                                        {/* Seekbar */}
                                        <input
                                            type="range"
                                            min={0}
                                            max={duration || 100}
                                            value={current}
                                            onChange={(e) => {
                                                const value = Number(e.target.value)
                                                if (!audioRef.current) return
                                                audioRef.current.currentTime = value
                                                setCurrent(value)
                                            }}
                                            className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-emerald-400"
                                            style={{
                                                background: `linear-gradient(to right, #10b981 ${progress}%, rgba(255, 255, 255, 0.25) ${progress}%)`,
                                            }}
                                        />

                                        {/* Desktop/Tablet Info & Mute Bar */}
                                        <div className="mt-2 hidden items-center justify-between gap-2 sm:flex">
                                            <div className="min-w-0">
                                                <h4 className="truncate text-xs font-bold text-white drop-shadow-xs">
                                                    {SURAH.nameBn}
                                                </h4>
                                                <p className="truncate text-[10px] font-medium text-white/70">
                                                    {SURAH.reciter}
                                                </p>
                                            </div>

                                            <button
                                                onClick={toggleMute}
                                                aria-label={muted ? "শব্দ চালু করুন" : "মিউট করুন"}
                                                className="flex size-8 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
                                            >
                                                {muted ? (
                                                    <VolumeX className="size-3.5" />
                                                ) : (
                                                    <Volume2 className="size-3.5" />
                                                )}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
