"use client"

import * as React from "react"
import { useTranslation, type Language } from "@/lib/i18n"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import {
  Home, User, Briefcase, Bell, Crown, Star, MessageCircle, LayoutDashboard, Award, Play, Lock, Globe, ChevronDown, UserCog, ChevronLeft, ChevronRight, Mail, Linkedin
} from "lucide-react"
import PersonalityAssessment from "@/components/assessment/PersonalityAssessment"
import RoleAssignment from "@/components/role/RoleAssignment"
import JobBoard from "@/components/jobs/JobBoard"
import InterviewPrep from "@/components/interview/InterviewPrep"
import Networking from "@/components/networking/Networking"
import Coaching from "@/components/coaching/Coaching"
import { LanguageSwitcher } from "@/components/language-switcher"

// --- Demo Data ---
  const personalityQuestions = [
  { key: "leadershipQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "teamworkQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "stressQ", options: ["always", "often", "sometimes", "rarely"] },
]
  const expertiseQuestions = [
  { key: "problemSolvingQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "communicationQ", options: ["always", "often", "sometimes", "rarely"] },
  { key: "innovationQ", options: ["always", "often", "sometimes", "rarely"] },
]
const packages = [
  { key: "free", price: 0, features: ["Kişilik Envanteri", "AI Karne", "Mülakat Hazırlık", "Network Modülü"] },
  { key: "core", price: 299, features: ["Tüm Free özellikler", "Uzmanlık Envanteri", "30 Günlük Simülasyon", "AI CV Oluşturucu", "İş İlanları (1 ay)"] },
  { key: "pro", price: 499, features: ["Tüm Core özellikler", "100 Günlük Simülasyon", "Gelişmiş İş İlanları (3 ay)", "Sınırsız CV Güncelleme", "Öncelikli Destek"] },
  { key: "premium", price: 899, features: ["Tüm Pro özellikler", "Koçluk Seansları", "Analitik Raporlar", "Özel İçerikler"] },
]
const roles = [
  { key: "projectManager", label: "Proje Yöneticisi", demo: [
    { day: 1, task: "Takım tanışması ve onboarding", actions: ["Takımı motive et", "Birebir görüşme yap"] },
    { day: 2, task: "İlk müşteri toplantısı", actions: ["Sunum hazırla", "Müşteriyi dinle"] },
    { day: 3, task: "Kriz yönetimi", actions: ["Takımı topla", "Yöneticiye bildir"] },
  ]},
  { key: "softwareEngineer", label: "Yazılım Geliştirici", demo: [
    { day: 1, task: "Kod ortamı kurulumu", actions: ["Kendi başına kur", "Takımdan yardım iste"] },
    { day: 2, task: "İlk feature geliştirme", actions: ["Dokümantasyon oku", "Direkt kodla"] },
    { day: 3, task: "Code review", actions: ["Kendi başına çöz", "Takımdan feedback al"] },
  ]},
  { key: "salesSpecialist", label: "Satış Uzmanı", demo: [
    { day: 1, task: "Müşteri portföyü analizi", actions: ["Segmentasyon yap", "Rapor hazırla"] },
    { day: 2, task: "İlk satış görüşmesi", actions: ["Sunum yap", "Soruları yanıtla"] },
    { day: 3, task: "Satış sonrası takip", actions: ["Teşekkür maili gönder", "Ek teklif sun"] },
  ]},
]

const MODULES = [
  { key: "personality", label: "Personality Assessment" },
  { key: "expertise", label: "Expertise Assessment" },
  { key: "role", label: "Role Assignment" },
  { key: "simulation", label: "Simulation Games" },
  { key: "cv", label: "CV Generator" },
  { key: "jobs", label: "Job Board" },
  { key: "interview", label: "Interview Prep" },
  { key: "networking", label: "Networking" },
  { key: "coaching", label: "Coaching" },
]

// Demo: ExpertiseAssessment, SimulationGames, CVGenerator modülleri için placeholder
function ExpertiseAssessment({ language, onComplete }: { language: Language, onComplete: (answers: string[]) => void }) {
  const { t } = useTranslation(language)
  const [step, setStep] = React.useState(0)
  const [answers, setAnswers] = React.useState<(string|null)[]>([null, null, null])
  const questions = [
    { key: "problemSolvingQ", options: ["always", "often", "sometimes", "rarely"] },
    { key: "communicationQ", options: ["always", "often", "sometimes", "rarely"] },
    { key: "innovationQ", options: ["always", "often", "sometimes", "rarely"] },
  ]
  function handleSelect(option: string) {
    const arr = [...answers]; arr[step] = option; setAnswers(arr)
  }
  function handleNext() {
    if (step < questions.length - 1) setStep(step + 1)
    else onComplete(answers as string[])
  }
  function handlePrev() { if (step > 0) setStep(step - 1) }
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-4">
      <div className="mb-4 text-sm text-gray-500">{t('expertiseInventory')} ({step+1}/{questions.length})</div>
      <div className="font-semibold mb-2">{t(questions[step].key as any)}</div>
      <div className="flex flex-col gap-2 mb-4">
        {questions[step].options.map(opt => (
          <Button key={opt} variant={answers[step]===opt?'default':'outline'} className="w-full" onClick={()=>handleSelect(opt)}>{t(opt as any)}</Button>
        ))}
      </div>
      <div className="flex gap-2">
        <Button onClick={handlePrev} disabled={step===0} variant="outline">{t('back')}</Button>
        <Button onClick={handleNext} disabled={!answers[step]}>{step===questions.length-1?t('finish'):t('next')}</Button>
      </div>
      {step===questions.length-1 && answers.every(a=>a) && (
        <div className="mt-4 text-green-600 font-bold text-center">{t('assessmentComplete')}</div>
      )}
    </div>
  )
}

