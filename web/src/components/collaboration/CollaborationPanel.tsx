import React, { useState, useEffect } from 'react'
import { useCollaboration } from '../../hooks/useWebSocket'
import { useAuth } from '../auth/AuthProvider'
import { 
  Users, 
  MessageSquare, 
  MapPin, 
  Eye,
  User,
  Clock
} from 'lucide-react'

interface CollaborationPanelProps {
  executionId: string
  selectedMessageId?: string
  onMessageSelect?: (messageId: string) => void
}

export const CollaborationPanel: React.FC<CollaborationPanelProps> = ({
  executionId,
  selectedMessageId,
  onMessageSelect
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [newComment, setNewComment] = useState('')
  const [comments, setComments] = useState<Array<{
    id: string
    messageId: string
    text: string
    userId: string
    userName: string
    timestamp: string
  }>>([])
  
  const { user } = useAuth()
  const { collaborators, activeUsers, sendMessageSelect, sendComment } = useCollaboration(executionId)

  // Handle collaboration messages
  useEffect(() => {
    collaborators.forEach(collaboration => {
      switch (collaboration.type) {
        case 'message_select':
          if (onMessageSelect && collaboration.data.messageId !== selectedMessageId) {
            onMessageSelect(collaboration.data.messageId)
          }
          break
        case 'comment':
          setComments(prev => [...prev, {
            id: `${collaboration.userId}-${Date.now()}`,
            messageId: collaboration.data.messageId,
            text: collaboration.data.text,
            userId: collaboration.userId,
            userName: collaboration.userName,
            timestamp: collaboration.timestamp
          }])
          break
      }
    })
  }, [collaborators, onMessageSelect, selectedMessageId])

  const handleSendComment = () => {
    if (!newComment.trim() || !selectedMessageId) return

    sendComment(executionId, {
      messageId: selectedMessageId,
      text: newComment.trim()
    })

    setNewComment('')
  }

  const getActiveUserColor = (userId: string) => {
    const colors = ['bg-primary', 'bg-secondary', 'bg-accent', 'bg-success', 'bg-warning', 'bg-error']
    const index = userId.charCodeAt(0) % colors.length
    return colors[index]
  }

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString()
  }

  return (
    <div className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-50 transition-all duration-300 ${
      isExpanded ? 'w-80' : 'w-12'
    }`}>
      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body p-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-base-300">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              {isExpanded && (
                <span className="font-semibold">Collaboration</span>
              )}
            </div>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="btn btn-ghost btn-sm"
            >
              {isExpanded ? '←' : '→'}
            </button>
          </div>

          {isExpanded && (
            <div className="p-4 space-y-4">
              {/* Active Users */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  Active Users ({activeUsers.size})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {Array.from(activeUsers).map((userId) => (
                    <div
                      key={userId}
                      className={`badge ${getActiveUserColor(userId)} text-primary-content`}
                    >
                      <User className="w-3 h-3 mr-1" />
                      {userId === 'current-user' ? (user?.full_name || 'You') : userId}
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4" />
                  Recent Activity
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {collaborators.slice(-5).map((collaboration, index) => (
                    <div key={index} className="text-xs p-2 bg-base-200 rounded">
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium">{collaboration.userName}</span>
                        <span className="text-base-content/50">
                          {formatTime(collaboration.timestamp)}
                        </span>
                      </div>
                      <div className="text-base-content/70">
                        {collaboration.type === 'message_select' && 'Selected a message'}
                        {collaboration.type === 'annotation' && 'Added an annotation'}
                        {collaboration.type === 'comment' && 'Added a comment'}
                        {collaboration.type === 'cursor_move' && 'Moved cursor'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Comments */}
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Comments
                </h3>
                
                {selectedMessageId && (
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Add a comment..."
                        className="input input-bordered input-sm flex-1"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendComment()}
                      />
                      <button
                        onClick={handleSendComment}
                        className="btn btn-primary btn-sm"
                        disabled={!newComment.trim()}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {comments
                    .filter(comment => comment.messageId === selectedMessageId)
                    .map((comment) => (
                      <div key={comment.id} className="p-2 bg-base-200 rounded text-sm">
                        <div className="flex items-center gap-1 mb-1">
                          <span className="font-medium">{comment.userName}</span>
                          <span className="text-base-content/50 text-xs">
                            {formatTime(comment.timestamp)}
                          </span>
                        </div>
                        <p className="text-base-content/70">{comment.text}</p>
                      </div>
                    ))}
                </div>
              </div>

              {/* Connection Status */}
              <div className="pt-2 border-t border-base-300">
                <div className="flex items-center gap-2 text-xs text-base-content/50">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  Real-time collaboration active
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CollaborationPanel