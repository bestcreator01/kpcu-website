import { SubPageLayout } from "@/components/sub-page-layout"
import { Users, Clock } from "lucide-react"

export default function YouthEmPage() {
  return (
    <SubPageLayout category="공동체" title="Youth & EM">
      <div className="space-y-8">
        <div className="p-6 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {"Youth & EM"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {"Youth & EM은 영어권 청소년과 청년들이 함께 예배하고 배우며 성장하는 공동체입니다. 예배를 통해 하나님을 만나고, 공동체 안에서 서로를 세워 주며, 세상 속에서 그리스도의 빛과 소금으로 살아가도록 자라갑니다."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              {"예배 시간"}
            </h3>
            <p className="text-muted-foreground">{"주일 오전 11:00 (2부 예배 시간)"}</p>
          </div>
          <div className="p-6 rounded-lg border border-border">
            <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              {"섬기는 사람"}
            </h3>
            <p className="text-muted-foreground text-sm">{"예배 인도: 케빈 홍"}</p>
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
