"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslation, type Language } from "@/lib/i18n"

// 10 placeholder skill/experience questions for MVP
const questions = [
  { key: "problemSolvingQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "communicationQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "innovationQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "leadershipQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "teamworkQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "adaptabilityQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "creativityQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "organizationQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "motivationQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "responsibilityQ", options: ["always", "often", "sometimes", "rarely"] },
]

export default function ExpertiseAssessment({ language, onComplete }: { language: Language, onComplete: (answers: string[]) => void }) {
  const { t } = useTranslation(language)
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<(string|null)[]>(Array(questions.length).fill(null))
  const progress = Math.round(((step+1)/questions.length)*100)

  // Placeholder for Firestore save logic
  async function saveExpertiseResults(answers: string[]) {
    // TODO: Save to Firestore
  }

  function handleSelect(option: string) {
    const arr = [...answers]; arr[step] = option; setAnswers(arr)
  }
  function handleNext() {
    if (step < questions.length - 1) setStep(step + 1)
    else {
      saveExpertiseResults(answers as string[])
      onComplete(answers as string[])
    }
  }
  function handlePrev() {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-xl mt-4 font-sans">
      <div className="mb-2 text-xs text-primary font-semibold tracking-wide">{t('expertiseInventory')} ({step+1}/{questions.length})</div>
      <div className="w-full h-2 bg-accent rounded mb-4">
        <div className="h-2 bg-primary rounded transition-all" style={{ width: `${progress}%` }} />
      </div>
      <div className="font-bold mb-4 text-lg text-primary text-center">{t(questions[step].key as any)}</div>
      <div className="flex flex-col gap-3 mb-6">
        {questions[step].options.map(opt => (
          <Button key={opt} variant={answers[step]===opt?'default':'outline'} className="w-full rounded-lg border-primary text-primary font-semibold py-3 text-base hover:bg-accent/60 transition" onClick={()=>handleSelect(opt)}>{t(opt as any)}</Button>
        ))}
      </div>
      <div className="flex gap-2 justify-between">
        <Button onClick={handlePrev} disabled={step===0} variant="outline" className="rounded-lg">{t('back')}</Button>
        <Button onClick={handleNext} disabled={!answers[step]} className="rounded-lg">{step===questions.length-1?t('finish'):t('next')}</Button>
      </div>
      {step===questions.length-1 && answers.every(a=>a) && (
        <div className="mt-6 text-green-600 font-bold text-center">{t('assessmentComplete')}</div>
      )}
    </div>
  )
} 