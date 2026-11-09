import HeartScene from "../components/HeartScene";
import HeroSection from "../components/HeroSection";
import Envelope from "../components/Envelope";

export default function HomePage() {
  return (
    <div className="landing">
      <HeartScene />
      <div className="landing__grain" aria-hidden="true" />
      <main id="main">
        <HeroSection />
        <Envelope />
      </main>
    </div>
  );
}
