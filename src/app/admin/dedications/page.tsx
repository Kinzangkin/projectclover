"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Navadmin from '../components/Navadmin'

interface Dedication {
  id: number
  month: string
  video_count: number
  updated_at: string
}

export default function DedicationsPage() {
  const [dedications, setDedications] = useState<Dedication[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Dedication | null>(null)
  const [month, setMonth] = useState('')
  const [videoCount, setVideoCount] = useState('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    fetchDedications()
  }, [])

  const fetchDedications = async () => {
    try {
      const res = await fetch('/api/dedications')
      if (!res.ok) {
        throw new Error('Failed to fetch dedications')
      }
      const data = await res.json()
      setDedications(data)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(String(error))
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    // Validate month format YYYY-MM
    const monthRegex = /^\d{4}-(0[1-9]|1[0-2])$/
    if (!monthRegex.test(month)) {
      setErrorMessage('Month must be in format YYYY-MM')
      return
    }

    const videoCountInt = parseInt(videoCount)
    if (isNaN(videoCountInt) || videoCountInt < 0) {
      setErrorMessage('Video count must be a non-negative integer')
      return
    }

    try {
      if (editing) {
        const res = await fetch('/api/dedications', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, month, video_count: videoCountInt }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to update dedication')
        }
      } else {
        const res = await fetch('/api/dedications', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ month, video_count: videoCountInt }),
        })
        if (!res.ok) {
          const err = await res.json()
          throw new Error(err.error || 'Failed to add dedication')
        }
      }
      setMonth('')
      setVideoCount('')
      setEditing(null)
      fetchDedications()
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(String(error))
      }
    }
  }

  const handleEdit = (d: Dedication) => {
    setEditing(d)
    setMonth(d.month)
    setVideoCount(d.video_count.toString())
    setErrorMessage(null)
  }

  const handleDelete = async (id: number) => {
    setErrorMessage(null)
    try {
      const res = await fetch('/api/dedications', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || 'Failed to delete dedication')
      }
      fetchDedications()
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage(String(error))
      }
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <Navadmin />
      <h1 className="text-2xl font-bold mb-4">Manage Dedications</h1>
      {errorMessage && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 border border-red-400 rounded">
          {errorMessage}
        </div>
      )}
      <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" className='border'>Add Dedication</Button>
            </DialogTrigger>
        <DialogContent aria-describedby="dedication-dialog-description">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Dedication</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="month">Month (YYYY-MM)</Label>
              <Input
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                required
                aria-describedby="dedication-dialog-description"
              />
            </div>
            <div>
              <Label htmlFor="videoCount">Video Count</Label>
              <Input
                id="videoCount"
                type="number"
                value={videoCount}
                onChange={(e) => setVideoCount(e.target.value)}
                required
                aria-describedby="dedication-dialog-description"
              />
            </div>
            <div id="dedication-dialog-description" className="sr-only">
              Form to add or edit dedication data including month and video count.
            </div>
            <Button type="submit" variant="default">
              {editing ? 'Update' : 'Add'}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Month</TableHead>
            <TableHead>Video Count</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dedications.map((d) => (
            <TableRow key={d.id}>
              <TableCell>{d.month}</TableCell>
              <TableCell>{d.video_count}</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(d)}
                  className="mr-2"
                  variant="outline"
                  size="sm"
                  title="Edit Dedication"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(d.id)}
                  variant="destructive"
                  size="sm"
                  title="Delete Dedication"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
