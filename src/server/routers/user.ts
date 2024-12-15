import { protectedProcedure, router } from '../trpc';

export const userRouter = router({
  getSession: protectedProcedure.query(async ({ ctx }) => {
    return ctx.session;
  }),
}); 