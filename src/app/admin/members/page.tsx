"use client"

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import Navadmin from '../components/Navadmin'
import { supabase } from '@/lib/supabase'

interface Member {
  id: string
  name: string
  role: string
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Member | null>(null)
  const [name, setName] = useState('')
  const [role, setRole] = useState('member')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('members')
        .select('id, name, role')
        .order('name')
      
      if (error) {
        console.error('Supabase error:', error)
        throw error
      }
      
      setMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
      alert('Error fetching members. Check console for details.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!name.trim()) {
      alert('Please enter a name')
      return
    }

    try {
      if (editing) {
        // Update existing member
        const { error } = await supabase
          .from('members')
          .update({ 
            name: name.trim(), 
            role 
          })
          .eq('id', editing.id)
          
        if (error) {
          console.error('Supabase update error:', error)
          throw error
        }
        alert('Member updated successfully!')
      } else {
        // Add new member - hanya kirim field yang diperlukan
        const { error } = await supabase
          .from('members')
          .insert([{ 
            name: name.trim(), 
            role 
          }])
          
        if (error) {
          console.error('Supabase insert error:', error)
          throw error
        }
        alert('Member added successfully!')
      }
      
      // Reset form and refresh data
      setName('')
      setRole('member')
      setEditing(null)
      setIsDialogOpen(false)
      fetchMembers()
    } catch (error) {
      console.error('Error saving member:', error)
      alert('Error saving member. Check console for details.')
    }
  }

  const handleEdit = (member: Member) => {
    setEditing(member)
    setName(member.name)
    setRole(member.role)
    setIsDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this member?')) {
      return
    }

    try {
      const { error } = await supabase
        .from('members')
        .delete()
        .eq('id', id)
        
      if (error) {
        console.error('Supabase delete error:', error)
        throw error
      }
      
      alert('Member deleted successfully!')
      fetchMembers()
    } catch (error) {
      console.error('Error deleting member:', error)
      alert('Error deleting member. Check console for details.')
    }
  }

  // Filter members by role
  const admins = members.filter(member => member.role === 'admin')
  const regularMembers = members.filter(member => member.role === 'member')

  if (loading) return (
    <div className="p-4">
      <Navadmin />
      <div className="flex justify-center items-center h-64">
        <div>Loading members...</div>
      </div>
    </div>
  )

  return (
    <div className="p-4">
      <Navadmin />
      <h1 className="text-2xl font-bold mb-4">Manage Members</h1>
      
      <Button
        className='border mb-6'
        onClick={() => {
          setEditing(null)
          setName('')
          setRole('member')
          setIsDialogOpen(true)
        }}
      >
        Add New Member
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit' : 'Add'} Member</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input 
                id="name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
                placeholder="Enter member name"
                maxLength={255} // Sesuai dengan character varying
              />
            </div>
            <div>
              <Label htmlFor="role">Role *</Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="member">Member</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" className="flex-1">
                {editing ? 'Update' : 'Add'} Member
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsDialogOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-8 mt-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Admins ({admins.length})</h2>
          {admins.length === 0 ? (
            <p className="text-gray-500">No admins found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
                  <TableRow key={admin.id}>
                    <TableCell className="text-xs text-gray-500 font-mono">
                      {admin.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="font-medium">{admin.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        {admin.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleEdit(admin)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(admin.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Members ({regularMembers.length})</h2>
          {regularMembers.length === 0 ? (
            <p className="text-gray-500">No members found</p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {regularMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="text-xs text-gray-500 font-mono">
                      {member.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="font-medium">{member.name}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {member.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          onClick={() => handleEdit(member)}
                        >
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          onClick={() => handleDelete(member.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Database Info:</h3>
        <p className="text-xs text-gray-600">
          Table: members | Columns: id (uuid), name (varchar), role (varchar)
        </p>
        <p className="text-xs text-gray-600">
          Total records: {members.length}
        </p>
      </div>
    </div>
  )
}