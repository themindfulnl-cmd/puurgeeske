import { Star, Quote } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Review } from "@/lib/content";

const nlMonthYear = new Intl.DateTimeFormat("nl-NL", {
  month: "long",
  year: "numeric",
});

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} van 5 sterren`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          aria-hidden="true"
          className={
            star <= rating
              ? "h-4 w-4 fill-[#D4A373] text-[#D4A373]"
              : "h-4 w-4 fill-none text-stone-300"
          }
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function Reviews({ reviews }: { reviews: Review[] }) {
  if (!reviews || reviews.length === 0) return null;

  return (
    <section className="py-24 bg-[#FDFBF7]" id="reviews">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] text-stone-500 uppercase">
            Ervaringen
          </h2>
          <h3 className="text-3xl md:text-5xl font-light text-stone-800">
            Wat anderen{" "}
            <span className="font-serif italic text-stone-600">zeggen</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <Reveal key={review.id} delay={index * 90}>
              <figure className="relative h-full bg-white rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-stone-100">
                <Quote
                  aria-hidden="true"
                  className="absolute top-6 right-6 h-8 w-8 text-[#D4A373]/20"
                />

                <div className="space-y-4">
                  <StarRating rating={review.rating} />

                  <blockquote className="text-stone-600 font-light leading-relaxed text-lg">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  <figcaption className="flex items-center gap-4 pt-4 border-t border-stone-100">
                    {/* Monogram instead of a photo — the photo files never
                        existed, so every card was firing a 404. */}
                    <span
                      aria-hidden="true"
                      className="w-12 h-12 shrink-0 rounded-full bg-[#FDFBF7] border border-stone-100 flex items-center justify-center text-stone-400 font-serif text-lg"
                    >
                      {review.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-medium text-stone-800">
                        {review.name}
                      </span>
                      <span className="block text-sm text-stone-400">
                        {nlMonthYear.format(new Date(`${review.date}T00:00:00`))}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
