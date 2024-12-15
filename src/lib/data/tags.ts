import { TagGroup } from '../types/tags'

export const TAG_GROUPS: TagGroup[] = [
  {
    category: 'Status',
    tags: [
      { id: 'active', text: 'Active', color: 'green' },
      { id: 'pending', text: 'Pending', color: 'yellow' },
      { id: 'resolved', text: 'Resolved', color: 'blue' },
      { id: 'closed', text: 'Closed', color: 'gray' }
    ]
  },
  {
    category: 'Priority',
    tags: [
      { id: 'urgent', text: 'Urgent', color: 'red' },
      { id: 'high', text: 'High', color: 'yellow' },
      { id: 'medium', text: 'Medium', color: 'blue' },
      { id: 'low', text: 'Low', color: 'gray' }
    ]
  },
  {
    category: 'Type',
    tags: [
      { id: 'question', text: 'Question', color: 'purple' },
      { id: 'bug', text: 'Bug', color: 'red' },
      { id: 'feature', text: 'Feature', color: 'green' },
      { id: 'feedback', text: 'Feedback', color: 'blue' }
    ]
  },
  {
    category: 'Customer',
    tags: [
      { id: 'vip', text: 'VIP', color: 'purple' },
      { id: 'new', text: 'New Customer', color: 'green' },
      { id: 'returning', text: 'Returning', color: 'blue' },
      { id: 'at-risk', text: 'At Risk', color: 'red' }
    ]
  }
]