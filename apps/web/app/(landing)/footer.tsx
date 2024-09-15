import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

import { GridPattern } from "./grid-pattern";

export function FAQ() {
  const faq = [
    {
      title: "What is Ezifarmer ?",
      body: "Ezifarmer is a platform with two main products: Ezifresh for grocery delivery and Ezisoko for vendor order management.",
    },
    {
      title: "How does Ezifresh work ?",
      body: "Ezifresh lets you order groceries online for delivery. You can choose between express or scheduled delivery options.",
    },
    {
      title: "What is Ezisoko ?",
      body: "Ezisoko works in conjuction with Ezifresh to fulfill orders. When you place an order, the corresponding vendor receives it through Ezisoko.",
    },
    {
      title: "How do I become a vendor ?",
      body: "To kickstart your vendor journey, send us an email at business@ezifarmer.com with the subject line 'Vendor Registration' and your details.",
    },
    {
      title: "Can I use Ezifarmer in my area?",
      body: "We are growing rapidly and expanding our services to new areas. If you want to see us in your area, let us know!",
    },
    {
      title: "What fees are associated with Ezisoko?",
      body: "We do not charge vendors to list on Ezisoko if they are supplied by us from produce sourced from farmers.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl p-4 pb-20 md:pb-40">
      <h3 className="mb-4 text-3xl">Frequently asked questions </h3>
      <p className="text-lg text-muted-foreground">
        Can’t find the answer you’re looking for?{" "}
        <a className="underline" href="mailto:hello@ezifarmer.com">
          Reach out to us
        </a>
      </p>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {faq.map((item, idx) => (
          <div key={idx} className="space-y-4">
            <p className="text-lg font-medium">{item.title}</p>
            <p className="leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <div className="p-2">
      <footer className="relative overflow-hidden rounded-3xl bg-black p-8 sm:p-20 text-gray-300">
        <div className="relative z-[2] mx-auto w-fit space-y-6 text-center">
          <span className="text-xs text-green-400">CONTACT US</span>
          <h5 className="font-signika text-4xl font-semibold leading-snug text-white">
            Need to get in touch ?
          </h5>
          <p className="max-w-md text-lg">
            Feel free to reach out to us for any inquiries or support. Our team
            is here to help.
          </p>

          <Link
            href="mailto:hello@ezifarmer.com"
            className={cn(buttonVariants(), "rounded-full")}
          >
            Contact Us
          </Link>
        </div>

        <section className="relative z-[2] grid grid-cols-12 gap-8 pt-20">
          <div className="col-span-12 sm:col-span-4 space-y-4">
            <Image
              src="https://assets.ezifarmer.com/ezifarmer.png"
              alt="Ezifarmer"
              width={180}
              height={36}
            />
          </div>
          <div className="col-span-12 sm:col-span-8 grid grid-cols-3 gap-8">
            <div className="flex flex-col space-y-4">
              <h6 className="text-lg font-medium text-white">Company</h6>
              <Link href="/about">About Us</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/blog">Privacy Policy</Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h6 className="text-lg font-medium text-white">Product</h6>
              <Link href="/products">Ezifarmer</Link>
              <Link href="/pricing">Ezifresh</Link>
              <Link href="/features">Ezisoko</Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h6 className="text-lg font-medium text-white">Connect</h6>
              <Link href="/contact">X</Link>
              <Link href="/faq">Facebook</Link>
              <Link href="/terms">LinkedIn</Link>
            </div>
          </div>
        </section>

        <p className="-mb-5 mt-14">
          <small className="text-gray-300">
            &copy; 2021 EZIFARMER TECHNOLOGIES LTD. All rights reserved.
          </small>
        </p>

        <div className="text-transparent sm:text-gray-200/10">
          <GridPattern x="80%" y="80%" patternTransform="translate(10 80)" />
        </div>
      </footer>
    </div>
  );
}
