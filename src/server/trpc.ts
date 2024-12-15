import { initTRPC, TRPCError } from '@trpc/server';
import { auth } from '@/auth';
import { type Context } from './context';

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(async ({ ctx, next }) => {
  const session = await auth();
  
  if (!session?.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  
  return next({
    ctx: {
      session,
      user: session.user,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed); 