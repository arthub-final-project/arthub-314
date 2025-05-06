import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userWithStuff = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    profile: true,
    galleryItems: true,
  },
});

type UserWithStuff = Prisma.UserGetPayload<typeof userWithStuff>;

export default async function getThreeRandomUsersWithProfileAndGallery(): Promise<UserWithStuff[]> {
  const totalUsers = await prisma.user.count();
  const randomOffsets = new Set<number>();

  while (randomOffsets.size < Math.min(3, totalUsers)) {
    randomOffsets.add(Math.floor(Math.random() * totalUsers));
  }

  const userResults = await Promise.all(
    Array.from(randomOffsets).map(offset => prisma.user.findMany({
      skip: offset,
      take: 1,
      include: {
        profile: true,
        galleryItems: true,
      },
    }).then(users => users[0] || null)),
  );
  return userResults.filter((user): user is UserWithStuff => user !== null);
}
