'use client'

import { usePathname, useRouter } from 'next/navigation'
import { clsx } from 'clsx'
import {
  HomeIcon,
  InboxIcon,
  BriefcaseIcon,
  HandRaisedIcon,
  ChartBarIcon,
  UsersIcon,
  PaperAirplaneIcon,
  Cog6ToothIcon,
} from '@heroicons/react/24/outline'

const navigationItems = [
  { icon: HomeIcon, label: 'Home', path: '/' },
  { icon: InboxIcon, label: 'Inbox', path: '/tickets/all' },
  { icon: BriefcaseIcon, label: 'Projects', path: '/projects' },
  { icon: HandRaisedIcon, label: 'Support', path: '/support' },
  { icon: ChartBarIcon, label: 'Analytics', path: '/analytics' },
  { icon: UsersIcon, label: 'Team', path: '/team' },
  { icon: PaperAirplaneIcon, label: 'Messages', path: '/messages' },
]

export function NavigationSidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="fixed left-0 top-0 h-screen w-16 bg-white border-r flex flex-col items-center py-4 z-50">
      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mb-8">
        <span className="text-purple-600 font-semibold">J</span>
      </div>

      <nav className="flex-1 w-full">
        <ul className="space-y-4">
          {navigationItems.map((item) => {
            const Icon = item.icon
            return (
              <li key={item.path}>
                <button
                  onClick={() => router.push(item.path)}
                  className={clsx(
                    "w-full p-3 flex justify-center transition-colors relative group",
                    isActive(item.path) 
                      ? "text-purple-600" 
                      : "text-gray-400 hover:text-gray-600"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
                    {item.label}
                  </span>
                  {isActive(item.path) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-purple-600" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      </nav>

      <button 
        onClick={() => router.push('/settings')}
        className="p-3 text-gray-400 hover:text-gray-600 transition-colors relative group"
      >
        <Cog6ToothIcon className="w-5 h-5" />
        <span className="absolute left-16 bg-gray-900 text-white px-2 py-1 rounded text-sm opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
          Settings
        </span>
      </button>
    </div>
  )
}