import { OpeningSequence } from "./opening-sequence";
import { DeviceHero } from "./device-hero";
import { SiteMenu } from "./site-menu";
import { AboutChapters } from "./about-chapters";
import { SitePointerTrail } from "./negative-trail";
import { ServicesSection } from "./services-section";
import { ProjectsSection } from "./projects-section";
import { PricingSection } from "./pricing-section";
import { ReservationSection } from "./reservation-section";
import "./device-hero.css";

export default function Home() {
  return (
    <>
      <OpeningSequence />
      <SiteMenu />
      <SitePointerTrail />
      <main>
        <DeviceHero />
        <AboutChapters />
        <ServicesSection />
        <ProjectsSection />
        <PricingSection />
        <ReservationSection />
      </main>
    </>
  );
}
