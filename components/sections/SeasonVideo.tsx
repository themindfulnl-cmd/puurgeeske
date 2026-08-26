import { Reveal } from "@/components/ui/Reveal";
import { FilmPlayer } from "@/components/ui/FilmPlayer";

const POSTER_WIDTHS = [480, 768, 1024, 1440, 1920];

/** Below the fold: the seasonal lesson (De Nazomer). */
export function SeasonVideo() {
  return (
    <section className="py-20 md:py-28 bg-[#FFF8F0]">
      <div className="container mx-auto px-6 md:px-12">
        <Reveal className="max-w-4xl mx-auto text-center mb-10 md:mb-14">
          <span className="text-xs md:text-sm font-semibold tracking-[0.2em] uppercase text-[#D4A373]">
            Seizoensles 01
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-semibold text-stone-800">
            De Nazomer
          </h2>
          <p className="mt-5 text-stone-600 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Over het oogseizoen, de maag- en miltmeridiaan, en welke houdingen en
            vragen daar nu bij passen.
          </p>
        </Reveal>

        <Reveal className="max-w-5xl mx-auto" from="scale">
          <FilmPlayer
            base="nazomer"
            posterName="nazomer-poster"
            posterWidths={POSTER_WIDTHS}
            posterSizes="(max-width: 1024px) 100vw, 1024px"
            alt="De Nazomer — seizoensles"
            buttonLabel="Speel de seizoensles af"
          />
          <p className="mt-4 text-sm text-stone-500 text-center">
            Seizoensles · 3 min 50
          </p>
        </Reveal>
      </div>
    </section>
  );
}
