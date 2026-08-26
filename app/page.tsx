import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/sections/VideoHero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { SeasonVideo } from "@/components/sections/SeasonVideo";
import { Workshops } from "@/components/sections/Workshops";
import { Reviews } from "@/components/sections/Reviews";
import { getReviews, getEvents, getSiteConfig } from "@/lib/content";

/** Rendered once and served from the edge. The hourly window is only so that
 *  past workshops age out of the agenda on their own. */
export const revalidate = 3600;

export default function Home() {
  const reviews = getReviews();
  const events = getEvents();
  const config = getSiteConfig();

  // Helps Google show the studio as a local business rather than a bare page.
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    name: config.siteName,
    description: config.missionStatement,
    email: config.email,
    telephone: config.phone,
    address: { "@type": "PostalAddress", addressLocality: config.address, addressCountry: "NL" },
    url: "https://www.puurgeeske.nl",
    sameAs: [config.social.instagram, config.social.facebook],
    aggregateRating:
      reviews.length > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: (
              reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
            ).toFixed(1),
            reviewCount: reviews.length,
          }
        : undefined,
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <main className="flex-grow">
        <VideoHero />
        <About />
        <SeasonVideo />
        <Services />
        <Workshops events={events} />
        <Reviews reviews={reviews} />
      </main>
      <Footer />
    </div>
  );
}
