import * as React from "react"
import { AdminLayout } from "./layout"

const demoCandidates = [
  { id: 1, name: "Jane Doe", role: "Yeni Ürün Geliştirme Uzmanı", city: "İstanbul", age: 26, education: "Boğaziçi Üniversitesi", personality: "ENFJ", skill: "Yaratıcılık", simulation: 85, cv: {
    summary: "Yaratıcı ürün geliştirme ve veri analizi konusunda deneyimli. Takım çalışması ve liderlik becerileri güçlü.",
    experience: [
      { company: "Domino's Türkiye", title: "Yeni Ürün Geliştirme Uzmanı", years: "2022-2024" }
    ],
    education: "Boğaziçi Üniversitesi, Endüstri Mühendisliği, 2018-2022",
    skills: ["Yaratıcılık", "Analitik düşünme", "Liderlik"]
  } },
  { id: 2, name: "Ali Veli", role: "Product Manager", city: "Ankara", age: 29, education: "ODTÜ", personality: "INTJ", skill: "Liderlik", simulation: 90, cv: {
    summary: "Teknoloji projelerinde ürün yönetimi ve liderlik alanında uzman.",
    experience: [
      { company: "TechX", title: "Product Manager", years: "2021-2024" }
    ],
    education: "ODTÜ, Bilgisayar Mühendisliği, 2014-2019",
    skills: ["Liderlik", "İletişim", "Stratejik düşünme"]
  } },
  { id: 3, name: "Anna Schmidt", role: "Sales Specialist", city: "Berlin", age: 27, education: "TU Berlin", personality: "ESFP", skill: "İletişim", simulation: 78, cv: {
    summary: "Avrupa pazarında satış süreçlerinde deneyimli, güçlü iletişim becerileri.",
    experience: [
      { company: "GlobalSales", title: "Sales Specialist", years: "2020-2024" }
    ],
    education: "TU Berlin, İşletme, 2015-2020",
    skills: ["Satış", "İkna kabiliyeti", "Sunum"]
  } },
]
const personalities = ["ENFJ", "INTJ", "ESFP"]
const skills = ["Yaratıcılık", "Liderlik", "İletişim"]
const roles = ["Yeni Ürün Geliştirme Uzmanı", "Product Manager", "Sales Specialist"]
const cities = ["İstanbul", "Ankara", "Berlin"]
const educations = ["Boğaziçi Üniversitesi", "ODTÜ", "TU Berlin"]

