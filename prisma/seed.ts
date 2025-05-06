import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🔥 Nuking database...');

  // Wipe all data
  await prisma.galleryItem.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  const password = await hash('changeme', 10);

  console.log('🌱 Seeding users...');

  await prisma.user.create({
    data: {
      email: 'alice@example.com',
      password,
      role: 'Artist',
      profile: {
        create: {
          name: 'Alice',
          contact: 'alice@example.com',
          image: 'https://placehold.co/100x100.png',
          socialMedia: '@aliceart',
          artpiece: 'Dream Forest',
          description: 'Alice creates surreal dreamscapes.',
          owner: 'Alice',
        },
      },
      galleryItems: {
        create: [
          { title: 'Dream Forest', imageUrl: 'https://placehold.co/300x300.png?text=Art+1' },
          { title: 'Mystic River', imageUrl: 'https://placehold.co/300x300.png?text=Art+2' },
          { title: 'Celestial Dawn', imageUrl: 'https://placehold.co/300x300.png?text=Art+3' },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: 'bob@example.com',
      password,
      role: 'Artist',
      profile: {
        create: {
          name: 'Bob',
          contact: 'bob@example.com',
          image: 'https://placehold.co/100x100.png',
          socialMedia: '@bobthepainter',
          artpiece: 'Ocean Echoes',
          description: 'Bob explores natural textures and ocean vibes.',
          owner: 'Bob',
        },
      },
      galleryItems: {
        create: [
          { title: 'Ocean Echoes', imageUrl: 'https://placehold.co/300x300.png?text=Ocean+1' },
          { title: 'Wave Dance', imageUrl: 'https://placehold.co/300x300.png?text=Ocean+2' },
          { title: 'Deep Blue', imageUrl: 'https://placehold.co/300x300.png?text=Ocean+3' },
        ],
      },
    },
  });

  await prisma.user.create({
    data: {
      email: 'carla@example.com',
      password,
      role: 'Artist',
      profile: {
        create: {
          name: 'Carla',
          contact: 'carla@example.com',
          image: 'https://placehold.co/100x100.png',
          socialMedia: '@carlaabstract',
          artpiece: 'Color Storm',
          description: 'Carla blends chaos and color into abstract beauty.',
          owner: 'Carla',
        },
      },
      galleryItems: {
        create: [
          { title: 'Color Storm', imageUrl: 'https://placehold.co/300x300.png?text=Color+1' },
          { title: 'Palette Clash', imageUrl: 'https://placehold.co/300x300.png?text=Color+2' },
          { title: 'Vivid Dreams', imageUrl: 'https://placehold.co/300x300.png?text=Color+3' },
        ],
      },
    },
  });

  console.log('✅ Seed complete');
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error('❌ Seed failed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });

/*
import { PrismaClient, Role } from '@prisma/client';
import { hash } from 'bcrypt';
import * as config from '../config/settings.development.json';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding the database');
  const password = await hash('changeme', 10);

  await prisma.galleryItem.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});
  for (const account of config.defaultAccounts) {
    const role = account.role as Role || Role.Artist;
    console.log(`  Creating user: ${account.email} with role: ${role}`);

    // eslint-disable-next-line no-await-in-loop
    await prisma.user.create({
      data: {
        email: account.email,
        password,
        role,
      },
    });
  }

  await Promise.all([
    prisma.user.create({
      data: {
        email: 'alice@example.com',
        password,
        role: 'Artist',
        profile: {
          create: {
            name: 'Alice',
            contact: 'alice@example.com',
            image: 'https://placehold.co/100x100.png',
            socialMedia: '@aliceart',
            artpiece: 'Dream Forest',
            description: 'Alice creates surreal dreamscapes.',
          },
        },
        galleryItems: {
          create: [
            {
              title: 'Dream Forest',
              imageUrl: 'https://placehold.co/300x300.png?text=Art+1',
            },
            {
              title: 'Mystic River',
              imageUrl: 'https://placehold.co/300x300.png?text=Art+2',
            },
            {
              title: 'Celestial Dawn',
              imageUrl: 'https://placehold.co/300x300.png?text=Art+3',
            },
          ],
        },
      },
    }),

    prisma.user.create({
      data: {
        email: 'bob@example.com',
        password,
        role: 'Artist',
        profile: {
          create: {
            name: 'Bob',
            contact: 'bob@example.com',
            image: 'https://placehold.co/100x100.png',
            socialMedia: '@bobthepainter',
            artpiece: 'Ocean Echoes',
            description: 'Bob explores natural textures and ocean vibes.',
          },
        },
        galleryItems: {
          create: [
            {
              title: 'Ocean Echoes',
              imageUrl: 'https://placehold.co/300x300.png?text=Ocean+1',
            },
            {
              title: 'Wave Dance',
              imageUrl: 'https://placehold.co/300x300.png?text=Ocean+2',
            },
            {
              title: 'Deep Blue',
              imageUrl: 'https://placehold.co/300x300.png?text=Ocean+3',
            },
          ],
        },
      },
    }),

    prisma.user.create({
      data: {
        email: 'carla@example.com',
        password,
        role: 'Artist',
        profile: {
          create: {
            name: 'Carla',
            contact: 'carla@example.com',
            image: 'https://placehold.co/100x100.png',
            socialMedia: '@carlaabstract',
            artpiece: 'Color Storm',
            description: 'Carla blends chaos and color into abstract beauty.',
          },
        },
        galleryItems: {
          create: [
            {
              title: 'Color Storm',
              imageUrl: 'https://placehold.co/300x300.png?text=Color+1',
            },
            {
              title: 'Palette Clash',
              imageUrl: 'https://placehold.co/300x300.png?text=Color+2',
            },
            {
              title: 'Vivid Dreams',
              imageUrl: 'https://placehold.co/300x300.png?text=Color+3',
            },
          ],
        },
      },
    }),
  ]);
  // Removed config.defaultData and prisma.stuff references
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
/*
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
      user: {
        connect: { id: profile.userId }, // Ensure `profile.userId` exists and is valid
      },
    },
  });
});
*/
