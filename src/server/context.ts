import { type inferAsyncReturnType } from '@trpc/server';
import { auth } from '@/auth';

export async function createContext() {
  const session = await auth();
  
  return {
    session,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>; 