export default function AdminCandidates() {
  const [selectedPersonality, setSelectedPersonality] = React.useState("")
  const [selectedSkill, setSelectedSkill] = React.useState("")
  const [selectedRole, setSelectedRole] = React.useState("")
  const [selectedCity, setSelectedCity] = React.useState("")
  const [selectedEducation, setSelectedEducation] = React.useState("")
  const [minSimulation, setMinSimulation] = React.useState("")
  const [maxSimulation, setMaxSimulation] = React.useState("")
  const [minAge, setMinAge] = React.useState("")
  const [maxAge, setMaxAge] = React.useState("")
  const [cvModal, setCvModal] = React.useState<{name: string, cv: any}|null>(null)

  const filtered = demoCandidates.filter(c =>
    (!selectedPersonality || c.personality === selectedPersonality) &&
    (!selectedSkill || c.skill === selectedSkill) &&
    (!selectedRole || c.role === selectedRole) &&
    (!selectedCity || c.city === selectedCity) &&
    (!selectedEducation || c.education === selectedEducation) &&
    (!minSimulation || c.simulation >= Number(minSimulation)) &&
    (!maxSimulation || c.simulation <= Number(maxSimulation)) &&
    (!minAge || c.age >= Number(minAge)) &&
    (!maxAge || c.age <= Number(maxAge))
  )

  function handleExportCSV() {
    // Scaffold: Export filtered candidates as CSV
    const header = ["Name","Role","City","Age","Education","Personality","Skill","Simulation"]
    const rows = filtered.map(c => [c.name, c.role, c.city, c.age, c.education, c.personality, c.skill, c.simulation])
    const csv = [header, ...rows].map(r=>r.join(",")).join("\n")
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'candidates.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-2xl font-bold text-primary mb-6">Candidates</h1>
        <div className="mb-4 flex gap-4 flex-wrap">
          <input className="border rounded-lg px-3 py-2" placeholder="Search by name or role..." />
          <select className="border rounded-lg px-3 py-2" value={selectedPersonality} onChange={e=>setSelectedPersonality(e.target.value)}>
            <option value="">Personality</option>
            {personalities.map(p=>(<option key={p} value={p}>{p}</option>))}
          </select>
          <select className="border rounded-lg px-3 py-2" value={selectedSkill} onChange={e=>setSelectedSkill(e.target.value)}>
            <option value="">Skill</option>
            {skills.map(s=>(<option key={s} value={s}>{s}</option>))}
          </select>
          <select className="border rounded-lg px-3 py-2" value={selectedRole} onChange={e=>setSelectedRole(e.target.value)}>
            <option value="">Role</option>
            {roles.map(r=>(<option key={r} value={r}>{r}</option>))}
          </select>
          <select className="border rounded-lg px-3 py-2" value={selectedCity} onChange={e=>setSelectedCity(e.target.value)}>
            <option value="">City</option>
            {cities.map(c=>(<option key={c} value={c}>{c}</option>))}
          </select>
          <select className="border rounded-lg px-3 py-2" value={selectedEducation} onChange={e=>setSelectedEducation(e.target.value)}>
            <option value="">Education</option>
            {educations.map(ed=>(<option key={ed} value={ed}>{ed}</option>))}
          </select>
          <input className="border rounded-lg px-3 py-2 w-24" type="number" min="0" max="100" placeholder="Min Sim" value={minSimulation} onChange={e=>setMinSimulation(e.target.value)} />
          <input className="border rounded-lg px-3 py-2 w-24" type="number" min="0" max="100" placeholder="Max Sim" value={maxSimulation} onChange={e=>setMaxSimulation(e.target.value)} />
          <input className="border rounded-lg px-3 py-2 w-20" type="number" min="0" max="100" placeholder="Min Age" value={minAge} onChange={e=>setMinAge(e.target.value)} />
          <input className="border rounded-lg px-3 py-2 w-20" type="number" min="0" max="100" placeholder="Max Age" value={maxAge} onChange={e=>setMaxAge(e.target.value)} />
          <button className="bg-accent text-primary rounded-lg px-4 py-2 font-semibold border border-primary" onClick={handleExportCSV}>Export CSV</button>
        </div>
        <table className="w-full text-left border rounded-lg overflow-hidden">
          <thead className="bg-accent">
            <tr>
              <th className="p-2">Name</th>
              <th className="p-2">Role</th>
              <th className="p-2">City</th>
              <th className="p-2">Age</th>
              <th className="p-2">Education</th>
              <th className="p-2">Personality</th>
              <th className="p-2">Skill</th>
              <th className="p-2">Simulation</th>
              <th className="p-2">CV</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id} className="border-b last:border-b-0">
                <td className="p-2 font-semibold">{c.name}</td>
                <td className="p-2">{c.role}</td>
                <td className="p-2">{c.city}</td>
                <td className="p-2">{c.age}</td>
                <td className="p-2">{c.education}</td>
                <td className="p-2">{c.personality}</td>
                <td className="p-2">{c.skill}</td>
                <td className="p-2">{c.simulation}</td>
                <td className="p-2"><button className="text-primary underline" onClick={()=>setCvModal({name: c.name, cv: c.cv})}>View CV</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        {cvModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-lg w-full">
              <h2 className="text-xl font-bold text-primary mb-4">{cvModal.name} - CV</h2>
              <div className="mb-6 text-gray-700">
                <div className="mb-2 font-semibold">Özet</div>
                <div className="mb-4 text-sm">{cvModal.cv.summary}</div>
                <div className="mb-2 font-semibold">Deneyim</div>
                <ul className="mb-4 text-sm list-disc ml-5">
                  {cvModal.cv.experience.map((exp, idx) => (
                    <li key={idx}>{exp.title} - {exp.company} ({exp.years})</li>
                  ))}
                </ul>
                <div className="mb-2 font-semibold">Eğitim</div>
                <div className="mb-4 text-sm">{cvModal.cv.education}</div>
                <div className="mb-2 font-semibold">Yetenekler</div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {cvModal.cv.skills.map((s, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-800 rounded px-2 py-0.5">{s}</span>
                  ))}
                </div>
              </div>
              <button className="bg-primary text-white rounded-lg px-4 py-2 font-semibold mr-2" onClick={()=>alert('Demo: PDF export not implemented.')}>Export PDF</button>
              <button className="bg-accent text-primary rounded-lg px-4 py-2 font-semibold border border-primary" onClick={()=>setCvModal(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
} 