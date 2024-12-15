import { router, publicProcedure } from '../trpc'
import { z } from 'zod'
import { hash } from 'bcrypt-ts'
import { TRPCError } from '@trpc/server'
import { prisma } from '../db'

export const authRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        fullName: z.string().min(2),
      })
    )
    .mutation(async ({ input }) => {
      const { email, password, fullName } = input

      const exists = await prisma.user.findUnique({
        where: { email },
      })

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists',
        })
      }

      const hashedPassword = await hash(password, 10)

      const user = await prisma.user.create({
        data: {
          email,
          fullName,
          password: hashedPassword,
        },
      })

      return { success: true, user }
    }),
}) 