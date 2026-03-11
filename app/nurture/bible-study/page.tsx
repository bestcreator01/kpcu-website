import { SubPageLayout } from "@/components/sub-page-layout"
import { BookOpen, GraduationCap, Leaf } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function BibleStudyPage() {
  return (
    <SubPageLayout category="양육" title="성경공부">
      <div className="space-y-8">
        {/* 2026 성경 1독 프로젝트 */}
        <Card className="border-primary/30">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpen className="h-5 w-5 text-primary" />
              {"2026 성경 1독 프로젝트"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {"주보에 안내된 매일 성경 읽기표를 참고하시어 2026년 한 해 동안 하나님의 말씀을 꾸준히 읽어가시기 바랍니다."}
            </p>
          </CardContent>
        </Card>

        {/* 봄, 가을 성경 공부 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Leaf className="h-5 w-5 text-primary" />
              {"봄 · 가을 성경 공부"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">
              {"매년 봄(3\u20136월)과 가을(9\u201312월) 학기 동안 주일에 성경별 또는 주제별로 말씀을 함께 공부합니다."}
            </p>
          </CardContent>
        </Card>

        {/* 제자 훈련 */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <GraduationCap className="h-5 w-5 text-primary" />
              {"제자 훈련"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {"제자훈련은 예수 그리스도의 참된 제자로 세워지기 위한 과정입니다."}
              <br />
              {"훈련은 다음의 3단계로 진행됩니다."}
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
                <span className="text-primary font-bold text-sm">1단계</span>
                <span className="text-foreground font-medium text-sm">{"제자의 기초 (4주)"}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
                <span className="text-primary font-bold text-sm">2단계</span>
                <span className="text-foreground font-medium text-sm">{"제자의 교리 (8주)"}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-3 bg-muted rounded-lg">
                <span className="text-primary font-bold text-sm">3단계</span>
                <span className="text-foreground font-medium text-sm">{"제자의 삶 (12주)"}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {"총 3단계 과정으로 구성되며, 매년 1회 진행됩니다."}
            </p>
          </CardContent>
        </Card>
      </div>
    </SubPageLayout>
  )
}
