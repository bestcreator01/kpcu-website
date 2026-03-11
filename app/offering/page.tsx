import { SubPageLayout } from "@/components/sub-page-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Info } from "lucide-react"
import Image from "next/image"

export default function OfferingPage() {
  return (
    <SubPageLayout category="교회소개" title="온라인 헌금">
      <div className="space-y-10">
        {/* Intro */}
        <div className="text-center space-y-2">
          <Heart className="h-10 w-10 text-primary mx-auto" />
          <h2 className="text-xl font-bold text-foreground">온라인 헌금 안내</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
            아래 QR 코드를 스캔하시면 간편하게 헌금하실 수 있습니다.
          </p>
        </div>

        {/* QR Codes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <Card>
            <CardHeader className="pb-3 text-center">
              <CardTitle className="text-lg">PayPal</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-border">
                <Image
                  src="/images/paypal-qr.png"
                  alt="PayPal QR Code"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                PayPal 앱으로 QR 코드를 스캔해 주세요
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3 text-center">
              <CardTitle className="text-lg">Venmo</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-48 rounded-lg overflow-hidden border border-border">
                <Image
                  src="/images/venmo-qr.jpg"
                  alt="Venmo QR Code"
                  fill
                  className="object-contain p-2"
                />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Venmo 앱으로 QR 코드를 스캔해 주세요
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Info */}
        <Card className="border-primary/30 max-w-3xl mx-auto">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Info className="h-5 w-5 text-primary" />
              헌금 안내
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              <li>{"- 헌금은 하나님께 드리는 거룩한 예물입니다."}</li>
              <li>{"- 온라인 헌금을 드리실 때에는 성함을 정확히 기입해 주시고, 십일조, 감사헌금, 선교헌금 등 헌금의 목적을 구분하여 표시해 주시기 바랍니다."}</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </SubPageLayout>
  )
}
