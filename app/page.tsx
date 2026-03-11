import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { QuickLinks } from "@/components/quick-links"
import { AboutSection } from "@/components/about-section"
import { HomeServicePreview } from "@/components/home-service-preview"
import { HomeAlbumPreview } from "@/components/home-album-preview"
import { HomeNewsPreview } from "@/components/home-news-preview"
import { MapSection } from "@/components/map-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <QuickLinks />
        <AboutSection />
        <HomeServicePreview />
        <HomeAlbumPreview />
        <HomeNewsPreview />
        <MapSection />
      </main>
      <Footer />
    </div>
  )
}
