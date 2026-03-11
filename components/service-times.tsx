import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, BookOpen, Users } from "lucide-react"

const sundayServices = [
  { name: "주일 예배", time: "9:00am / 11:00am", description: "1부, 2부 예배" },
  { name: "Youth & EM 예배", time: "11:00am", description: "영어권 청소년 예배" },
  { name: "어린이 주일예배", time: "11:00am", description: "어린이 눈높이 예배" },
]

const weeklyServices = [
  { name: "새벽기도회", time: "화~금 5:30am", description: "말씀과 기도" },
  { name: "새벽기도회 (토)", time: "첫째, 셋째 토요일 7:00am", description: "토요 새벽 기도" },
  { name: "청년, 대학부 예배", time: "금요일 7:00pm", description: "청년부 금요 예배" },
]

const currentStudy = {
  title: "새벽기도회",
  book: "민수기",
}

export function ServiceTimes() {
  return (
    <section className="py-16 md:py-24 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">예배 및 모임 안내</h2>
          <p className="text-muted-foreground text-base md:text-lg">하나님을 예배하는 시간에 여러분을 초대합니다</p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Clock className="h-6 w-6 text-primary" />
                주일 예배
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sundayServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <p className="font-semibold text-primary text-sm md:text-base text-right">{service.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="h-6 w-6 text-primary" />
                주중 모임
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklyServices.map((service, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/70 transition-colors"
                >
                  <div>
                    <h3 className="font-semibold text-foreground">{service.name}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                  <p className="font-semibold text-primary text-sm md:text-base text-right">{service.time}</p>
                </div>
              ))}
              <div className="flex items-center gap-2 pt-2 px-4 text-muted-foreground">
                <BookOpen className="h-4 w-4 text-primary" />
                <span className="text-sm">{currentStudy.title}: <span className="font-medium text-foreground">{currentStudy.book}</span></span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
