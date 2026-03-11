import Image from "next/image"
import { FadeIn } from "@/components/fade-in"

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-20 bg-background">
      <div className="container">
        <FadeIn>
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-4xl font-bold text-foreground mb-3">교회 소개</h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              유타한인장로교회는 &ldquo;선교적 교회 (Missional Church)&rdquo;를 지향하는 교회입니다
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={150}>
          <div>
            <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] lg:aspect-[16/10]">
              <Image
                src="/images/church-intro.jpg"
                alt="유타한인장로교회 소개 - 선교적 교회를 지향하는 교회입니다"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