function SimulationGames({ language, onComplete }: { language: Language, onComplete: () => void }) {
  const { t } = useTranslation(language)
  // Demo: 3 gün, 2 aksiyon seçmeli
  const [day, setDay] = React.useState(0)
  const demoDays = [
    { task: t('chooseAction')+": Takım tanışması", actions: [t('progress'), t('xp')] },
    { task: t('chooseAction')+": Kriz yönetimi", actions: [t('badge'), t('completed')] },
    { task: t('chooseAction')+": Sunum hazırlama", actions: [t('progress'), t('unlocked')] },
  ]
  const [selected, setSelected] = React.useState<string|null>(null)
  function handleNext() {
    if (day < demoDays.length - 1) { setDay(day+1); setSelected(null) }
    else onComplete()
  }
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-4 text-center">
      <div className="text-lg font-bold mb-2">{t('simulationGame')} ({day+1}/3)</div>
      <div className="mb-4">{demoDays[day].task}</div>
      <div className="flex flex-col gap-2 mb-4">
        {demoDays[day].actions.map(a=>(<Button key={a} variant={selected===a?'default':'outline'} className="w-full" onClick={()=>setSelected(a)}>{a}</Button>))}
      </div>
      <Button className="w-full" onClick={handleNext} disabled={!selected}>{day===2?t('finish'):t('next')}</Button>
    </div>
  )
}

function CVGenerator({ language, onComplete }: { language: Language, onComplete: () => void }) {
  const { t } = useTranslation(language)
  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-4 text-center">
      <div className="text-lg font-bold mb-2">{t('cvGenerator')}</div>
      <div className="mb-4">AI ile oluşturulmuş örnek CV:</div>
      <div className="bg-gray-50 rounded p-4 text-left mb-4">
        <div><b>Ad:</b> Ayşe Yılmaz</div>
        <div><b>Rol:</b> Yeni Ürün Geliştirme Uzmanı</div>
        <div><b>Yetenekler:</b> Liderlik, Takım Çalışması, Problem Çözme</div>
        <div><b>Deneyim:</b> 2 yıl, Domino's Türkiye</div>
      </div>
      <Button className="w-full" onClick={onComplete}>{t('next')}</Button>
    </div>
  )
}

