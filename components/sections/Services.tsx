import { Flower2, Heart, Activity, Wind, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/Card";
import { Picture } from "@/components/ui/Picture";

const services = [
  {
    title: "Yoga",
    description: "Verbind ademhaling en beweging voor flexibiliteit en rust.",
    icon: Flower2,
  },
  {
    title: "Pilates",
    description: "Versterk je kern en verbeter je houding en balans.",
    icon: Activity,
  },
  {
    title: "Personal Coaching",
    description: "Een-op-een begeleiding om je persoonlijke doelen te bereiken.",
    icon: User,
  },
  {
    title: "PuurGeeske Massage",
    description: "Diepe ontspanning en herstel voor lichaam en geest.",
    icon: Heart,
  },
  {
    title: "Breathwork",
    description: "Leer de kracht van je ademhaling voor energie en focus.",
    icon: Wind,
  },
];

export function Services() {
  return (
    <section className="py-24 bg-[#FDFBF7]" id="services">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
          <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] text-stone-500 uppercase">
            Aanbod
          </h2>
          <h3 className="text-3xl md:text-5xl font-light text-stone-800">
            Ontdek jouw{" "}
            <span className="font-serif italic text-stone-600">pad naar rust</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
          <div className="relative rounded-[3rem] overflow-hidden shadow-sm aspect-[4/3] lg:aspect-auto lg:h-[600px] border-4 border-white reveal hover-zoom">
            <Picture
              name="group-beach"
              widths={[480, 768, 1024]}
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt="Groepsles yoga op het strand"
              width={1024}
              height={678}
              className="absolute inset-0 w-full h-full"
              imgClassName="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
              <h4 className="text-3xl font-serif italic mb-3">
                Groepslessen &amp; Retreats
              </h4>
              <p className="text-white/90 font-light tracking-wide text-lg">
                Samen bewegen in de natuur, verbinden met elkaar en jezelf.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div key={service.title}>
                <Card className="h-full border border-stone-100 bg-white shadow-sm rounded-[2rem] p-2 hover-lift">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-2xl bg-[#FDFBF7] flex items-center justify-center mb-4 text-[#D4A373]">
                      <service.icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-xl font-medium text-stone-800">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-500 text-sm leading-loose font-light">
                      {service.description}
                    </p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
