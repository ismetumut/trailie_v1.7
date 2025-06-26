"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslation, type Language } from "@/lib/i18n"

// 3 scenario-based days for MVP
const scenarios = [
  {
    day: 1,
    scenario: {
      tr: "Takımınla ilk günün. Hangi aksiyonu seçersin?",
      en: "It's your first day with your team. Which action do you take?"
    },
    options: {
      tr: ["Takımı motive et", "Birebir görüşme yap"],
      en: ["Motivate the team", "Have 1:1 meetings"]
    },
    competency: { tr: "Liderlik", en: "Leadership" },
    feedback: {
      0: { tr: "Takım motivasyonu yüksek!", en: "Team motivation is high!" },
      1: { tr: "Birebir görüşmeler güven oluşturdu.", en: "1:1 meetings built trust." }
    }
  },
  {
    day: 2,
    scenario: {
      tr: "Bir müşteriyle ilk toplantın. Ne yaparsın?",
      en: "Your first meeting with a client. What do you do?"
    },
    options: {
      tr: ["Sunum hazırla", "Müşteriyi dinle"],
      en: ["Prepare a presentation", "Listen to the client"]
    },
    competency: { tr: "İletişim", en: "Communication" },
    feedback: {
      0: { tr: "Hazırlıklı olmak iyi!", en: "Being prepared is good!" },
      1: { tr: "Müşteri kendini değerli hissetti.", en: "The client felt valued." }
    }
  },
  {
    day: 3,
    scenario: {
      tr: "Projede kriz çıktı. Nasıl yönetirsin?",
      en: "A crisis occurred in the project. How do you handle it?"
    },
    options: {
      tr: ["Takımı topla", "Yöneticiye bildir"],
      en: ["Gather the team", "Report to manager"]
    },
    competency: { tr: "Kriz Yönetimi", en: "Crisis Management" },
    feedback: {
      0: { tr: "Takım hızlıca çözüm üretti!", en: "The team quickly found a solution!" },
      1: { tr: "Yönetici bilgilendirildi.", en: "Manager was informed." }
    }
  }
]

export default function SimulationGames({ language, onComplete }: { language: Language, onComplete: (result: any) => void }) {
  const { t } = useTranslation(language)
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<number[]>([])
  const [showFeedback, setShowFeedback] = React.useState(false)
  const [selected, setSelected] = React.useState<number|null>(null)
  const progress = Math.round(((step+1)/scenarios.length)*100)

  function handleSelect(optionIdx: number) {
    setSelected(optionIdx)
    setShowFeedback(true)
    setAnswers([...answers.slice(0, step), optionIdx])
  }
  function handleNext() {
    setShowFeedback(false)
    setSelected(null)
    if (step < scenarios.length - 1) setStep(step + 1)
    else onComplete(answers)
  }

  const scenario = scenarios[step]
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-xl mt-4 font-sans text-center">
      <div className="mb-2 text-xs text-primary font-semibold tracking-wide">{t('simulationGame')} ({step+1}/{scenarios.length})</div>
      <div className="w-full h-2 bg-accent rounded mb-4">
        <div className="h-2 bg-primary rounded transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="font-bold mb-4 text-lg text-primary">{scenario.scenario[language]}</div>
      {!showFeedback && (
        <div className="flex flex-col gap-3 mb-6">
          {scenario.options[language].map((opt, idx) => (
            <Button key={opt} variant={selected===idx?'default':'outline'} className="w-full rounded-lg border-primary text-primary font-semibold py-3 text-base hover:bg-accent/60 transition" onClick={()=>handleSelect(idx)}>{opt}</Button>
          ))}
        </div>
      )}
      {showFeedback && selected!==null && (
        <div className="mb-6 text-green-700 font-semibold text-center">
          {scenario.feedback[selected][language]}
        </div>
      )}
      <div className="flex gap-2 justify-center">
        {showFeedback && <Button className="rounded-lg" onClick={handleNext}>{step===scenarios.length-1?t('finish'):t('next')}</Button>}
      </div>
    </div>
  )
} 