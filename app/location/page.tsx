import { SubPageLayout } from "@/components/sub-page-layout"
import { Phone, MapPin, Clock } from "lucide-react"

export default function LocationPage() {
  return (
    <SubPageLayout category="교회소개" title="오시는 길">
      <div className="space-y-8">
        <div className="aspect-[16/9] md:aspect-[21/9] rounded-lg overflow-hidden shadow-md">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              주소
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              1945 South Redwood Rd,<br />
              Salt Lake City, Utah 84104
            </p>
          </div>

          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              연락처
            </h3>
            <div className="space-y-2 text-muted-foreground">
              <p>교회: 801-322-0222</p>
              <p>손유진 담임목사: (267) 218-8377</p>
              <p>한충수 협동목사: (434) 473-0161</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-border">
          <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            예배 시간
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground">
            <div>
              <p className="font-medium text-foreground mb-1">주일 예배</p>
              <p>1부: 오전 9:00 / 2부: 오전 11:00</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-1">새벽기도회</p>
              <p>화~금 5:30am</p>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
