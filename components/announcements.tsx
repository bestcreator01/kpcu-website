import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, BookOpen } from "lucide-react"
import Link from "next/link"

const announcements = [
  {
    title: "사순절 둘째 주 - 십자가를 묵상하는 시간",
    date: "2026년 3월",
    description: "오늘은 사순절 둘째 주일입니다. 사순절은 우리를 위해 십자가를 지신 예수님의 사랑을 기억하는 절기입니다. 십자가를 바라보며 하나님의 은혜를 깊이 묵상하는 한 주가 되기를 바랍니다.",
  },
  {
    title: "청년부 수련회",
    date: "3월 6일(금) ~ 8일(주일)",
    description: "장소: Bear Lake. 청년부 수련회에 많은 참여 바랍니다.",
  },
  {
    title: "토요 아침 기도회",
    date: "3월 7일(토) 아침 7시",
    description: "전도서 열한번째 말씀: 멀리 보는 믿음, 가까이 사는 지혜",
  },
  {
    title: "정기 제직회",
    date: "3월 8일(주일), 친교 후",
    description: "대상: 장로, 안수 집사, 권사 및 서리 집사",
  },
]

const bibleReadingPlan = {
  title: "2026 성경 1독 프로젝트",
  schedule: [
    { day: "2일", reading: "수 1-3장" },
    { day: "3일", reading: "4-6장" },
    { day: "4일", reading: "7-9장" },
    { day: "5일", reading: "10-12장" },
    { day: "6일", reading: "13-15장" },
    { day: "7일", reading: "16-18장" },
    { day: "8일", reading: "19-21장" },
  ],
}

export function Announcements() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">교회 소식</h2>
          <p className="text-muted-foreground text-base md:text-lg">최근 소식과 공지사항을 확인하세요</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {announcements.map((announcement, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 text-primary mb-2">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">{announcement.date}</span>
                </div>
                <CardTitle className="text-xl">{announcement.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed">{announcement.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bible Reading Plan */}
        <div className="max-w-3xl mx-auto mt-12">
          <Card className="border-primary/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl">
                <BookOpen className="h-5 w-5 text-primary" />
                {bibleReadingPlan.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {bibleReadingPlan.schedule.map((item, index) => (
                  <div key={index} className="px-3 py-2 rounded-lg bg-muted text-sm">
                    <span className="font-medium text-foreground">{item.day}</span>
                    <span className="text-muted-foreground ml-1">{item.reading}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-10">
          <Link href="/news">
            <Button size="lg" className="group">
              더 많은 소식 보기
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
