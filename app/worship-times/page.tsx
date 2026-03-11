import { SubPageLayout } from "@/components/sub-page-layout"
import { Clock, BookOpen } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const sundayServices = [
  { name: "주일 예배 (1부)", time: "오전 9:00" },
  { name: "주일 예배 (2부)", time: "오전 11:00" },
  { name: "Youth & EM 예배", time: "오전 11:00" },
  { name: "주일학교", time: "오전 11:00" },
]

const weekdayServices = [
  { name: "새벽기도회", time: "화~금 5:30am" },
  { name: "토요 새벽기도회", time: "첫째, 셋째 토요일 7:00am" },
  { name: "청년, 대학부 예배", time: "금요일 7:00pm" },
]

export default function WorshipTimesPage() {
  return (
    <SubPageLayout category="교회소개" title="예배 안내">
      <div className="space-y-10">
        {/* Sunday Services */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            주일 예배
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            {sundayServices.map((s, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i !== sundayServices.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <span className="font-medium text-foreground">{s.name}</span>
                <span className="text-primary font-semibold">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Weekday Services */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            주중 모임
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            {weekdayServices.map((s, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-3.5 ${
                  i !== weekdayServices.length - 1 ? "border-b border-border" : ""
                }`}
              >
                <div>
                  <span className="font-medium text-foreground">{s.name}</span>
                  {s.note && (
                    <span className="text-xs text-muted-foreground ml-2">
                      ({s.note})
                    </span>
                  )}
                </div>
                <span className="text-primary font-semibold text-sm">{s.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to Sermon Archive */}
        <div className="bg-muted/50 rounded-lg p-6 text-center space-y-3">
          <p className="text-muted-foreground text-sm">
            지난 주일 설교를 다시 보고 싶으신가요?
          </p>
          <Link href="/sermons">
            <Button>주일 설교 보기</Button>
          </Link>
        </div>
      </div>
    </SubPageLayout>
  )
}
