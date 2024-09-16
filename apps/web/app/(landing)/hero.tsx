import { Button } from "@/components/ui/button";
import Image from "next/image";

import { GridPattern } from "./grid-pattern";

export function Hero() {
  return (
    <div className="p-2">
      <section className="relative overflow-hidden rounded-3xl bg-black py-8 text-gray-300">
        <header className="relative z-[2] mx-auto flex max-w-7xl items-center gap-16 p-4 py-6">
          <Image
            src="https://assets.ezifarmer.com/ezifarmer.png"
            alt="Ezifarmer"
            width={180}
            height={36}
          />
          <nav className="mt-2 hidden items-end gap-12 text-lg sm:flex">
            <span>For Farmers</span>
            <span>For Vendors</span>
            <span>For Consumers</span>
          </nav>
        </header>
        <main className="relative z-[2] mx-auto max-w-7xl px-4 py-8">
          <div className="max-w-4xl space-y-8 py-16 sm:py-20">
            <h1 className="font-signika text-5xl font-bold text-gray-100 sm:text-8xl">
              Connecting farmers, vendors & consumers
            </h1>
            <p className="max-w-3xl text-sm !leading-[1.65] sm:text-xl">
              Fresh groceries at your fingertips. With Ezifresh, order locally
              sourced produce delivered straight to your door, hassle-free.
              Behind the scenes, vendors use Ezisoko to fulfill orders, ensuring
              fast, reliable delivery. Together, we connect farmers, vendors,
              and consumers in a seamless supply chain.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="group rounded-3xl">
                Visit Ezisoko{" "}
              </Button>
              <Button
                size="lg"
                className="group rounded-3xl bg-white text-black hover:bg-white/70"
              >
                Visit Ezifresh{" "}
              </Button>
            </div>
          </div>
        </main>
        <div className="text-transparent sm:text-gray-200/15">
          <GridPattern x="80%" y="80%" patternTransform="translate(10 80)" />
        </div>
        {/* <div className="absolute left-0 top-0 z-[1] h-[85%] w-full bg-gradient-to-r from-black from-5% to-transparent" /> */}
        {/* <div className="absolute bottom-0 right-0 z-[1] h-72 w-full bg-gradient-to-t from-black to-transparent"></div> */}
      </section>
    </div>
  );
}
