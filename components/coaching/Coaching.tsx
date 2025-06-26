"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslation, type Language } from "@/lib/i18n"

const coach = { name: "Dr. Elif Yılmaz", title: "Kariyer Koçu", desc: "10+ yıl deneyimli, AI destekli kariyer gelişimi uzmanı." }

export default function Coaching({ language, onComplete }: { language: Language, onComplete: () => void }) {
  const { t } = useTranslation(language)
  const [showBooking, setShowBooking] = React.useState(false)
  const [showChat, setShowChat] = React.useState(false)
  const [date, setDate] = React.useState("")

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md mt-4">
      <div className="text-lg font-bold mb-2">{t('coaching')}</div>
      <div className="border rounded p-3 mb-4 text-left">
        <div className="font-bold">{coach.name}</div>
        <div className="text-xs text-gray-500">{coach.title}</div>
        <div className="text-sm mt-1">{coach.desc}</div>
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <Button variant="outline" onClick={()=>setShowBooking(true)}>{t('bookSession')||'Randevu al'}</Button>
        <Button variant="outline" onClick={()=>setShowChat(true)}>{t('paidChat')||'Ücretli chat erişimi'}</Button>
      </div>
      {showBooking && (
        <div className="border rounded p-3 bg-blue-50 mb-4">
          <div className="font-bold mb-2">{t('bookSession')||'Randevu al'}</div>
          <input type="date" className="border rounded px-2 py-1 mb-2 w-full" value={date} onChange={e=>setDate(e.target.value)} />
          <Button size="sm" className="w-full" onClick={()=>setShowBooking(false)} disabled={!date}>{t('confirm')||'Onayla'}</Button>
        </div>
      )}
      {showChat && (
        <div className="border rounded p-3 bg-blue-50 mb-4">
          <div className="font-bold mb-2">{t('paidChat')||'Ücretli chat erişimi'}</div>
          <div className="mb-2 text-sm">Demo: Chat erişimi için ödeme gereklidir. (Demo popup)</div>
          <Button size="sm" onClick={()=>setShowChat(false)}>{t('close')}</Button>
        </div>
      )}
      <Button className="w-full mt-2" onClick={onComplete}>{t('next')}</Button>
    </div>
  )
} 