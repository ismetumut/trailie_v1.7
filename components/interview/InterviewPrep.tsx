"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslation, type Language } from "@/lib/i18n"

const questions = [
  { key: "interviewQ1", text: { tr: "Kendinizi kısaca tanıtır mısınız?", en: "Can you briefly introduce yourself?" } },
  { key: "interviewQ2", text: { tr: "Bir ekipte yaşadığınız bir zorluğu ve nasıl çözdüğünüzü anlatın.", en: "Describe a challenge you faced in a team and how you solved it." } },
  { key: "interviewQ3", text: { tr: "Neden bu pozisyona başvuruyorsunuz?", en: "Why are you applying for this position?" } },
]
const aiFeedbacks = [
  { tr: "Cevabınız net ve özgüvenli, güzel bir başlangıç!", en: "Your answer is clear and confident, great start!" },
  { tr: "Takım çalışmasına verdiğiniz önem öne çıkıyor.", en: "Your emphasis on teamwork stands out." },
  { tr: "Motivasyonunuzu iyi aktardınız!", en: "You communicated your motivation well!" }
]

export default function InterviewPrep({ language, onComplete }: { language: Language, onComplete: () => void }) {
  const { t } = useTranslation(language)
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<string[]>([])
  const [input, setInput] = React.useState("")
  const [showFeedback, setShowFeedback] = React.useState(false)
  const progress = Math.round(((step+1)/questions.length)*100)

  function handleNext() {
    setAnswers([...answers, input])
    setShowFeedback(true)
  }
  function handleContinue() {
    setShowFeedback(false)
    setInput("")
    if (step < questions.length - 1) setStep(step + 1)
    else onComplete()
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-xl mt-4 font-sans">
      <div className="mb-2 text-xs text-primary font-semibold tracking-wide">{t('interviewPrep')} ({step+1}/{questions.length})</div>
      <div className="w-full h-2 bg-accent rounded mb-4">
        <div className="h-2 bg-primary rounded transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="font-bold mb-4 text-lg text-primary">{questions[step].text[language]}</div>
      {!showFeedback && (
        <div className="flex flex-col gap-3 mb-6">
          <textarea className="border rounded-lg px-3 py-2" rows={3} placeholder={questions[step].text[language]} value={input} onChange={e=>setInput(e.target.value)} />
          <Button className="w-full rounded-lg" onClick={handleNext} disabled={!input}>{t('next')}</Button>
        </div>
      )}
      {showFeedback && (
        <div className="mb-6 text-green-700 font-semibold text-center">
          {aiFeedbacks[step][language]}
        </div>
      )}
      <div className="flex gap-2 justify-center">
        {showFeedback && <Button className="rounded-lg" onClick={handleContinue}>{step===questions.length-1?t('finish'):t('next')}</Button>}
      </div>
    </div>
  )
} 