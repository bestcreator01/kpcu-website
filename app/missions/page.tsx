import { SubPageLayout } from "@/components/sub-page-layout"
import { Globe } from "lucide-react"

const missionaries = [
  { region: "케냐", name: "이동관 선교사", type: "해외 선교" },
  { region: "네팔", name: "김창근 선교사", type: "해외 선교" },
]

const localPartners = [
  { name: "The Vine Institute 신학교 (유타)", type: "교육 선교" },
  { name: "안동주하교회 / 황현숙 전도사", type: "국내 선교" },
]

export default function MissionsPage() {
  return (
    <SubPageLayout category="선교와 전도" title="선교사역">
      <div className="space-y-8">
        <p className="text-muted-foreground leading-relaxed">
          {"유타한인장로교회는 선교적 교회로서 해외 선교사를 지원하며, 지역 교회 및 교육 기관과 협력하여 하나님의 선교에 동참하고 있습니다."}
        </p>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            해외 선교
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            {missionaries.map((m, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-4 ${i !== missionaries.length - 1 ? "border-b border-border" : ""}`}
              >
                <div>
                  <span className="font-medium text-foreground">{m.name}</span>
                  <span className="text-xs text-muted-foreground ml-2">({m.type})</span>
                </div>
                <span className="text-primary font-semibold text-sm">{m.region}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            국내 선교 및 협력
          </h2>
          <div className="border border-border rounded-lg overflow-hidden">
            {localPartners.map((p, i) => (
              <div
                key={i}
                className={`flex items-center justify-between px-5 py-4 ${i !== localPartners.length - 1 ? "border-b border-border" : ""}`}
              >
                <span className="font-medium text-foreground">{p.name}</span>
                <span className="text-xs text-muted-foreground">{p.type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
