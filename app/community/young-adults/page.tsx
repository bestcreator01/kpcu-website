import { SubPageLayout } from "@/components/sub-page-layout"
import { Users, Clock, MapPin, Instagram } from "lucide-react"
import Link from "next/link"

export default function YoungAdultsPage() {
  return (
    <SubPageLayout category="공동체" title="청년부">
      <div className="space-y-8">
        <div className="p-6 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            청년, 대학부
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            대학생 및 청년들이 함께 모여 하나님의 말씀을 배우고,
            서로의 삶을 나누며 신앙 안에서 성장하는 공동체입니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              모임 시간
            </h3>
            <p className="text-muted-foreground">금요일 오후 7:00pm</p>
          </div>
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Instagram className="h-5 w-5 text-primary" />
              소식 받기
            </h3>
            <Link
              href="https://www.instagram.com/kpcucollege/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              @kpcucollege
            </Link>
            <p className="text-xs text-muted-foreground mt-1">Instagram에서 최신 소식을 확인하세요</p>
          </div>
        </div>

        <div className="bg-accent/20 border border-accent/40 rounded-lg p-6">
          <h3 className="font-bold text-lg text-foreground mb-2">청년부 수련회</h3>
          <p className="text-muted-foreground text-sm">
            일정: 3월 6일(금) ~ 8일(주일)
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1 mt-1">
            <MapPin className="h-4 w-4 text-accent" />
            장소: Bear Lake
          </p>
        </div>
      </div>
    </SubPageLayout>
  )
}
