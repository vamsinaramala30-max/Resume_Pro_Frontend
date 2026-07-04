import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/Card'

export default function SectionCard({ icon, title, subtitle, children }) {
  return (
    <Card className="border-border shadow-elevation-2 overflow-hidden bg-surface/50">
      <CardHeader className="flex flex-row items-start gap-4 pb-4">
        <div className="inline-flex w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 items-center justify-center shrink-0">
          <span className="text-xl">{icon}</span>
        </div>
        <div className="space-y-1">
          <CardTitle className="text-h4 text-foreground flex items-center gap-2">
            {title}
          </CardTitle>
          {subtitle && <CardDescription className="text-sm font-medium">{subtitle}</CardDescription>}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
