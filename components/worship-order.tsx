import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Music } from "lucide-react"

const worshipOrder = [
  { item: "예배 부름", english: "Call to Worship", detail: "" },
  { item: "경배와 찬양", english: "Praise and Worship", detail: "찬양단과 함께", highlight: true },
  { item: "신앙고백", english: "Apostles' Creed", detail: "사도신경" },
  { item: "성시교독", english: "Responsive Reading", detail: "125번 (사순절 2)" },
  { item: "찬송", english: "Hymn", detail: "28장 '복의 근원 강림하사'" },
  { item: "기도", english: "Prayer", detail: "1부: 목회 기도 / 2부: 목회 기도" },
  { item: "봉헌", english: "Offering", detail: "50장 '내게 있는 모든 것을' 1절, 3절" },
  { item: "말씀 봉독", english: "Scripture Reading", detail: "사무엘상 6장 1-21절" },
  { item: "설교", english: "Sermon", detail: '사무엘상 7: "성도다움: 믿음과 순종의 길"' },
  { item: "결단 찬송", english: "Song of Response", detail: "주께 가오니", highlight: true },
  { item: "축도", english: "Benediction", detail: "담임 목사", highlight: true },
  { item: "교회 소식", english: "Announcement", detail: "담임 목사" },
]

export function WorshipOrder() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">주일예배 순서</h2>
          <p className="text-muted-foreground text-base md:text-lg">제 50권 9호 | 2026년 3월 1일</p>
          <p className="text-muted-foreground text-sm mt-1">1부: 오전 9시 / 2부: 오전 11시</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Music className="h-6 w-6 text-primary" />
                예배 순서
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="divide-y divide-border">
                {worshipOrder.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start justify-between py-4 gap-4 ${item.highlight ? "bg-primary/5 -mx-4 px-4 rounded-lg" : ""}`}
                  >
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        {item.highlight && <span className="inline-block w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />}
                        <div>
                          <h3 className="font-semibold text-foreground">{item.item}</h3>
                          <p className="text-sm text-muted-foreground">{item.english}</p>
                        </div>
                      </div>
                    </div>
                    {item.detail && (
                      <p className="text-sm text-muted-foreground text-right max-w-[200px]">{item.detail}</p>
                    )}
                  </div>
                ))}
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6 pt-4 border-t border-border">
                {'일어서실 수 있는 분들은 ●표에서 일어서기 바랍니다'}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
