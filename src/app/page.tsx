import React from "react";
import { cn } from "@/lib/utils";
import { Spotlight } from "../components/ui/spotlight";
import { Music2, Sparkles, Heart } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-black text-white">
      <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-black/[0.96] antialiased bg-grid-white/[0.02]">
        <Spotlight
          className="-top-40 right-0 md:right-60 md:-top-20"
          fill="white"
        />
        <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center px-4">
          <div className="animate-fade-in">
            <div className="mb-6 flex items-center justify-center space-x-2">
              <Music2 className="h-12 w-12 text-purple-400" />
              <Sparkles className="h-8 w-8 text-purple-400" />
            </div>
            <h1 className="bg-gradient-to-b from-purple-50 to-purple-400 bg-clip-text py-4 text-center text-4xl font-bold text-transparent md:text-7xl">
              Music that matches <br /> your mood
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-center text-base text-neutral-300">
              Discover personalized playlists that evolve with your emotions.
              Our AI-powered recommendations understand your vibe and create the
              perfect soundtrack for every moment.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button className="group relative flex w-48 items-center justify-center overflow-hidden rounded-full bg-purple-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-400">
                Start Listening
                <Heart className="ml-2 h-4 w-4" />
              </button>
              <button className="w-48 rounded-full border border-purple-500/30 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-purple-500/10">
                How it Works
              </button>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-neutral-300">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">50M+</div>
                <div className="text-sm">Songs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">Spotify</div>
                <div className="text-sm">Integration</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">25+</div>
                <div className="text-sm">Mood Categories</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </main>
  );
}