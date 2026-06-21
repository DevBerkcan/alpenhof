import PremiumHero from "@/components/sections/PremiumHero";
import { ScrollStory } from "@/components/sections/ScrollStory";
import { HotelJourney } from "@/components/sections/HotelJourney";
import { About } from "@/components/sections/About";
import { Rooms } from "@/components/sections/Rooms";
import { Wellness } from "@/components/sections/Wellness";
import { Restaurant } from "@/components/sections/Restaurant";
import { Experience } from "@/components/sections/Experience";
import { Gallery } from "@/components/sections/Gallery";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Footer } from "@/components/sections/Footer";
export default function HomePage() {
  return (
    <>
      <PremiumHero />
      <ScrollStory />
      <HotelJourney />
      <About />
      <Rooms />
      <Wellness />
      <Restaurant />
      <Experience />
      <Gallery />
      <BookingCTA />
      <Footer />
    </>
  );
}
