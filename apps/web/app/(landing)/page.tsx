import { Metadata } from "next";

import { FAQ, Footer } from "./footer";
import { Hero } from "./hero";
import { HowItWorks } from "./how-it-works";
import { Products } from "./products";

export const metadata: Metadata = {
  title: "Ezifarmer - Re-inventing the food supply chain in Africa",
  description:
    "Ezifarmer is a platform that connects farmers, vendors, and consumers to ensure a seamless food supply chain from farm to table.",
};

export default function Home() {
  return (
    <div className="bg-muted">
      <Hero />
      <HowItWorks />
      <Mission />
      <Products />
      <FAQ />
      <Footer />
    </div>
  );
}

function Mission() {
  return (
    <section className="bg-gradient-to-b from-transparent from-40% to-orange-100">
      <div className="w-full border-b border-orange-200">
        <section className="mx-auto max-w-7xl p-8 pb-20">
          <div className="mx-auto flex max-w-2xl flex-col items-center space-y-8">
            <h4 className="text-3xl font-semibold uppercase">Our mission</h4>
            <p className="text-xl leading-relaxed">
              At <span className="font-medium text-primary">Ezifarmer</span>, we
              are on a mission to empower farmers, vendors, and consumers by
              streamlining the agricultural supply chain, providing seamless
              access to fresh produce through technology-driven solutions that
              promote sustainability, profitability, and convenience for all
              stakeholders.
            </p>
            <p className="text-xl leading-relaxed">
              Our core values of innovation, customer centricity, and continuous
              improvement drive every decision we make. We are committed to
              delivering cutting-edge solutions that simplify the food supply
              chain, ensuring farmers thrive, vendors grow, and consumers
              receive fresh groceries at their convenience.
            </p>
            <p className="text-xl leading-relaxed">
              By fostering a collaborative ecosystem that prioritizes efficiency
              and excellence, we strive to become a trusted partner that
              revolutionizes agriculture in Africa, creating a lasting, positive
              impact on local economies and the environment.
            </p>
          </div>
        </section>
      </div>
      <div className="mt-1 w-full border-b border-orange-200" />
      <div className="mt-2 w-full border-b border-orange-200" />
      <div className="mt-3 w-full border-b border-orange-200" />
      <div className="mt-5 w-full border-b border-orange-200" />
    </section>
  );
}
