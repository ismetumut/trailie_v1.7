"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { useTranslation, type Language } from "@/lib/i18n"

const users = [
  { id: 1, name: "Jane Doe", role: "Yeni Ürün Geliştirme Uzmanı", company: "Domino's Türkiye", avatar: "JD", interests: ["Yaratıcılık", "Liderlik"] },
  { id: 2, name: "Ali Veli", role: "Product Manager", company: "TechX", avatar: "AV", interests: ["Teknoloji", "Ürün Yönetimi"] },
  { id: 3, name: "Anna Schmidt", role: "Sales Specialist", company: "GlobalSales", avatar: "AS", interests: ["Satış", "İletişim"] },
]

export default function Networking({ language, onComplete }: { language: Language, onComplete: () => void }) {
  const { t } = useTranslation(language)
  const [connected, setConnected] = React.useState<number|null>(null)
  const [showChat, setShowChat] = React.useState(false)

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-2xl shadow-xl mt-4 font-sans">
      <div className="text-lg font-bold mb-4 text-primary">{t('networking')}</div>
      <div className="space-y-3 mb-4">
        {users.map(u=>(
          <div key={u.id} className="border rounded-lg p-3 flex items-center justify-between bg-accent/40">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">{u.avatar}</div>
              <div>
                <div className="font-bold text-primary">{u.name}</div>
                <div className="text-xs text-gray-500">{u.role} - {u.company}</div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {u.interests.map((interest, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-0.5">{interest}</span>
                  ))}
                </div>
              </div>
            </div>
            <Button size="sm" className="rounded-lg" onClick={()=>{setConnected(u.id); setShowChat(true)}} disabled={connected===u.id}>{connected===u.id?t('connected')||'Bağlantı kuruldu':t('connect')||'Bağlantı isteği gönder'}</Button>
          </div>
        ))}
      </div>
      {showChat && (
        <div className="border rounded-lg p-3 bg-blue-50 mb-4">
          <div className="font-bold mb-2">Group Chat</div>
          <div className="mb-2 text-sm">Jane Doe: Merhaba! Network'ünüze katıldığım için mutluyum.</div>
          <Button size="sm" className="rounded-lg" onClick={()=>setShowChat(false)}>{t('close')}</Button>
        </div>
      )}
      <Button className="w-full mt-2 rounded-lg" onClick={onComplete}>{t('next')}</Button>
    </div>
  )
} 