import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  ShoppingBagIcon,
  SparklesIcon,
  TractorIcon,
  Trash2Icon,
} from "lucide-react";
import Image from "next/image";
import { GridPattern } from "./grid-pattern";

import number1 from "@/assets/1.png";
import number2 from "@/assets/2.png";
import number3 from "@/assets/3.png";
import { Card } from "@/components/ui/card";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ezifarmer - Re-inventing the food supply chain in Africa",
  description:
    "Ezifarmer is a platform that connects farmers, vendors, and consumers to ensure a seamless food supply chain from farm to table.",
};

function Hero() {
  return (
    <section className="bg-muted relative">
      <header className="z-[2] relative flex mx-auto max-w-7xl p-4 py-6 items-center gap-16">
        <Image
          src="https://assets.ezifarmer.com/ezifarmer.png"
          alt="Ezifarmer"
          width={180}
          height={36}
        />
        <nav className="hidden mt-2 sm:flex items-end gap-12 text-lg">
          <span>For Farmers</span>
          <span>For Vendors</span>
          <span>For Consumers</span>
        </nav>
      </header>

      <main className="py-8 z-[2] relative px-4 max-w-7xl mx-auto">
        <div className="space-y-8 py-16 sm:py-40 max-w-3xl">
          <h1 className="text-5xl sm:text-8xl font-bold font-signika  text-[#0B3D2E]">
            Re-inventing the food supply chain
          </h1>

          <p className="!leading-[1.85] text-sm sm:text-xl">
            Fresh groceries at your fingertips. With Ezifresh, order locally
            sourced produce delivered straight to your door, hassle-free. Behind
            the scenes, vendors use Ezisoko to fulfill orders, ensuring fast,
            reliable delivery. Together, we connect farmers, vendors, and
            consumers in a seamless supply chain.
          </p>

          <div className="flex gap-4">
            <Button size="lg" className="group">
              Visit Ezisoko{" "}
              <ChevronRightIcon className="group-hover:translate-x-2 transition-all" />
            </Button>

            <Button size="lg" className="group" variant="outline">
              Visit Ezifresh{" "}
              <ChevronRightIcon className="group-hover:translate-x-2 transition-all" />
            </Button>
          </div>
        </div>
      </main>

      <div className="sm:text-green-800/40 text-transparent">
        <GridPattern x="200%" />
      </div>
      <div className="absolute top-0 left-0 w-full h-[85%] bg-gradient-to-r from-muted from-10% to-transparent z-[1]" />
      <div className="absolute bottom-0 right-0 z-[1] h-72 w-full bg-gradient-to-t from-muted to-transparent"></div>
    </section>
  );
}

