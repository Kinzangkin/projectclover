"use client"

import { useEffect, useState } from 'react'
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface Dedication {
  id: number
  month: string // format YYYY-MM
  video_count: number
  updated_at: string
}

export default function DedicationStats() {
  const [dedications, setDedications] = useState<Dedication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedYear, setSelectedYear] = useState<string | null>(null)
  const [years, setYears] = useState<string[]>([])

  useEffect(() => {
    fetchDedications()
  }, [])

  const fetchDedications = async () => {
    try {
      const res = await fetch('/api/dedications')
      if (!res.ok) {
        throw new Error('Failed to fetch dedications')
      }
      const data: Dedication[] = await res.json()
      setDedications(data)

      // Extract unique years from data
      const uniqueYears = Array.from(
        new Set(data.map(d => d.month.substring(0, 4)))
      ).sort((a, b) => b.localeCompare(a)) // descending order
      setYears(uniqueYears)
      setSelectedYear(uniqueYears[0] || null)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError(String(err))
      }
    } finally {
      setLoading(false)
    }
  }

  // Filter dedications for selected year and sort by month ascending
  const filteredDedications = dedications
    .filter(d => d.month.startsWith(selectedYear || ''))
    .sort((a, b) => a.month.localeCompare(b.month))

  // Buat array bulan lengkap 01 sampai 12
  const allMonths = Array.from({ length: 12 }, (_, i) => {
    const monthNum = (i + 1).toString().padStart(2, '0')
    return monthNum
  })

  // Gabungkan data dedications dengan array bulan lengkap
  const completeData = allMonths.map(month => {
    const found = filteredDedications.find(d => d.month.substring(5, 7) === month)
    return found
      ? { ...found, monthLabel: month }
      : { id: 0, month: `${selectedYear}-${month}`, video_count: 0, updated_at: '', monthLabel: month }
  })

  const totalVideos = filteredDedications.reduce((sum, d) => sum + d.video_count, 0)

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!selectedYear) return <div>No data available</div>

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 10px' }}>
      <CardHeader style={{ width: '100%', maxWidth: 900 }}>
        <CardTitle>Dedication Statistics - {selectedYear}</CardTitle>
        <p>Total Videos: {totalVideos}</p>
        <div style={{ marginTop: 8, marginBottom: 16 }}>
          <label htmlFor="year-select" style={{ marginRight: 8 }}>Select Year:</label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </CardHeader>
      <CardContent style={{ width: '100%', maxWidth: 900 }}>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={completeData}
            barCategoryGap="25%"
            barGap={3}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="monthLabel"
              label={{ value: 'Month', position: 'insideBottomRight', offset: -5 }}
              minTickGap={15}
            />
            <YAxis />
            <Tooltip formatter={(value: number) => value.toString()} />
            <Bar dataKey="video_count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </div>
  )
}
