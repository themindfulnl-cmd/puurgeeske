import { FilmPlayer } from "@/components/ui/FilmPlayer";

const POSTER_WIDTHS = [480, 768, 1024, 1440, 1920];

/** Below the fold: the seasonal lesson (De Nazomer). */
export function SeasonVideo() {
  return (
    <section className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-14 reveal">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-primary">
            Seizoensles 01
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-foreground">
            De Nazomer
          </h2>
          <p className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Over het oogseizoen, de maag- en miltmeridiaan, en welke houdingen en
            vragen daar nu bij passen.
          </p>
        </div>

        <div className="max-w-5xl mx-auto reveal">
          <FilmPlayer
            base="nazomer"
            posterName="nazomer-poster"
            posterWidths={POSTER_WIDTHS}
            posterSizes="(max-width: 640px) 62vw, (max-width: 1024px) 85vw, 1024px"
            alt="De Nazomer — seizoensles"
            buttonLabel="Speel de seizoensles af"
          />
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Seizoensles · 3 min 50
          </p>
        </div>
      </div>
    </section>
  );
}