function HowItWorks() {
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

  const actions = [
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
      label: "Get the App",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl p-4 py-20 sm:py-32 space-y-12">
      <div className="grid grid-cols-3 gap-12 !mb-20">
        {actions.map((action, index) => (
          <Card
            key={index}
            className="flex flex-col p-8 items-center space-y-4"
          >
            <div className="p-4 bg-green-50 rounded-full">
              {<action.icon className="w-40 h-40" />}
            </div>
            <h3 className="text-xl font-semibold">{action.title}</h3>
            <p className="text-lg text-center">{action.description}</p>
            <div className="inline-flex items-center gap-2">
              <Link
                href={action.href}
                className="text-center text-lg text-orange-500 font-medium"
              >
                {action.label}
              </Link>
              <ArrowRightIcon className="text-orange-500" />
            </div>
          </Card>
        ))}
      </div>

      <h3 className="uppercase text-center text-lg">How It Works</h3>

      <h3 className="text-center text-5xl font-bold font-signika">
        From Farm to Doorstep...
      </h3>

      <div className="grid grid-cols-3 gap-8 py-28">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex relative flex-col items-center space-y-4"
          >
            <Image
              alt="img"
              src={step.icon}
              width={60}
              height={60}
              className="mb-8"
            />
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-lg text-center">{step.description}</p>

            {index < steps.length - 1 ? (
              <CurvedArrow className="absolute top-[-8%] left-[80%]" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

function OnlineGroceriesSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      width="769.92356"
      height="727.77804"
      viewBox="0 0 769.92356 727.77804"
      {...props}
    >
      <rect
        x="250.3669"
        y="723.94159"
        width="519.55666"
        height="2.24072"
        fill="#3f3d56"
      />
      <path
        d="M888.00011,428.99257a11.01956,11.01956,0,0,1-2.15469,16.2265l-53.77008,36.91677-23.677,15.78467a6.50932,6.50932,0,0,1-8.64865-1.29413h0a6.50932,6.50932,0,0,1,1.76937-9.75113l22.93281-13.31582L864.47515,435.442l-25.72926-27.63513,19.05871-14.294Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#a0616a"
      />
      <polygon
        points="546.52 690.482 533.367 690.482 525.555 581.847 558.908 580.894 546.52 690.482"
        fill="#a0616a"
      />
      <path
        d="M762.51106,811.85147c-3.5071,1.60062-6.44475-11.36747-9.403-8.4603-8.27476,8.13174-20.94589,9.90248-31.99089,6.35216l3.86555-.04321a5.17261,5.17261,0,0,1-3.26034-6.74068h0a5.17263,5.17263,0,0,1,3.58872-3.20194l8.8002-2.2,13.81756-24.29985,14.10577-.95294h0a33.70033,33.70033,0,0,1,6.23289,28.749C766.98747,806.27826,765.01135,810.71036,762.51106,811.85147Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#2f2e41"
      />
      <polygon
        points="634.096 690.482 620.943 690.482 613.131 581.847 647.437 575.177 634.096 690.482"
        fill="#a0616a"
      />
      <path
        d="M850.087,811.85147c-3.5071,1.60062-6.44476-11.36747-9.40305-8.4603-8.27475,8.13174-20.94589,9.90248-31.99089,6.35216l3.86555-.04321a5.17261,5.17261,0,0,1-3.26034-6.74068h0a5.17264,5.17264,0,0,1,3.58873-3.20194l8.80019-2.2,13.81757-24.29985,15.0587-1.90587.38035.622a38.82707,38.82707,0,0,1,4.1608,31.74873C853.85228,807.73507,852.14766,810.911,850.087,811.85147Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#2f2e41"
      />
      <path
        d="M864.04754,395.97018c-12.09554,1.68292-20.4694,8.307-23.8799,21.521l-22.23309-41.05a12.15492,12.15492,0,0,1,3.87324-15.43663h0a12.15493,12.15493,0,0,1,16.51068,2.41678Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#f7913e"
      />
      <path
        d="M887.34559,656.523C833.28768,680.4412,777.965,683.38434,721.53484,667.95823c20.60644-79.92158,44.93779-152.18824,44.788-211.55165l55.27025-4.76467,8.50989,13.49128A299.3077,299.3077,0,0,1,871.1746,569.89266Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#2f2e41"
      />
      <circle cx="581.77851" cy="218.77888" r="28.58806" fill="#a0616a" />
      <polygon
        points="613.225 269.284 577.967 271.19 572.249 239.743 600.837 234.979 613.225 269.284"
        fill="#a0616a"
      />
      <path
        d="M824.45186,456.40658l-38.62727,1.0881-19.50179,2.72364c-9.57274-31.62118-17.63171-63.16988,1.90587-89.57592L791.09912,347.772l34.30568-.95293.45443.25967a27.62567,27.62567,0,0,1,12.657,32.13956C830.003,406.88285,824.53468,433.007,824.45186,456.40658Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#f7913e"
      />
      <path
        d="M765.36987,545.02957l-2.39609,32.74648a7.29408,7.29408,0,0,1-6.78945,6.74565h0a7.29408,7.29408,0,0,1-7.77722-7.45156l.76287-32.04057,23.82338-90.52886.95294-55.27025,26.68219-.95293-1.90587,63.84667Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#a0616a"
      />
      <path
        d="M803.48728,403.0422c-11.31253-4.6001-21.8779-3.05952-31.44686,6.67055l1.31094-46.66577a12.15493,12.15493,0,0,1,11.08252-11.42232h0a12.15493,12.15493,0,0,1,13.08133,10.35965Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#f7913e"
      />
      <path
        d="M857.32813,432.10673h-87.67c20.45167-54.1569,27.04681-104.53868,0-147.705.46431-12.96516,17.09344-24.20477,30.00735-22.96305h0c15.25177,1.46651,35.74679,12.67435,38.60394,27.72772Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#2f2e41"
      />
      <path
        d="M577.92754,259.05823h-3.99878V149.51291A63.40186,63.40186,0,0,0,510.52671,86.111H278.44027a63.40186,63.40186,0,0,0-63.402,63.40193V750.48709A63.40186,63.40186,0,0,0,278.44027,813.889H510.52671a63.40186,63.40186,0,0,0,63.40205-63.40193V337.03445h3.99878Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#3f3d56"
      />
      <path
        d="M513.085,102.606h-30.295a22.49485,22.49485,0,0,1-20.82715,30.99055H329.00345A22.49483,22.49483,0,0,1,308.1763,102.606H279.88073a47.3478,47.3478,0,0,0-47.34786,47.34774V750.04623a47.34781,47.34781,0,0,0,47.34786,47.3478H513.085a47.34781,47.34781,0,0,0,47.34787-47.3478V149.95371A47.3478,47.3478,0,0,0,513.085,102.606Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#fff"
      />
      <rect x="58.44466" y="110.2337" width="246" height="211" fill="#e6e6e6" />
      <circle cx="131.44466" cy="347.2337" r="18" fill="#f7913e" />
      <polygon
        points="140.445 345.734 132.945 345.734 132.945 338.234 129.945 338.234 129.945 345.734 122.445 345.734 122.445 348.734 129.945 348.734 129.945 356.234 132.945 356.234 132.945 348.734 140.445 348.734 140.445 345.734"
        fill="#fff"
      />
      <circle cx="226.44466" cy="347.2337" r="18" fill="#f7913e" />
      <rect
        x="439.98288"
        y="424.34468"
        width="3"
        height="18"
        transform="translate(659.78934 -94.24918) rotate(90)"
        fill="#fff"
      />
      <path
        d="M405.6577,222.65953H386.2175a2.57738,2.57738,0,0,0-2.57738,2.57738v8.53288a2.57738,2.57738,0,0,0,2.57738,2.57738H389.439v12.78518h12.99715V236.34717h3.22152a2.57738,2.57738,0,0,0,2.57738-2.57738v-8.53288A2.57738,2.57738,0,0,0,405.6577,222.65953Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#f7913e"
      />
      <path
        d="M425.12915,300.75246a99.945,99.945,0,0,1-17.38745-59.25632,2.10788,2.10788,0,0,0-1.64531-2.10349v-3.687H385.56494v3.63579h-.2829a2.1067,2.1067,0,0,0-2.104,2.10944q.00009.07676.00578.15334,2.42627,33.82122-16.3857,60.66044a5.80592,5.80592,0,0,0-1.05076,3.51846l2.245,69.4446a6.01162,6.01162,0,0,0,5.96021,5.80216h46.439a6.01372,6.01372,0,0,0,5.9638-5.90449l.86514-67.425A12.16847,12.16847,0,0,0,425.12915,300.75246Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#3f3d56"
      />
      <path
        d="M401.60513,225.43986a5.5606,5.5606,0,1,1-11.1212,0"
        transform="translate(-215.03822 -86.11098)"
        opacity="0.2"
        style={{ isolation: "isolate" }}
      />
      <path
        d="M417.77775,323.81976h-5.62341a14.75938,14.75938,0,0,0-29.17437,0h-5.62378a4.15,4.15,0,0,0-4.10174,4.781l6.10828,39.70382H414.4373l7.41937-39.57005a4.15007,4.15007,0,0,0-4.07892-4.9148Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#f7913e"
      />
      <rect x="58.44466" y="407.2337" width="246" height="211" fill="#e6e6e6" />
      <circle cx="131.44466" cy="644.2337" r="18" fill="#f7913e" />
      <polygon
        points="140.445 642.734 132.945 642.734 132.945 635.234 129.945 635.234 129.945 642.734 122.445 642.734 122.445 645.734 129.945 645.734 129.945 653.234 132.945 653.234 132.945 645.734 140.445 645.734 140.445 642.734"
        fill="#fff"
      />
      <circle cx="226.44466" cy="644.2337" r="18" fill="#f7913e" />
      <rect
        x="439.98288"
        y="721.34468"
        width="3"
        height="18"
        transform="translate(956.78934 202.75082) rotate(90)"
        fill="#fff"
      />
      <path
        d="M444.91088,643.24243l.1358.0001a23.0403,23.0403,0,0,0,21.57285-14.45016A75.41617,75.41617,0,1,0,366.154,670.10246a22.84324,22.84324,0,0,0,25.37-4.7044A75.16747,75.16747,0,0,1,444.91088,643.24243Z"
        transform="translate(-215.03822 -86.11098)"
        fill="#fff"
      />
      <circle cx="191.13" cy="509.39493" r="24.906" fill="#f9a825" />
    </svg>
  );
}

function OnTheWaySvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 1"
      width="829"
      height="364.82907"
      viewBox="0 0 829 364.82907"
      {...props}
    >
      <path
        d="M432.12988,567.97449c-2.85009,22.33-13.33008,42.76-24.51025,62.44-.36963.67-.75,1.33-1.13965,2H290.27979c-2.3501-.61-4.66993-1.28-6.98-2a127.02725,127.02725,0,0,1-36.68994-18.05c-42.75-30.8-59.20019-89-51.77-141.15,4.62012-32.4,18.83985-65.48,46.52979-82.93,14.62012-9.23,33.3999-12.23,50.23-8.8.44043.08.88037.18,1.33008.27,14.48,3.26,27.37988,11.36,34.72021,24.41,13.19971,23.45,5.33985,52.5-1.1499,78.6-6.47021,26.1-9.98047,57.34,8.7998,76.59-6.20019-18.25-.08007-40.02,14.73-52.36,11.18994-9.31,26.77-12.8,40.98-9.91,1.35986.29,2.70019.62,4.02,1.02a44.59846,44.59846,0,0,1,9.16992,3.84C426.34961,514.31452,435.31982,542.80451,432.12988,567.97449Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f2f2f2"
      />
      <path
        d="M363.23,630.4145c3.21973.75,6.44971,1.41,9.69971,2H355.35986c-2.30029-.62-4.59033-1.28-6.85986-2q-7.48534-2.34-14.74023-5.37c-19.39991-8.14-37.27-20.36-50.79-36.62a103.37091,103.37091,0,0,1-16.02-26.17,118.85639,118.85639,0,0,1-8.19971-33.49c-2.4502-23.6.0498-47.85,4.71973-71.03a296.45051,296.45051,0,0,1,23.16015-69.47q1.905-3.97494,3.93994-7.9a1.54158,1.54158,0,0,1,1.02979-.88,1.77741,1.77741,0,0,1,1.33008.27,2.1062,2.1062,0,0,1,.83008,2.78,293.03874,293.03874,0,0,0-24.58008,66.96c-5.31983,22.67-8.33985,46.39-7.31006,69.7.98,21.78,6.67041,43.2,19.58008,61.00994,11.79,16.26,28.06982,29.08,46.08008,37.81A169.131,169.131,0,0,0,363.23,630.4145Z"
        transform="translate(-185.5 -267.58547)"
        fill="#fff"
      />
      <path
        d="M401.79,632.4145h-5.18018c-.58007-.66-1.14013-1.33-1.68994-2a110.41123,110.41123,0,0,1-23.24023-49.66,107.73445,107.73445,0,0,1,9.29-67.05,110.2407,110.2407,0,0,1,10.04-16.62c1.35986.29,2.70019.62,4.02,1.02a106.05621,106.05621,0,0,0-19.77,45.34A105.09492,105.09492,0,0,0,400,630.4145C400.57959,631.08448,401.17969,631.75452,401.79,632.4145Z"
        transform="translate(-185.5 -267.58547)"
        fill="#fff"
      />
      <path
        d="M868.42938,615.40764c.75219,5.8933,3.51805,11.28515,6.4687,16.47906.09755.17682.19794.351.30078.52783h30.66735c.62024-.161,1.23248-.33782,1.84215-.52783a33.52491,33.52491,0,0,0,9.68315-4.76373c11.2825-8.12868,15.624-23.48872,13.663-37.25207-1.21933-8.55094-4.97218-17.28137-12.28006-21.88674a18.43729,18.43729,0,0,0-13.25661-2.32248c-.11624.02112-.23235.0475-.351.07126a13.67963,13.67963,0,0,0-9.1633,6.44224c-3.48365,6.18889-1.40929,13.85571.30348,20.744,1.70761,6.88828,2.634,15.13308-2.32243,20.21351a12.64393,12.64393,0,0,0-14.70288-16.4342c-.35889.07655-.71263.16363-1.061.26921a11.77068,11.77068,0,0,0-2.42011,1.01345C869.9549,601.24579,867.58749,608.76482,868.42938,615.40764Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f2f2f2"
      />
      <path
        d="M886.61332,631.8867c-.84974.19794-1.70219.37211-2.55993.52783h4.637c.60709-.16362,1.21147-.33782,1.81044-.52783q1.97553-.61758,3.89022-1.41724a34.90012,34.90012,0,0,0,13.40442-9.66469,27.28163,27.28163,0,0,0,4.228-6.90674,31.36842,31.36842,0,0,0,2.164-8.83864,62.85793,62.85793,0,0,0-1.24562-18.7461,78.23849,78.23849,0,0,0-6.11239-18.33442q-.50277-1.04906-1.03982-2.08494a.40684.40684,0,0,0-.27178-.23225.46908.46908,0,0,0-.351.07126.55587.55587,0,0,0-.21908.73369,77.33813,77.33813,0,0,1,6.48714,17.672,68.02194,68.02194,0,0,1,1.92926,18.39511,29.3506,29.3506,0,0,1-5.16755,16.10164,32.4858,32.4858,0,0,1-12.16137,9.97875A44.6366,44.6366,0,0,1,886.61332,631.8867Z"
        transform="translate(-185.5 -267.58547)"
        fill="#fff"
      />
      <path
        d="M876.43662,632.41453h1.36714c.15309-.17418.3009-.351.446-.52783a29.13962,29.13962,0,0,0,6.13352-13.10618,28.43312,28.43312,0,0,0-2.45181-17.69573,29.095,29.095,0,0,0-2.64975-4.38633c-.35889.07655-.71263.16363-1.061.26921a27.99,27.99,0,0,1,5.21767,11.96606,27.73652,27.73652,0,0,1-6.5294,22.953C876.75608,632.06352,876.5977,632.24035,876.43662,632.41453Z"
        transform="translate(-185.5 -267.58547)"
        fill="#fff"
      />
      <path
        d="M592.00977,480.0937h-95.981L495.01123,450.583a8.85956,8.85956,0,0,1,9.93091-9.09863l55.85449,6.83936h.00684a31.29061,31.29061,0,0,1,31.2063,31.27Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f7913e"
      />
      <path
        d="M549.23082,375.4145H482.28871a6.77712,6.77712,0,0,0-6.77894,6.77894v66.94211a6.77713,6.77713,0,0,0,6.77894,6.77895h66.94211a6.77714,6.77714,0,0,0,6.779-6.77895V382.19344A6.77713,6.77713,0,0,0,549.23082,375.4145Z"
        transform="translate(-185.5 -267.58547)"
        fill="#ccc"
      />
      <path
        d="M534.15445,425.47126l-31.60628,6.15492a7.2107,7.2107,0,0,1-8.44659-5.69307L491.672,413.45694a7.21069,7.21069,0,0,1,5.69307-8.44658l31.60628-6.15491a7.21069,7.21069,0,0,1,8.44659,5.69307l2.42957,12.47616A7.21068,7.21068,0,0,1,534.15445,425.47126Z"
        transform="translate(-185.5 -267.58547)"
        fill="#3f3d56"
      />
      <path
        d="M527.831,410.73188l-24.12058,4.69717a1.69474,1.69474,0,0,1-.64789-3.327l24.12059-4.69717a1.69474,1.69474,0,0,1,.64788,3.327Z"
        transform="translate(-185.5 -267.58547)"
        fill="#fff"
      />
      <path
        d="M523.14259,417.68789l-12.47616,2.42957a1.69474,1.69474,0,0,1-.64789-3.327l12.47617-2.42957a1.69474,1.69474,0,1,1,.64788,3.327Z"
        transform="translate(-185.5 -267.58547)"
        fill="#fff"
      />
      <path
        d="M556.00977,382.19344v8.89737h-80.5v-8.89737a6.77712,6.77712,0,0,1,6.77894-6.77894h66.94211A6.77713,6.77713,0,0,1,556.00977,382.19344Z"
        transform="translate(-185.5 -267.58547)"
        fill="#b3b3b3"
      />
      <path
        d="M716.76052,393.87705a10.74267,10.74267,0,0,0-15.19331-6.3648l-92.09655-33.04273-4.05633,23.00726,91.8034,25.2454a10.80091,10.80091,0,0,0,19.54279-8.84513Z"
        transform="translate(-185.5 -267.58547)"
        fill="#ffb8b8"
      />
      <path
        d="M716.76052,393.87705a10.74267,10.74267,0,0,0-15.19331-6.3648l-92.09655-33.04273-4.05633,23.00726,91.8034,25.2454a10.80091,10.80091,0,0,0,19.54279-8.84513Z"
        transform="translate(-185.5 -267.58547)"
        opacity="0.2"
      />
      <path
        d="M625.81732,358.66188l-8.69674,22.72023a4.81688,4.81688,0,0,1-6.86086,2.47581l-21.13624-11.89627a13.37737,13.37737,0,0,1,9.63746-24.95856l23.6022,5.23464a4.81686,4.81686,0,0,1,3.45418,6.42415Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f7913e"
      />
      <path
        d="M724.00977,414.9145l-33,15,4.33259,16.311a253.73547,253.73547,0,0,1,6.53976,96.64985v0l24.12766,5.03915,20-51-7-58Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f7913e"
      />
      <path
        d="M788.75977,490.4145c-21.68213,0-39.35157,15.762-40.209,35.5h80.418C828.11133,506.17646,810.44189,490.4145,788.75977,490.4145Z"
        transform="translate(-185.5 -267.58547)"
        fill="#3f3d56"
      />
      <path
        d="M771.88135,493.81605c-1.12842-89.09839-51.87158-80.90155-51.87158-80.90155s.94921,27.73333,1.40527,28.59582c32.33545,61.17957-21.03027,132.90381-88.96,119.70886q-1.92114-.37317-3.69141-.75714a34.5813,34.5813,0,0,1-27.16328-38.76284c6.69158-53.73562-26.59062-52.7847-26.59062-52.7847H526.34326l-25.27335-22.7459a7.3469,7.3469,0,0,0-11.80868,2.92095l-3.25146,8.825s-48,5-44,52h14.83984a29.96684,29.96684,0,0,0,.16016,4l110.75092-.90044c6.49187-.05278,12.22225,5.20768,12.249,11.69971a11.75308,11.75308,0,0,1-12.14443,11.79594l-17.85546-.59521c-5.5,24.5,8,41,22.875,51.375a83.1484,83.1484,0,0,0,47.61766,14.625h48.50734c63,0,74-53,74-53C776.00977,534.9145,771.88135,493.81605,771.88135,493.81605Z"
        transform="translate(-185.5 -267.58547)"
        fill="#3f3d56"
      />
      <circle cx="600.25977" cy="307.07903" r="56.25" fill="#3f3d56" />
      <circle cx="600.25977" cy="307.07903" r="13.78676" fill="#fff" />
      <circle cx="316.25977" cy="298.57903" r="64.75" fill="#3f3d56" />
      <circle cx="316.25977" cy="298.57903" r="15.8701" fill="#fff" />
      <path
        d="M691.10352,434.34663,679.23,402.09711a13.63843,13.63843,0,0,1,8.08691-17.51074l34.04-12.53125a23.99761,23.99761,0,0,1,30.812,14.22705,23.84491,23.84491,0,0,1,1.481,8.29248,24.1887,24.1887,0,0,1-8.98779,18.73,23.81344,23.81344,0,0,1-6.72022,3.78907Z"
        transform="translate(-185.5 -267.58547)"
        fill="#3f3d56"
      />
      <path
        d="M753.1499,394.57447a23.54938,23.54938,0,0,1-8.80029,18.34,29.98827,29.98827,0,0,1-19.69971-41.3,23.50519,23.50519,0,0,1,28.5,22.96Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f7913e"
      />
      <ellipse cx="265.00977" cy="231.82903" rx="14" ry="17" fill="#f7913e" />
      <polygon
        points="450.071 292.005 462.331 292.005 468.164 260.208 450.069 260.209 450.071 292.005"
        fill="#ffb8b8"
      />
      <path
        d="M632.44363,555.58794l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00146Z"
        transform="translate(-185.5 -267.58547)"
        fill="#2f2e41"
      />
      <path
        d="M649.80136,546.54q-.21423,0-.43018-.02051l-16.96655-1.23535a4.49992,4.49992,0,0,1-3.80932-6.0293l22.70654-51.01464a3.49812,3.49812,0,0,0-.19629-2.79883,3.45084,3.45084,0,0,0-2.21118-1.75977c-10.67725-2.791-38.072-10.22265-61.78638-18.918-10.15991-3.72558-16.55884-9.10937-19.0188-16.00195-3.24316-9.08691,1.55469-17.374,1.7605-17.72168l.16089-.27246,22.3147,2.02832,24.19116,2.05762,53.01343,28.42773a20.086,20.086,0,0,1,8.8186,25.78418L653.90756,543.873A4.49689,4.49689,0,0,1,649.80136,546.54Z"
        transform="translate(-185.5 -267.58547)"
        fill="#2f2e41"
      />
      <circle cx="410.70532" cy="39.7202" r="24.56103" fill="#ffb8b8" />
      <polygon
        points="443.071 295.005 455.331 295.005 461.164 263.208 443.069 263.209 443.071 295.005"
        fill="#ffb8b8"
      />
      <path
        d="M625.44363,558.58794l24.1438-.001h.001a15.38605,15.38605,0,0,1,15.38648,15.38623v.5l-39.53052.00146Z"
        transform="translate(-185.5 -267.58547)"
        fill="#2f2e41"
      />
      <path
        d="M642.80136,549.54q-.21423,0-.43018-.02051l-16.96655-1.23535a4.49992,4.49992,0,0,1-3.80932-6.0293l22.70654-51.01464a3.49812,3.49812,0,0,0-.19629-2.79883,3.45084,3.45084,0,0,0-2.21118-1.75977c-10.67725-2.791-38.072-10.22265-61.78638-18.918-10.15991-3.72558-16.55884-9.10937-19.0188-16.00195-3.24316-9.08691,1.55469-17.374,1.7605-17.72168l.16089-.27246,22.3147,2.02832,24.19116,2.05762,53.01343,28.42773a20.086,20.086,0,0,1,8.8186,25.78418L646.90756,546.873A4.49689,4.49689,0,0,1,642.80136,549.54Z"
        transform="translate(-185.5 -267.58547)"
        fill="#2f2e41"
      />
      <path
        d="M603.78012,345.79386l-26-9s-16.322,12.54-8.481,43.64856a77.01209,77.01209,0,0,1-3.40009,48.32025,49.7787,49.7787,0,0,1-2.61889,5.53119s29,35,56,9l-10.5-50.5S625.28012,359.29386,603.78012,345.79386Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f7913e"
      />
      <path
        d="M599.25474,332.702c-3.49562-5.23231-6.25435-12.48756-2.40565-17.46591,3.79907-4.91416,11.29215-4.19018,17.11054-6.36466,8.104-3.02867,12.80409-12.5493,11.33824-21.07564s-8.31031-15.59442-16.46405-18.48645-17.34839-1.95148-25.33312,1.37887c-9.82931,4.0997-18.26115,12.03028-21.79686,22.07625s-1.6456,22.10808,5.68929,29.82963c7.86381,8.27834,20.20556,10.48454,31.62276,10.35067"
        transform="translate(-185.5 -267.58547)"
        fill="#2f2e41"
      />
      <path
        d="M576.40785,288.06942c-4.40484,3.58587-11.12527,1.99318-15.8536-1.15387s-8.56507-7.62825-13.681-10.09566c-9.01922-4.34995-19.92379-1.45825-28.70171,3.36009s-16.55916,11.475-25.83124,15.25617-21.10393,3.96808-28.12484-3.17161a25.732,25.732,0,0,0,37.7101,30.37145c10.1594-6.18839,15.77105-19.1637,27.16592-22.57933,6.3055-1.89008,13.07632-.36777,19.44917,1.28106s13.01783,3.43041,19.44912,2.02674,12.447-7.18312,11.6288-13.71475Z"
        transform="translate(-185.5 -267.58547)"
        fill="#2f2e41"
      />
      <path
        d="M715.53838,392.87666a10.74265,10.74265,0,0,0-15.86252-4.44158L604.2061,367.00792l-1.18664,23.33194,94.21678,13.72558a10.80091,10.80091,0,0,0,18.30214-11.18878Z"
        transform="translate(-185.5 -267.58547)"
        fill="#ffb8b8"
      />
      <path
        d="M620.94513,369.15135l-5.827,23.61966a4.81688,4.81688,0,0,1-6.503,3.3034l-22.44252-9.19753a13.37737,13.37737,0,0,1,6.48437-25.957l24.06772,2.28255a4.81687,4.81687,0,0,1,4.22042,5.94888Z"
        transform="translate(-185.5 -267.58547)"
        fill="#f7913e"
      />
      <circle cx="519.00977" cy="136.82903" r="7" fill="#f7913e" />
      <path
        d="M1014.5,631.4145a1.00308,1.00308,0,0,1-1,1h-827a1,1,0,0,1,0-2h827A1.00308,1.00308,0,0,1,1014.5,631.4145Z"
        transform="translate(-185.5 -267.58547)"
        fill="#3f3d56"
      />
    </svg>
  );
}

