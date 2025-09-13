import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { 
  Users, 
  UserPlus, 
  Settings, 
  Shield, 
  Crown, 
  UserCheck,
  UserX,
  Mail,
  Key,
  Calendar,
  Activity,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import { useAuth } from '../auth/AuthProvider'
import LoadingSpinner from '../common/LoadingSpinner'
import toast from 'react-hot-toast'

interface TeamMember {
  id: string
  email: string
  full_name: string
  role: 'owner' | 'admin' | 'member' | 'viewer'
  status: 'active' | 'pending' | 'suspended'
  joined_at: string
  last_active: string
  permissions: string[]
}

interface Team {
  id: string
  name: string
  description: string
  created_at: string
  member_count: number
  owner_id: string
}

export const TeamManagement: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null)
  const [showInviteModal, setShowInviteModal] = useState(false)
  const [showRoleModal, setShowRoleModal] = useState(false)
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState<'admin' | 'member' | 'viewer'>('member')
  
  const { user } = useAuth()
  const queryClient = useQueryClient()

  // Fetch user's teams
  const { data: teams, isLoading: teamsLoading } = useQuery({
    queryKey: ['user-teams', user?.id],
    queryFn: async () => {
      if (!user?.id) return []
      
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          teams (
            id,
            name,
            description,
            created_at,
            owner_id
          )
        `)
        .eq('user_id', user.id)
        .eq('status', 'active')
      
      if (error) throw error
      return data.map((member: any) => member.teams).filter(Boolean)
    },
    enabled: !!user?.id
  })

  // Fetch team members
  const { data: teamMembers, isLoading: membersLoading } = useQuery({
    queryKey: ['team-members', selectedTeam],
    queryFn: async () => {
      if (!selectedTeam) return []
      
      const { data, error } = await supabase
        .from('team_members')
        .select(`
          *,
          profiles (
            id,
            email,
            full_name,
            avatar_url
          )
        `)
        .eq('team_id', selectedTeam)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      return data
    },
    enabled: !!selectedTeam
  })

  // Invite team member mutation
  const inviteMemberMutation = useMutation({
    mutationFn: async ({ email, role }: { email: string, role: string }) => {
      const { data, error } = await supabase
        .from('team_invitations')
        .insert({
          team_id: selectedTeam,
          email,
          role,
          invited_by: user?.id,
          expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
        })
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Invitation sent successfully')
      setShowInviteModal(false)
      setInviteEmail('')
      queryClient.invalidateQueries({ queryKey: ['team-members', selectedTeam] })
    },
    onError: (error) => {
      toast.error('Failed to send invitation')
      console.error('Invite error:', error)
    }
  })

  // Update member role mutation
  const updateRoleMutation = useMutation({
    mutationFn: async ({ memberId, role }: { memberId: string, role: string }) => {
      const { data, error } = await supabase
        .from('team_members')
        .update({ role })
        .eq('id', memberId)
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Member role updated successfully')
      setShowRoleModal(false)
      setSelectedMember(null)
      queryClient.invalidateQueries({ queryKey: ['team-members', selectedTeam] })
    },
    onError: (error) => {
      toast.error('Failed to update member role')
      console.error('Update role error:', error)
    }
  })

  // Remove member mutation
  const removeMemberMutation = useMutation({
    mutationFn: async (memberId: string) => {
      const { data, error } = await supabase
        .from('team_members')
        .update({ status: 'suspended' })
        .eq('id', memberId)
      
      if (error) throw error
      return data
    },
    onSuccess: () => {
      toast.success('Member removed successfully')
      queryClient.invalidateQueries({ queryKey: ['team-members', selectedTeam] })
    },
    onError: (error) => {
      toast.error('Failed to remove member')
      console.error('Remove member error:', error)
    }
  })

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'owner':
        return <Crown className="w-4 h-4 text-warning" />
      case 'admin':
        return <Shield className="w-4 h-4 text-primary" />
      case 'member':
        return <UserCheck className="w-4 h-4 text-success" />
      case 'viewer':
        return <Eye className="w-4 h-4 text-info" />
      default:
        return <Users className="w-4 h-4 text-base-content" />
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'owner':
        return 'badge-warning'
      case 'admin':
        return 'badge-primary'
      case 'member':
        return 'badge-success'
      case 'viewer':
        return 'badge-info'
      default:
        return 'badge-neutral'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'badge-success'
      case 'pending':
        return 'badge-warning'
      case 'suspended':
        return 'badge-error'
      default:
        return 'badge-neutral'
    }
  }

  const handleInviteMember = () => {
    if (!inviteEmail || !selectedTeam) return
    inviteMemberMutation.mutate({ email: inviteEmail, role: inviteRole })
  }

  const handleUpdateRole = (memberId: string, newRole: string) => {
    updateRoleMutation.mutate({ memberId, role: newRole })
  }

  const handleRemoveMember = (memberId: string) => {
    if (confirm('Are you sure you want to remove this member?')) {
      removeMemberMutation.mutate(memberId)
    }
  }

  if (teamsLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card bg-base-100 shadow-lg">
        <div className="card-body">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Team Management</h1>
              <p className="text-base-content/70">
                Manage team members, roles, and permissions
              </p>
            </div>
            
            <button 
              onClick={() => setShowInviteModal(true)}
              className="btn btn-primary"
              disabled={!selectedTeam}
            >
              <UserPlus className="w-4 h-4" />
              Invite Member
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Teams List */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-lg">
            <div className="card-body">
              <h2 className="text-lg font-bold mb-4">Your Teams</h2>
              
              <div className="space-y-2">
                {teams?.map((team: Team) => (
                  <div
                    key={team.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedTeam === team.id 
                        ? 'bg-primary text-primary-content' 
                        : 'bg-base-200 hover:bg-base-300'
                    }`}
                    onClick={() => setSelectedTeam(team.id)}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="font-medium">{team.name}</span>
                    </div>
                    <div className="text-xs opacity-70">
                      {team.member_count} members
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Team Members */}
        <div className="lg:col-span-3">
          {selectedTeam ? (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-bold">Team Members</h2>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-base-content/70">
                      {teamMembers?.length || 0} members
                    </span>
                  </div>
                </div>
                
                {membersLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <LoadingSpinner size="sm" />
                  </div>
                ) : (
                  <div className="space-y-3">
                    {teamMembers?.map((member: any) => (
                      <div key={member.id} className="flex items-center justify-between p-3 bg-base-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="avatar placeholder">
                            <div className="bg-neutral text-neutral-content rounded-full w-10">
                            <span className="text-xs">
                              {member.profiles?.full_name?.charAt(0) || member.profiles?.email?.charAt(0) || 'U'}
                            </span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium">
                                {member.profiles?.full_name || 'Unknown User'}
                              </span>
                              {getRoleIcon(member.role)}
                              <div className={`badge ${getRoleColor(member.role)}`}>
                                {member.role}
                              </div>
                              <div className={`badge ${getStatusColor(member.status)}`}>
                                {member.status}
                              </div>
                            </div>
                            <div className="text-sm text-base-content/70">
                              {member.profiles?.email}
                            </div>
                            <div className="text-xs text-base-content/50">
                              Joined: {new Date(member.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <div className="dropdown">
                            <label tabIndex={0} className="btn btn-ghost btn-sm">
                              <MoreVertical className="w-4 h-4" />
                            </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                              <li>
                                <a onClick={() => {
                                  setSelectedMember(member)
                                  setShowRoleModal(true)
                                }}>
                                  <Edit className="w-4 h-4" />
                                  Change Role
                                </a>
                              </li>
                              <li>
                                <a onClick={() => handleRemoveMember(member.id)}>
                                  <UserX className="w-4 h-4" />
                                  Remove Member
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="card bg-base-100 shadow-lg">
              <div className="card-body">
                <div className="text-center py-12">
                  <Users className="w-16 h-16 text-base-content/30 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Select a Team</h3>
                  <p className="text-base-content/70">
                    Choose a team from the sidebar to view and manage its members.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invite Member Modal */}
      {showInviteModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Invite Team Member</h3>
            
            <div className="space-y-4">
              <div>
                <label className="label">
                  <span className="label-text">Email Address</span>
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="input input-bordered w-full"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={inviteRole}
                  onChange={(e) => setInviteRole(e.target.value as any)}
                >
                  <option value="viewer">Viewer - Read-only access</option>
                  <option value="member">Member - Execute tests and view results</option>
                  <option value="admin">Admin - Manage team and settings</option>
                </select>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => setShowInviteModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
              <button 
                onClick={handleInviteMember}
                className="btn btn-primary"
                disabled={!inviteEmail || inviteMemberMutation.isPending}
              >
                {inviteMemberMutation.isPending ? 'Sending...' : 'Send Invitation'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Change Role Modal */}
      {showRoleModal && selectedMember && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Change Member Role</h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-base-content/70 mb-2">
                  Changing role for: <strong>{selectedMember.profiles?.full_name || selectedMember.profiles?.email}</strong>
                </p>
              </div>
              
              <div>
                <label className="label">
                  <span className="label-text">New Role</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  defaultValue={selectedMember.role}
                  onChange={(e) => {
                    handleUpdateRole(selectedMember.id, e.target.value)
                  }}
                >
                  <option value="viewer">Viewer - Read-only access</option>
                  <option value="member">Member - Execute tests and view results</option>
                  <option value="admin">Admin - Manage team and settings</option>
                </select>
              </div>
            </div>
            
            <div className="modal-action">
              <button 
                onClick={() => setShowRoleModal(false)}
                className="btn btn-ghost"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TeamManagement