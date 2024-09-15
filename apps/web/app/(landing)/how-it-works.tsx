import number1 from "@/assets/1.png";
import number2 from "@/assets/2.png";
import number3 from "@/assets/3.png";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
    ArrowRightIcon
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import {
    BusinessSvg,
    FarmingSvg,
    OnlineGroceriesSvg,
    OnTheWaySvg,
    TeamUpSvg,
} from "./svgs";

const CurvedArrow = ({
  width = 200,
  height = 100,
  color = "#0B3D2E",
  strokeWidth = 2,
  className = "",
}) => {
  // Calculate angle for the arrowhead to align with the curve
  const arrowHeadAngle = Math.atan2(height / 4, width / 2) * (180 / Math.PI);

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d={`
             M 10 ${height / 2} 
             Q ${width / 2} ${height / 4}, ${width - 30} ${height / 2}
             `}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      <polygon
        points={`
             0,-5
             10,0
             0,5
           `}
        fill={color}
        transform={`
             translate(${width - 30}, ${height / 2}) 
             rotate(${arrowHeadAngle})
           `}
      />
    </svg>
  );
};

export function HowItWorks() {
  const steps = [
    {
      icon: number1,
      title: "Sourcing from Local Farmers",
      description:
        "We're building an extensive network of farmers to collect produce from, ensuring consistent quality and availability. Our goal is to support local agriculture while providing consumers with the freshest products.",
    },
    {
      icon: number2,
      title: "Distributing to Businesses/Vendors",
      description:
        "Through our platform, vendors receive fresh produce from farmers and manage their inventory efficiently using Ezisoko. This ensures that vendors are always stocked and ready to fulfill customer orders.",
    },
    {
      icon: number3,
      title: "Ordering and Delivery",
      description:
        "Using Ezifresh, customers browse and order groceries online. Once an order is placed, it’s matched with the nearest vendor, a delivery partner is assigned, and fresh groceries are delivered straight to their doorstep — fast and hassle-free.",
    },
  ];

  const row1Actions = [
    {
      title: "Join as a Farmer",
      description:
        "Farmers are at the heart of our business. Become a part of our network of farmers and let us help you become more profitable and sustainable",
      icon: FarmingSvg,
      href: "#",
      label: "Register now",
    },
    {
      title: "Partner with Us",
      description:
        "Interested in partnering with us? We're always eager to work with businesses that share our vision. Let's connect and explore opportunities.",
      icon: TeamUpSvg,
      href: "#",
      label: "Contact Us",
    },
  ];

  const row2Actions = [
    {
      title: "Become a Rider",
      description:
        "Join our team of delivery partners and earn money by delivering groceries to customers in your area.",
      icon: OnTheWaySvg,
      href: "#",
      label: "Start Earning",
    },
    {
      title: "Become a Vendor",
      description:
        "Grow your business via an online platform that connects you with customers and delivery partners.",
      icon: BusinessSvg,
      href: "#",
      label: "Sign Up for Ezisoko",
    },
    {
      title: "Order Groceries",
      description:
        "Browse and order fresh groceries online, and have them delivered straight to your doorstep.",
      icon: OnlineGroceriesSvg,
      href: "#",
      label: "Download Ezifresh",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl space-y-12 p-4 py-20 sm:py-32">
      <h3 className="text-center text-lg uppercase">How It Works</h3>

      <h3 className="text-center font-signika text-3xl sm:text-5xl font-bold">
        From Farm to Doorstep...
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 py-28">
        {steps.map((step, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center space-y-4"
          >
            <Image
              alt="img"
              src={step.icon}
              width={60}
              height={60}
              className="mb-8"
            />
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-center text-lg">{step.description}</p>

            {index < steps.length - 1 ? (
              <CurvedArrow className="hidden sm:flex sm:absolute left-[80%] top-[-8%]" />
            ) : null}
          </div>
        ))}
      </div>

      <section className="!mt-12 grid gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {row1Actions.map((action, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col space-y-4 rounded-sm p-8",
                index === 0 ? "sm:rounded-tl-[2.5rem]" : "sm:rounded-tr-[2.5rem]",
              )}
            >
              <div className="rounded-md p-4 bg-dotted-spacing-4 bg-dotted-orange-500/40">
                {<action.icon className="mx-auto h-40 w-40" />}
              </div>
              <h3 className="text-xl font-semibold">{action.title}</h3>
              <p className="text-lg">{action.description}</p>
              <div className="group inline-flex w-fit items-center gap-2">
                <Link
                  href={action.href}
                  className="text-lg font-medium text-orange-500"
                >
                  {action.label}
                </Link>
                <ArrowRightIcon className="text-orange-500 transition-all group-hover:translate-x-2" />
              </div>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {row2Actions.map((action, index) => (
            <Card
              key={index}
              className={cn(
                "flex flex-col space-y-4 rounded-sm p-8",
                index === 0 && "sm:rounded-bl-[2.5rem]",
                index === 2 && "sm:rounded-br-[2.5rem]",
              )}
            >
              <div className="rounded-md p-4 bg-dotted-spacing-4 bg-dotted-orange-500/40">
                {<action.icon className="mx-auto h-40 w-40" />}
              </div>
              <h3 className="text-xl font-semibold">{action.title}</h3>
              <p className="text-lg">{action.description}</p>
              <div className="group inline-flex w-fit items-center gap-2">
                <Link
                  href={action.href}
                  className="text-lg font-medium text-orange-500"
                >
                  {action.label}
                </Link>
                <ArrowRightIcon className="text-orange-500 transition-all group-hover:translate-x-2" />
              </div>
            </Card>
          ))}
        </div>
      </section>
    </section>
  );
}
