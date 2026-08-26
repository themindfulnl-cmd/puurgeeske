import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import type { Event } from "@/lib/content";

const nlDate = new Intl.DateTimeFormat("nl-NL", { day: "numeric", month: "short" });

function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00`);
  return Number.isNaN(d.getTime()) ? iso : nlDate.format(d);
}

function formatPrice(price: number): string {
  return `€${price}`;
}

export function Workshops({ events }: { events: Event[] }) {
  return (
    <section className="py-24 bg-white" id="workshops">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] text-stone-500 uppercase">
            Agenda
          </h2>
          <h3 className="text-3xl md:text-5xl font-light text-stone-800">
            Workshops &amp;{" "}
            <span className="font-serif italic text-stone-600">Events</span>
          </h3>
        </div>

        {events.length === 0 ? (
          <Reveal className="max-w-xl mx-auto text-center bg-[#FDFBF7] border border-stone-100 rounded-[2rem] p-12">
            <p className="text-stone-600 font-light leading-relaxed text-lg">
              Er staat op dit moment geen workshop gepland. Wil je weten wanneer de
              volgende er is? Stuur me gerust een bericht — dan laat ik het je weten.
            </p>
            <div className="mt-8">
              <Button size="lg" className="rounded-full px-8" asChild>
                <a href="/contact">Neem contact op</a>
              </Button>
            </div>
          </Reveal>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event, index) => (
              <Reveal key={event.id} delay={index * 90}>
                <div className="group relative h-full bg-white rounded-[2rem] p-8 hover:shadow-xl transition-all duration-500 border border-stone-100 hover:-translate-y-1">
                  <div className="absolute top-8 right-8 text-right">
                    <span className="block text-2xl font-serif italic text-[#D4A373]">
                      {formatDate(event.date)}
                    </span>
                    <span className="text-xs text-stone-400 uppercase tracking-widest">
                      {event.time}
                    </span>
                  </div>

                  <div className="mt-16 space-y-4">
                    <h4 className="text-xl font-medium text-stone-800 group-hover:text-[#D4A373] transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-stone-500 font-light leading-relaxed">
                      {event.description}
                    </p>
                    <p className="text-xs text-stone-400 uppercase tracking-widest">
                      {event.location}
                    </p>
                    <div className="pt-4 flex items-center justify-between">
                      <span className="text-sm font-medium text-stone-400">
                        {formatPrice(event.price)}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full border-stone-200 text-stone-600 hover:bg-stone-50"
                        asChild
                      >
                        <a
                          href={event.bookingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Inschrijven
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
