import { Picture } from "@/components/ui/Picture";
import { FilmPlayer } from "@/components/ui/FilmPlayer";
import { Button } from "@/components/ui/Button";

const POSTER_WIDTHS = [480, 768, 1024, 1440, 1920];

/** The hero: Geeske's introduction film.
 *  Poster-first — it has speech, so nothing plays until the visitor asks.
 *  The <video> element is not created at all until then. */
export function VideoHero() {
  return (
    <section className="relative bg-[#FDFBF7] overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">


      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* LEFT — the brand line */}
          <div className="w-full lg:w-[38%] text-center lg:text-left anim-in">
            <Picture
              name="logo"
              widths={[224, 320, 448]}
              sizes="(max-width: 768px) 224px, 256px"
              alt="Puur Geeske"
              width={448}
              height={448}
              priority
              avif={false}
              fallback="png"
              fallbackWidth={224}
              className="w-56 md:w-64 mx-auto lg:mx-0 mb-6"
              imgClassName="w-full h-auto object-contain"
            />
            <p className="text-lg md:text-xl text-stone-600 font-light leading-relaxed font-serif italic">
              &ldquo;Verbind met je ware zelf in alle rust en ruimte.&rdquo;
            </p>
            <p className="mt-5 text-stone-500 text-base leading-relaxed max-w-md mx-auto lg:mx-0">
              Maak kennis met Geeske — yoga, pilates en coaching in Hoofddorp.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <Button size="lg" className="rounded-full px-8">
                Boek een les
              </Button>
            </div>
          </div>

          {/* RIGHT — the film */}
          <div className="w-full lg:w-[62%] anim-in anim-d1">
            <FilmPlayer
              base="intro"
              posterName="intro-poster"
              posterWidths={POSTER_WIDTHS}
              posterSizes="(max-width: 640px) 62vw, (max-width: 1024px) 85vw, 62vw"
              alt="Geeske stelt zich voor"
              buttonLabel="Speel de introductievideo af"
              priority
            />
            <p className="mt-4 text-sm text-stone-500 text-center lg:text-left">
              Introductie · 1 min 30
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
