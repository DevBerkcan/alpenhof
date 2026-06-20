import { Hero } from "@/components/sections/Hero";
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
      <Hero />
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
