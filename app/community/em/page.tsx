import { SubPageLayout } from "@/components/sub-page-layout"
import { Users, Clock, Instagram } from "lucide-react"
import Link from "next/link"

export default function EmPage() {
  return (
    <SubPageLayout category="공동체" title="EM">
      <div className="space-y-8">
        <div className="p-6 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            English Ministry (EM)
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {"EM은 영어를 사용하는 청소년과 성인들을 위한 사역입니다. 영어 예배와 성경공부를 통해 하나님의 말씀을 배우고 서로 교제하며 신앙 안에서 성장하는 공동체입니다."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              예배 시간
            </h3>
            <p className="text-muted-foreground">주일 오전 11:00 (2부 예배 시간)</p>
          </div>
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Instagram className="h-5 w-5 text-primary" />
              소식 받기
            </h3>
            <Link
              href="https://www.instagram.com/kpcuem/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm"
            >
              @kpcuem
            </Link>
            <p className="text-xs text-muted-foreground mt-1">Instagram에서 최신 소식을 확인하세요</p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
