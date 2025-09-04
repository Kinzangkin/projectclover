"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import Navadmin from '../components/Navadmin'

interface MembersData {
  admins: string[]
  members: string[]
}

export default function MembersPage() {
  const [data, setData] = useState<MembersData>({ admins: [], members: [] })
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<{ name: string; role: string } | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('member')

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    const res = await fetch('/api/members')
    const data = await res.json()
    setData(data)
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (editing) {
      await fetch('/api/members', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ oldName: editing.name, newName: name, role: editing.role })
      })
      setEditing(null)
    } else {
      await fetch('/api/members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, role })
      })
    }
    setName('')
    setRole('member')
    fetchMembers()
  }

  const handleEdit = (name: string, role: string) => {
    setEditing({ name, role })
    setName(name)
    setRole(role)
  }

  const handleDelete = async (name: string, role: string) => {
    await fetch('/api/members', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, role })
    })
    fetchMembers()
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-4">
      <Navadmin />
      <h1 className="text-2xl font-bold mb-4">Manage Members</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button className='border'>Add Member</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit">{editing ? 'Update' : 'Add'}</Button>
          </form>
        </DialogContent>
      </Dialog>
      <h2 className="text-xl font-semibold mt-6">Admins</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.admins.map((admin) => (
            <TableRow key={admin}>
              <TableCell>{admin}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(admin, 'admin')} className="mr-2">Edit</Button>
                <Button onClick={() => handleDelete(admin, 'admin')} variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2 className="text-xl font-semibold mt-6">Members</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.members.map((member) => (
            <TableRow key={member}>
              <TableCell>{member}</TableCell>
              <TableCell>
                <Button onClick={() => handleEdit(member, 'member')} className="mr-2">Edit</Button>
                <Button onClick={() => handleDelete(member, 'member')} variant="destructive">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
