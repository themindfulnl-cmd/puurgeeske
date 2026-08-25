import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { VideoHero } from "@/components/sections/VideoHero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { SeasonVideo } from "@/components/sections/SeasonVideo";
import { Workshops } from "@/components/sections/Workshops";
import { Reviews } from "@/components/sections/Reviews";
import { getReviews, getEvents, getServices } from "@/lib/content";

export default function Home() {
  const reviews = getReviews();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#FDFBF7]">
      <Navbar />
      <main className="flex-grow">
        <VideoHero />
        <About />
        <SeasonVideo />
        <Services />
        <Workshops />
        <Reviews reviews={reviews} />
      </main>
      <Footer />
    </div>
  );
}
