"use client";

import { Authenticated, Unauthenticated } from "convex/react";

import { Heading } from "./_components/heading";
import { Hero } from "./_components/hero";
import { Footer } from "./_components/footer";
import { App } from "./_crud/app";

export default function Home() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1 px-6 pb-10">
        <Unauthenticated>
          <Heading />
          <Hero />
        </Unauthenticated>
        <Authenticated>
          <App />
        </Authenticated>
      </div>
      <Footer />
    </div>
  );
}
