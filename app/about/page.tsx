import { SubPageLayout } from "@/components/sub-page-layout"
import Image from "next/image"

export default function AboutPage() {
  return (
    <SubPageLayout category="교회소개" title="교회 소개">
      <div className="space-y-14">
        <div className="relative w-full h-[500px] md:h-[600px] lg:h-[1050px]">
          <Image
            src="/images/church-intro.jpg"
            alt="유타한인장로교회 소개 - 선교적 교회를 지향하는 교회입니다"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
    </SubPageLayout>
  )
}
