import * as React from "react"
import { AdminLayout } from "./layout"

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-primary mb-4">Trailie Admin Dashboard</h1>
        <p className="text-gray-700 mb-6">Welcome to the B2B admin panel. Use the sidebar to navigate between candidate search, filters, and export features.</p>
        <div className="grid grid-cols-2 gap-6">
          <div className="bg-accent rounded-lg p-6 text-center">
            <div className="text-xl font-semibold text-primary mb-2">Candidates</div>
            <div className="text-gray-600">Search and filter user CVs</div>
          </div>
          <div className="bg-accent rounded-lg p-6 text-center">
            <div className="text-xl font-semibold text-primary mb-2">Export</div>
            <div className="text-gray-600">Export selected CVs as PDF or CSV</div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
} 