import { Star, Quote } from "lucide-react";
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
              ? "h-4 w-4 fill-[#D4A373] text-primary"
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
    <section className="py-24 bg-background" id="reviews">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <h2 className="text-xs md:text-sm font-medium tracking-[0.3em] text-muted-foreground uppercase">
            Ervaringen
          </h2>
          <h3 className="text-3xl md:text-5xl font-light text-foreground">
            Wat anderen{" "}
            <span className="font-serif italic text-muted-foreground">zeggen</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reviews.map((review, index) => (
            <div key={review.id}>
              <figure className="relative h-full bg-accent rounded-[2rem] p-8 shadow-sm border border-border hover-lift">
                <Quote
                  aria-hidden="true"
                  className="absolute top-6 right-6 h-8 w-8 text-primary/20"
                />

                <div className="space-y-4">
                  <StarRating rating={review.rating} />

                  <blockquote className="text-muted-foreground font-light leading-relaxed text-lg">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  <figcaption className="flex items-center gap-4 pt-4 border-t border-border">
                    {/* Monogram instead of a photo — the photo files never
                        existed, so every card was firing a 404. */}
                    <span
                      aria-hidden="true"
                      className="w-12 h-12 shrink-0 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground font-serif text-lg"
                    >
                      {review.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-medium text-foreground">
                        {review.name}
                      </span>
                      <span className="block text-sm text-muted-foreground">
                        {nlMonthYear.format(new Date(`${review.date}T00:00:00`))}
                      </span>
                    </span>
                  </figcaption>
                </div>
              </figure>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
