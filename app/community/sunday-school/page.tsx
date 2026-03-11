import { SubPageLayout } from "@/components/sub-page-layout"
import { Users, Clock } from "lucide-react"

export default function SundaySchoolPage() {
  return (
    <SubPageLayout category="공동체" title="주일학교">
      <div className="space-y-8">
        <div className="p-6 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {"주일학교 안내"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {"주일학교는 아이들이 세상의 가치가 아니라 하나님의 말씀을 기준으로 살아가도록 돕는 신앙 훈련의 장입니다. 예배와 성경 교육을 통해 믿음의 기초를 세우고, 하나님을 사랑하는 삶을 배우며, 공동체 안에서 함께 성장합니다."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {"모임 시간"}
            </h3>
            <p className="text-muted-foreground">{"주일 오전 11:00"}</p>
          </div>
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {"섬기는 사람들"}
            </h3>
            <div className="space-y-1.5 text-muted-foreground text-sm">
              <p>{"부장: 최혜란 권사"}</p>
              <p>{"말씀 인도: 원광식 장로"}</p>
              <p>{"교사: 이경희, 최종원"}</p>
            </div>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
