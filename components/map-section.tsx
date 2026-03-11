import { Phone, MapPin } from "lucide-react"
import { FadeIn } from "@/components/fade-in"

export function MapSection() {
  return (
    <section id="map" className="py-16 md:py-20 bg-muted">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">오시는 길</h2>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
        <div>
          <div className="aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.0!2d-111.9024!3d40.7077!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8752f50e3e5e8b35%3A0x1a5e8e8e8e8e8e8e!2s1945+S+Redwood+Rd%2C+Salt+Lake+City%2C+UT+84104!5e0!3m2!1sen!2sus!4v1709000000000!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="유타한인장로교회 위치"
            />
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm md:text-base text-muted-foreground px-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
              <span className="text-center sm:text-left">1945 South Redwood Rd, Salt Lake City, Utah 84104</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
              <span>801-322-0222</span>
            </div>
          </div>
        </div>
        </FadeIn>
      </div>
    </section>
  )
}