// --- Main App ---
export default function MainApp() {
  const [language, setLanguage] = React.useState<Language>(() => typeof window !== "undefined" ? (localStorage.getItem("language") as Language) || "tr" : "tr")
  const { t } = useTranslation(language)
  React.useEffect(() => { localStorage.setItem("language", language) }, [language])

  // Onboarding state
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  // Modül akışı state
  const [moduleIdx, setModuleIdx] = React.useState(0)
  // Demo: assessment cevapları ve rol
  const [personalityAnswers, setPersonalityAnswers] = React.useState<string[]>([])
  const [expertiseAnswers, setExpertiseAnswers] = React.useState<string[]>([])
  const [assignedRole, setAssignedRole] = React.useState<string>("")
  const [loading, setLoading] = React.useState(false)
  const [roleSuggestions, setRoleSuggestions] = React.useState<string[]>([])

  // Modül sırası
  const MODULES = [
    { key: "personality", label: t("personalityInventory"), component: (props: any) => <PersonalityAssessment {...props} language={language} onComplete={(answers: string[]) => { setPersonalityAnswers(answers); setModuleIdx(i => i + 1) }} /> },
    { key: "expertise", label: t("expertiseInventory"), component: (props: any) => <ExpertiseAssessment {...props} language={language} onComplete={(answers: string[]) => { setExpertiseAnswers(answers); setModuleIdx(i => i + 1) }} /> },
    { key: "role", label: t("roleAssignment"), component: (props: any) => <RoleAssignment {...props} language={language} personalityAnswers={personalityAnswers} expertiseAnswers={expertiseAnswers} onComplete={(role: string) => { setAssignedRole(role); setModuleIdx(i => i + 1) }} /> },
    { key: "simulation", label: t("simulationGame"), component: (props: any) => <SimulationGames {...props} language={language} onComplete={() => setModuleIdx(i => i + 1)} /> },
    { key: "cv", label: t("cvGenerator"), component: (props: any) => <CVGenerator {...props} language={language} onComplete={() => setModuleIdx(i => i + 1)} /> },
    { key: "jobs", label: t("jobBoard"), component: (props: any) => <JobBoard {...props} language={language} userRole={assignedRole} onComplete={() => setModuleIdx(i => i + 1)} /> },
    { key: "interview", label: t("interviewPrep"), component: (props: any) => <InterviewPrep {...props} language={language} onComplete={() => setModuleIdx(i => i + 1)} /> },
    { key: "networking", label: t("networking"), component: (props: any) => <Networking {...props} language={language} onComplete={() => setModuleIdx(i => i + 1)} /> },
    { key: "coaching", label: t("coaching"), component: (props: any) => <Coaching {...props} language={language} onComplete={() => setModuleIdx(i => i + 1)} /> },
  ]

  // --- Firebase Auth Placeholders ---
  async function handleEmailLogin() {
    // TODO: Implement Firebase Email Auth
    // On success: await saveUserProfile(user)
    setIsAuthenticated(true)
  }
  async function handleGoogleLogin() {
    // TODO: Implement Firebase Google Auth
    // On success: await saveUserProfile(user)
    setIsAuthenticated(true)
  }
  async function handleLinkedInLogin() {
    // TODO: Implement Firebase LinkedIn Auth
    // On success: await saveUserProfile(user)
    setIsAuthenticated(true)
  }
  async function saveUserProfile(user: any) {
    // TODO: Save user profile to Firestore on first login
  }

  // Onboarding ekranı
  function Onboarding() {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center bg-accent px-4 font-sans">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center" style={{ boxShadow: '0 4px 24px 0 rgba(0,124,126,0.08)' }}>
          <img src="/placeholder-logo.svg" alt="Trailie Logo" className="w-20 h-20 mb-6 rounded-full border-4 border-accent" />
          <h1 className="text-3xl font-bold mb-2 text-center text-primary font-sans">{t('onboardingTitle')}</h1>
          <p className="text-gray-500 mb-8 text-center text-base font-sans">{t('onboardingSubtitle')}</p>
          <div className="w-full flex flex-col gap-4 mb-6">
            <div className="text-sm font-semibold text-primary mb-1 text-center">Aday Girişi</div>
            <Button variant="outline" className="w-full flex gap-2 items-center justify-center rounded-lg border-primary text-primary font-semibold py-3 text-base hover:bg-accent/60 transition" onClick={handleEmailLogin}><Mail className="w-5 h-5"/>{t('signUpWithEmail')}</Button>
            <Button variant="outline" className="w-full flex gap-2 items-center justify-center rounded-lg border-primary text-primary font-semibold py-3 text-base hover:bg-accent/60 transition" onClick={handleGoogleLogin}><img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/>{t('continueWithGoogle')}</Button>
            <Button variant="outline" className="w-full flex gap-2 items-center justify-center rounded-lg border-primary text-primary font-semibold py-3 text-base hover:bg-accent/60 transition" onClick={handleLinkedInLogin}><Linkedin className="w-5 h-5"/>{t('continueWithLinkedIn')}</Button>
          </div>
          <div className="w-full flex items-center gap-2 mb-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-sans">veya</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <Button variant="secondary" className="w-full rounded-lg font-semibold py-3 text-base bg-primary text-white hover:bg-primary/90 transition mb-4" onClick={()=>window.location.href='/admin'}>Firma olarak giriş yap</Button>
          <LanguageSwitcher currentLanguage={language} onLanguageChange={setLanguage} />
        </div>
      </div>
    )
  }

  // Üst bar
  function TopBar() {
    return (
      <div className="flex items-center justify-between w-full px-4 py-3 bg-white border-b sticky top-0 z-10">
        <Button variant="ghost" size="sm" className="gap-2" disabled><UserCog className="w-5 h-5"/>{t('dashboard')}</Button>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={()=>setLanguage(language==='tr'?'en':'tr')}>{language==='tr'?'TR':'EN'}</Button>
        </div>
      </div>
    )
  }

  // Ana render
  if (!isAuthenticated) return <Onboarding />
  React.useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setRoleSuggestions([
        { title: "Product Manager", description: "Teknoloji projelerinde ürün yönetimi yapacak ekip arkadaşı." },
        { title: "Software Engineer", description: "Yazılım geliştirme ve kodlama konusunda uzman." },
        { title: "Sales Specialist", description: "Satış ve iletişim becerileri güçlü aday." }
      ])
      setLoading(false)
    }, 1200)
  }, [personalityAnswers, expertiseAnswers, language, t])
  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar />
      <div className="max-w-xl mx-auto">
        {MODULES[moduleIdx].component({})}
      </div>
    </div>
  )
}

const logoSvg = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 40C24 40 36 32 36 20C36 13.3726 30.6274 8 24 8C17.3726 8 12 13.3726 12 20C12 32 24 40 24 40Z" stroke="#3BA17C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M24 24V16" stroke="#3BA17C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="24" cy="20" r="2" fill="#3BA17C"/>
  </svg>
)
