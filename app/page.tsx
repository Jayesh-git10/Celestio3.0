import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Performers from "@/components/sections/Performers";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import Sponsors from "@/components/sections/Sponsors";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col relative w-full h-full overflow-hidden antialiased">
        <Hero />
        <About />
        <Timeline />
        <Performers />
        <Team />
        <Sponsors />
      </main>
      <Footer />
    </>
  );
}
