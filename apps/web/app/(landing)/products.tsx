import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
    BikeIcon,
    CalendarIcon,
    ChartBarIcon,
    ClipboardCheckIcon,
    ClipboardListIcon,
    CoinsIcon,
    GlobeIcon,
    HeadsetIcon,
    SearchIcon,
    SparklesIcon,
    TractorIcon,
    TrendingUpIcon,
} from "lucide-react";

export function Products() {
  const solutions = [
    {
      name: "EZIFARMER",
      color: "bg-green-800",
      title: () => (
        <>
          <span className="text-gray-500">Technology driven solutions</span>{" "}
          <br /> for a farmer's pain points
        </>
      ),
      summary: "For the modern farmer",
      description:
        "We provide farmers with a streamlined platform to sell their fresh produce directly to vendors and consumers. Our solution empowers farmers to access larger markets, increase profitability, and ensure a more sustainable agricultural process.",
      features: [
        {
          title: "Market access",
          icon: GlobeIcon,
          description:
            "We make it easy for you to sell your produce and avoid any post harvest losses.",
        },
        {
          title: "Improved Profitability",
          icon: CoinsIcon,
          description:
            "Get the best prices for your produce and increase your profitability. No more middlemen.",
        },
        {
          title: "Input Financing",
          icon: TractorIcon,
          description:
            "Get access to input financing to help you grow your farm and increase your yield.",
        },
        {
          title: "Training & Support",
          icon: HeadsetIcon,
          description:
            "Access to training/extention services to educate you on best practices for your farm.",
        },
      ],
    },
    {
      name: "EZIFRESH",
      color: "bg-yellow-500",
      title: () => (
        <>
          <span className="text-gray-500">Fresh groceries</span> <br /> right to
          your doorstep
        </>
      ),
      summary: "For consumers' fresh grocery needs",
      description:
        "Ezifresh offers a seamless online platform for consumers to order fresh, high-quality groceries delivered right to their doorstep. With express delivery and flexible schedules, we make grocery shopping convenient, fast, and reliable.",
      features: [
        {
          title: "Fresh & Quality Produce",
          icon: SparklesIcon,
          description:
            "Order groceries from trusted vendors and receive only the freshest, highest-quality products.",
        },
        {
          title: "Express Delivery",
          icon: BikeIcon,
          description:
            "Need groceries in a hurry? Our express delivery service ensures you get your items in no time.",
        },
        {
          title: "Scheduled Deliveries",
          icon: CalendarIcon,
          description:
            "Flexible scheduling allows you to choose when to receive your deliveries. Set recurring orders to never run out.",
        },
        {
          title: "Wide Selection",
          icon: SearchIcon,
          description:
            "Choose from a wide range of groceries sourced from multiple vendors, offering variety and convenience.",
        },
      ],
    },
    {
      name: "EZISOKO",
      color: "bg-orange-500",
      title: () => (
        <>
          <span className="text-gray-500">Empowering vendors</span> <br />
          with the tools to grow
        </>
      ),
      summary: "For vendors looking to expand their business",
      description:
        "Ezisoko equips vendors with an easy-to-use platform that connects them directly to customers and delivery services. From inventory management to order fulfillment, we offer vendors the tools they need to expand their businesses efficiently.",
      features: [
        {
          title: "Broader Market Reach",
          icon: ChartBarIcon,
          description:
            "Expand your business beyond local borders by accessing customers through our online platform.",
        },
        {
          title: "Efficient Inventory Management",
          icon: ClipboardListIcon,
          description:
            "Track stock levels and manage pricing easily across multiple locations with real-time updates.",
        },
        {
          title: "Seamless Order Fulfillment",
          icon: ClipboardCheckIcon,
          description:
            "Handle orders efficiently and ensure timely deliveries with our integrated delivery partner services.",
        },
        {
          title: "Boost Sales & Growth",
          icon: TrendingUpIcon,
          description:
            "Leverage our platform to boost your sales, improve your business visibility, and grow your customer base.",
        },
      ],
    },
  ];
  return (
    <section className="mx-auto max-w-7xl space-y-12 p-4 py-20 sm:py-32">
      <h3 className="-mb-8 text-center text-lg uppercase">All Products</h3>
      <p className="mx-auto max-w-md text-center text-3xl font-medium leading-snug">
        Streamlining processes for farmers, vendors, and consumers
      </p>

      {solutions.map((solution, idx) => (
        <section
          key={solution.name}
          className={cn(
            "sticky rounded-3xl shadow-md",
            solution.color,
            idx === 0 ? "sm:top-10" : "sm:top-28",
          )}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between px-12 py-6 text-white">
            <h3>{solution.name}</h3>
            <p>{solution.summary}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 items-center gap-8 rounded-3xl bg-white p-12">
            <section className="space-y-12 py-20">
              <h4 className="text-4xl font-medium leading-snug">
                {solution.title()}
              </h4>
              <p className="max-w-md text-lg">{solution.description}</p>

              <Button size="lg" variant="outline" className="py-6">
                Get Started
              </Button>
            </section>
            <section className="grid grid-cols-2 gap-8">
              {solution.features.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-4">
                  <feature.icon className="h-8 w-8" />
                  <p className="text-base font-medium">{feature.title}</p>
                  <p className="text-base text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </section>
          </div>
        </section>
      ))}
    </section>
  );
}
