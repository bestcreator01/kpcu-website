import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clock, ArrowRight } from "lucide-react"
import { FadeIn } from "@/components/fade-in"
import Link from "next/link"

const services = [
  { name: "주일 예배", time: "9:00am / 11:00am" },
  { name: "Youth & EM 예배", time: "11:00am" },
  { name: "주일학교", time: "11:00am" },
  { name: "새벽기도회", time: "화~금 5:30am" },
  { name: "청년, 대학부 예배", time: "금요일 7:00pm" },
]

export function HomeServicePreview() {
  return (
    <section className="py-16 md:py-20 bg-muted">
      <div className="container">
        <div>
          <FadeIn>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground">예배 안내</h2>
            <Link href="/worship-times">
              <Button variant="outline" className="group bg-transparent text-sm md:text-base">
                자세히 보기
                <ArrowRight className="ml-1 h-4 w-4 md:h-5 md:w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          </FadeIn>
          <FadeIn delay={150}>
          <Card>
            <CardContent className="p-0">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`flex items-center justify-between px-4 py-3.5 md:px-8 md:py-5 ${
                    index !== services.length - 1 ? "border-b border-border" : ""
                  } hover:bg-accent/50 transition-colors`}
                >
                  <div className="flex items-center gap-2 md:gap-4">
                    <Clock className="h-4 w-4 md:h-5 md:w-5 text-primary flex-shrink-0" />
                    <span className="font-medium text-sm md:text-lg text-foreground">{service.name}</span>
                  </div>
                  <span className="text-xs md:text-base font-semibold text-primary whitespace-nowrap ml-2">{service.time}</span>
                </div>
              ))}
            </CardContent>
          </Card>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
