import { PrismaClient } from '@prisma/client';
import countries from './countries';
import provinces from './states';
import cities from './cities';
import currencies from './currencies';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.city.deleteMany();
  await prisma.province.deleteMany();
  await prisma.country.deleteMany();
  await prisma.currency.deleteMany();

  console.log('Seeding...');

  await prisma.user.create({
    data: {
      email: '1234@gmail.com',
      name: 'hadi',
      password: '$2b$10$erHPDzHN3Ee9XQjcheagr./XMqA8VE5pnSYqM7HsVVl7wEHAUo76C', // secret42
      role: 'USER',
      status: 'ACTIVE',
    },
  });
  for (const currency of currencies) {
    await prisma.currency.create({
      data: {
        name: currency.name,
        code: currency.code,
        status: 'ACTIVE',
      },
    });
  }
  for (const country of countries) {
    await prisma.country.create({
      data: {
        name: country.name,
        code: country.sortname,
        status: 'ACTIVE',
        Province: {
          create: provinces
            .filter((province) => province.country_id === country.id)
            .map((province) => ({
              name: province.name,
              status: 'ACTIVE',
              City: {
                create: cities
                  .filter((city) => city.state_id === province.id)
                  .map((city) => ({
                    name: city.name,
                    status: 'ACTIVE',
                  })),
              },
            })),
        },
      },
    });
  }
  console.log("Done!");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
