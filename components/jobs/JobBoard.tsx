"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslation, type Language } from "@/lib/i18n"

// Demo jobs with more detail for MVP
const demoJobs = [
  { id: 1, title: "Yeni Ürün Geliştirme Uzmanı", company: "Domino's Türkiye", country: "Türkiye", city: "İstanbul", role: "Domino's Türkiye - Yeni Ürün Geliştirme Uzmanı", match: 92, requirements: ["Yaratıcılık", "Analitik düşünme"], description: "Domino's için yeni ürünler geliştirecek takım arkadaşı arıyoruz.", posted: "2 gün önce", salary: "₺40.000+" },
  { id: 2, title: "Product Manager", company: "TechX", country: "Türkiye", city: "Ankara", role: "Product Manager", match: 88, requirements: ["Liderlik", "İletişim"], description: "Teknoloji projelerinde ürün yönetimi yapacak ekip arkadaşı.", posted: "1 hafta önce", salary: "₺60.000+" },
  { id: 3, title: "Sales Specialist", company: "GlobalSales", country: "Almanya", city: "Berlin", role: "Sales Specialist", match: 80, requirements: ["Satış", "İkna kabiliyeti"], description: "Avrupa pazarında satış süreçlerini yönetecek uzman.", posted: "3 gün önce", salary: "€3.500+" },
]
const countries = ["Türkiye", "Almanya"]
const cities = { "Türkiye": ["İstanbul", "Ankara"], "Almanya": ["Berlin"] }

export default function JobBoard({ language, userRole, onComplete }: { language: Language, userRole: string, onComplete: () => void }) {
  const { t } = useTranslation(language)
  const [country, setCountry] = React.useState("Türkiye")
  const [city, setCity] = React.useState("İstanbul")
  const [applied, setApplied] = React.useState<number|null>(null)

  // Placeholder for API/web scraping integration
  // TODO: Replace demoJobs with real API/web scraping results
  const filteredJobs = demoJobs.filter(j => j.country===country && j.city===city && j.role===userRole)

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-xl mt-4 font-sans">
      <div className="text-lg font-bold mb-4 text-primary">{t('jobBoard')}</div>
      <div className="flex gap-2 mb-4">
        <select className="border rounded-lg px-2 py-1" value={country} onChange={e=>{setCountry(e.target.value); setCity(cities[e.target.value][0])}}>
          {countries.map(c=>(<option key={c} value={c}>{c}</option>))}
        </select>
        <select className="border rounded-lg px-2 py-1" value={city} onChange={e=>setCity(e.target.value)}>
          {cities[country].map(c=>(<option key={c} value={c}>{c}</option>))}
        </select>
      </div>
      <div className="space-y-3 mb-4">
        {filteredJobs.length===0 && <div className="text-gray-500 text-sm">{t('noJobsFound')||'Uygun ilan bulunamadı.'}</div>}
        {filteredJobs.map(j=>(
          <div key={j.id} className="border rounded-lg p-4 text-left bg-accent/40">
            <div className="flex justify-between items-center mb-1">
              <div className="font-bold text-primary text-base">{j.title}</div>
              <span className="text-xs bg-green-100 text-green-800 rounded px-2 py-1 font-semibold">{j.match}% Match</span>
            </div>
            <div className="text-xs text-gray-500 mb-1">{j.company} - {j.city}, {j.country} • {j.posted}</div>
            <div className="text-gray-700 text-sm mb-2">{j.description}</div>
            <div className="flex flex-wrap gap-2 mb-2">
              {j.requirements.map((req, idx) => (
                <span key={idx} className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-1">{req}</span>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-primary">{j.salary}</span>
              <Button size="sm" className="rounded-lg" onClick={()=>setApplied(j.id)} disabled={applied===j.id}>{applied===j.id?t('applied')||'Başvuruldu':t('apply')||'Başvur'}</Button>
            </div>
          </div>
        ))}
      </div>
      {applied && (
        <div className="border rounded p-3 bg-blue-50 mb-4">
          <div className="font-bold mb-2">{t('applicationSent')||'Başvuru gönderildi!'}</div>
          <Button size="sm" onClick={()=>setApplied(null)}>{t('close')}</Button>
        </div>
      )}
      <Button className="w-full mt-2 rounded-lg" onClick={onComplete}>{t('next')}</Button>
    </div>
  )
} 