import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { HeroSection } from "../components/home/HeroSection";
import { FeatureCards } from "../components/home/FeatureCards";
import { FeaturedStories } from "../components/home/FeaturedStories";
import { CallToAction } from "../components/home/CallToAction";

export function Home() {
    return (
        <div className="min-h-screen bg-black">
            <Header />
            <main>
                <HeroSection />
                <FeatureCards />
                <FeaturedStories />
                <CallToAction />
            </main>
            <Footer />
        </div>
    );
}
