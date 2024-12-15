import {
  HomeIcon,
  InboxIcon,
  BriefcaseIcon,
  HandRaisedIcon,
  ChartBarIcon,
  UsersIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline'

export const NAVIGATION_ITEMS = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: InboxIcon, label: 'Inbox', path: '/tickets/all' },
  { icon: BriefcaseIcon, label: 'Projects', path: '/projects' },
  { icon: HandRaisedIcon, label: 'Support', path: '/support' },
  { icon: ChartBarIcon, label: 'Analytics', path: '/analytics' },
  { icon: UsersIcon, label: 'Team', path: '/team' },
  { icon: PaperAirplaneIcon, label: 'Messages', path: '/messages' },
] as const