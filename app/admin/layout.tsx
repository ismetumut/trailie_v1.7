"use client"

import { Bell, Home, User } from "lucide-react"
import { useState, useRef } from "react"

// Admin layout (for /admin route)
export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [showNotifications, setShowNotifications] = useState(false)
  const notifications = [
    { id: 1, text: "Yeni başvuru: Jane Doe" },
    { id: 2, text: "CV export işlemi tamamlandı" },
    { id: 3, text: "Yeni mesaj: Ali Veli" },
  ]
  const notifRef = useRef<HTMLButtonElement>(null)

  // Close dropdown when clicking outside
  function handleClickOutside(e: MouseEvent) {
    if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
      setShowNotifications(false)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }
  function handleBellClick() {
    setShowNotifications(v => !v)
    if (!showNotifications) {
      setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-accent font-sans">
      {/* Top Header */}
      <header className="w-full flex items-center justify-between bg-white border-b px-6 py-3 shadow-sm">
        <a href="/admin" className="text-xl font-bold text-primary">Trailie Admin</a>
        <div className="flex items-center gap-4">
          <a href="/" title="Home" className="text-primary hover:bg-accent rounded-full p-2"><Home className="w-6 h-6" /></a>
          <button ref={notifRef} title="Notifications" className="text-primary hover:bg-accent rounded-full p-2 relative" onClick={handleBellClick}>
            <Bell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-64 bg-white border rounded-xl shadow-lg z-50">
                <div className="p-4 border-b font-bold text-primary">Bildirimler</div>
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.map(n => (
                    <li key={n.id} className="px-4 py-2 text-gray-700 border-b last:border-b-0">{n.text}</li>
                  ))}
                </ul>
                <button className="w-full py-2 text-sm text-primary hover:underline" onClick={()=>setShowNotifications(false)}>Kapat</button>
              </div>
            )}
          </button>
          <button title="User" className="bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"><User className="w-5 h-5" /></button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-56 bg-primary text-white flex flex-col p-6 min-h-screen">
          <nav className="flex flex-col gap-4 mt-8">
            <a href="/admin/overview" className="hover:underline">Analytics Overview</a>
            <a href="/admin" className="hover:underline">Dashboard</a>
            <a href="/admin/candidates" className="hover:underline">Candidates</a>
            <a href="/admin/filters" className="hover:underline">Filters</a>
            <a href="/admin/export" className="hover:underline">Export</a>
          </nav>
        </aside>
        <main className="flex-1 p-8 bg-accent min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
} 