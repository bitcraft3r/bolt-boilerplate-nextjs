"use client";

import { Authenticated, Unauthenticated } from "convex/react";

import { Heading } from "./_home/heading";
import { Hero } from "./_home/hero";
import { App } from "./(crud)/app";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start text-center gap-y-8 flex-1">
      <Unauthenticated>
        <Heading />
        <Hero />
      </Unauthenticated>
      <Authenticated>
        <App />
      </Authenticated>
    </div>
  );
}
