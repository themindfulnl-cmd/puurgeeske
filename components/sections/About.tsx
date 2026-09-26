import { Picture } from "@/components/ui/Picture";

export function About() {
  return (
    <section className="py-24 bg-accent overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8 order-2 lg:order-1 reveal">
            <div className="space-y-4">
              <h2 className="text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase border-b border-border pb-2 inline-block">
                Mijn Verhaal
              </h2>
              <h3 className="text-3xl md:text-5xl font-light text-foreground leading-tight">
                Balans en harmonie in{" "}
                <span className="font-serif italic text-muted-foreground">body &amp; mind</span>
              </h3>
            </div>

            <div className="space-y-8 text-lg text-muted-foreground leading-relaxed font-light">
              <p>Ik ben Geeske. Mijn achtergrond ligt in yoga, pilates, breathwork, massage en holistisch lichaamswerk.</p>
              <p>In mijn begeleiding komen beweging, ademhaling en persoonlijke aandacht samen. We zoeken een vorm die bij jou past.</p>
            </div>

            <div className="pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 bg-background border border-border rounded-[2rem] hover-lift">
                  <h4 className="font-serif text-xl italic mb-3 text-foreground">
                    Veilige Haven
                  </h4>
                  <p className="text-sm text-muted-foreground font-light leading-loose">
                    Een plek waar je jezelf mag zijn, zonder oordeel.
                  </p>
                </div>
                <div className="p-8 bg-background border border-border rounded-[2rem]">
                  <h4 className="font-serif text-xl italic mb-3 text-foreground">
                    Persoonlijk
                  </h4>
                  <p className="text-sm text-muted-foreground font-light leading-loose">
                    Aandacht voor jouw unieke proces en behoeften.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 relative reveal">
            <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-sm">
              <Picture
                name="yurt-selfie"
                widths={[400, 640, 816]}
                sizes="(max-width: 1024px) 100vw, 50vw"
                alt="Geeske in haar yurt"
                width={816}
                height={612}
                imgClassName="object-cover w-full h-[420px] md:h-[540px]"
              />
            </div>
            <div className="absolute top-10 right-10 w-full h-full border-4 border-border rounded-[2rem] -z-10 bg-secondary" />
          </div>
        </div>
      </div>
    </section>
  );
}
