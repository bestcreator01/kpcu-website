import { SubPageLayout } from "@/components/sub-page-layout"
import { Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const mokjangs = [
  {
    name: "사랑",
    leader: "강진희",
    members: ["김수진", "김은희", "박철희", "양선희", "이광엽", "이미연", "이종상", "이지헌"],
  },
  {
    name: "희락",
    leader: "이성기",
    members: ["김성현", "김용재", "김은주", "오세완", "윤덕진", "이의선", "줄리아", "황정아"],
  },
  {
    name: "화평",
    leader: "최혜란",
    members: ["고명옥", "노모세", "손진이", "송호석", "원광식", "장소영", "조한송", "최효임"],
  },
  {
    name: "자비",
    leader: "정진덕",
    members: ["강성룡", "강종희", "김강열", "김성실", "박윤녀", "윤영히", "이동환", "이신덕", "정경조"],
  },
  {
    name: "양선",
    leader: "오명자",
    members: ["김홍석", "송지현", "오한영", "정은미", "조진호", "조진희", "한상필", "황금룡"],
  },
  {
    name: "충성",
    leader: "장보윤",
    members: ["김은진", "양소영", "우승윤", "이경희", "이은지", "원민아", "전윤서", "조재욱", "최지니", "크리스", "홍주리", "홍케빈", "황금비"],
  },
]

export default function MokjangPage() {
  return (
    <SubPageLayout category="공동체" title="목장">
      <div className="space-y-8">
        <div className="p-6 rounded-lg border border-border">
          <h2 className="text-xl font-bold text-foreground mb-3 flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            {"목장 소개"}
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            {"목장은 한 달에 한 번 모여 말씀을 나누고 삶을 나누는 소그룹 공동체입니다. 서로를 격려하고, 함께 기도하며, 믿음을 일상 속에서 살아가도록 돕는 공동체입니다."}
          </p>
        </div>

        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            {"목장 편성표"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mokjangs.map((mj) => (
              <Card key={mj.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-base">
                    <span className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {mj.name.charAt(0)}
                    </span>
                    {mj.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-medium text-foreground mb-2">
                    {"목자: "}{mj.leader}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {"목원: "}{mj.members.join(", ")}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
