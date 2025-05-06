import { Prisma } from '@prisma/client';

const userWithStuff = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    profile: true,
    galleryItems: true,
  },
});

export type UserWithStuff = Prisma.UserGetPayload<typeof userWithStuff>;
