import { SubPageLayout } from "@/components/sub-page-layout"
import { Heart, ClipboardList, UserCheck, Users, BookOpen } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "1. 주일 예배 참석 및 방문 카드 작성",
    description: "주일 예배에 참석하셔서 방문 카드를 작성해 주시기 바랍니다.",
  },
  {
    icon: UserCheck,
    title: "2. 담임목사 면담",
    description: "교회에 대해 더 깊이 나누고 등록을 위한 안내를 드리기 위해 담임목사와의 면담 시간을 가져 주시기 바랍니다.",
  },
  {
    icon: Users,
    title: "3. 목장 배정",
    description: "등록 후에는 목장에 배정되어 성도 간의 교제와 돌봄 가운데 함께 신앙생활을 하실 수 있습니다.",
  },
  {
    icon: BookOpen,
    title: "4. 새가족 성경공부 참여",
    description: "새가족을 위한 성경공부(3주 과정, 상시 진행)에 참여하시어 우리 교회의 신앙과 비전을 함께 배우게 됩니다.",
  },
]

export default function NewcomersPage() {
  return (
    <SubPageLayout category="양육" title="새가족 안내">
      <div className="space-y-8">
        <div className="bg-accent/20 border border-accent/40 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <Heart className="h-5 w-5 text-accent" />
            {"환영합니다!"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {"유타한인장로교회에 처음 방문하신 분들을 주님의 이름으로 진심으로 환영합니다."}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            {"새가족 등록 안내"}
          </h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {"다음과 같은 과정을 통해 교회 공동체의 일원이 되실 수 있습니다."}
          </p>
          <div className="space-y-4">
            {steps.map((step) => {
              const Icon = step.icon
              return (
                <div key={step.title} className="flex gap-4 p-5 rounded-lg border border-border">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
