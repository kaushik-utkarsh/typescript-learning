import { Prisma, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    // const res1 = await prisma.users.findMany();
    const res2 = await prisma.users.findMany({
        where:{
            email: 'amita3@gmail.com'
        }
    });
    // console.log(res1)
    console.log(res2)
  } catch (err) {
    console.log(err);
  } finally {
    async () => {
      await prisma.$disconnect();
    };
  }
}

main();
