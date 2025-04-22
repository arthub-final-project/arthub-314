import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  config.defaultAccounts.forEach(async (account) => {
    const role = account.role as Role || Role.Artist;
    console.log(`  Creating user: ${account.email} with role: ${role}`);
    await prisma.user.upsert({
      where: { email: account.email },
      update: {},
      create: {
        email: account.email,
        password,
        role,
      },
    });
  });

  // Removed config.defaultData and prisma.stuff references
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

config.defaultProfiles.forEach(async (profile, index) => {
  console.log(`  Adding profile: ${profile.name}`);
  await prisma.profile.upsert({
    where: { id: index },
    update: {},
    create: {
      name: profile.name,
      contact: profile.contact,
      image: profile.image,
      socialMedia: profile.socialMedia,
      artpiece: profile.artpiece,
      description: profile.description,
      owner: profile.owner,
    },
  });
});