function BusinessSvg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="315.89363"
      height="468.03704"
      viewBox="0 0 315.89363 468.03704"
      {...props}
    >
      <circle cx="227.82845" cy="63" r="63" fill="#ff6884" />
      <path
        d="M134.8868,456.49895L3.83357,451.96966,.00203,132.46868c-.09277-7.75488,2.99902-15.34863,8.4834-20.83301L144.60603,35.51506c10.65576-10.65479,27.42725-11.4248,39.01318-1.78662l82.60742,68.71826c6.73926,5.60596,10.54541,13.84863,10.44189,22.61427l-2.83838,240.28076,35.90381,49.86621,.07617,.10547,6.0835,52.72363-181.00684-11.53809Z"
        fill="#f1f2f2"
      />
      <path
        d="M146.82826,109.90763v-14.81543c0-3.91064,3.18164-7.09229,7.09229-7.09229h20.81592c3.91064,0,7.0918,3.18164,7.0918,7.09229v14.81543c0,3.91064-3.18115,7.09229-7.0918,7.09229h-20.81592c-3.91064,0-7.09229-3.18164-7.09229-7.09229Z"
        fill="#f7913e"
      />
      <path
        d="M102.82826,224.90763v-54.81543c0-3.91064,3.18164-7.09229,7.09229-7.09229h30.81592c3.91064,0,7.0918,3.18164,7.0918,7.09229v54.81543c0,3.91064-3.18115,7.09229-7.0918,7.09229h-30.81592c-3.91064,0-7.09229-3.18164-7.09229-7.09229Z"
        fill="#3f3d56"
      />
      <path
        d="M28.16787,288.58856v-54.81543c0-3.91064,3.18164-7.09229,7.09229-7.09229h30.81592c3.91064,0,7.0918,3.18164,7.0918,7.09229v54.81543c0,3.91064-3.18115,7.09229-7.0918,7.09229h-30.81592c-3.91064,0-7.09229-3.18164-7.09229-7.09229Z"
        fill="#3f3d56"
      />
      <path
        d="M172.48494,353.21865c-3.72461-.13184-6.72803-3.1543-6.83838-6.87988l-1.55811-52.98145c-.06641-2.26172,.9126-4.36328,2.68604-5.76855,1.77344-1.4043,4.04443-1.87305,6.23096-1.29297l1.55811,.41602c3.09961,.82715,5.26465,3.64453,5.26465,6.85254v52.56641c0,1.94141-.76953,3.75391-2.1665,5.10254-1.33496,1.28906-3.07275,1.98926-4.91846,1.98926-.08594,0-.17188-.00098-.2583-.00391Z"
        fill="#3f3d56"
      />
      <path
        d="M107.82826,345.90813v-54.97461c0-3.88086,3.03955-6.99512,6.91943-7.09082l28.0083-.68262c3.88232-.05371,7.14893,2.99316,7.2627,6.88477l1.61328,55.65723c.05566,1.93262-.65527,3.76074-2.00293,5.14746-1.34668,1.38672-3.15332,2.15039-5.08643,2.15039h-29.62207c-3.91064,0-7.09229-3.18164-7.09229-7.0918Z"
        fill="#3f3d56"
      />
      <path
        d="M273.37599,383.47341l21.95245,39.02658,2.52002,43.89001,17.47998,1.10999-6-52-36-50h0c-3.10706,5.59271-3.08905,12.39722,.04755,17.97342Z"
        fill="#ccc"
      />
      <rect
        x="225.9013"
        y="454.31523"
        width="71.25525"
        height="1.00009"
        transform="translate(-6.19314 3.61775) rotate(-.78329)"
        fill="#3f3d56"
      />
      <rect
        x="225.27251"
        y="445.26647"
        width="67.55676"
        height="1.00003"
        transform="translate(-3.47451 2.03736) rotate(-.44761)"
        fill="#3f3d56"
      />
      <rect
        x="224.70238"
        y="436.6149"
        width="64.63184"
        height="1.00018"
        transform="translate(-8.4868 5.1023) rotate(-1.11892)"
        fill="#3f3d56"
      />
      <rect
        x="225.25602"
        y="428.04499"
        width="62.08985"
        height="1.00055"
        transform="translate(-14.08004 8.74133) rotate(-1.9017)"
        fill="#3f3d56"
      />
      <rect
        x="224.68878"
        y="420.0766"
        width="59.659"
        height="1.00061"
        transform="translate(-14.61967 9.20207) rotate(-2.01348)"
        fill="#3f3d56"
      />
      <rect
        x="222.25703"
        y="412.00033"
        width="58.07129"
        height="1"
        fill="#3f3d56"
      />
      <rect
        x="220.89"
        y="405.3138"
        width="56.44"
        height="1.00006"
        transform="translate(-4.73817 2.9469) rotate(-.6714)"
        fill="#3f3d56"
      />
      <rect
        x="219.6271"
        y="398.89655"
        width="54.71588"
        height="1.00055"
        transform="translate(-13.11789 8.41613) rotate(-1.9017)"
        fill="#3f3d56"
      />
      <rect
        x="218.32372"
        y="391.50023"
        width="54.00928"
        height="1.00015"
        transform="translate(-6.85168 4.3723) rotate(-1.00705)"
        fill="#3f3d56"
      />
      <rect
        x="216.60908"
        y="384.90729"
        width="51.73132"
        height="1.00049"
        transform="translate(-11.9198 7.76169) rotate(-1.78991)"
        fill="#3f3d56"
      />
      <rect
        x="215.07709"
        y="378.25032"
        width="51.25244"
        height="1.00006"
        transform="translate(-3.68707 2.36856) rotate(-.55951)"
        fill="#3f3d56"
      />
      <path
        d="M211.32826,357.40813v-67.81543c0-3.91113,3.18164-7.09277,7.09229-7.09277h32.81592c3.91064,0,7.0918,3.18164,7.0918,7.09277v67.81543c0,3.91016-3.18115,7.0918-7.0918,7.0918h-32.81592c-3.91064,0-7.09229-3.18164-7.09229-7.0918Z"
        fill="#f7913e"
      />
      <path
        d="M134.8868,456.49895l-118.09033-3.7002-.46826-.03027v-44.95703c0-5.68555,64.62549-10.31152,70.31104-10.31152h57.37793c5.68555,0,10.31104,4.62598,10.31104,10.31152v48.68848h-.5l-18.94141-.00098Z"
        fill="#ccc"
      />
      <path
        d="M215.32826,234.40812v-51.81592c0-3.91064,3.18164-7.09229,7.09229-7.09229h10.81592c3.91064,0,7.0918,3.18164,7.0918,7.09229v51.81592c0,3.91016-3.18115,7.0918-7.0918,7.0918h-10.81592c-3.91064,0-7.09229-3.18164-7.09229-7.0918Z"
        fill="#3f3d56"
      />
      <path
        d="M226.32845,461.49999l-3-44-9-42-2.5-11.5h0c-5.13733-3.49338-12.05536,.39255-11.74512,6.59735l.24512,4.90265,9,42,3,44"
        fill="#ccc"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <section className="mx-auto max-w-7xl p-8 pb-40 grid grid-cols-2 gap-4">
        <div className="space-y-8">
          <h4 className="uppercase text-3xl font-medium">Our mission</h4>
          <p className="text-lg">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestiae
            est unde cum modi sequi aliquid eaque asperiores illum, amet quo
            dignissimos quisquam. Ratione architecto qui natus repellat
            repellendus ea sit expedita quaerat vel? Delectus itaque, aliquam
            assumenda modi laudantium sequi ipsa pariatur, necessitatibus
            aliquid quasi fugit doloribus quibusdam eos accusantium odit
            inventore ea optio deserunt vitae officiis non porro eveniet
            exercitationem nemo. Consequuntur error eos recusandae, rem magni
            quasi nulla odio. Labore, dolore nemo excepturi itaque officiis,
            molestias pariatur quibusdam, ratione in aliquam est explicabo
            laudantium tenetur vel voluptatem ab cupiditate sit repellat. Sunt
            doloremque sapiente dolorem reprehenderit, ea obcaecati.
          </p>
        </div>
      </section>

      <div className="w-full bg-muted bg-dotted-spacing-4 bg-dotted-green-300">
        <section className="mx-auto max-w-7xl p-8 py-20 md:py-32 space-y-64">
          <div className="grid grid-cols-12 gap-16">
            <p className="text-4xl sticky top-20 md:top-32 h-fit col-span-4 font-semibold font-signika">
              Purpose built to solve farmers&apos; problems
            </p>
            <div className="grid col-span-8 grid-cols-2 gap-12">
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-green-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-green-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-green-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-green-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-16">
            <p className="text-4xl sticky top-20 md:top-32 h-fit col-span-4 font-semibold font-signika">
              With businesses of all sizes in mind...
            </p>
            <div className="grid col-span-8 grid-cols-2 gap-12">
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-yellow-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-yellow-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-yellow-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-yellow-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-12 gap-16">
            <p className="text-4xl sticky top-20 md:top-32 h-fit col-span-4 font-semibold font-signika">
              and consumers at heart.
            </p>
            <div className="grid col-span-8 grid-cols-2 gap-12">
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-orange-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-orange-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-orange-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
              <div className="">
                <div className="h-10 w-10 mb-8 rounded-sm flex items-center justify-center bg-orange-600 text-white">
                  <Trash2Icon className="h-6 w-6" />
                </div>

                <h4 className="text-xl font-medium mb-2">Zero waste</h4>
                <p className="text-lg text-muted-foreground">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Minima hic nisi distinctio cum amet laboriosam facilis maiores
                  dicta illo odio!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="mx-auto max-w-6xl py-20 md:py-40">
        <h3 className="text-3xl mb-12">Get started now</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <Card className="!rounded-3xl space-y-2 p-6 dark bg-green-900">
            <div className="h-10 w-10 mb-6 bg-white rounded-full flex items-center justify-center">
              <TractorIcon className="text-primary-foreground" />
            </div>
            <h4 className="text-xl font-semibold">Ezifarmer</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
              harum officia quaerat iure ullam itaque consequuntur corrupti, qui
              commodi reiciendis.
            </p>
          </Card>
          <Card className="!rounded-3xl space-y-2 p-6 dark bg-green-900">
            <div className="h-10 w-10 mb-6 bg-white rounded-full flex items-center justify-center">
              <ShoppingBagIcon className="text-primary-foreground" />
            </div>
            <h4 className="text-xl font-semibold">Ezisoko</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
              harum officia quaerat iure ullam itaque consequuntur corrupti, qui
              commodi reiciendis.
            </p>
          </Card>
          <Card className="!rounded-3xl space-y-2 p-6 dark bg-green-900">
            <div className="h-10 w-10 mb-6 bg-white rounded-full flex items-center justify-center">
              <SparklesIcon className="text-primary-foreground" />
            </div>
            <h4 className="text-xl font-semibold">Ezifresh</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quasi
              harum officia quaerat iure ullam itaque consequuntur corrupti, qui
              commodi reiciendis.
            </p>
          </Card>
        </div>
        <div className="grid grid-cols-2 gap-8">
          <Card className="!rounded-3xl space-y-4 p-6 dark py-8 bg-green-900">
            <h4 className="text-xl font-semibold">Get in touch with us</h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consectetur minus veritatis iste, neque, quo ex magnam suscipit,
              quod possimus sit quaerat voluptatum eveniet et nesciunt dolor in
              laboriosam cum eligendi!
            </p>

            <div className="h-10 w-10 ml-auto bg-white rounded-full flex items-center justify-center">
              <ChevronRightIcon className="text-primary-foreground" />
            </div>
          </Card>
          <Card className="!rounded-3xl space-y-4 p-6 py-8 dark bg-green-900">
            <h4 className="text-xl font-semibold">
              Subscribe to our newsletter
            </h4>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consectetur minus veritatis iste, neque, quo ex magnam suscipit,
              quod possimus sit quaerat voluptatum eveniet et nesciunt dolor in
              laboriosam cum eligendi!
            </p>

            <div className="h-10 w-10 ml-auto bg-white rounded-full flex items-center justify-center">
              <ChevronRightIcon className="text-primary-foreground" />
            </div>
          </Card>
        </div>
      </section>

      <section className="mx-auto max-w-6xl pb-20 md:pb-40 grid grid-cols-12 gap-20">
        <div className="col-span-5">
          <h3 className="text-3xl mb-4">Frequently asked questions </h3>
          <p className="text-lg text-muted-foreground">
            Can’t find the answer you’re looking for? Reach out to our customer
            support team.
          </p>
        </div>
        <div className="col-span-7 space-y-8">
          <div className="space-y-2">
            <h4 className="font-medium text-lg">
              How do I signup as a farmer ?
            </h4>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis eum delectus suscipit adipisci eos? Provident!
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-lg">
              How do I signup as a farmer ?
            </h4>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis eum delectus suscipit adipisci eos? Provident!
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-lg">
              How do I signup as a farmer ?
            </h4>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis eum delectus suscipit adipisci eos? Provident!
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-lg">
              How do I signup as a farmer ?
            </h4>
            <p className="text-lg text-muted-foreground">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Perferendis eum delectus suscipit adipisci eos? Provident!
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

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
