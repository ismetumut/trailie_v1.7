"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useTranslation, type Language } from "@/lib/i18n"

interface RoleSuggestion {
  title: string
  description: string
}

export default function RoleAssignment({ language, personalityAnswers, expertiseAnswers, onComplete }: {
  language: Language,
  personalityAnswers: string[],
  expertiseAnswers: string[],
  onComplete: (role: string) => void
}) {
  const { t } = useTranslation(language)
  const [loading, setLoading] = React.useState(false)
  const [roleSuggestions, setRoleSuggestions] = React.useState<RoleSuggestion[]>([])
  const [selected, setSelected] = React.useState<number|null>(null)

  // Placeholder for OpenAI call
  React.useEffect(() => {
    setLoading(true)
    // TODO: Replace with OpenAI API call
    setTimeout(() => {
      setRoleSuggestions([
        { title: "Product Manager", description: t('projectManager')+": " + (language==='tr' ? "Yenilikçi ürünler geliştirmekten hoşlanıyorsun." : "You enjoy developing innovative products.") },
        { title: "Software Engineer", description: t('softwareEngineer')+": " + (language==='tr' ? "Teknik problemlerde iyisin ve kodlamayı seviyorsun." : "You are good at technical problems and love coding.") },
        { title: "Sales Specialist", description: t('salesSpecialist')+": " + (language==='tr' ? "İletişim becerilerin güçlü ve insanlarla çalışmayı seviyorsun." : "You have strong communication skills and enjoy working with people.") },
      ])
      setLoading(false)
    }, 1200)
  }, [personalityAnswers, expertiseAnswers, language, t])

  function handleContinue() {
    if (selected !== null) {
      onComplete(roleSuggestions[selected].title)
    }
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-xl mt-4 font-sans text-center">
      <div className="text-lg font-bold mb-4 text-primary">{t('roleAssignment')}</div>
      {loading ? (
        <div className="text-gray-500 py-12">AI {language==='tr' ? 'rol önerileri hazırlanıyor...' : 'role suggestions are being generated...'}</div>
      ) : (
        <div className="flex flex-col gap-4 mb-6">
          {roleSuggestions.map((role, idx) => (
            <Card key={role.title} className={`cursor-pointer border-2 transition ${selected===idx ? 'border-primary bg-accent/60' : 'border-gray-200'}`} onClick={()=>setSelected(idx)}>
              <CardContent className="p-4">
                <div className="text-xl font-bold text-primary mb-1">{role.title}</div>
                <div className="text-gray-700 text-sm">{role.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      <Button className="w-full rounded-lg" onClick={handleContinue} disabled={selected===null || loading}>{t('next')}</Button>
    </div>
  )
} 