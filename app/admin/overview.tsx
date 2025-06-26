import * as React from "react"
import { AdminLayout } from "./layout"

const demoCandidates = [
  { id: 1, name: "Jane Doe", role: "Yeni Ürün Geliştirme Uzmanı", personality: "ENFJ", simulation: 85 },
  { id: 2, name: "Ali Veli", role: "Product Manager", personality: "INTJ", simulation: 90 },
  { id: 3, name: "Anna Schmidt", role: "Sales Specialist", personality: "ESFP", simulation: 78 },
  { id: 4, name: "Mehmet Kaya", role: "Product Manager", personality: "INTJ", simulation: 82 },
  { id: 5, name: "Ayşe Demir", role: "Yeni Ürün Geliştirme Uzmanı", personality: "ENFJ", simulation: 88 },
]

export default function AdminOverview() {
  const total = demoCandidates.length
  const avgSim = Math.round(demoCandidates.reduce((sum, c) => sum + c.simulation, 0) / total)
  const roleCounts = demoCandidates.reduce((acc, c) => { acc[c.role] = (acc[c.role]||0)+1; return acc }, {} as Record<string, number>)
  const personalityCounts = demoCandidates.reduce((acc, c) => { acc[c.personality] = (acc[c.personality]||0)+1; return acc }, {} as Record<string, number>)
  const mostCommonRole = Object.entries(roleCounts).sort((a,b)=>b[1]-a[1])[0][0]
  const mostCommonPersonality = Object.entries(personalityCounts).sort((a,b)=>b[1]-a[1])[0][0]

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Analytics Overview</h1>
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-accent rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary">{total}</div>
            <div className="text-gray-600">Total Candidates</div>
          </div>
          <div className="bg-accent rounded-lg p-6 text-center">
            <div className="text-3xl font-bold text-primary">{avgSim}</div>
            <div className="text-gray-600">Avg. Simulation Score</div>
          </div>
          <div className="bg-accent rounded-lg p-6 text-center">
            <div className="text-xl font-semibold text-primary mb-1">{mostCommonRole}</div>
            <div className="text-gray-600">Most Common Role</div>
          </div>
          <div className="bg-accent rounded-lg p-6 text-center">
            <div className="text-xl font-semibold text-primary mb-1">{mostCommonPersonality}</div>
            <div className="text-gray-600">Most Common Personality</div>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold text-primary mb-2">Role Distribution</h2>
          <div className="flex gap-4 items-end h-32">
            {Object.entries(roleCounts).map(([role, count]) => (
              <div key={role} className="flex flex-col items-center flex-1">
                <div className="bg-primary rounded-t w-8" style={{height: `${count*30}px`}}></div>
                <div className="text-xs mt-2 text-primary font-semibold text-center w-16 truncate">{role}</div>
                <div className="text-xs text-gray-500">{count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 