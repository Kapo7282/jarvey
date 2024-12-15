import { auth } from '@/auth'

export default async function MessagesPage() {
  const session = await auth()

  return (
    <div>
      <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
      <p className="mt-4 text-gray-600">
        Welcome {session?.user?.name || session?.user?.email}
      </p>
    </div>
  )
} 