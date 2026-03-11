import { SubPageLayout } from "@/components/sub-page-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Phone } from "lucide-react"
import Image from "next/image"

const pastors = [
  {
    name: "손유진",
    title: "담임목사",
    phone: "(267) 218-8377",
    image: "/images/pastor-son.jpg",
  },
  {
    name: "한충수",
    title: "협동목사",
    phone: "(434) 473-0161",
    image: "/images/pastor-han.jpg",
  },
]

const elders = [
  { name: "원광식", title: "시무 장로" },
  { name: "박철희", title: "시무 장로" },
  { name: "정경조", title: "시무 장로" },
]

export default function StaffPage() {
  return (
    <SubPageLayout category="교회소개" title="섬기는 사람들">
      <div className="space-y-10">
        {/* Pastors */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            사역자
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pastors.map((pastor) => (
              <Card key={pastor.name}>
                <CardContent className="p-5">
                  <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden">
                    <Image
                      src={pastor.image}
                      alt={`${pastor.name} ${pastor.title}`}
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                  <div className="text-center mt-4">
                    <h4 className="text-lg font-bold text-foreground">{pastor.name}</h4>
                    <p className="text-sm text-primary font-medium">{pastor.title}</p>
                    <div className="flex items-center justify-center gap-1.5 text-sm text-muted-foreground mt-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      <span>{pastor.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Elders */}
        <div>
          <h3 className="text-xl font-bold text-foreground mb-6 pb-2 border-b border-border">
            시무 장로
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {elders.map((elder) => (
              <Card key={elder.name}>
                <CardContent className="p-5 text-center">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <span className="text-primary font-bold text-lg">
                      {elder.name.charAt(0)}
                    </span>
                  </div>
                  <h4 className="font-semibold text-foreground">
                    {elder.name}
                  </h4>
                  <p className="text-sm text-muted-foreground">{elder.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </SubPageLayout>
  )
}
