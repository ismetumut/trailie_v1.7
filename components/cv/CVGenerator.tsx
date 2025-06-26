"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslation, type Language } from "@/lib/i18n"

export default function CVGenerator({ language, onComplete }: { language: Language, onComplete: () => void }) {
  const { t } = useTranslation(language)
  const [name, setName] = React.useState("")
  const [role, setRole] = React.useState("")
  const [experience, setExperience] = React.useState("")
  const [generating, setGenerating] = React.useState(false)
  const [cvText, setCvText] = React.useState<string|null>(null)

  // Placeholder for OpenAI call
  async function handleGenerateCV() {
    setGenerating(true)
    // TODO: Replace with OpenAI API call
    setTimeout(() => {
      setCvText(
        `${name || 'Jane Doe'}\n${role || (language==='tr'?'Yeni Ürün Geliştirme Uzmanı':'Product Development Specialist')}\n${experience || (language==='tr'?'Domino\'s Türkiye, 2 yıl':'Domino\'s Turkey, 2 years')}\n- Yaratıcı ürün geliştirme ve veri analizi\n- Takım çalışması ve liderlik\n- AI destekli problem çözme`
      )
      setGenerating(false)
    }, 1200)
  }

  // Placeholder for PDF download
  function handleDownloadPDF() {
    // TODO: Implement PDF generation and download
    alert('Demo: PDF download not implemented.')
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-xl mt-4 font-sans text-center">
      <div className="text-lg font-bold mb-4 text-primary">{t('cvGenerator')}</div>
      <div className="mb-4 text-gray-600">{t('cvGeneratorDesc') || (language==='tr' ? 'AI ile özgeçmişini oluştur.' : 'Generate your CV with AI.')}</div>
      <div className="flex flex-col gap-3 mb-6 text-left">
        <input className="border rounded-lg px-3 py-2" placeholder={language==='tr'?'Ad Soyad':'Full Name'} value={name} onChange={e=>setName(e.target.value)} />
        <input className="border rounded-lg px-3 py-2" placeholder={language==='tr'?'Rol / Pozisyon':'Role / Position'} value={role} onChange={e=>setRole(e.target.value)} />
        <input className="border rounded-lg px-3 py-2" placeholder={language==='tr'?'Deneyim':'Experience'} value={experience} onChange={e=>setExperience(e.target.value)} />
      </div>
      <Button className="w-full rounded-lg mb-4" onClick={handleGenerateCV} disabled={generating}>{generating ? (language==='tr'?'Oluşturuluyor...':'Generating...') : t('generate') || 'Generate CV'}</Button>
      {cvText && (
        <div className="border rounded p-4 mb-4 bg-gray-50 text-left whitespace-pre-line">
          {cvText}
        </div>
      )}
      {cvText && (
        <Button variant="outline" className="w-full rounded-lg mb-4" onClick={handleDownloadPDF}>PDF {t('download') || 'Download'}</Button>
      )}
      <Button className="w-full mt-2 rounded-lg" onClick={onComplete}>{t('next')}</Button>
    </div>
  )
} 