import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, GraduationCap } from "lucide-react"

const missionaries = [
  { region: "케냐", name: "이동관 선교사" },
  { region: "네팔", name: "김창근 선교사" },
]

const localMission = {
  name: "The Vine Institute (유타)",
  details: "안동주하나교회 / 황현숙 전도사",
}

export function MissionsSection() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">선교사역</h2>
          <p className="text-muted-foreground text-base md:text-lg">세상의 빛과 소금으로 나아갑니다</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          {missionaries.map((m, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-semibold text-lg text-foreground mb-1">{m.region}</h3>
                <p className="text-muted-foreground">{m.name}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 text-center">
              <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <GraduationCap className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">{localMission.name}</h3>
              <p className="text-muted-foreground text-sm">{localMission.details}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
